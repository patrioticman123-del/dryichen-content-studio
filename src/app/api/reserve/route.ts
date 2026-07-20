import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

type SlotSettings = Record<string, 'open' | 'reserved'>;

const normalizeSlotSettings = (value: unknown): SlotSettings => {
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

// 自動為每筆網頁預約產生一組隨機不重複的預約 ID
function generateShortId(): string {
  return 'BK' + Math.random().toString(36).substring(2, 7).toUpperCase();
}

// 🚀 一、POST: 處理「病患送出掛號問卷」與「線上釋出取消名額」雙分流
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id, date, timeSlot, name, phone, email, part, reason, treatment, lineUserId, lineDisplayName } = body;

    // 💡 分流處理 1：病患端/醫師端「自主取消預約」
    if (action === "cancelAppointment") {
      if (!id) {
        return NextResponse.json({ success: false, error: '缺少預約 ID' }, { status: 400 });
      }
      
      await sql`
        DELETE FROM appointments 
        WHERE id = ${id};
      `;
      
      return NextResponse.json({ success: true });
    }

    // 💡 分流處理 2：標準「填寫送出預約掛號問卷」
    if (!date || !timeSlot) {
      return NextResponse.json({ success: false, error: '缺少預約必要參數 (日期或時段)' }, { status: 400 });
    }

    const cleanPhone = phone ? phone.toString().trim() : '';
    const cleanLineId = lineUserId ? lineUserId.toString().trim() : '未關聯';

    // 💡 建立新預約的時間物件 (標準 ISO 8601 格式 包含台灣時區)
    const cleanTime = timeSlot.split(' ')[0]; // 取出 "09:30"
    const newTargetDateTime = new Date(`${date}T${cleanTime}:00+08:00`);
    if (isNaN(newTargetDateTime.getTime())) {
      return NextResponse.json({ success: false, error: '預約時間格式錯誤' }, { status: 400 });
    }

    // 僅允許一般開放時段提交；後台保留時段會展示為「已預約」，不可被繞過前端直接預約。
    const { rows: settingsRows } = await sql`
      SELECT time_slots FROM doctor_settings WHERE date = ${date} LIMIT 1;
    `;
    const slotSettings = normalizeSlotSettings(settingsRows[0]?.time_slots);
    if (slotSettings[timeSlot] !== 'open') {
      return NextResponse.json({ success: false, error: '此時段目前已預約或未開放，請重新選擇其他時段。' });
    }

    // ----------------------------------------------------------------
    // 🚀 規則 1：【手機+LINE雙聯防】檢查未來「已預約」的總時段上限 (最高3次)
    // ----------------------------------------------------------------
    const todayISO = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
    
    // 同時用「手機號碼」與「LINE ID」去抓未來預約（有綁定的 LINE 絕不放過）
    const { rows: futureApts } = await sql`
      SELECT date, time_slot FROM appointments 
      WHERE (phone = ${cleanPhone} AND phone <> '')
         OR (line_user_id = ${cleanLineId} AND line_user_id <> '未關聯' AND line_user_id <> '');
    `;

    // 因為當天 >= todayISO 包含今天，如果未來已滿 3 次，直接擋下
    const now = new Date();
    const futureAptCount = futureApts.filter((apt) => {
      const existingCleanTime = apt.time_slot.split(' ')[0];
      const existingDateTime = new Date(`${apt.date}T${existingCleanTime}:00+08:00`);
      return !isNaN(existingDateTime.getTime()) && existingDateTime >= now;
    }).length;

    if (futureAptCount >= 3) {
      return NextResponse.json({ success: false, error: '只開放預約三個時段' });
    }

    // ----------------------------------------------------------------
    // 🚀 規則 2：【手機+LINE雙聯防】防密集預約 (需間隔 72 小時)
    // ----------------------------------------------------------------
    // 同時抓出該手機或該 LINE 帳號的所有預約項目進行全量時間軸交叉比對
    const { rows: allUserApts } = await sql`
      SELECT date, time_slot FROM appointments 
      WHERE (phone = ${cleanPhone} AND phone <> '')
         OR (line_user_id = ${cleanLineId} AND line_user_id <> '未關聯' AND line_user_id <> '');
    `;

    for (const apt of allUserApts) {
      const existingCleanTime = apt.time_slot.split(' ')[0];
      const existingDateTime = new Date(`${apt.date}T${existingCleanTime}:00+08:00`);
      
      if (!isNaN(existingDateTime.getTime())) {
        const timeDiffInMs = Math.abs(newTargetDateTime.getTime() - existingDateTime.getTime());
        const hoursDiff = timeDiffInMs / (1000 * 60 * 60);

        // 只要新預約與該用戶任何一筆舊預約間隔小於 72 小時，立刻精準攔截
        if (hoursDiff < 72) {
          return NextResponse.json({ 
            success: false, 
            error: '請勿短時間內重複預約，有問題請致電診所詢問' 
          });
        }
      }
    }

    // ----------------------------------------------------------------
    // 🚀 原有機制：精準防重刷
    // ----------------------------------------------------------------
    const { rows: existingApt } = await sql`
      SELECT id FROM appointments 
      WHERE date = ${date} AND time_slot = ${timeSlot};
    `;

    if (existingApt && existingApt.length > 0) {
      return NextResponse.json({ success: false, error: '該時段剛剛已被其他病患優先預約，請重新選取其他空缺時段！' });
    }

    const bookingId = generateShortId();
    const finalDisplayName = lineDisplayName ? lineDisplayName.toString().trim() : '';

    // 🚀 安全寫入資料庫
    await sql`
      INSERT INTO appointments (id, date, time_slot, name, phone, email, part, reason, treatment, line_user_id, line_display_name)
      VALUES (
        ${bookingId}, 
        ${date}, 
        ${timeSlot}, 
        ${name}, 
        ${cleanPhone}, 
        ${email || '未填寫'}, 
        ${part || '未填寫'}, 
        ${reason || '未填寫'}, 
        ${treatment || '未填寫'}, 
        ${cleanLineId},
        ${finalDisplayName}
      );
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Vercel Postgres 處理預約/取消失敗:', error.message);
    return NextResponse.json({ success: false, error: error.message || '操作失敗' }, { status: 500 });
  }
}

// 🚀 二、GET 區塊維持原樣（不變）
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const type = searchParams.get('type');
    const value = searchParams.get('value');

    if (action === 'getAllAppointments') {
      const { rows } = await sql`
        SELECT * FROM appointments 
        ORDER BY date ASC, time_slot ASC;
      `;
      return NextResponse.json({ success: true, list: rows || [] });
    }

    if (type === 'phone' && value) {
      const { rows } = await sql`
        SELECT * FROM appointments 
        WHERE phone = ${value.trim()} 
        ORDER BY date ASC;
      `;
      return NextResponse.json({ success: true, list: rows || [] });
    } else if (type === 'line' && value) {
      const targetValue = value.trim();
      const { rows } = await sql`
        SELECT * FROM appointments 
        WHERE line_user_id = ${targetValue}
        ORDER BY date ASC;
      `;
      return NextResponse.json({ success: true, list: rows || [] });
    }

    return NextResponse.json({ success: true, list: [] });
  } catch (error: any) {
    console.error('Vercel Postgres 讀取預約明細失敗:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
