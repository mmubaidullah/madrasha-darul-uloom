'use client';

import { useState, useEffect } from 'react';
import { FiBarChart, FiPieChart, FiTrendingUp, FiDownload, FiCalendar, FiUsers, FiDollarSign, FiBook } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('thisMonth');
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(true);

  // Sample data
  useEffect(() => {
    setTimeout(() => {
      setReportData({
        overview: {
          totalStudents: 450,
          totalTeachers: 35,
          totalRevenue: 850000,
          attendanceRate: 92,
          monthlyGrowth: 8.5
        },
        attendance: {
          present: 415,
          absent: 25,
          late: 10,
          weeklyData: [
            { day: 'রবি', present: 420, absent: 30 },
            { day: 'সোম', present: 435, absent: 15 },
            { day: 'মঙ্গল', present: 440, absent: 10 },
            { day: 'বুধ', present: 425, absent: 25 },
            { day: 'বৃহ', present: 430, absent: 20 },
            { day: 'শুক্র', present: 415, absent: 35 }
          ]
        },
        financial: {
          totalCollection: 850000,
          pending: 125000,
          expenses: 320000,
          profit: 530000,
          monthlyData: [
            { month: 'জানুয়ারি', income: 800000, expense: 300000 },
            { month: 'ফেব্রুয়ারি', income: 850000, expense: 320000 },
            { month: 'মার্চ', income: 920000, expense: 340000 }
          ]
        },
        academic: {
          totalClasses: 25,
          totalSubjects: 15,
          examsConducted: 8,
          averageGrade: 'জায়্যিদ',
          gradeDistribution: [
            { grade: 'মুমতাজ', count: 120 },
            { grade: 'জায়্যিদ জিদ্দান', count: 180 },
            { grade: 'জায়্যিদ', count: 100 },
            { grade: 'মাকবুল', count: 50 }
          ]
        }
      });
      setLoading(false);
    }, 1000);
  }, [dateRange]);

  const tabs = [
    { id: 'overview', name: 'সারসংক্ষেপ', icon: FiBarChart },
    { id: 'attendance', name: 'হাজিরা রিপোর্ট', icon: FiUsers },
    { id: 'financial', name: 'আর্থিক রিপোর্ট', icon: FiDollarSign },
    { id: 'academic', name: 'একাডেমিক রিপোর্ট', icon: FiBook }
  ];

  const handleExportReport = (type) => {
    toast.success(`${type} রিপোর্ট ডাউনলোড শুরু হয়েছে`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">রিপোর্ট ও অ্যানালাইটিক্স</h1>
          <p className="mt-1 text-sm text-gray-600">
            প্রতিষ্ঠানের বিস্তারিত পরিসংখ্যান ও বিশ্লেষণ
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="today">আজ</option>
            <option value="thisWeek">এই সপ্তাহ</option>
            <option value="thisMonth">এই মাস</option>
            <option value="lastMonth">গত মাস</option>
            <option value="thisYear">এই বছর</option>
          </select>
          <button
            onClick={() => handleExportReport('সম্পূর্ণ')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            <FiDownload className="mr-2 h-4 w-4" />
            রিপোর্ট ডাউনলোড
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiUsers className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">মোট ছাত্র</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {loading ? '...' : reportData.overview?.totalStudents}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiBook className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">মোট শিক্ষক</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {loading ? '...' : reportData.overview?.totalTeachers}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiDollarSign className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">মোট আয়</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {loading ? '...' : `৳${reportData.overview?.totalRevenue?.toLocaleString()}`}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiTrendingUp className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">হাজিরার হার</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {loading ? '...' : `${reportData.overview?.attendanceRate}%`}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && <OverviewTab data={reportData.overview} loading={loading} />}
          {activeTab === 'attendance' && <AttendanceTab data={reportData.attendance} loading={loading} />}
          {activeTab === 'financial' && <FinancialTab data={reportData.financial} loading={loading} />}
          {activeTab === 'academic' && <AcademicTab data={reportData.academic} loading={loading} />}
        </div>
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ data, loading }) {
  if (loading) {
    return <div className="text-center py-8">লোড হচ্ছে...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">মোট ছাত্র</p>
              <p className="text-2xl font-bold">{data?.totalStudents}</p>
            </div>
            <FiUsers className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">মোট শিক্ষক</p>
              <p className="text-2xl font-bold">{data?.totalTeachers}</p>
            </div>
            <FiBook className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">মাসিক বৃদ্ধি</p>
              <p className="text-2xl font-bold">{data?.monthlyGrowth}%</p>
            </div>
            <FiTrendingUp className="h-8 w-8 text-yellow-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">মূল পরিসংখ্যান</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">মোট আয়:</span>
              <span className="font-semibold text-green-600">৳{data?.totalRevenue?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">হাজিরার হার:</span>
              <span className="font-semibold text-blue-600">{data?.attendanceRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">মাসিক বৃদ্ধি:</span>
              <span className="font-semibold text-purple-600">+{data?.monthlyGrowth}%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">দ্রুত কার্যক্রম</h3>
          <div className="space-y-3">
            <button className="w-full text-left bg-white p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <FiDownload className="h-5 w-5 text-blue-600 mr-3" />
                <span>মাসিক রিপোর্ট ডাউনলোড</span>
              </div>
            </button>
            <button className="w-full text-left bg-white p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <FiBarChart className="h-5 w-5 text-green-600 mr-3" />
                <span>বিস্তারিত বিশ্লেষণ</span>
              </div>
            </button>
            <button className="w-full text-left bg-white p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <FiCalendar className="h-5 w-5 text-purple-600 mr-3" />
                <span>কাস্টম রিপোর্ট তৈরি</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Attendance Tab Component
function AttendanceTab({ data, loading }) {
  if (loading) {
    return <div className="text-center py-8">লোড হচ্ছে...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">উপস্থিত</p>
              <p className="text-2xl font-bold text-green-900">{data?.present}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">✗</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-red-600">অনুপস্থিত</p>
              <p className="text-2xl font-bold text-red-900">{data?.absent}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">⏰</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-yellow-600">দেরি</p>
              <p className="text-2xl font-bold text-yellow-900">{data?.late}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">সাপ্তাহিক হাজিরার ট্রেন্ড</h3>
        <div className="space-y-4">
          {data?.weeklyData?.map((day, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 w-16">{day.day}</span>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 rounded-full h-4 relative">
                  <div 
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${(day.present / (day.present + day.absent)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <span className="text-green-600 font-medium">{day.present}</span>
                <span className="mx-1">/</span>
                <span className="text-red-600">{day.absent}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Financial Tab Component
function FinancialTab({ data, loading }) {
  if (loading) {
    return <div className="text-center py-8">লোড হচ্ছে...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center">
            <FiTrendingUp className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">মোট আয়</p>
              <p className="text-xl font-bold text-green-900">৳{data?.totalCollection?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6">
          <div className="flex items-center">
            <FiCalendar className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-yellow-600">বকেয়া</p>
              <p className="text-xl font-bold text-yellow-900">৳{data?.pending?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-6">
          <div className="flex items-center">
            <FiDollarSign className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-red-600">মোট ব্যয়</p>
              <p className="text-xl font-bold text-red-900">৳{data?.expenses?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center">
            <FiPieChart className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">নিট লাভ</p>
              <p className="text-xl font-bold text-blue-900">৳{data?.profit?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">মাসিক আয়-ব্যয় তুলনা</h3>
        <div className="space-y-4">
          {data?.monthlyData?.map((month, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">{month.month}</span>
                <span className="text-sm text-gray-500">
                  লাভ: ৳{(month.income - month.expense).toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">আয়</span>
                    <span className="font-medium">৳{month.income.toLocaleString()}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(month.income / 1000000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">ব্যয়</span>
                    <span className="font-medium">৳{month.expense.toLocaleString()}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(month.expense / 1000000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Academic Tab Component
function AcademicTab({ data, loading }) {
  if (loading) {
    return <div className="text-center py-8">লোড হচ্ছে...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center">
            <FiBook className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">মোট ক্লাস</p>
              <p className="text-xl font-bold text-blue-900">{data?.totalClasses}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center">
            <FiBook className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">মোট বিষয়</p>
              <p className="text-xl font-bold text-green-900">{data?.totalSubjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center">
            <FiBarChart className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">পরীক্ষা সম্পন্ন</p>
              <p className="text-xl font-bold text-purple-900">{data?.examsConducted}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6">
          <div className="flex items-center">
            <FiTrendingUp className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-yellow-600">গড় গ্রেড</p>
              <p className="text-xl font-bold text-yellow-900">{data?.averageGrade}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">গ্রেড বিতরণ</h3>
        <div className="space-y-4">
          {data?.gradeDistribution?.map((grade, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 w-32">{grade.grade}</span>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 rounded-full h-4 relative">
                  <div 
                    className={`h-4 rounded-full ${
                      index === 0 ? 'bg-green-500' :
                      index === 1 ? 'bg-blue-500' :
                      index === 2 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(grade.count / 450) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm text-gray-600 w-16 text-right">
                <span className="font-medium">{grade.count}</span>
                <span className="text-gray-400 ml-1">({Math.round((grade.count / 450) * 100)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}