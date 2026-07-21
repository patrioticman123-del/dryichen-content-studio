import { NextResponse } from 'next/server';
import { createRevision } from '@/features/content-admin/repository';
import { publicGenerationError } from '@/features/content-admin/gemini-generator';

export const runtime = 'nodejs';
export const maxDuration = 60;
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json().catch(() => ({})) as { changeRequest?: string };
  const changeRequest = body.changeRequest?.trim();
  if (!changeRequest || changeRequest.length > 1000) {
    return NextResponse.json({ success: false, error: '請輸入 1 至 1000 字的修改要求。' }, { status: 400 });
  }
  try {
    const article = await createRevision(params.id, changeRequest);
    if (!article) return NextResponse.json({ success: false, error: '找不到文章。' }, { status: 404 });
    return NextResponse.json({ success: true, article });
  } catch (error) {
    console.error('Gemini article revision failed', error);
    return NextResponse.json({ success: false, error: publicGenerationError(error) }, { status: 502 });
  }
}
