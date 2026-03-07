'use client';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">
              সিস্টেম ত্রুটি
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              একটি গুরুতর ত্রুটি ঘটেছে। অনুগ্রহ করে পেজটি রিফ্রেশ করুন।
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}