import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin and content API routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/content')) {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const adminEnabled = process.env.ADMIN_ENABLED === 'true';

    // Block access if not in development AND not explicitly enabled via env var
    if (!isDevelopment && !adminEnabled) {
      // Internal rewrite to /404 page while keeping the URL in address bar
      // This makes the route disappear in production environments
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  }

  return NextResponse.next();
}

// Matcher ensures this middleware only runs for these specific paths
export const config = {
  matcher: ['/admin/:path*', '/api/content/:path*'],
};
