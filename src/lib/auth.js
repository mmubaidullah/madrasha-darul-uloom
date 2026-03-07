import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export function verifyToken(request) {
  try {
    // Check if auth is skipped in development
    if (process.env.SKIP_AUTH === 'true' || process.env.DEMO_MODE === 'true') {
      return {
        success: true,
        user: {
          id: 1,
          name: 'ডেমো অ্যাডমিন',
          email: 'demo@admin.com',
          role: 'admin'
        }
      };
    }
    
    // Get token from cookie or Authorization header
    const token = request.cookies.get('token')?.value || 
                  request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return {
        success: false,
        error: 'No token provided'
      };
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    
    return {
      success: true,
      user: decoded
    };
  } catch (error) {
    return {
      success: false,
      error: 'Invalid token'
    };
  }
}

export function requireAuth(handler) {
  return async (request) => {
    const auth = verifyToken(request);
    
    if (!auth.success) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: 401 }
      );
    }
    
    // Add user to request for use in handler
    request.user = auth.user;
    
    return handler(request);
  };
}

export function requireRole(roles) {
  return (handler) => {
    return async (request) => {
      const auth = verifyToken(request);
      
      if (!auth.success) {
        return NextResponse.json(
          { success: false, message: auth.error },
          { status: 401 }
        );
      }
      
      if (!roles.includes(auth.user.role)) {
        return NextResponse.json(
          { success: false, message: 'Insufficient permissions' },
          { status: 403 }
        );
      }
      
      request.user = auth.user;
      
      return handler(request);
    };
  };
}