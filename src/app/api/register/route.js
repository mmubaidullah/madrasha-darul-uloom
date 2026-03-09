import { NextResponse } from 'next/server';
import { UserMongoDB } from '@/lib/mongodb-db';

export async function POST(request) {
  try {
    console.log('POST /api/register - Request received');

    const userData = await request.json();
    console.log('Received registration data:', { 
      name: userData.name, 
      email: userData.email, 
      role: userData.role,
      phone: userData.phone 
    });
    
    // Validate required fields
    if (!userData.name || !userData.email || !userData.password || !userData.phone || !userData.role) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json({
        success: false,
        error: 'নাম, ইমেইল, পাসওয়ার্ড, ফোন নম্বর এবং ভূমিকা সব ক্ষেত্র পূরণ করুন'
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return NextResponse.json({
        success: false,
        error: 'সঠিক ইমেইল ঠিকানা প্রদান করুন'
      }, { status: 400 });
    }

    // Validate password strength (minimum 6 characters)
    if (userData.password.length < 6) {
      return NextResponse.json({
        success: false,
        error: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে'
      }, { status: 400 });
    }

    // Validate phone number (basic validation for Bangladeshi numbers)
    const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;
    if (!phoneRegex.test(userData.phone.replace(/\s/g, ''))) {
      return NextResponse.json({
        success: false,
        error: 'সঠিক মোবাইল নম্বর প্রদান করুন (যেমন: ০১৭১২৩৪৫৬৭৮)'
      }, { status: 400 });
    }

    // Validate role (admin role not allowed in registration)
    const allowedRoles = ['teacher', 'student', 'parent'];
    if (!allowedRoles.includes(userData.role)) {
      return NextResponse.json({
        success: false,
        error: 'অবৈধ ভূমিকা নির্বাচন। শিক্ষক, ছাত্র বা অভিভাবক নির্বাচন করুন'
      }, { status: 400 });
    }

    // Create user using MongoDB
    const userDB = new UserMongoDB();
    
    const newUser = await userDB.createUser({
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      password: userData.password,
      phone: userData.phone.trim(),
      role: userData.role
    });
    
    console.log('User created successfully:', newUser._id);

    // Remove password from response
    const { password, ...userResponse } = newUser;

    return NextResponse.json({
      success: true,
      message: 'নিবন্ধন সফল হয়েছে! এখন লগইন করুন।',
      data: userResponse
    });
  } catch (error) {
    console.error('Registration Error:', error);
    
    // Handle duplicate email error
    if (error.message.includes('ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে')) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 409 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'নিবন্ধন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}