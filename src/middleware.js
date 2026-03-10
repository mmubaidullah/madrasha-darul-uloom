import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { ROLES, getRoleBasedRedirectUrl, isPublicRoute } from './lib/rolePermissions';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Allow access to public routes
    if (
      isPublicRoute(pathname) ||
      pathname.startsWith('/api/auth') ||
      pathname.startsWith('/api/register') ||
      pathname.startsWith('/_next') ||
      pathname.startsWith('/favicon') ||
      pathname.startsWith('/public')
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
      '/dashboard/admin': [
        ROLES.MUHTAMIM, 
        ROLES.BIVAGIYA_PRODHAN, 
        ROLES.NAZEME_DARUL_IKAMA, 
        ROLES.NAZEME_TALIMAAT, 
        ROLES.HISAB_ROKKHOK
      ],
      '/dashboard/teacher': [
        ROLES.MUHTAMIM, 
        ROLES.BIVAGIYA_PRODHAN, 
        ROLES.NEGARAN_USTAZ, 
        ROLES.TEACHER
      ],
      '/dashboard/student': [
        ROLES.MUHTAMIM, 
        ROLES.BIVAGIYA_PRODHAN, 
        ROLES.NEGARAN_USTAZ, 
        ROLES.TEACHER, 
        ROLES.STUDENT
      ],
      '/dashboard/parent': [
        ROLES.MUHTAMIM, 
        ROLES.BIVAGIYA_PRODHAN, 
        ROLES.TEACHER, 
        ROLES.PARENT
      ],
      '/admin': [
        ROLES.MUHTAMIM, 
        ROLES.BIVAGIYA_PRODHAN, 
        ROLES.NAZEME_DARUL_IKAMA, 
        ROLES.NAZEME_TALIMAAT, 
        ROLES.HISAB_ROKKHOK
      ],
      '/admin/settings/users': [ROLES.MUHTAMIM], // Only মুহতামিম can manage users
      '/admin/settings': [ROLES.MUHTAMIM, ROLES.BIVAGIYA_PRODHAN],
      '/admin/fees': [ROLES.MUHTAMIM, ROLES.HISAB_ROKKHOK],
      '/admin/hostel': [ROLES.MUHTAMIM, ROLES.NAZEME_DARUL_IKAMA],
      '/admin/exams': [ROLES.MUHTAMIM, ROLES.NAZEME_TALIMAAT, ROLES.NEGARAN_USTAZ],
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
      const redirectUrl = getRoleBasedRedirectUrl(userRole);
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
          isPublicRoute(pathname)
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