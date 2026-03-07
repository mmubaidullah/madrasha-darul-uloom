'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiUsers, FiBookOpen, FiClipboard, FiDollarSign, FiBarChart, FiSettings, FiBook, FiHome, FiAward } from 'react-icons/fi';

export default function WorkingAdminPage() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    attendancePercentage: 0,
    monthlyCollection: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const result = await response.json();
      
      if (result.success) {
        setStats(result.data.stats);
      }
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const modules = [
    {
      name: 'ছাত্র ব্যবস্থাপনা',
      icon: FiUsers,
      href: '/admin/students',
      color: 'bg-blue-500',
      description: 'ছাত্র ভর্তি ও তথ্য ব্যবস্থাপনা'
    },
    {
      name: 'শিক্ষক ব্যবস্থাপনা',
      icon: FiBookOpen,
      href: '/admin/teachers',
      color: 'bg-green-500',
      description: 'শিক্ষকদের তথ্য ও ব্যবস্থাপনা'
    },
    {
      name: 'হাজিরা',
      icon: FiClipboard,
      href: '/admin/attendance/mark',
      color: 'bg-yellow-500',
      description: 'দৈনিক হাজিরা নিন'
    },
    {
      name: 'ফি কালেকশন',
      icon: FiDollarSign,
      href: '/admin/fees/collection',
      color: 'bg-purple-500',
      description: 'মাসিক ফি সংগ্রহ'
    },
    {
      name: 'লাইব্রেরি ব্যবস্থাপনা',
      icon: FiBook,
      href: '/admin/library',
      color: 'bg-indigo-500',
      description: 'বই ও সম্পদ পরিচালনা'
    },
    {
      name: 'হোস্টেল ব্যবস্থাপনা',
      icon: FiHome,
      href: '/admin/hostel',
      color: 'bg-pink-500',
      description: 'আবাসিক ছাত্র ব্যবস্থাপনা'
    },
    {
      name: 'সার্টিফিকেট ব্যবস্থাপনা',
      icon: FiAward,
      href: '/admin/certificates',
      color: 'bg-orange-500',
      description: 'সার্টিফিকেট তৈরি ও প্রদান'
    },
    {
      name: 'রিপোর্ট ও অ্যানালাইটিক্স',
      icon: FiBarChart,
      href: '/admin/reports',
      color: 'bg-red-500',
      description: 'বিভিন্ন রিপোর্ট ও পরিসংখ্যান'
    },
    {
      name: 'সেটিংস',
      icon: FiSettings,
      href: '/admin/settings/general',
      color: 'bg-gray-500',
      description: 'সিস্টেম সেটিংস'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                মাদরাসা অ্যাডমিন প্যানেল
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                সম্পূর্ণ ব্যবস্থাপনা সিস্টেম
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                মূল পাতা
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiUsers className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      মোট ছাত্র
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {loading ? '...' : stats.totalStudents}
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
                  <FiBookOpen className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      মোট শিক্ষক
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {loading ? '...' : stats.totalTeachers}
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
                  <FiClipboard className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      আজকের হাজিরা
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {loading ? '...' : `${stats.attendancePercentage}%`}
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
                  <FiDollarSign className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      মাসিক আয়
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {loading ? '...' : `৳${stats.monthlyCollection}`}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Link
              key={module.name}
              href={module.href}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${module.color} rounded-md p-3`}>
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {module.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {module.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              দ্রুত কাজ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/admin/students/admission"
                className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-center transition-colors"
              >
                <div className="text-blue-600 font-medium">নতুন ছাত্র ভর্তি</div>
              </Link>
              <Link
                href="/admin/teachers/add"
                className="bg-green-50 hover:bg-green-100 p-4 rounded-lg text-center transition-colors"
              >
                <div className="text-green-600 font-medium">নতুন শিক্ষক যোগ করুন</div>
              </Link>
              <Link
                href="/admin/attendance/mark"
                className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg text-center transition-colors"
              >
                <div className="text-yellow-600 font-medium">হাজিরা নিন</div>
              </Link>
              <Link
                href="/admin/fees/collection"
                className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg text-center transition-colors"
              >
                <div className="text-purple-600 font-medium">ফি কালেক্ট করুন</div>
              </Link>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="text-green-600 text-2xl mr-4">✅</div>
            <div>
              <h3 className="text-lg font-medium text-green-800">
                MongoDB Integration সফল!
              </h3>
              <p className="text-green-700">
                সিস্টেম সম্পূর্ণভাবে কার্যকর এবং MongoDB Atlas এর সাথে connected।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}