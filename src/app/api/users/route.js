import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UserMongoDB } from '@/lib/mongodb-db';
import { ROLES, hasPermission, MODULES, ACTIONS } from '@/lib/rolePermissions';

// GET - Get all users (only for মুহতামিম)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({
        success: false,
        error: 'অনুমোদিত নয়। লগইন করুন।'
      }, { status: 401 });
    }

    // Check if user has permission to view users
    if (!hasPermission(session.user.role, MODULES.USERS, ACTIONS.READ)) {
      return NextResponse.json({
        success: false,
        error: 'আপনার এই তথ্য দেখার অনুমতি নেই'
      }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    const userDB = new UserMongoDB();
    const result = await userDB.getUsers({ search, role, status, page, limit });

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: {
        total: result.total,
        page: result.page,
        pages: result.pages,
        limit
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json({
      success: false,
      error: 'ব্যবহারকারী তালিকা আনতে সমস্যা হয়েছে'
    }, { status: 500 });
  }
}

// POST - Create new user (only for মুহতামিম)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({
        success: false,
        error: 'অনুমোদিত নয়। লগইন করুন।'
      }, { status: 401 });
    }

    // Check if user has permission to create users
    if (!hasPermission(session.user.role, MODULES.USERS, ACTIONS.CREATE)) {
      return NextResponse.json({
        success: false,
        error: 'আপনার নতুন ব্যবহারকারী তৈরির অনুমতি নেই'
      }, { status: 403 });
    }

    const userData = await request.json();
    
    // Validate required fields
    if (!userData.name || !userData.email || !userData.password || !userData.role) {
      return NextResponse.json({
        success: false,
        error: 'নাম, ইমেইল, পাসওয়ার্ড এবং ভূমিকা সব ক্ষেত্র পূরণ করুন'
      }, { status: 400 });
    }

    // Validate role
    const validRoles = Object.values(ROLES);
    if (!validRoles.includes(userData.role)) {
      return NextResponse.json({
        success: false,
        error: 'অবৈধ ভূমিকা নির্বাচন'
      }, { status: 400 });
    }

    const userDB = new UserMongoDB();
    const newUser = await userDB.createUser({
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      password: userData.password,
      phone: userData.phone?.trim() || '',
      role: userData.role,
      department: userData.department?.trim() || '',
      address: userData.address?.trim() || ''
    });

    // Remove password from response
    const { password, ...userResponse } = newUser;

    return NextResponse.json({
      success: true,
      message: 'নতুন ব্যবহারকারী সফলভাবে তৈরি হয়েছে',
      data: userResponse
    });
  } catch (error) {
    console.error('Create user error:', error);
    
    if (error.message.includes('ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে')) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 409 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'ব্যবহারকারী তৈরি করতে সমস্যা হয়েছে'
    }, { status: 500 });
  }
}
