import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // For demo purposes, accept any email/password
    if (email && password) {
      // Create mock user data
      const mockUser = {
        id: 1,
        name: 'প্রশাসক',
        email: email,
        role: 'admin'
      };
      
      // Create JWT token
      const token = jwt.sign(
        { userId: mockUser.id, email: mockUser.email, role: mockUser.role },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );
      
      // Create response
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        user: mockUser,
        token: token
      });
      
      // Set cookie for middleware
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      
      return response;
    }
    
    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    // Logout - clear cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logout successful'
    });
    
    response.cookies.delete('token');
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}