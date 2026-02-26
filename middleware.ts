import { clerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// default middleware for Clerk
export default clerkMiddleware();

// configure which routes this runs on
export const config = {
  matcher: [
    '/',          // root page
    '/chat/:path*' // chat page and any subpaths
  ],
};

// Optional middleware function for redirects
export function middleware(req) {
  const { userId } = getAuth(req);

  const url = req.nextUrl.clone();

  // If user is logged in and visits root '/', redirect to /chat
  if (url.pathname === '/' && userId) {
    url.pathname = '/chat';
    return NextResponse.redirect(url);
  }

  // If user is not logged in and tries to access /chat, Clerk middleware handles redirect to login
  return NextResponse.next();
}