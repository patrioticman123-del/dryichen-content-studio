import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/admin/content-topics', request.url));
}

export const config = {
  matcher: [
    '/((?!admin|api|_next/static|_next/image|favicon.ico|favicon.svg|icon.png|manifest.json|robots.txt|sitemap.xml).*)',
  ],
};
