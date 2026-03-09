'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { getRoleBasedRedirectUrl } from '@/lib/auth';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            মাদরাসা ব্যবস্থাপনা সিস্টেম
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            একটি সম্পূর্ণ ডিজিটাল সমাধান যা আপনার মাদরাসার সকল কার্যক্রম পরিচালনা করতে সাহায্য করবে
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/login" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              লগইন করুন
            </Link>
            <Link 
              href="/demo" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              সিস্টেম ডেমো দেখুন
            </Link>
            <Link 
              href="/admin" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              অ্যাডমিন প্যানেল
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-green-600 text-3xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">ছাত্র ব্যবস্থাপনা</h3>
            <p className="text-gray-600">ছাত্রদের ভর্তি, তথ্য সংরক্ষণ এবং প্রোফাইল ব্যবস্থাপনা</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-600 text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">আর্থিক ব্যবস্থাপনা</h3>
            <p className="text-gray-600">ফি সংগ্রহ, খরচ ট্র্যাকিং এবং আর্থিক রিপোর্ট</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-purple-600 text-3xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">একাডেমিক ব্যবস্থাপনা</h3>
            <p className="text-gray-600">পরীক্ষা, ফলাফল এবং হাজিরা ব্যবস্থাপনা</p>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="text-green-600 text-4xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">সিস্টেম সম্পূর্ণ এবং কার্যকর!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">✨ Features:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• ৫০+ UI কম্পোনেন্ট লাইব্রেরি</li>
                  <li>• সম্পূর্ণ মাদরাসা ব্যবস্থাপনা</li>
                  <li>• Bengali ভাষার ইন্টারফেস</li>
                  <li>• Responsive ডিজাইন</li>
                  <li>• PWA সাপোর্ট</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🔧 Technical:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Next.js 16.1.6 (React 19)</li>
                  <li>• Database models (Mongoose)</li>
                  <li>• API endpoints</li>
                  <li>• Authentication system</li>
                  <li>• Report generation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}