import { NextResponse } from 'next/server';
import { generateArticle } from '@/features/content-admin/repository';
import { publicGenerationError } from '@/features/content-admin/gemini-generator';

export const runtime = 'nodejs';
export const maxDuration = 60;
export async function POST(_request: Request, { params }: { params: { id: string } }) {
  try {
    const article = await generateArticle(params.id);
    if (!article) return NextResponse.json({ success: false, error: '找不到議題。' }, { status: 404 });
    return NextResponse.json({ success: true, article });
  } catch (error) {
    console.error('Gemini article generation failed', error);
    return NextResponse.json({ success: false, error: publicGenerationError(error) }, { status: 502 });
  }
}
