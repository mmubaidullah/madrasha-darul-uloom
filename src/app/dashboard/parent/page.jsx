'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FiUsers, FiClipboard, FiBookOpen, FiDollarSign, FiLogOut } from 'react-icons/fi';

export default function ParentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
      return;
    }

    if (!['super_admin', 'admin', 'teacher', 'parent'].includes(session.user.role)) {
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
              <h1 className="text-2xl font-bold text-gray-900">অভিভাবক ড্যাশবোর্ড</h1>
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
          <div className="bg-purple-50 border border-purple-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-purple-800">
                  স্বাগতম, {session.user.name}!
                </h3>
                <div className="mt-2 text-sm text-purple-700">
                  <p>আপনি সফলভাবে অভিভাবক ড্যাশবোর্ডে লগইন করেছেন।</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Child Information */}
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-lg font-medium text-gray-900 mb-4">সন্তানের তথ্য</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <FiUsers className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">সন্তানের প্রোফাইল</h3>
                  <p className="text-sm text-gray-500">ব্যক্তিগত তথ্য ও একাডেমিক বিবরণ</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <FiClipboard className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">হাজিরা রিপোর্ট</h3>
                  <p className="text-sm text-gray-500">দৈনিক হাজিরা ও উপস্থিতির হার</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <FiBookOpen className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">পরীক্ষার ফলাফল</h3>
                  <p className="text-sm text-gray-500">সকল পরীক্ষার ফলাফল ও গ্রেড</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <FiDollarSign className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">ফি পেমেন্ট</h3>
                  <p className="text-sm text-gray-500">ফি পেমেন্ট হিস্ট্রি ও বকেয়া</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="text-sm text-blue-800">
              <strong>বিজ্ঞপ্তি:</strong> অভিভাবকদের জন্য বিস্তারিত ফিচারসমূহ শীঘ্রই যোগ করা হবে। 
              আপনি আপনার সন্তানের সকল তথ্য এখানে দেখতে পাবেন।
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}