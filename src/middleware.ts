import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin and content API routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/content')) {
    // ALWAYS allow the analytics dashboard to be public
    if (pathname === '/admin/analytics') {
      return NextResponse.next();
    }

    const isDevelopment = process.env.NODE_ENV === 'development';
    const adminEnabled = process.env.ADMIN_ENABLED === 'true';

    // Block access if not in development AND not explicitly enabled via env var
    if (!isDevelopment && !adminEnabled) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  }

  return NextResponse.next();
}

// Matcher ensures this middleware only runs for these specific paths
export const config = {
  matcher: ['/admin/:path*', '/api/content/:path*'],
};
