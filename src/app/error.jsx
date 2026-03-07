'use client';
import { useEffect } from 'react';
import { FiRefreshCw, FiHome } from 'react-icons/fi';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 text-red-500">
            <svg
              className="h-24 w-24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            কিছু ভুল হয়েছে!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            দুঃখিত, একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।
          </p>
          
          {error?.message && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800 font-mono">
                {error.message}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            <FiRefreshCw className="mr-2 h-5 w-5" />
            আবার চেষ্টা করুন
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <FiHome className="mr-2 h-5 w-5" />
            হোম পেজে যান
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            যদি সমস্যাটি অব্যাহত থাকে, তাহলে অনুগ্রহ করে{' '}
            <Link href="/contact" className="text-red-600 hover:text-red-500">
              আমাদের সাথে যোগাযোগ করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}