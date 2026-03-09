'use client';
import { useSession, signOut } from 'next-auth/react';
import { FiAlertTriangle, FiHome, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import { getRoleBasedRedirectUrl } from '@/lib/auth';

export default function AccessDenied() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const getDashboardUrl = () => {
    if (session?.user?.role) {
      return getRoleBasedRedirectUrl(session.user.role);
    }
    return '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {/* Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
              <FiAlertTriangle className="h-8 w-8 text-red-600" />
            </div>

            {/* Title */}
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              অ্যাক্সেস অস্বীকৃত
            </h2>

            {/* Message */}
            <p className="mt-4 text-sm text-gray-600">
              দুঃখিত, আপনার এই পেজে প্রবেশের অনুমতি নেই।
            </p>

            {session?.user && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-700">
                  <strong>বর্তমান ব্যবহারকারী:</strong> {session.user.name}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>ভূমিকা:</strong> <span className="capitalize">{session.user.role}</span>
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 space-y-3">
              {session?.user ? (
                <>
                  <Link
                    href={getDashboardUrl()}
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FiHome className="mr-2 h-4 w-4" />
                    আমার ড্যাশবোর্ডে যান
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FiLogOut className="mr-2 h-4 w-4" />
                    লগআউট করুন
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  লগইন করুন
                </Link>
              )}
            </div>

            {/* Help Text */}
            <div className="mt-6 text-xs text-gray-500">
              <p>
                যদি আপনি মনে করেন এটি একটি ভুল, তাহলে অনুগ্রহ করে সিস্টেম অ্যাডমিনিস্ট্রেটরের সাথে যোগাযোগ করুন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}