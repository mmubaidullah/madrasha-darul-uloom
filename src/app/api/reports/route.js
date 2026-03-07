import { NextResponse } from 'next/server';

// Sample dashboard statistics
const dashboardStats = {
  totalStudents: 150,
  totalTeachers: 12,
  totalStaff: 8,
  monthlyIncome: 225000,
  monthlyExpense: 180000,
  todayAttendance: 142,
  totalBooks: 1250,
  issuedBooks: 85,
  activeNotices: 5,
  pendingFees: 45000
};

// Sample financial data
const financialData = [
  { month: 'জানুয়ারি', income: 220000, expense: 175000, profit: 45000 },
  { month: 'ফেব্রুয়ারি', income: 225000, expense: 180000, profit: 45000 },
  { month: 'মার্চ', income: 230000, expense: 185000, profit: 45000 },
  { month: 'এপ্রিল', income: 235000, expense: 190000, profit: 45000 },
  { month: 'মে', income: 240000, expense: 195000, profit: 45000 },
  { month: 'জুন', income: 245000, expense: 200000, profit: 45000 }
];

// Sample attendance data
const attendanceData = [
  { class: 'ক্লাস ৬', totalStudents: 25, present: 23, absent: 2, percentage: 92 },
  { class: 'ক্লাস ৭', totalStudents: 30, present: 28, absent: 2, percentage: 93 },
  { class: 'ক্লাস ৮', totalStudents: 28, present: 26, absent: 2, percentage: 93 },
  { class: 'ক্লাস ৯', totalStudents: 32, present: 30, absent: 2, percentage: 94 },
  { class: 'ক্লাস ১০', totalStudents: 35, present: 33, absent: 2, percentage: 94 }
];

// Sample exam results data
const examResultsData = [
  { subject: 'আরবি', totalStudents: 150, averageMarks: 78, passRate: 95 },
  { subject: 'বাংলা', totalStudents: 150, averageMarks: 82, passRate: 98 },
  { subject: 'ইংরেজি', totalStudents: 150, averageMarks: 75, passRate: 92 },
  { subject: 'গণিত', totalStudents: 150, averageMarks: 70, passRate: 88 },
  { subject: 'বিজ্ঞান', totalStudents: 150, averageMarks: 73, passRate: 90 },
  { subject: 'ইসলামিক স্টাডিজ', totalStudents: 150, averageMarks: 85, passRate: 99 }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const classFilter = searchParams.get('class');
    
    switch (type) {
      case 'dashboard':
        return NextResponse.json({
          success: true,
          data: dashboardStats
        });
        
      case 'financial':
        let filteredFinancial = [...financialData];
        
        // In a real app, filter by date range
        if (startDate && endDate) {
          // Filter logic here
        }
        
        return NextResponse.json({
          success: true,
          data: {
            summary: {
              totalIncome: filteredFinancial.reduce((sum, item) => sum + item.income, 0),
              totalExpense: filteredFinancial.reduce((sum, item) => sum + item.expense, 0),
              totalProfit: filteredFinancial.reduce((sum, item) => sum + item.profit, 0)
            },
            monthlyData: filteredFinancial
          }
        });
        
      case 'attendance':
        let filteredAttendance = [...attendanceData];
        
        if (classFilter && classFilter !== 'all') {
          filteredAttendance = filteredAttendance.filter(item => item.class === classFilter);
        }
        
        return NextResponse.json({
          success: true,
          data: {
            summary: {
              totalStudents: filteredAttendance.reduce((sum, item) => sum + item.totalStudents, 0),
              totalPresent: filteredAttendance.reduce((sum, item) => sum + item.present, 0),
              totalAbsent: filteredAttendance.reduce((sum, item) => sum + item.absent, 0),
              averageAttendance: Math.round(
                filteredAttendance.reduce((sum, item) => sum + item.percentage, 0) / filteredAttendance.length
              )
            },
            classData: filteredAttendance
          }
        });
        
      case 'academic':
        let filteredResults = [...examResultsData];
        
        return NextResponse.json({
          success: true,
          data: {
            summary: {
              totalSubjects: filteredResults.length,
              overallAverage: Math.round(
                filteredResults.reduce((sum, item) => sum + item.averageMarks, 0) / filteredResults.length
              ),
              overallPassRate: Math.round(
                filteredResults.reduce((sum, item) => sum + item.passRate, 0) / filteredResults.length
              )
            },
            subjectData: filteredResults
          }
        });
        
      case 'fees':
        // Sample fee collection data
        const feeData = {
          summary: {
            totalCollected: 180000,
            totalDue: 45000,
            collectionRate: 80
          },
          monthlyCollection: [
            { month: 'জানুয়ারি', collected: 175000, due: 50000 },
            { month: 'ফেব্রুয়ারি', collected: 180000, due: 45000 },
            { month: 'মার্চ', collected: 185000, due: 40000 }
          ]
        };
        
        return NextResponse.json({
          success: true,
          data: feeData
        });
        
      default:
        // Return all report types
        return NextResponse.json({
          success: true,
          data: {
            dashboard: dashboardStats,
            financial: {
              summary: {
                totalIncome: financialData.reduce((sum, item) => sum + item.income, 0),
                totalExpense: financialData.reduce((sum, item) => sum + item.expense, 0),
                totalProfit: financialData.reduce((sum, item) => sum + item.profit, 0)
              },
              monthlyData: financialData
            },
            attendance: {
              summary: {
                totalStudents: attendanceData.reduce((sum, item) => sum + item.totalStudents, 0),
                totalPresent: attendanceData.reduce((sum, item) => sum + item.present, 0),
                averageAttendance: Math.round(
                  attendanceData.reduce((sum, item) => sum + item.percentage, 0) / attendanceData.length
                )
              },
              classData: attendanceData
            },
            academic: {
              summary: {
                overallAverage: Math.round(
                  examResultsData.reduce((sum, item) => sum + item.averageMarks, 0) / examResultsData.length
                ),
                overallPassRate: Math.round(
                  examResultsData.reduce((sum, item) => sum + item.passRate, 0) / examResultsData.length
                )
              },
              subjectData: examResultsData
            }
          }
        });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch report data' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, filters } = body;
    
    // Generate custom report based on filters
    // This would typically involve complex database queries
    
    return NextResponse.json({
      success: true,
      message: 'Custom report generated successfully',
      data: {
        reportId: Date.now(),
        generatedAt: new Date().toISOString(),
        filters: filters
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}