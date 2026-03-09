import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Allow access to public routes
    if (
      pathname.startsWith('/login') ||
      pathname.startsWith('/register') ||
      pathname.startsWith('/api/auth') ||
      pathname.startsWith('/api/register') ||
      pathname.startsWith('/_next') ||
      pathname.startsWith('/favicon') ||
      pathname === '/'
    ) {
      return NextResponse.next();
    }

    // Redirect to login if not authenticated
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Role-based access control
    const userRole = token.role;
    
    // Define protected routes and their required roles
    const protectedRoutes = {
      '/dashboard/admin': ['super_admin', 'admin'],
      '/dashboard/teacher': ['super_admin', 'admin', 'teacher'],
      '/dashboard/student': ['super_admin', 'admin', 'teacher', 'student'],
      '/dashboard/parent': ['super_admin', 'admin', 'teacher', 'parent'],
      '/admin': ['super_admin', 'admin'],
      '/admin/settings/users': ['super_admin'], // Only super_admin can manage users
      '/admin/settings': ['super_admin', 'admin'],
    };

    // Check if current path requires specific roles
    for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
      if (pathname.startsWith(route)) {
        if (!allowedRoles.includes(userRole)) {
          // Redirect to access denied page
          return NextResponse.redirect(new URL('/access-denied', req.url));
        }
        break;
      }
    }

    // Role-based dashboard redirects
    if (pathname === '/dashboard') {
      const roleRedirects = {
        super_admin: '/dashboard/admin',
        admin: '/dashboard/admin',
        teacher: '/dashboard/teacher',
        student: '/dashboard/student',
        parent: '/dashboard/parent'
      };

      const redirectUrl = roleRedirects[userRole] || '/dashboard/parent';
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to API routes and public pages
        const { pathname } = req.nextUrl;
        
        if (
          pathname.startsWith('/api/') ||
          pathname.startsWith('/login') ||
          pathname.startsWith('/register') ||
          pathname === '/'
        ) {
          return true;
        }

        // Require authentication for all other routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};