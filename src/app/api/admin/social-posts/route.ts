import { NextResponse } from 'next/server';
import { generateSocialPosts, readPublicArticle, type SocialPlatform, type SocialStyle } from '@/features/content-admin/social-content';
import { reserveSocialGeneration } from '@/features/content-admin/free-draft-store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 120;

const platforms = new Set<SocialPlatform>(['facebook', 'instagram', 'threads']);
const styles = new Set<SocialStyle>(['professional', 'warm', 'story', 'bold', 'minimal']);

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: '不允許跨站產生社群貼文。' }, { status: 403 });
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!key) return NextResponse.json({ error: '尚未設定 Gemini API 金鑰。' }, { status: 503 });
  try {
    const raw = await request.text();
    if (raw.length > 120000) return NextResponse.json({ error: '來源內容過長，請縮短後再試。' }, { status: 413 });
    const body = JSON.parse(raw || '{}');
    const selected: SocialPlatform[] = Array.isArray(body.platforms)
      ? (['facebook', 'instagram', 'threads'] as SocialPlatform[]).filter((platform) => body.platforms.includes(platform) && platforms.has(platform))
      : [];
    if (!selected.length) return NextResponse.json({ error: '請至少選擇一個社群平台。' }, { status: 400 });
    const style = styles.has(body.style) ? body.style as SocialStyle : 'professional';
    const emojiCount = Math.max(0, Math.min(8, Number.isInteger(body.emojiCount) ? body.emojiCount : 2));
    let sourceText = typeof body.content === 'string' ? body.content.trim().slice(0, 40000) : '';
    let sourceUrl: string | undefined;
    if (body.sourceMode === 'url') {
      const article = await readPublicArticle(String(body.url || ''));
      sourceText = article.text; sourceUrl = article.url;
    }
    if (sourceText.length < 40) return NextResponse.json({ error: '請提供至少 40 個字的文章內容，或貼上可公開讀取的文章網址。' }, { status: 400 });
    await reserveSocialGeneration();
    const result = await generateSocialPosts({ sourceText, sourceUrl, platforms: selected, style, emojiCount }, key);
    return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : '無法產生社群內容。' }, { status: 503 });
  }
}
