import { NextResponse } from 'next/server';
import { AttendanceMongoDB } from '@/lib/mongodb-db';

const attendanceDB = new AttendanceMongoDB();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '50';
    const date = searchParams.get('date') || '';
    const className = searchParams.get('class') || '';
    const studentId = searchParams.get('studentId') || '';

    const result = await attendanceDB.getAttendance({
      date,
      class: className,
      studentId,
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
    console.error('Attendance API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'হাজিরার তথ্য আনতে ব্যর্থ',
      details: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const requestData = await request.json();
    
    // Check if it's bulk attendance or single attendance
    if (requestData.attendance && Array.isArray(requestData.attendance)) {
      // Bulk attendance marking
      const { date, class: className, section, attendance } = requestData;
      
      const attendanceList = attendance.map(att => ({
        studentId: att.studentId,
        studentName: att.studentName,
        date,
        class: className,
        section,
        status: att.status
      }));

      const result = await attendanceDB.bulkMarkAttendance(attendanceList);

      return NextResponse.json({
        success: true,
        message: `${result.count} জন ছাত্রের হাজিরা সংরক্ষিত হয়েছে`,
        data: result
      });
    } else {
      // Single attendance marking
      const attendanceData = requestData;
      
      if (!attendanceData.studentId || !attendanceData.date || !attendanceData.status) {
        return NextResponse.json({
          success: false,
          error: 'ছাত্রের ID, তারিখ এবং হাজিরার অবস্থা আবশ্যক'
        }, { status: 400 });
      }

      const result = await attendanceDB.markAttendance(attendanceData);

      return NextResponse.json({
        success: true,
        message: 'হাজিরা সংরক্ষিত হয়েছে',
        data: result
      });
    }
  } catch (error) {
    console.error('Mark Attendance Error:', error);
    return NextResponse.json({
      success: false,
      error: 'হাজিরা সংরক্ষণ করতে ব্যর্থ',
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
        error: 'হাজিরার ID প্রয়োজন'
      }, { status: 400 });
    }

    const updatedAttendance = await attendanceDB.updateById(id, updateData);

    return NextResponse.json({
      success: true,
      message: 'হাজিরা আপডেট হয়েছে',
      data: updatedAttendance
    });
  } catch (error) {
    console.error('Update Attendance Error:', error);
    return NextResponse.json({
      success: false,
      error: 'হাজিরা আপডেট করতে ব্যর্থ',
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
        error: 'হাজিরার ID প্রয়োজন'
      }, { status: 400 });
    }

    const deleted = await attendanceDB.deleteById(id);

    if (deleted) {
      return NextResponse.json({
        success: true,
        message: 'হাজিরার তথ্য মুছে ফেলা হয়েছে'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'হাজিরার তথ্য পাওয়া যায়নি'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Delete Attendance Error:', error);
    return NextResponse.json({
      success: false,
      error: 'হাজিরার তথ্য মুছতে ব্যর্থ',
      details: error.message
    }, { status: 500 });
  }
}