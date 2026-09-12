import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createPool } from '@vercel/postgres';
import type { ExternalArticleCode } from './article-prompt';

export interface FreeDraft { topicId: string; status: 'running' | 'completed' | 'failed'; updatedAt: string; requestId: string; article?: ExternalArticleCode; model?: string; error?: string }
interface DraftStore { records: Record<string, FreeDraft>; usage: Record<string, number> }
let pool: ReturnType<typeof createPool> | undefined;
let initialized: Promise<unknown> | undefined;
let lock = Promise.resolve();
const filename = path.join(process.cwd(), '.local-data', 'free-preview-drafts.json');
const empty = (): DraftStore => ({ records: {}, usage: {} });

async function storage<T>(operation: (store: DraftStore) => T, write = false): Promise<T> {
  if (process.env.CONTENT_ADMIN_STORAGE === 'postgres') {
    pool ||= createPool({ connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL });
    initialized ||= pool.query('CREATE TABLE IF NOT EXISTS content_free_preview_state (id INT PRIMARY KEY, data JSONB NOT NULL)')
      .then(() => pool!.query('INSERT INTO content_free_preview_state VALUES (1,$1::jsonb) ON CONFLICT DO NOTHING', [JSON.stringify(empty())]))
      .catch((error) => { initialized = undefined; throw error; });
    await initialized;
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query<{ data: DraftStore }>(`SELECT data FROM content_free_preview_state WHERE id=1${write ? ' FOR UPDATE' : ''}`);
      const state = result.rows[0].data;
      const output = operation(state);
      if (write) await client.query('UPDATE content_free_preview_state SET data=$1::jsonb WHERE id=1', [JSON.stringify(state)]);
      await client.query('COMMIT'); return output;
    } catch (error) { await client.query('ROLLBACK'); throw error; }
    finally { client.release(); }
  }
  const previous = lock;
  let release!: () => void;
  lock = new Promise<void>((resolve) => { release = resolve; });
  await previous;
  try {
    let state: DraftStore;
    try { state = JSON.parse(await fs.readFile(filename, 'utf8')); }
    catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; state = empty(); }
    const output = operation(state);
    if (write) {
      await fs.mkdir(path.dirname(filename), { recursive: true });
      const temp = `${filename}.${randomUUID()}.tmp`;
      await fs.writeFile(temp, JSON.stringify(state), 'utf8'); await fs.rename(temp, filename);
    }
    return output;
  } finally { release(); }
}

export async function getFreeDraft(topicId: string): Promise<FreeDraft | null> {
  return storage((state) => {
    const draft = state.records[topicId];
    if (draft?.status === 'running' && Date.now() - Date.parse(draft.updatedAt) > 300000) return { ...draft, status: 'failed', error: '上次生成逾時或連線中斷，舊內容仍保留。可重新試寫或直接交給 Claude。' };
    return draft || null;
  });
}

export async function reserveFreeDraft(topicId: string, regenerate: boolean): Promise<{ generate: boolean; draft: FreeDraft }> {
  return storage((state) => {
    const previous = state.records[topicId];
    if (previous?.status === 'running' && Date.now() - Date.parse(previous.updatedAt) < 300000) return { generate: false, draft: previous };
    if (previous?.status === 'completed' && !regenerate) return { generate: false, draft: previous };
    const date = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Taipei' });
    // Shared durable cap, including failures. No automatic retries or paid-model fallback.
    if ((state.usage[date] || 0) >= 10) throw new Error('工作台今日已試寫 10 次，請明天再試或改用 Claude 提示詞。');
    if (Object.values(state.records).some((draft) => draft.status === 'running' && Date.now() - Date.parse(draft.updatedAt) < 300000)) throw new Error('目前已有文章試寫中，請等它完成後再試。');
    state.usage[date] = (state.usage[date] || 0) + 1;
    for (const day of Object.keys(state.usage)) if (day < new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10)) delete state.usage[day];
    const draft: FreeDraft = { ...previous, topicId, status: 'running', requestId: randomUUID(), updatedAt: new Date().toISOString(), error: undefined };
    state.records[topicId] = draft;
    return { generate: true, draft };
  }, true);
}

export async function finishFreeDraft(topicId: string, requestId: string, result: { article?: ExternalArticleCode; model?: string; error?: string }): Promise<FreeDraft> {
  return storage((state) => {
    const draft = state.records[topicId];
    if (!draft || draft.requestId !== requestId) throw new Error('這次試寫已失效，請重新載入頁面。');
    if (result.article) { draft.article = result.article; draft.model = result.model; }
    draft.error = result.error; draft.status = result.error ? 'failed' : 'completed'; draft.updatedAt = new Date().toISOString();
    return draft;
  }, true);
}
