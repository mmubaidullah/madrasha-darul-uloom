'use client';
import DashboardStats from '@/components/admin/dashboard/DashboardStats';
import RecentActivities from '@/components/admin/dashboard/RecentActivities';
import AttendanceChart from '@/components/admin/dashboard/AttendanceChart';
import FinancialChart from '@/components/admin/dashboard/FinancialChart';

export default function AdminDemoDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">ড্যাশবোর্ড (ডেমো)</h1>
        <p className="mt-1 text-sm text-gray-600">
          আপনার মাদরাসার সকল কার্যক্রমের সারসংক্ষেপ - Authentication ছাড়াই
        </p>
      </div>

      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex">
          <div className="text-green-600 text-xl mr-3">✅</div>
          <div>
            <h3 className="text-lg font-semibold text-green-800">সিস্টেম সফলভাবে চালু!</h3>
            <p className="text-green-700">
              Authentication বাদ দিয়ে সম্পূর্ণ সিস্টেম দেখতে পাচ্ছেন। সব মডিউল কার্যকর।
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart />
        <FinancialChart />
      </div>

      {/* Recent Activities */}
      <RecentActivities />

      {/* Module Links */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">সব মডিউল দেখুন</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/admin-demo/students" className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 block">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-sm font-medium">ছাত্র ব্যবস্থাপনা</div>
          </a>
          
          <a href="/admin-demo/teachers" className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 block">
            <div className="text-2xl mb-2">👨‍🏫</div>
            <div className="text-sm font-medium">শিক্ষক ব্যবস্থাপনা</div>
          </a>
          
          <a href="/admin-demo/attendance" className="p-4 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100 block">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-sm font-medium">হাজিরা</div>
          </a>
          
          <a href="/admin-demo/fees" className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 block">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-sm font-medium">ফি সংগ্রহ</div>
          </a>
        </div>
      </div>
    </div>
  );
}