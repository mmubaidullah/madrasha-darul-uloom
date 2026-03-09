import { NextResponse } from 'next/server';
import { StudentMongoDB } from '@/lib/mongodb-db';
import simpleDB from '@/lib/simple-db';
import { getDepartmentByClass } from '@/lib/departments';

// Try to use MongoDB, fallback to Simple DB
let useSimpleDB = false;
let studentDB = null;

async function getDatabase() {
  if (!studentDB) {
    studentDB = new StudentMongoDB();
  }
  
  try {
    await studentDB.getCollection();
    console.log('Using MongoDB for students API');
    return { db: studentDB, isSimple: false };
  } catch (error) {
    console.log('MongoDB not available, using Simple DB for students API');
    return { db: simpleDB, isSimple: true };
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const search = searchParams.get('search') || '';
    const className = searchParams.get('class') || '';
    const department = searchParams.get('department') || '';
    const group = searchParams.get('group') || '';
    const status = searchParams.get('status') || ''; // Don't default to 'active'

    console.log('GET /api/students - Request received with params:', {
      page, limit, search, className, department, group, status
    });

    const { db, isSimple } = await getDatabase();
    
    let result;
    if (isSimple) {
      console.log('Using Simple DB for GET students');
      result = db.getStudents({
        search,
        class: className,
        department,
        group,
        status: status || undefined, // Don't pass empty string
        page: parseInt(page),
        limit: parseInt(limit)
      });
    } else {
      console.log('Using MongoDB for GET students');
      result = await db.getStudents({
        search,
        class: className,
        department,
        group,
        status: status || undefined, // Don't pass empty string
        page: parseInt(page),
        limit: parseInt(limit)
      });
    }

    console.log('Students API result:', {
      dataCount: result.data.length,
      total: result.total,
      page: result.page,
      pages: result.pages
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
    console.log('POST /api/students - Request received');

    const studentData = await request.json();
    console.log('Received student data:', JSON.stringify(studentData, null, 2));
    
    // Validate required fields for simplified form
    if (!studentData.studentName || !studentData.fatherName || !studentData.guardianName || !studentData.guardianMobile) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json({
        success: false,
        error: 'ছাত্রের নাম, পিতার নাম, অভিভাবকের নাম এবং মোবাইল নম্বর আবশ্যক'
      }, { status: 400 });
    }

    // Validate address information
    if (!studentData.presentAddress?.village || !studentData.presentAddress?.district) {
      console.log('Validation failed: Missing address information');
      return NextResponse.json({
        success: false,
        error: 'বর্তমান ঠিকানার গ্রাম এবং জেলা আবশ্যক'
      }, { status: 400 });
    }

    // Validate educational information
    if (!studentData.department || !studentData.admissionClass) {
      console.log('Validation failed: Missing educational information');
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
      studentData.studentId = `STD${year}${timestamp.toString().slice(-6)}`;
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
    };

    console.log('Processed data for database:', JSON.stringify(processedData, null, 2));

    const { db, isSimple } = await getDatabase();
    let newStudent;
    
    if (isSimple) {
      console.log('Using Simple DB for POST student');
      newStudent = db.createStudent(processedData);
    } else {
      console.log('Using MongoDB for POST student');
      newStudent = await db.createStudent(processedData);
    }
    
    console.log('Student created successfully:', newStudent._id);

    return NextResponse.json({
      success: true,
      message: 'ভর্তি আবেদন সফলভাবে জমা হয়েছে। অনুমোদনের জন্য অপেক্ষা করুন।',
      data: newStudent
    });
  } catch (error) {
    console.error('Create Student Error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json({
      success: false,
      error: 'ভর্তি আবেদন জমা দিতে ব্যর্থ',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
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

    console.log('PUT /api/students - Updating student:', id);

    const { db, isSimple } = await getDatabase();
    let updatedStudent;
    
    if (isSimple) {
      console.log('Using Simple DB for PUT student');
      updatedStudent = db.updateStudent(id, updateData);
    } else {
      console.log('Using MongoDB for PUT student');
      updatedStudent = await db.updateById(id, updateData);
    }

    if (!updatedStudent) {
      return NextResponse.json({
        success: false,
        error: 'ছাত্র পাওয়া যায়নি'
      }, { status: 404 });
    }

    console.log('Student updated successfully:', id);

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

    console.log('DELETE /api/students - Deleting student:', id);

    const { db, isSimple } = await getDatabase();
    let deleted;
    
    if (isSimple) {
      console.log('Using Simple DB for DELETE student');
      deleted = db.deleteStudent(id);
    } else {
      console.log('Using MongoDB for DELETE student');
      deleted = await db.deleteById(id);
    }

    if (deleted) {
      console.log('Student deleted successfully:', id);
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