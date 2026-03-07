import { NextResponse } from 'next/server';
import StudentDB from '@/lib/filedb';
import TeacherDB from '@/lib/teacherdb';
import AttendanceDB from '@/lib/attendancedb';
import FeesDB from '@/lib/feesdb';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // সকল ডাটা সংগ্রহ করুন
    const students = StudentDB.readStudents();
    const teachers = TeacherDB.readTeachers();
    const attendance = AttendanceDB.readAttendance();
    const fees = FeesDB.readFees();

    // ব্যাকআপ ডাটা তৈরি করুন
    const backupData = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      data: {
        students,
        teachers,
        attendance,
        fees
      },
      metadata: {
        totalStudents: students.length,
        totalTeachers: teachers.length,
        totalAttendanceRecords: attendance.length,
        totalFeeRecords: fees.length
      }
    };

    // ব্যাকআপ ফাইল তৈরি করুন
    const backupDir = path.join(process.cwd(), 'data', 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `backup-${timestamp}.json`;
    const backupFilePath = path.join(backupDir, backupFileName);

    fs.writeFileSync(backupFilePath, JSON.stringify(backupData, null, 2));

    return NextResponse.json({
      success: true,
      message: 'ব্যাকআপ সফলভাবে তৈরি হয়েছে',
      data: {
        fileName: backupFileName,
        filePath: backupFilePath,
        size: fs.statSync(backupFilePath).size,
        timestamp: backupData.timestamp,
        metadata: backupData.metadata
      }
    });
  } catch (error) {
    console.error('ব্যাকআপ তৈরি করতে সমস্যা:', error);
    return NextResponse.json({
      success: false,
      error: 'ব্যাকআপ তৈরি করতে সমস্যা হয়েছে'
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { action } = await request.json();

    if (action === 'restore') {
      // রিস্টোর ফাংশনালিটি (ভবিষ্যতের জন্য)
      return NextResponse.json({
        success: false,
        error: 'রিস্টোর ফিচার এখনো উপলব্ধ নয়'
      }, { status: 501 });
    }

    if (action === 'list') {
      // ব্যাকআপ ফাইলের তালিকা
      const backupDir = path.join(process.cwd(), 'data', 'backups');
      
      if (!fs.existsSync(backupDir)) {
        return NextResponse.json({
          success: true,
          data: []
        });
      }

      const files = fs.readdirSync(backupDir)
        .filter(file => file.endsWith('.json'))
        .map(file => {
          const filePath = path.join(backupDir, file);
          const stats = fs.statSync(filePath);
          return {
            name: file,
            size: stats.size,
            created: stats.birthtime.toISOString(),
            modified: stats.mtime.toISOString()
          };
        })
        .sort((a, b) => new Date(b.created) - new Date(a.created));

      return NextResponse.json({
        success: true,
        data: files
      });
    }

    return NextResponse.json({
      success: false,
      error: 'অজানা অ্যাকশন'
    }, { status: 400 });
  } catch (error) {
    console.error('ব্যাকআপ API সমস্যা:', error);
    return NextResponse.json({
      success: false,
      error: 'ব্যাকআপ API তে সমস্যা হয়েছে'
    }, { status: 500 });
  }
}