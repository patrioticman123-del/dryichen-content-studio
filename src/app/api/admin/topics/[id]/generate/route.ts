import { NextResponse } from 'next/server';
import { generateArticle } from '@/features/content-admin/repository';

export const runtime = 'nodejs';
export async function POST(_request: Request, { params }: { params: { id: string } }) { const article = await generateArticle(params.id); if (!article) return NextResponse.json({ success: false, error: '找不到議題。' }, { status: 404 }); return NextResponse.json({ success: true, article }); }
