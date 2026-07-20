import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

// 宣告這支 API 不可被快取，每次觸發都要重新執行
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // 1. 取得 Vercel 後台設定的環境變數
    const LINE_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const DATABASE_URL = process.env.DATABASE_URL;

    if (!LINE_ACCESS_TOKEN || !DATABASE_URL) {
      console.error("環境變數未設定：缺少 LINE_CHANNEL_ACCESS_TOKEN 或 DATABASE_URL");
      return NextResponse.json({ error: "環境變數未設定" }, { status: 500 });
    }

    // 2. 精準計算台灣時間（UTC+8）的「明天」日期字串
    // 避免伺服器因 UTC 時間差導致日期判定錯誤
    const now = new Date();
    const twTime = new Date(now.getTime() + (8 * 60 * 60 * 1000)); // 先轉為台灣現在時間
    const tomorrow = new Date(twTime.getTime() + (24 * 60 * 60 * 1000)); // 再加 24 小時到明天
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // 3. 連線至 Neon Serverless Database
    const sql = neon(DATABASE_URL);
    
    // 撈取明天看診、且有成功連結 LINE 帳號的病患
    const appointments = await sql`
      SELECT * FROM appointments 
      WHERE date = ${tomorrowStr} 
      AND line_user_id IS NOT NULL 
      AND line_user_id != '未關聯' 
      AND line_user_id != ''
    `;

    if (appointments.length === 0) {
      return NextResponse.json({ message: `明天 (${tomorrowStr}) 無符合條件之推播名單` });
    }

    // 4. 迭代名單，透過 LINE Messaging API 發送推播
    let successCount = 0;
    for (const apt of appointments) {
      // 🔄 修正處：將 apt.lineUserId 改為對齊資料庫的 apt.line_user_id
      // 🔄 修正處：將 apt.time 統一改為對齊資料庫的 apt.time_slot
      const pushMessage = {
        to: apt.line_user_id, 
        messages: [{
          type: "text",
          text: `🏥 【宸新復健科診所】看診提醒\n\n${apt.name} 您好，提醒您明天 (${apt.date}) ${apt.time_slot} 有預約林羿辰醫師特約門診。\n\n如需變更或查詢，請至預約系統操作，謝謝您！`
        }]
      };

      const response = await fetch('https://api.line.me/v2/bot/message/push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`
        },
        body: JSON.stringify(pushMessage)
      });

      if (response.ok) {
        successCount++;
      } else {
        const errData = await response.json();
        console.error(`對病患 ${apt.name} 發送失敗，原因:`, errData);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `排程執行完畢。目標日期：${tomorrowStr}，應發送 ${appointments.length} 人，成功發送 ${successCount} 人。` 
    });

  } catch (error: any) {
    console.error("Cron Job 執行崩潰:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}