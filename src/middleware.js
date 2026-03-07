import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if authentication should be skipped (for development)
  const skipAuth = process.env.SKIP_AUTH === 'true';
  const demoMode = process.env.DEMO_MODE === 'true';
  
  if (skipAuth || demoMode) {
    return NextResponse.next();
  }
  
  // Get the pathname of the request (e.g. /, /admin, /login)
  const path = request.nextUrl.pathname;

  // Define paths that are considered public (accessible without login)
  const isPublicPath = path === '/login' || 
                      path === '/' || 
                      path === '/demo' ||
                      path === '/admin-demo' ||
                      path.startsWith('/api/auth') ||
                      path.startsWith('/_next') ||
                      path.startsWith('/public') ||
                      path.includes('.html');

  // Get the token from the cookies
  const token = request.cookies.get('token')?.value || '';

  // Redirect to login if accessing private paths without token
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Redirect to admin if accessing login with token
  if (isPublicPath && token && path === '/login') {
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|images).*)',
  ],
};