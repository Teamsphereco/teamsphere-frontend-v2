import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from "better-auth/cookies";
import { auth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = [
    // Add any other protected pages here
    '/chat',
  ];

  // Define protected path prefixes
  const protectedPrefixes = [
    // Add any other protected path prefixes here
    '/chat/',
  ];

  // Check if the current path requires authentication
  const isProtectedRoute = protectedRoutes.includes(pathname) || 
    protectedPrefixes.some(prefix => pathname.startsWith(prefix));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  try {
    const sessionCookie = getSessionCookie(request);
    
    if (!sessionCookie) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  runtime: "nodejs",
  matcher: [
    // Add other protected route patterns here as needed
    "/chat/:path*",
  ],
};