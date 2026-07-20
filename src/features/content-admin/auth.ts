import { createHmac, timingSafeEqual } from 'node:crypto';

export const ADMIN_COOKIE_NAME = 'content_admin_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function getSecret(): string | null {
  const value = process.env.CONTENT_ADMIN_SESSION_SECRET?.trim();
  return value && value.length >= 32 ? value : null;
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.CONTENT_ADMIN_PASSWORD?.trim() && getSecret());
}

export function passwordMatches(input: string): boolean {
  const expected = process.env.CONTENT_ADMIN_PASSWORD?.trim();
  if (!expected) return false;
  const actualBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export function createSessionToken(): string {
  const secret = getSecret();
  if (!secret) throw new Error('CONTENT_ADMIN_SESSION_SECRET 尚未設定或長度不足 32 字元。');
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS })).toString('base64url');
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(token?: string): boolean {
  const secret = getSecret();
  if (!secret || !token) return false;
  const [payload, providedSignature] = token.split('.');
  if (!payload || !providedSignature) return false;
  const expectedSignature = sign(payload, secret);
  const actualBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) return false;

  try {
    const value = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: number };
    return typeof value.exp === 'number' && value.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
