import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const LINE_CLIENT_ID = process.env.LINE_CHANNEL_ID || '2010496335';
const LINE_CLIENT_SECRET = process.env.LINE_CHANNEL_SECRET;

export async function GET(request: NextRequest) {
  try {
    if (!LINE_CLIENT_SECRET) {
      console.error('LINE_CHANNEL_SECRET 尚未設定。');
      return NextResponse.json(
        { success: false, error: 'LINE 登入服務尚未完成設定。' },
        { status: 503 },
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const redirectUri = searchParams.get('redirectUri');

    if (!code || !redirectUri) {
      return NextResponse.json(
        { success: false, error: '缺少 code 或 redirectUri。' },
        { status: 400 },
      );
    }

    const bodyData = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: LINE_CLIENT_ID,
      client_secret: LINE_CLIENT_SECRET,
    });

    const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: bodyData.toString(),
      cache: 'no-store',
    });
    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error('LINE Token 交換失敗。', tokenData.error || tokenResponse.status);
      return NextResponse.json(
        { success: false, error: 'LINE 登入驗證失敗。' },
        { status: 502 },
      );
    }

    const profileResponse = await fetch('https://api.line.me/v2/profile', {
      method: 'GET',
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
      cache: 'no-store',
    });
    const profileData = await profileResponse.json();

    if (!profileResponse.ok || !profileData.userId) {
      return NextResponse.json(
        { success: false, error: '無法取得 LINE 使用者資料。' },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      lineUserId: profileData.userId,
      displayName: profileData.displayName,
      pictureUrl: profileData.pictureUrl,
    });
  } catch (error) {
    console.error('LINE 登入 API 發生錯誤。', error);
    return NextResponse.json(
      { success: false, error: 'LINE 登入服務暫時無法使用。' },
      { status: 500 },
    );
  }
}
