'use client';
import { useState } from 'react';

export default function TestMongoDBPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-mongodb');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: error.message,
        details: { clientError: 'Network বা API এরর' }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">MongoDB কানেকশন টেস্ট</h1>
          
          <div className="mb-6">
            <button
              onClick={testConnection}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'টেস্ট করা হচ্ছে...' : 'MongoDB কানেকশন টেস্ট করুন'}
            </button>
          </div>

          {result && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <h3 className={`font-semibold ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                  {result.success ? '✅ সফল!' : '❌ ব্যর্থ!'}
                </h3>
                <p className={`mt-2 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                  {result.message || result.error}
                </p>
              </div>

              {result.details && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">বিস্তারিত:</h4>
                  <pre className="text-sm text-gray-600 overflow-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </div>
              )}

              {!result.success && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">সমাধানের উপায়:</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• MongoDB Atlas এ যান এবং Database Access চেক করুন</li>
                    <li>• Username এবং Password সঠিক আছে কিনা দেখুন</li>
                    <li>• Network Access এ আপনার IP address যোগ করুন (0.0.0.0/0 সব IP এর জন্য)</li>
                    <li>• Database name সঠিক আছে কিনা চেক করুন</li>
                    <li>• .env.local ফাইলে MONGODB_URI সঠিক আছে কিনা দেখুন</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">বর্তমান MongoDB URI:</h4>
            <code className="text-sm text-blue-700 break-all">
              {process.env.NEXT_PUBLIC_MONGODB_URI_DISPLAY || 'mongodb+srv://madrasha_admin:***@cluster0.n1ywsso.mongodb.net/?appName=Cluster0'}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}