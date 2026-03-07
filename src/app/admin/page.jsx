'use client';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardStats from '@/components/admin/dashboard/DashboardStats';
import AttendanceChart from '@/components/admin/dashboard/AttendanceChart';
import FeeChart from '@/components/admin/dashboard/FeeChart';
import NotificationPanel from '@/components/admin/dashboard/NotificationPanel';
import SystemStatus from '@/components/admin/dashboard/SystemStatus';
import { FiTrendingUp, FiUsers, FiBookOpen, FiDollarSign, FiCalendar, FiActivity } from 'react-icons/fi';

export default function AdminDashboard() {
  const [recentActivities, setRecentActivities] = useState([]);
  const [quickStats, setQuickStats] = useState({
    todayAdmissions: 0,
    todayAttendance: 0,
    todayFeeCollection: 0,
    activeStudents: 0,
    activeTeachers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const result = await response.json();
      
      if (result.success) {
        const { stats, recentActivities: activities } = result.data;
        
        // আইকন ম্যাপিং
        const iconMap = {
          'FiUsers': FiUsers,
          'FiBookOpen': FiBookOpen,
          'FiDollarSign': FiDollarSign,
          'FiActivity': FiActivity
        };
        
        // আইকন যোগ করুন
        const activitiesWithIcons = activities.map(activity => ({
          ...activity,
          icon: iconMap[activity.icon] || FiActivity
        }));
        
        setRecentActivities(activitiesWithIcons);
        
        setQuickStats({
          todayAdmissions: stats.todayAdmissions,
          todayAttendance: stats.attendancePercentage,
          todayFeeCollection: stats.todayFeeCollection,
          activeStudents: stats.totalStudents,
          activeTeachers: stats.totalTeachers
        });
      } else {
        console.error('ড্যাশবোর্ড ডাটা লোড করতে সমস্যা:', result.error);
        // ফলব্যাক ডাটা
        setQuickStats({
          todayAdmissions: 0,
          todayAttendance: 85,
          todayFeeCollection: 0,
          activeStudents: 0,
          activeTeachers: 0
        });
      }
    } catch (error) {
      console.error('ড্যাশবোর্ড ডাটা লোড করতে সমস্যা:', error);
      // ফলব্যাক ডাটা
      setQuickStats({
        todayAdmissions: 0,
        todayAttendance: 85,
        todayFeeCollection: 0,
        activeStudents: 0,
        activeTeachers: 0
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">স্বাগতম, অ্যাডমিন!</h1>
            <p className="mt-2 text-green-100">
              আজ {new Date().toLocaleDateString('bn-BD', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="ছাত্র বা শিক্ষক খুঁজুন..."
                className="pl-10 pr-4 py-2 border border-white/20 bg-white/10 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-white/50 focus:border-white/50 w-full sm:w-64 text-white placeholder-white/70"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    window.location.href = `/admin/students?search=${encodeURIComponent(e.target.value)}`;
                  }
                }}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button
              onClick={loadDashboardData}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 disabled:opacity-50 transition-all duration-200"
            >
              <FiActivity className="mr-2 h-4 w-4" />
              {loading ? 'আপডেট হচ্ছে...' : 'রিফ্রেশ'}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">আজকের ভর্তি</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{quickStats.todayAdmissions}</p>
              <p className="text-green-600 text-sm mt-1">
                <FiTrendingUp className="inline h-4 w-4 mr-1" />
                নতুন ছাত্র
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FiUsers className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">আজকের হাজিরা</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{quickStats.todayAttendance}%</p>
              <p className="text-green-600 text-sm mt-1">
                <FiTrendingUp className="inline h-4 w-4 mr-1" />
                উপস্থিতি
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FiCalendar className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">আজকের ফি</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">৳{quickStats.todayFeeCollection}</p>
              <p className="text-green-600 text-sm mt-1">
                <FiTrendingUp className="inline h-4 w-4 mr-1" />
                কালেকশন
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FiDollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">মোট ছাত্র</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{quickStats.activeStudents}</p>
              <p className="text-blue-600 text-sm mt-1">
                <FiUsers className="inline h-4 w-4 mr-1" />
                সক্রিয় ছাত্র
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FiBookOpen className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/students/admission" className="group">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 group-hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">নতুন ভর্তি</h3>
                <p className="text-gray-600 text-sm mt-1">ছাত্র ভর্তি করুন</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition-colors">
                <FiUsers className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/admin/attendance/mark" className="group">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group-hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">হাজিরা দিন</h3>
                <p className="text-gray-600 text-sm mt-1">উপস্থিতি নিন</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
                <FiCalendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/admin/fees/collection" className="group">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-yellow-200 transition-all duration-300 group-hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-yellow-600">ফি কালেকশন</h3>
                <p className="text-gray-600 text-sm mt-1">ফি সংগ্রহ করুন</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full group-hover:bg-yellow-200 transition-colors">
                <FiDollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </Link>

        <Link href="/admin/reports" className="group">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300 group-hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">রিপোর্ট</h3>
                <p className="text-gray-600 text-sm mt-1">বিস্তারিত রিপোর্ট</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full group-hover:bg-purple-200 transition-colors">
                <FiTrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">সাম্প্রতিক কার্যক্রম</h2>
              <FiActivity className="h-5 w-5 text-gray-400" />
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-4 text-gray-500">লোড হচ্ছে...</p>
              </div>
            ) : recentActivities.length === 0 ? (
              <div className="text-center py-12">
                <FiActivity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">কোনো সাম্প্রতিক কার্যক্রম নেই</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`p-2 rounded-full ${activity.color}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Quick Navigation */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">দ্রুত নেভিগেশন</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/students/admission" className="p-3 bg-blue-50 rounded-lg text-center hover:bg-blue-100 block transition-colors">
                <div className="text-xl mb-1">👥</div>
                <div className="text-xs font-medium text-blue-700">ছাত্র ভর্তি</div>
              </Link>
              
              <Link href="/admin/attendance/mark" className="p-3 bg-green-50 rounded-lg text-center hover:bg-green-100 block transition-colors">
                <div className="text-xl mb-1">✅</div>
                <div className="text-xs font-medium text-green-700">হাজিরা</div>
              </Link>
              
              <Link href="/admin/fees/collection" className="p-3 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100 block transition-colors">
                <div className="text-xl mb-1">💰</div>
                <div className="text-xs font-medium text-yellow-700">ফি সংগ্রহ</div>
              </Link>
              
              <Link href="/admin/reports" className="p-3 bg-purple-50 rounded-lg text-center hover:bg-purple-100 block transition-colors">
                <div className="text-xl mb-1">📈</div>
                <div className="text-xs font-medium text-purple-700">রিপোর্ট</div>
              </Link>
            </div>
          </div>

          {/* Today's Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">আজকের সারসংক্ষেপ</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">নতুন ভর্তি</span>
                <span className="text-sm font-medium text-blue-600">{quickStats.todayAdmissions} জন</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">হাজিরার হার</span>
                <span className="text-sm font-medium text-green-600">{quickStats.todayAttendance}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ফি সংগ্রহ</span>
                <span className="text-sm font-medium text-yellow-600">৳{quickStats.todayFeeCollection.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">মোট ছাত্র</span>
                <span className="text-sm font-medium text-purple-600">{quickStats.activeStudents} জন</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <AttendanceChart />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <FeeChart />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <NotificationPanel />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <SystemStatus />
        </div>
      </div>
    </div>
  );
}
