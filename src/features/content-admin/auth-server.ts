import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifySessionToken } from './auth';

export function hasAdminSession(): boolean {
  return verifySessionToken(cookies().get(ADMIN_COOKIE_NAME)?.value);
}

export function requireAdminPage(): void {
  if (!hasAdminSession()) redirect('/admin/login');
}

export function requireAdminApi(): NextResponse | null {
  if (hasAdminSession()) return null;
  return NextResponse.json({ success: false, error: '尚未登入或登入已逾時。' }, { status: 401 });
}
