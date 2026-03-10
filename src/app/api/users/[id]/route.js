import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UserMongoDB } from '@/lib/mongodb-db';
import { hasPermission, MODULES, ACTIONS } from '@/lib/rolePermissions';

// GET - Get user by ID
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({
        success: false,
        error: 'অনুমোদিত নয়। লগইন করুন।'
      }, { status: 401 });
    }

    const { id } = params;
    const userDB = new UserMongoDB();
    const user = await userDB.findById(id);

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'ব্যবহারকারী পাওয়া যায়নি'
      }, { status: 404 });
    }

    // Remove password from response
    const { password, ...userResponse } = user;

    return NextResponse.json({
      success: true,
      data: userResponse
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({
      success: false,
      error: 'ব্যবহারকারী তথ্য আনতে সমস্যা হয়েছে'
    }, { status: 500 });
  }
}

// PUT - Update user
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({
        success: false,
        error: 'অনুমোদিত নয়। লগইন করুন।'
      }, { status: 401 });
    }

    // Check if user has permission to update users
    if (!hasPermission(session.user.role, MODULES.USERS, ACTIONS.UPDATE)) {
      return NextResponse.json({
        success: false,
        error: 'আপনার ব্যবহারকারী আপডেট করার অনুমতি নেই'
      }, { status: 403 });
    }

    const { id } = params;
    const updateData = await request.json();

    // Remove sensitive fields that shouldn't be updated directly
    delete updateData.password;
    delete updateData._id;
    delete updateData.createdAt;

    const userDB = new UserMongoDB();
    const updatedUser = await userDB.updateById(id, updateData);

    if (!updatedUser) {
      return NextResponse.json({
        success: false,
        error: 'ব্যবহারকারী পাওয়া যায়নি'
      }, { status: 404 });
    }

    // Remove password from response
    const { password, ...userResponse } = updatedUser;

    return NextResponse.json({
      success: true,
      message: 'ব্যবহারকারী তথ্য সফলভাবে আপডেট হয়েছে',
      data: userResponse
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({
      success: false,
      error: 'ব্যবহারকারী আপডেট করতে সমস্যা হয়েছে'
    }, { status: 500 });
  }
}

// DELETE - Delete user
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({
        success: false,
        error: 'অনুমোদিত নয়। লগইন করুন।'
      }, { status: 401 });
    }

    // Check if user has permission to delete users
    if (!hasPermission(session.user.role, MODULES.USERS, ACTIONS.DELETE)) {
      return NextResponse.json({
        success: false,
        error: 'আপনার ব্যবহারকারী মুছে ফেলার অনুমতি নেই'
      }, { status: 403 });
    }

    const { id } = params;

    // Prevent deleting own account
    if (id === session.user.id) {
      return NextResponse.json({
        success: false,
        error: 'আপনি নিজের অ্যাকাউন্ট মুছে ফেলতে পারবেন না'
      }, { status: 400 });
    }

    const userDB = new UserMongoDB();
    const deleted = await userDB.deleteById(id);

    if (!deleted) {
      return NextResponse.json({
        success: false,
        error: 'ব্যবহারকারী পাওয়া যায়নি'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'ব্যবহারকারী সফলভাবে মুছে ফেলা হয়েছে'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({
      success: false,
      error: 'ব্যবহারকারী মুছে ফেলতে সমস্যা হয়েছে'
    }, { status: 500 });
  }
}
