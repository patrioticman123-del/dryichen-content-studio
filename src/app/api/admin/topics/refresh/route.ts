import { NextResponse } from 'next/server';
import { listTopics, refreshDailyTopics } from '@/features/content-admin/repository';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const force = new URL(request.url).searchParams.get('force') === '1';
    const result = await refreshDailyTopics({ force });
    return NextResponse.json({ success: true, ...result, topics: await listTopics() });
  } catch (error) {
    console.error('Manual content topic discovery failed:', error);
    return NextResponse.json({
      success: false,
      error: '今日議題搜尋失敗，系統會保留上一批題目，請稍後再試。',
    }, { status: 500 });
  }
}
