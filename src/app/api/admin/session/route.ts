import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, createSessionToken, isAdminConfigured, passwordMatches } from '@/features/content-admin/auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!isAdminConfigured()) return NextResponse.json({ success: false, error: '後台環境變數尚未設定完成。' }, { status: 503 });
  const body = await request.json().catch(() => ({})) as { password?: string };
  if (!passwordMatches(body.password || '')) return NextResponse.json({ success: false, error: '密碼不正確。' }, { status: 401 });
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, createSessionToken(), { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 8 });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, '', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0 });
  return response;
}
