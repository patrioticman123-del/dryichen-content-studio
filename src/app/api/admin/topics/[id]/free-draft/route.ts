import { NextResponse } from 'next/server';
import { listTopics } from '@/features/content-admin/repository';
import { FREE_DRAFT_MODEL, freeDraftConfigured, generateFreeDraft } from '@/features/content-admin/free-draft';
import { finishFreeDraft, getFreeDraft, reserveFreeDraft } from '@/features/content-admin/free-draft-store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300;

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ configured: freeDraftConfigured(), model: FREE_DRAFT_MODEL, draft: await getFreeDraft(params.id) }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: '不允許跨站產生文章。' }, { status: 403 });
  if (!freeDraftConfigured()) return NextResponse.json({ error: '尚未設定 GEMINI_API_KEY 或 GOOGLE_API_KEY；提示詞複製與貼回預覽仍可使用。' }, { status: 503 });
  let requestId: string | undefined;
  try {
    const raw = await request.text();
    if (raw.length > 500) return NextResponse.json({ error: '請求內容過長。' }, { status: 413 });
    const body = raw ? JSON.parse(raw) : {};
    const topic = (await listTopics()).find((item) => item.id === params.id);
    if (!topic) return NextResponse.json({ error: '找不到這個議題。' }, { status: 404 });
    const reservation = await reserveFreeDraft(topic.id, body.regenerate === true);
    if (!reservation.generate) return NextResponse.json({ draft: reservation.draft }, { status: reservation.draft.status === 'running' ? 202 : 200 });
    requestId = reservation.draft.requestId;
    const article = await generateFreeDraft(topic);
    const draft = await finishFreeDraft(topic.id, requestId, { article, model: FREE_DRAFT_MODEL });
    return NextResponse.json({ draft });
  } catch (error) {
    const message = error instanceof Error && ['TimeoutError', 'AbortError'].includes(error.name) ? '本次試寫超過等待時間。沒有切換付費模型，請稍後重試或直接使用 Claude。' : error instanceof Error ? error.message : '無法生成初稿。';
    if (requestId) await finishFreeDraft(params.id, requestId, { error: message }).catch(() => {});
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
