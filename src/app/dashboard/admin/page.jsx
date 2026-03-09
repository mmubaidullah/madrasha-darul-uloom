'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FiUsers, FiBookOpen, FiDollarSign, FiBarChart3, FiSettings, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      router.push('/login');
      return;
    }

    // Check if user has admin access
    if (!['super_admin', 'admin'].includes(session.user.role)) {
      router.push('/access-denied');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const quickStats = [
    { title: 'মোট ছাত্র', value: '১২৫', icon: FiUsers, color: 'bg-blue-500' },
    { title: 'মোট শিক্ষক', value: '১৫', icon: FiBookOpen, color: 'bg-green-500' },
    { title: 'মাসিক আয়', value: '৫০,০০০ টাকা', icon: FiDollarSign, color: 'bg-yellow-500' },
    { title: 'উপস্থিতি', value: '৯২%', icon: FiBarChart3, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">অ্যাডমিন ড্যাশবোর্ড</h1>
              <p className="text-sm text-gray-600">মাদরাসা দারুল উলুম আল ইসলামিয়া</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{session.user.role}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FiLogOut className="mr-2 h-4 w-4" />
                লগআউট
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Message */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  স্বাগতম, {session.user.name}!
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>আপনি সফলভাবে অ্যাডমিন ড্যাশবোর্ডে লগইন করেছেন। আপনার ভূমিকা: <strong className="capitalize">{session.user.role}</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`${stat.color} rounded-md p-3`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.title}
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-lg font-medium text-gray-900 mb-4">দ্রুত অ্যাকশন</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/admin/students" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <FiUsers className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">ছাত্র ব্যবস্থাপনা</h3>
                  <p className="text-sm text-gray-500">ছাত্রদের তথ্য দেখুন ও পরিচালনা করুন</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/teachers" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <FiBookOpen className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">শিক্ষক ব্যবস্থাপনা</h3>
                  <p className="text-sm text-gray-500">শিক্ষকদের তথ্য দেখুন ও পরিচালনা করুন</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/attendance" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <FiBarChart3 className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">হাজিরা</h3>
                  <p className="text-sm text-gray-500">দৈনিক হাজিরা নিন ও রিপোর্ট দেখুন</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/fees" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <FiDollarSign className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">ফি ব্যবস্থাপনা</h3>
                  <p className="text-sm text-gray-500">ফি সংগ্রহ ও বকেয়া দেখুন</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/reports" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <FiBarChart3 className="h-8 w-8 text-indigo-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">রিপোর্ট</h3>
                  <p className="text-sm text-gray-500">বিস্তারিত রিপোর্ট ও অ্যানালাইটিক্স</p>
                </div>
              </div>
            </Link>

            {session.user.role === 'super_admin' && (
              <Link href="/admin/settings" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <FiSettings className="h-8 w-8 text-gray-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">সেটিংস</h3>
                    <p className="text-sm text-gray-500">সিস্টেম সেটিংস ও ব্যবহারকারী ব্যবস্থাপনা</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}