import { NextResponse } from 'next/server';
import { TeacherMongoDB } from '@/lib/mongodb-db';

const teacherDB = new TeacherMongoDB();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const search = searchParams.get('search') || '';
    const subject = searchParams.get('subject') || '';
    const status = searchParams.get('status') || 'active';

    const result = await teacherDB.getTeachers({
      search,
      subject,
      status,
      page: parseInt(page),
      limit: parseInt(limit)
    });

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: {
        page: result.page,
        limit: parseInt(limit),
        total: result.total,
        pages: result.pages
      }
    });
  } catch (error) {
    console.error('Teachers API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'শিক্ষকদের তথ্য আনতে ব্যর্থ',
      details: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const teacherData = await request.json();
    
    // Validate required fields
    if (!teacherData.nameBangla || !teacherData.designation) {
      return NextResponse.json({
        success: false,
        error: 'নাম এবং পদবী আবশ্যক'
      }, { status: 400 });
    }

    const newTeacher = await teacherDB.createTeacher(teacherData);

    return NextResponse.json({
      success: true,
      message: 'শিক্ষক সফলভাবে যোগ করা হয়েছে',
      data: newTeacher
    });
  } catch (error) {
    console.error('Create Teacher Error:', error);
    return NextResponse.json({
      success: false,
      error: 'শিক্ষক যোগ করতে ব্যর্থ',
      details: error.message
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const updateData = await request.json();

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'শিক্ষকের ID প্রয়োজন'
      }, { status: 400 });
    }

    const updatedTeacher = await teacherDB.updateById(id, updateData);

    return NextResponse.json({
      success: true,
      message: 'শিক্ষকের তথ্য আপডেট হয়েছে',
      data: updatedTeacher
    });
  } catch (error) {
    console.error('Update Teacher Error:', error);
    return NextResponse.json({
      success: false,
      error: 'শিক্ষকের তথ্য আপডেট করতে ব্যর্থ',
      details: error.message
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'শিক্ষকের ID প্রয়োজন'
      }, { status: 400 });
    }

    const deleted = await teacherDB.deleteById(id);

    if (deleted) {
      return NextResponse.json({
        success: true,
        message: 'শিক্ষকের তথ্য মুছে ফেলা হয়েছে'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'শিক্ষক পাওয়া যায়নি'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Delete Teacher Error:', error);
    return NextResponse.json({
      success: false,
      error: 'শিক্ষকের তথ্য মুছতে ব্যর্থ',
      details: error.message
    }, { status: 500 });
  }
}