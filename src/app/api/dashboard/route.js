import { NextResponse } from 'next/server';
import { StudentMongoDB } from '@/lib/mongodb-db';
import simpleDB from '@/lib/simple-db';

// Try to use MongoDB, fallback to Simple DB
let useSimpleDB = false;
let studentDB = null;

async function getDatabase() {
  if (useSimpleDB) {
    return simpleDB;
  }
  
  if (!studentDB) {
    studentDB = new StudentMongoDB();
  }
  
  try {
    await studentDB.getCollection();
    return studentDB;
  } catch (error) {
    console.log('MongoDB not available, using Simple DB for dashboard');
    useSimpleDB = true;
    return simpleDB;
  }
}

export async function GET() {
  try {
    console.log('Loading dashboard data...');
    
    const db = await getDatabase();
    
    let stats, students;
    if (useSimpleDB) {
      stats = db.getStats();
      students = db.getStudents({ limit: 100 });
    } else {
      // For MongoDB, we need to implement getStats method or calculate manually
      const studentsResult = await db.getStudents({ limit: 100 });
      students = studentsResult;
      stats = {
        totalStudents: studentsResult.total || 0,
        activeStudents: studentsResult.data.filter(s => s.status === 'active').length,
        pendingStudents: studentsResult.data.filter(s => s.status === 'pending').length,
        totalTeachers: 0 // Will be implemented later
      };
    }
    
    // Calculate today's admissions
    const today = new Date().toISOString().split('T')[0];
    const todayAdmissions = students.data.filter(student => 
      student.admissionDate && student.admissionDate.startsWith(today)
    ).length;

    // Calculate this month's admissions
    const thisMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const monthlyAdmissions = students.data.filter(student => 
      student.admissionDate && student.admissionDate.startsWith(thisMonth)
    ).length;

    // Calculate pending approvals
    const pendingApprovals = students.data.filter(student => 
      student.status === 'pending'
    ).length;

    // Calculate total fees collected (mock data for now)
    const totalFeesCollected = students.data.length * 1500; // 1500 taka per student

    const dashboardData = {
      quickStats: {
        todayAdmissions,
        monthlyAdmissions,
        pendingApprovals,
        totalFeesCollected
      },
      recentAdmissions: students.data
        .filter(student => student.status === 'pending')
        .slice(0, 5)
        .map(student => ({
          id: student._id,
          name: student.studentName || student.nameBangla,
          class: student.admissionClass,
          department: student.department,
          date: student.admissionDate,
          status: student.status
        })),
      stats: {
        totalStudents: stats.totalStudents,
        activeStudents: stats.activeStudents,
        pendingStudents: stats.pendingStudents,
        totalTeachers: stats.totalTeachers || 0
      },
      chartData: {
        admissionTrend: [
          { month: 'জানুয়ারি', admissions: 45 },
          { month: 'ফেব্রুয়ারি', admissions: 52 },
          { month: 'মার্চ', admissions: monthlyAdmissions || 38 },
          { month: 'এপ্রিল', admissions: 41 },
          { month: 'মে', admissions: 48 }
        ],
        departmentWise: [
          { department: 'কিতাব বিভাগ', students: Math.floor(stats.totalStudents * 0.6) },
          { department: 'হিফজ বিভাগ', students: Math.floor(stats.totalStudents * 0.3) },
          { department: 'মক্তব বিভাগ', students: Math.floor(stats.totalStudents * 0.1) }
        ]
      },
      databaseInfo: {
        type: useSimpleDB ? 'Simple In-Memory DB' : 'MongoDB Atlas',
        connected: true
      }
    };

    console.log('Dashboard data loaded successfully');
    
    return NextResponse.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'ড্যাশবোর্ড ডাটা লোড করতে সমস্যা হয়েছে',
      details: error.message
    }, { status: 500 });
  }
}