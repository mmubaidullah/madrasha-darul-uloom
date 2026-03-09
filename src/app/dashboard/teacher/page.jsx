'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FiUsers, FiClipboard, FiBookOpen, FiBarChart3, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';

export default function TeacherDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
      return;
    }

    if (!['super_admin', 'admin', 'teacher'].includes(session.user.role)) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">শিক্ষক ড্যাশবোর্ড</h1>
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
                  <p>আপনি সফলভাবে শিক্ষক ড্যাশবোর্ডে লগইন করেছেন।</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Teacher Actions */}
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-lg font-medium text-gray-900 mb-4">শিক্ষক কার্যক্রম</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/admin/attendance/mark" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <FiClipboard className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">হাজিরা নিন</h3>
                  <p className="text-sm text-gray-500">ছাত্রদের দৈনিক হাজিরা নিন</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/students" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <FiUsers className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">ছাত্র তালিকা</h3>
                  <p className="text-sm text-gray-500">ছাত্রদের তথ্য দেখুন</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/exams" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <FiBookOpen className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">পরীক্ষা</h3>
                  <p className="text-sm text-gray-500">পরীক্ষা ও ফলাফল ব্যবস্থাপনা</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/reports" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <FiBarChart3 className="h-8 w-8 text-indigo-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">রিপোর্ট</h3>
                  <p className="text-sm text-gray-500">ক্লাস রিপোর্ট ও পারফরমেন্স</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}