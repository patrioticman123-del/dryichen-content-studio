import { NextResponse } from 'next/server';
import { publishPasswordMatches } from '@/features/content-admin/auth';
import { getArticle, publishArticle } from '@/features/content-admin/repository';

export const runtime = 'nodejs';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json().catch(() => ({})) as { password?: string };
  if (!publishPasswordMatches(body.password || '')) {
    return NextResponse.json({ success: false, error: '發布密碼不正確。' }, { status: 401 });
  }

  const article = await getArticle(params.id);
  if (!article) return NextResponse.json({ success: false, error: '找不到文章。' }, { status: 404 });
  if (article.status !== 'approved') {
    return NextResponse.json({ success: false, error: '文章必須先核准才能發布。' }, { status: 409 });
  }

  return NextResponse.json({ success: true, article: await publishArticle(params.id) });
}
