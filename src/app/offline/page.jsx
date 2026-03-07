import { FiWifiOff, FiRefreshCw } from 'react-icons/fi';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <FiWifiOff className="h-24 w-24" />
          </div>
          
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            ইন্টারনেট সংযোগ নেই
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন এবং আবার চেষ্টা করুন।
          </p>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            <FiRefreshCw className="mr-2 h-5 w-5" />
            আবার চেষ্টা করুন
          </button>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            অফলাইন মোডে কাজ করুন:
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• সংরক্ষিত ডেটা দেখুন</li>
            <li>• অফলাইন ফর্ম পূরণ করুন</li>
            <li>• ইন্টারনেট ফিরে এলে সিঙ্ক হবে</li>
          </ul>
        </div>
      </div>
    </div>
  );
}