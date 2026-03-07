import { NextResponse } from 'next/server';
import { StudentMongoDB, TeacherMongoDB, AttendanceMongoDB, FeesMongoDB } from '@/lib/mongodb-db';

const studentDB = new StudentMongoDB();
const teacherDB = new TeacherMongoDB();
const attendanceDB = new AttendanceMongoDB();
const feesDB = new FeesMongoDB();

export async function GET() {
  try {
    // ছাত্রদের পরিসংখ্যান
    const totalStudents = await studentDB.count({ status: 'active' });
    
    // শিক্ষকদের পরিসংখ্যান
    const totalTeachers = await teacherDB.count({ status: 'active' });
    
    // হাজিরার পরিসংখ্যান
    const today = new Date().toISOString().split('T')[0];
    const todayAttendanceResult = await attendanceDB.findAll({
      filter: { date: today },
      limit: 1000
    });
    
    let attendancePercentage = 85; // ডিফল্ট
    if (todayAttendanceResult.data.length > 0) {
      const presentCount = todayAttendanceResult.data.filter(record => record.status === 'present').length;
      attendancePercentage = Math.round((presentCount / todayAttendanceResult.data.length) * 100);
    }
    
    // ফি সংগ্রহের পরিসংখ্যান
    const thisMonth = new Date().getMonth() + 1;
    const thisYear = new Date().getFullYear();
    
    const monthlyFeesResult = await feesDB.findAll({
      filter: {
        createdAt: {
          $gte: new Date(thisYear, thisMonth - 1, 1),
          $lt: new Date(thisYear, thisMonth, 1)
        }
      },
      limit: 1000
    });
    
    const monthlyCollection = monthlyFeesResult.data.reduce((sum, fee) => sum + (fee.paidAmount || 0), 0);
    
    // আজকের পরিসংখ্যান
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todayAdmissions = await studentDB.count({
      createdAt: { $gte: todayStart },
      status: 'active'
    });
    
    const todayFeesResult = await feesDB.findAll({
      filter: { createdAt: { $gte: todayStart } },
      limit: 100
    });
    
    const todayFeeCollection = todayFeesResult.data.reduce((sum, fee) => sum + (fee.paidAmount || 0), 0);
    
    // সাম্প্রতিক কার্যক্রম
    const recentActivities = [];
    
    // সাম্প্রতিক ভর্তি
    const recentStudentsResult = await studentDB.findAll({
      filter: { status: 'active' },
      sort: { createdAt: -1 },
      limit: 3
    });
    
    recentStudentsResult.data.forEach(student => {
      recentActivities.push({
        id: `student-${student._id}`,
        type: 'admission',
        title: 'নতুন ছাত্র ভর্তি',
        description: `${student.nameBangla} (${student.studentId}) ভর্তি হয়েছে`,
        time: new Date(student.createdAt).toLocaleDateString('bn-BD'),
        icon: 'FiUsers',
        color: 'text-blue-600 bg-blue-100'
      });
    });
    
    // সাম্প্রতিক শিক্ষক
    const recentTeachersResult = await teacherDB.findAll({
      filter: { status: 'active' },
      sort: { createdAt: -1 },
      limit: 2
    });
    
    recentTeachersResult.data.forEach(teacher => {
      recentActivities.push({
        id: `teacher-${teacher._id}`,
        type: 'teacher',
        title: 'নতুন শিক্ষক যোগদান',
        description: `${teacher.nameBangla} (${teacher.designation}) যোগদান করেছেন`,
        time: new Date(teacher.createdAt).toLocaleDateString('bn-BD'),
        icon: 'FiBookOpen',
        color: 'text-green-600 bg-green-100'
      });
    });
    
    // সাম্প্রতিক ফি কালেকশন
    const recentFeesResult = await feesDB.findAll({
      sort: { createdAt: -1 },
      limit: 3
    });
    
    recentFeesResult.data.forEach(fee => {
      recentActivities.push({
        id: `fee-${fee._id}`,
        type: 'fee',
        title: 'ফি কালেকশন',
        description: `${fee.studentName} - ৳${fee.paidAmount} পরিশোধ করেছে`,
        time: new Date(fee.createdAt).toLocaleDateString('bn-BD'),
        icon: 'FiDollarSign',
        color: 'text-yellow-600 bg-yellow-100'
      });
    });
    
    // সময় অনুযায়ী সাজান
    recentActivities.sort((a, b) => new Date(b.time) - new Date(a.time));

    const dashboardData = {
      stats: {
        totalStudents,
        totalTeachers,
        attendancePercentage,
        monthlyCollection,
        todayAdmissions,
        todayFeeCollection
      },
      recentActivities: recentActivities.slice(0, 8)
    };

    return NextResponse.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('ড্যাশবোর্ড ডাটা লোড করতে সমস্যা:', error);
    return NextResponse.json({
      success: false,
      error: 'ড্যাশবোর্ড ডাটা লোড করতে সমস্যা হয়েছে',
      details: error.message
    }, { status: 500 });
  }
}