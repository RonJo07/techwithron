import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Redirect only the root and index.html to your main site
  if (pathname === '/' || pathname === '/index.html') {
    return NextResponse.redirect('https://techwithron.co.in', 308);
  }

  // Allow all other paths (including /api/*) to continue as normal
  return NextResponse.next();
}
