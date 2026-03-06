import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Default Clerk middleware protects routes like /chat
export default clerkMiddleware();

// Configure which routes this middleware runs on
export const config = {
  matcher: [
    '/chat/:path*', // Protect /chat and subpaths
    // other routes can be added here if needed
  ],
};

// Note: We removed server-side redirects from '/' to avoid Edge function issues.
// Redirect for logged-in users on '/' will be handled client-side.