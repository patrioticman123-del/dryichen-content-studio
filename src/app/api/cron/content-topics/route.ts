import { NextResponse } from 'next/server';
import { refreshDailyTopics } from '@/features/content-admin/repository';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const result = await refreshDailyTopics();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('Daily content topic discovery failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Daily topic discovery failed.',
    }, { status: 500 });
  }
}
