import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

type SlotStatus = 'open' | 'reserved';
type SlotSettings = Record<string, SlotStatus>;

const normalizeTimeSlots = (value: unknown): SlotSettings => {
  const parsed = typeof value === 'string' ? JSON.parse(value) : value;

  if (Array.isArray(parsed)) {
    return parsed.reduce<SlotSettings>((slots, time) => {
      if (typeof time === 'string') slots[time] = 'open';
      return slots;
    }, {});
  }

  if (parsed && typeof parsed === 'object') {
    return Object.entries(parsed as Record<string, unknown>).reduce<SlotSettings>((slots, [time, status]) => {
      if (status === 'open' || status === 'reserved') slots[time] = status;
      return slots;
    }, {});
  }

  return {};
};

// 🚀 1. GET: 改用 Vercel SQL 讀取所有日期的排班設定 (回顯到前台日曆與後台打勾狀態)
export async function GET() {
  try {
    // 透過 SQL 撈取 Neon 資料庫中的排班紀錄
    const { rows } = await sql`SELECT date, time_slots FROM doctor_settings ORDER BY date ASC;`;
    
    // 將資料格式化為前端物件映射：{ "2026-06-24": ["09:00 AM", "09:30 AM"] }
    const formattedSettings = (rows || []).reduce((acc: any, item: any) => {
      // 確保將資料庫中的 jsonb 格式正確解析成前端陣列
      acc[item.date] = normalizeTimeSlots(item.time_slots);
      return acc;
    }, {});

    return NextResponse.json({ success: true, settings: formattedSettings });
  } catch (error: any) {
    console.error('Vercel Postgres 讀取排班失敗:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 🚀 2. POST: 改用 Vercel SQL 儲存或覆蓋某特定日期的排班時段
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, timeSlots } = body;

    if (!date) {
      return NextResponse.json({ success: false, error: '缺少日期參數' }, { status: 400 });
    }

    // 將時段陣列轉換成標準 JSON 字串以利存入 jsonb 欄位
    const slotsJson = JSON.stringify(normalizeTimeSlots(timeSlots));

    // 利用 PostgreSQL 的 ON CONFLICT 語法，自動達成「有則覆蓋更新、無則全新新增」
    await sql`
      INSERT INTO doctor_settings (date, time_slots, updated_at)
      VALUES (${date}, ${slotsJson}, NOW())
      ON CONFLICT (date) 
      DO UPDATE SET time_slots = ${slotsJson}, updated_at = NOW();
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Vercel Postgres 儲存排班失敗:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
