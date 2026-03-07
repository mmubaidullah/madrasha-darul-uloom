import { NextResponse } from 'next/server';
import { StudentMongoDB } from '@/lib/mongodb-db';
import { getDepartmentByClass } from '@/lib/departments';

const studentDB = new StudentMongoDB();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const search = searchParams.get('search') || '';
    const className = searchParams.get('class') || '';
    const department = searchParams.get('department') || '';
    const group = searchParams.get('group') || '';
    const status = searchParams.get('status') || 'active';

    const result = await studentDB.getStudents({
      search,
      class: className,
      department,
      group,
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
    console.error('Students API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'ছাত্রদের তথ্য আনতে ব্যর্থ',
      details: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const studentData = await request.json();
    
    // Validate required fields for simplified form
    if (!studentData.studentName || !studentData.fatherName || !studentData.guardianName || !studentData.guardianMobile) {
      return NextResponse.json({
        success: false,
        error: 'ছাত্রের নাম, পিতার নাম, অভিভাবকের নাম এবং মোবাইল নম্বর আবশ্যক'
      }, { status: 400 });
    }

    // Validate address information
    if (!studentData.presentAddress?.village || !studentData.presentAddress?.district) {
      return NextResponse.json({
        success: false,
        error: 'বর্তমান ঠিকানার গ্রাম এবং জেলা আবশ্যক'
      }, { status: 400 });
    }

    // Validate educational information
    if (!studentData.department || !studentData.admissionClass) {
      return NextResponse.json({
        success: false,
        error: 'বিভাগ এবং জামাত/ক্লাস নির্বাচন আবশ্যক'
      }, { status: 400 });
    }

    // Add department based on class if not provided
    if (studentData.admissionClass && !studentData.department) {
      studentData.department = getDepartmentByClass(studentData.admissionClass);
    }

    // Generate student ID if not provided
    if (!studentData.studentId) {
      const timestamp = Date.now();
      const year = new Date().getFullYear().toString().slice(-2);
      studentData.studentId = `${year}${timestamp.toString().slice(-6)}`;
    }

    // Set default values for simplified form
    const processedData = {
      ...studentData,
      // Legacy field mapping for backward compatibility
      nameBangla: studentData.studentName,
      nameEnglish: studentData.studentName,
      phone: studentData.guardianMobile, // Use guardian mobile as primary contact
      
      // Set status as pending for approval workflow
      status: studentData.status || 'pending',
      
      // Set group as unassigned (no default groups)
      group: studentData.group || 'অনির্ধারিত',
      
      // Add admission metadata
      admissionDate: studentData.admissionDate || new Date().toISOString(),
      
      // Add timestamps
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newStudent = await studentDB.createStudent(processedData);

    return NextResponse.json({
      success: true,
      message: 'ভর্তি আবেদন সফলভাবে জমা হয়েছে। অনুমোদনের জন্য অপেক্ষা করুন।',
      data: newStudent
    });
  } catch (error) {
    console.error('Create Student Error:', error);
    return NextResponse.json({
      success: false,
      error: 'ভর্তি আবেদন জমা দিতে ব্যর্থ',
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
        error: 'ছাত্রের ID প্রয়োজন'
      }, { status: 400 });
    }

    const updatedStudent = await studentDB.updateById(id, updateData);

    return NextResponse.json({
      success: true,
      message: 'ছাত্রের তথ্য আপডেট হয়েছে',
      data: updatedStudent
    });
  } catch (error) {
    console.error('Update Student Error:', error);
    return NextResponse.json({
      success: false,
      error: 'ছাত্রের তথ্য আপডেট করতে ব্যর্থ',
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
        error: 'ছাত্রের ID প্রয়োজন'
      }, { status: 400 });
    }

    const deleted = await studentDB.deleteById(id);

    if (deleted) {
      return NextResponse.json({
        success: true,
        message: 'ছাত্রের তথ্য মুছে ফেলা হয়েছে'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'ছাত্র পাওয়া যায়নি'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Delete Student Error:', error);
    return NextResponse.json({
      success: false,
      error: 'ছাত্রের তথ্য মুছতে ব্যর্থ',
      details: error.message
    }, { status: 500 });
  }
}