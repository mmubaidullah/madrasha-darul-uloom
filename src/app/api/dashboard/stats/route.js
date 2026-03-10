import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { StudentMongoDB, TeacherMongoDB, FeesMongoDB, AttendanceMongoDB } from '@/lib/mongodb-db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({
        success: false,
        error: 'অনুমোদিত নয়। লগইন করুন।'
      }, { status: 401 });
    }

    // Initialize database connections
    const studentDB = new StudentMongoDB();
    const teacherDB = new TeacherMongoDB();
    const feesDB = new FeesMongoDB();
    const attendanceDB = new AttendanceMongoDB();

    // Get current date for today's stats
    const today = new Date().toISOString().split('T')[0];
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    // Fetch stats in parallel
    const [
      totalStudents,
      totalTeachers,
      monthlyFees,
      todayAttendance
    ] = await Promise.all([
      // Total active students
      studentDB.count({ status: 'active' }),
      
      // Total active teachers
      teacherDB.count({ status: 'active' }),
      
      // Monthly income (current month)
      feesDB.findAll({
        filter: {
          createdAt: {
            $gte: new Date(currentYear, currentMonth - 1, 1),
            $lt: new Date(currentYear, currentMonth, 1)
          }
        }
      }),
      
      // Today's attendance
      attendanceDB.findAll({
        filter: { date: today }
      })
    ]);

    // Calculate monthly income
    const monthlyIncome = monthlyFees.data.reduce((total, fee) => {
      return total + (fee.paidAmount || 0);
    }, 0);

    // Calculate today's attendance percentage
    let attendancePercentage = 0;
    if (todayAttendance.data.length > 0) {
      const presentCount = todayAttendance.data.filter(record => record.status === 'present').length;
      attendancePercentage = Math.round((presentCount / todayAttendance.data.length) * 100);
    }

    const stats = {
      totalStudents,
      totalTeachers,
      monthlyIncome,
      todayAttendance: attendancePercentage,
      // Additional stats
      totalFeeCollected: monthlyIncome,
      pendingFees: monthlyFees.data.filter(fee => fee.status === 'partial' || fee.dueAmount > 0).length,
      todayPresentStudents: todayAttendance.data.filter(record => record.status === 'present').length,
      todayAbsentStudents: todayAttendance.data.filter(record => record.status === 'absent').length
    };

    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({
      success: false,
      error: 'ড্যাশবোর্ড তথ্য আনতে সমস্যা হয়েছে'
    }, { status: 500 });
  }
}