import { randomUUID } from 'node:crypto';
import { createPool, type VercelPool } from '@vercel/postgres';
import { seedTopics } from './seed';
import { discoverDailyTopics, taipeiDate } from './topic-discovery';
import type {
  ArticleVersion,
  ContentTopic,
  DailyTopicRefreshOptions,
  DailyTopicRefreshResult,
  GeneratedArticle,
  TopicSourceSignal,
  TopicStatus,
} from './types';

let pool: VercelPool | undefined;
let initialization: Promise<void> | undefined;

function database(): VercelPool {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error('CONTENT_ADMIN_STORAGE=postgres，但缺少 DATABASE_URL 或 POSTGRES_URL。');
  }
  pool = createPool({ connectionString });
  return pool;
}

async function initializeDatabase(): Promise<void> {
  if (initialization) return initialization;
  initialization = (async () => {
    const db = database();
    await db.query(`CREATE TABLE IF NOT EXISTS topic_runs (
      id TEXT PRIMARY KEY, run_date DATE NOT NULL, timezone TEXT NOT NULL DEFAULT 'Asia/Taipei',
      status TEXT NOT NULL, started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), completed_at TIMESTAMPTZ,
      UNIQUE (run_date, timezone)
    )`);
    await db.query(`CREATE TABLE IF NOT EXISTS topics (
      id TEXT PRIMARY KEY, run_id TEXT REFERENCES topic_runs(id), title TEXT NOT NULL, category TEXT NOT NULL,
      summary TEXT NOT NULL, rationale TEXT NOT NULL, score JSONB NOT NULL, status TEXT NOT NULL,
      duplicate_level TEXT, deleted_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    await db.query(`CREATE TABLE IF NOT EXISTS topic_keywords (
      id TEXT PRIMARY KEY, topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
      keyword TEXT NOT NULL, position INTEGER NOT NULL, UNIQUE(topic_id, position)
    )`);
    await db.query(`CREATE TABLE IF NOT EXISTS topic_sources (
      id TEXT PRIMARY KEY, topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
      source_type TEXT NOT NULL, label TEXT NOT NULL, url TEXT, note TEXT,
      observed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    await db.query(`CREATE TABLE IF NOT EXISTS articles (
      id TEXT PRIMARY KEY, topic_id TEXT UNIQUE REFERENCES topics(id), slug TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL, status TEXT NOT NULL, current_version INTEGER NOT NULL DEFAULT 1,
      approved_at TIMESTAMPTZ, deleted_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    await db.query(`ALTER TABLE topic_runs ADD COLUMN IF NOT EXISTS error_message TEXT`);
    await db.query(`ALTER TABLE articles ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ`);
    await db.query(`ALTER TABLE topics ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ`);
    await db.query(`CREATE TABLE IF NOT EXISTS article_versions (
      id TEXT PRIMARY KEY, article_id TEXT NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
      version INTEGER NOT NULL, title TEXT NOT NULL, summary TEXT NOT NULL, seo JSONB NOT NULL,
      keywords JSONB NOT NULL, content_html TEXT NOT NULL, references_json JSONB NOT NULL,
      change_request TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(article_id, version)
    )`);
    await db.query(`CREATE TABLE IF NOT EXISTS style_references (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, rules_json JSONB NOT NULL,
      active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    await db.query(`CREATE TABLE IF NOT EXISTS publication_jobs (
      id TEXT PRIMARY KEY, article_id TEXT NOT NULL REFERENCES articles(id), status TEXT NOT NULL,
      requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), completed_at TIMESTAMPTZ, error_message TEXT
    )`);

    const seedRunId = 'seed-run-2026-07-20';
    await db.query(
      `INSERT INTO topic_runs (id, run_date, timezone, status, completed_at)
       VALUES ($1, $2, 'Asia/Taipei', 'completed', NOW()) ON CONFLICT (id) DO NOTHING`,
      [seedRunId, '2026-07-20'],
    );

    for (const topic of seedTopics) {
      const inserted = await db.query(
        `INSERT INTO topics (id, run_id, title, category, summary, rationale, score, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9, $9)
         ON CONFLICT (id) DO NOTHING RETURNING id`,
        [topic.id, seedRunId, topic.title, topic.category, topic.summary, topic.rationale,
          JSON.stringify(topic.score), topic.status, topic.discoveredAt],
      );
      if (!inserted.rowCount) continue;
      for (const [position, keyword] of topic.longTailKeywords.entries()) {
        await db.query(
          `INSERT INTO topic_keywords (id, topic_id, keyword, position) VALUES ($1, $2, $3, $4)`,
          [`${topic.id}-keyword-${position + 1}`, topic.id, keyword, position],
        );
      }
      for (const [position, source] of topic.sources.entries()) {
        await db.query(
          `INSERT INTO topic_sources (id, topic_id, source_type, label, url, note)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [`${topic.id}-source-${position + 1}`, topic.id, source.sourceType, source.label,
            source.url || null, source.note],
        );
      }
    }
  })().catch((error) => {
    initialization = undefined;
    throw error;
  });
  return initialization;
}

type TopicRow = {
  id: string; title: string; category: string; summary: string; rationale: string;
  score: ContentTopic['score']; status: TopicStatus; created_at: Date | string;
  updated_at: Date | string; article_id: string | null; run_date: Date | string;
};

function iso(value: Date | string | null | undefined): string | undefined {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function dateOnly(value: Date | string): string {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return (value instanceof Date ? value : new Date(value)).toISOString().slice(0, 10);
}

async function loadTopics(runId?: string): Promise<ContentTopic[]> {
  await initializeDatabase();
  const db = database();
  await db.query(
    `UPDATE topics
     SET status = 'dismissed', archived_at = COALESCE(archived_at, deleted_at), deleted_at = NULL, updated_at = NOW()
     WHERE deleted_at IS NOT NULL AND status NOT IN ('saved', 'drafting', 'generating')
       AND COALESCE(archived_at, deleted_at) >= NOW() - INTERVAL '30 days'`,
  );
  await db.query(
    `UPDATE topics SET archived_at = COALESCE(archived_at, updated_at, created_at)
     WHERE deleted_at IS NULL AND status = 'dismissed' AND archived_at IS NULL`,
  );
  await db.query(
    `UPDATE topics t SET status = 'dismissed', archived_at = NOW(), updated_at = NOW()
     FROM topic_runs r
     WHERE t.run_id = r.id AND t.deleted_at IS NULL AND t.status = 'new'
       AND r.run_date < (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Taipei')::date`,
  );
  await db.query(
    `UPDATE topics SET deleted_at = NOW(), updated_at = NOW()
     WHERE deleted_at IS NULL AND status = 'dismissed'
       AND archived_at < NOW() - INTERVAL '30 days'`,
  );
  const topicQuery = runId
    ? `SELECT t.*, r.run_date, a.id AS article_id FROM topics t
       JOIN topic_runs r ON r.id = t.run_id
       LEFT JOIN articles a ON a.topic_id = t.id AND a.deleted_at IS NULL
       WHERE t.deleted_at IS NULL AND t.run_id = $1
       ORDER BY (t.score->>'total')::int DESC`
    : `SELECT t.*, r.run_date, a.id AS article_id FROM topics t
       JOIN topic_runs r ON r.id = t.run_id
       LEFT JOIN articles a ON a.topic_id = t.id AND a.deleted_at IS NULL
       WHERE t.deleted_at IS NULL AND (
         t.run_id = (SELECT id FROM topic_runs WHERE status = 'completed' ORDER BY run_date DESC, completed_at DESC LIMIT 1)
         OR t.status IN ('saved', 'drafting', 'generating')
         OR (t.status = 'dismissed' AND t.archived_at >= NOW() - INTERVAL '30 days')
       )
       ORDER BY r.run_date DESC, (t.score->>'total')::int DESC`;
  const [topicResult, keywordResult, sourceResult] = await Promise.all([
    db.query<TopicRow>(topicQuery, runId ? [runId] : []),
    db.query<{ topic_id: string; keyword: string }>(
      `SELECT topic_id, keyword FROM topic_keywords ORDER BY topic_id, position`,
    ),
    db.query<{ topic_id: string; label: string; source_type: TopicSourceSignal['sourceType']; note: string; url: string | null }>(
      `SELECT topic_id, label, source_type, note, url FROM topic_sources ORDER BY observed_at, id`,
    ),
  ]);
  return topicResult.rows.map((row) => ({
    id: row.id, title: row.title, category: row.category, summary: row.summary,
    rationale: row.rationale, score: row.score, status: row.status,
    runDate: dateOnly(row.run_date),
    discoveredAt: iso(row.created_at)!, updatedAt: iso(row.updated_at)!,
    articleId: row.article_id || undefined,
    longTailKeywords: keywordResult.rows.filter((item) => item.topic_id === row.id).map((item) => item.keyword),
    sources: sourceResult.rows.filter((item) => item.topic_id === row.id).map((item) => ({
      label: item.label, sourceType: item.source_type, note: item.note, url: item.url || undefined,
    })),
  }));
}

export async function listPostgresTopics(): Promise<ContentTopic[]> {
  return loadTopics();
}

export async function refreshPostgresDailyTopics(options: DailyTopicRefreshOptions = {}): Promise<DailyTopicRefreshResult> {
  await initializeDatabase();
  const db = database();
  const runDate = taipeiDate();
  const runId = `topic-run-${runDate}`;
  const inserted = await db.query<{ id: string }>(
    `INSERT INTO topic_runs (id, run_date, timezone, status, started_at)
     VALUES ($1, $2, 'Asia/Taipei', 'running', NOW())
     ON CONFLICT (run_date, timezone) DO NOTHING RETURNING id`,
    [runId, runDate],
  );

  if (!inserted.rowCount) {
    const existing = await db.query<{ id: string; status: string }>(
      `SELECT id, status FROM topic_runs WHERE run_date = $1 AND timezone = 'Asia/Taipei'`, [runDate],
    );
    const row = existing.rows[0];
    if (row?.status === 'completed' && !options.force) {
      return { runDate, created: false, topics: await loadTopics(row.id) };
    }
    const reclaimed = await db.query<{ id: string }>(
      `UPDATE topic_runs SET status = 'running', started_at = NOW(), completed_at = NULL, error_message = NULL
       WHERE id = $1 AND (status = 'failed' OR started_at < NOW() - INTERVAL '20 minutes' OR ($2::boolean AND status = 'completed')) RETURNING id`,
      [row?.id || runId, Boolean(options.force)],
    );
    if (!reclaimed.rowCount) return { runDate, created: false, pending: true, topics: [] };
  }

  try {
    const [recentResult, titleResult, currentResult] = await Promise.all([
      db.query<{ id: string }>(
        `SELECT t.id FROM topics t JOIN topic_runs r ON r.id = t.run_id
         WHERE t.deleted_at IS NULL AND r.run_date >= $1::date - INTERVAL '3 days' AND r.run_date < $1::date`, [runDate],
      ),
      db.query<{ title: string }>(
        `SELECT title FROM topics WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT 200`,
      ),
      db.query<{ id: string }>(`SELECT id FROM topics WHERE run_id = $1`, [runId]),
    ]);
    const topics = await discoverDailyTopics({
      runDate,
      recentTopicIds: recentResult.rows.map((row) => row.id),
      recentTitles: titleResult.rows.map((row) => row.title),
      excludedTopicIds: options.excludeCurrent ? currentResult.rows.map((row) => row.id) : [],
      count: options.count,
      variationSeed: options.variationSeed,
    });

    if (options.force) {
      await db.query(
        `UPDATE topics SET status = 'dismissed', archived_at = NOW(), deleted_at = NULL, updated_at = NOW()
         WHERE run_id = $1 AND status NOT IN ('saved', 'drafting', 'generating')`, [runId],
      );
    }

    for (const topic of topics) {
      await db.query(
        `INSERT INTO topics (id, run_id, title, category, summary, rationale, score, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9, $9)
         ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, category = EXCLUDED.category,
           summary = EXCLUDED.summary, rationale = EXCLUDED.rationale, score = EXCLUDED.score,
           status = EXCLUDED.status, archived_at = NULL, updated_at = EXCLUDED.updated_at, deleted_at = NULL`,
        [topic.id, runId, topic.title, topic.category, topic.summary, topic.rationale,
          JSON.stringify(topic.score), topic.status, topic.discoveredAt],
      );
      await db.query(`DELETE FROM topic_keywords WHERE topic_id = $1`, [topic.id]);
      await db.query(`DELETE FROM topic_sources WHERE topic_id = $1`, [topic.id]);
      for (const [position, keyword] of topic.longTailKeywords.entries()) {
        await db.query(
          `INSERT INTO topic_keywords (id, topic_id, keyword, position) VALUES ($1, $2, $3, $4)
           ON CONFLICT (topic_id, position) DO UPDATE SET keyword = EXCLUDED.keyword`,
          [`${topic.id}-keyword-${position + 1}`, topic.id, keyword, position],
        );
      }
      for (const [position, source] of topic.sources.entries()) {
        await db.query(
          `INSERT INTO topic_sources (id, topic_id, source_type, label, url, note, observed_at)
           VALUES ($1, $2, $3, $4, $5, $6, NOW())
           ON CONFLICT (id) DO UPDATE SET source_type = EXCLUDED.source_type, label = EXCLUDED.label,
             url = EXCLUDED.url, note = EXCLUDED.note, observed_at = NOW()`,
          [`${topic.id}-source-${position + 1}`, topic.id, source.sourceType, source.label,
            source.url || null, source.note],
        );
      }
    }
    await db.query(
      `UPDATE topic_runs SET status = 'completed', completed_at = NOW(), error_message = NULL WHERE id = $1`,
      [runId],
    );
    return { runDate, created: true, topics };
  } catch (error) {
    const message = error instanceof Error ? error.message.slice(0, 1000) : 'Unknown topic discovery error';
    await db.query(`UPDATE topic_runs SET status = 'failed', completed_at = NOW(), error_message = $2 WHERE id = $1`, [runId, message]);
    throw error;
  }
}

export async function updatePostgresTopicStatus(id: string, status: TopicStatus): Promise<ContentTopic | null> {
  await initializeDatabase();
  const result = await database().query(
    `UPDATE topics SET status = $2,
       archived_at = CASE WHEN $2 = 'dismissed' THEN NOW() ELSE NULL END,
       updated_at = NOW()
     WHERE id = $1 AND deleted_at IS NULL RETURNING id`,
    [id, status],
  );
  if (!result.rowCount) return null;
  return (await loadTopics()).find((topic) => topic.id === id) || null;
}

type ArticleRow = {
  id: string; topic_id: string; slug: string; category: GeneratedArticle['category'];
  status: GeneratedArticle['status']; current_version: number; created_at: Date | string;
  updated_at: Date | string; approved_at: Date | string | null;
  published_at: Date | string | null;
};

type VersionRow = {
  article_id: string; version: number; title: string; summary: string;
  seo: { title: string; description: string }; keywords: string[]; content_html: string;
  references_json: ArticleVersion['references']; change_request: string | null; created_at: Date | string;
};

function mapArticle(row: ArticleRow, versionRows: VersionRow[]): GeneratedArticle {
  return {
    id: row.id, topicId: row.topic_id, slug: row.slug, category: row.category,
    status: row.status, currentVersion: row.current_version,
    versions: versionRows.filter((item) => item.article_id === row.id).map((item) => ({
      version: item.version, title: item.title, summary: item.summary,
      seoTitle: item.seo.title, seoDescription: item.seo.description,
      keywords: item.keywords, contentHtml: item.content_html,
      references: item.references_json, changeRequest: item.change_request || undefined,
      createdAt: iso(item.created_at)!,
    })),
    createdAt: iso(row.created_at)!, updatedAt: iso(row.updated_at)!, approvedAt: iso(row.approved_at),
    publishedAt: iso(row.published_at),
  };
}

export async function getPostgresArticle(id: string): Promise<GeneratedArticle | null> {
  await initializeDatabase();
  const db = database();
  const [articleResult, versionResult] = await Promise.all([
    db.query<ArticleRow>(`SELECT * FROM articles WHERE id = $1 AND deleted_at IS NULL`, [id]),
    db.query<VersionRow>(`SELECT * FROM article_versions WHERE article_id = $1 ORDER BY version`, [id]),
  ]);
  return articleResult.rows[0] ? mapArticle(articleResult.rows[0], versionResult.rows) : null;
}

export async function approvePostgresArticle(id: string): Promise<GeneratedArticle | null> {
  await initializeDatabase();
  const result = await database().query(
    `UPDATE articles SET status = 'approved', approved_at = NOW(), updated_at = NOW()
     WHERE id = $1 AND deleted_at IS NULL RETURNING id`, [id],
  );
  return result.rowCount ? getPostgresArticle(id) : null;
}

export async function publishPostgresArticle(id: string): Promise<GeneratedArticle | null> {
  await initializeDatabase();
  const result = await database().query(
    `UPDATE articles SET status = 'published', published_at = NOW(), updated_at = NOW()
     WHERE id = $1 AND status = 'approved' AND deleted_at IS NULL RETURNING id`, [id],
  );
  if (!result.rowCount) return null;
  await database().query(
    `INSERT INTO publication_jobs (id, article_id, status, requested_at, completed_at)
     VALUES ($1, $2, 'completed', NOW(), NOW())`,
    [randomUUID(), id],
  );
  return getPostgresArticle(id);
}
