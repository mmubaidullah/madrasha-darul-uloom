import Link from 'next/link';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-green-600">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            পেজ পাওয়া যায়নি
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            <FiHome className="mr-2 h-5 w-5" />
            হোম পেজে যান
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <FiArrowLeft className="mr-2 h-5 w-5" />
            পূর্ববর্তী পেজে ফিরুন
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            যদি আপনি মনে করেন এটি একটি ত্রুটি, তাহলে অনুগ্রহ করে{' '}
            <Link href="/contact" className="text-green-600 hover:text-green-500">
              আমাদের সাথে যোগাযোগ করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}