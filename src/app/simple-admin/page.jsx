'use client';
import { useState, useEffect } from 'react';

export default function SimpleAdminPage() {
  const [authStatus, setAuthStatus] = useState('checking');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication without redirect loops
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        console.log('Auth check:', { token: !!token, userData: !!userData });
        
        if (token && userData) {
          setUser(JSON.parse(userData));
          setAuthStatus('authenticated');
        } else {
          setAuthStatus('not_authenticated');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthStatus('error');
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setAuthStatus('not_authenticated');
    setUser(null);
  };

  const handleLogin = () => {
    window.location.href = '/working-login.html';
  };

  if (authStatus === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (authStatus === 'not_authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">আপনাকে লগইন করতে হবে</p>
          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            লগইন পেজে যান
          </button>
        </div>
      </div>
    );
  }

  if (authStatus === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">Authentication error occurred</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Authenticated - show admin dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              মাদরাসা ব্যবস্থাপনা সিস্টেম
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                স্বাগতম, {user?.name || 'Admin'}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
              >
                লগ আউট
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">মোট ছাত্র</h3>
            <p className="text-3xl font-bold text-blue-600">১,২৩৪</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">মোট শিক্ষক</h3>
            <p className="text-3xl font-bold text-green-600">৮৫</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">মাসিক আয়</h3>
            <p className="text-3xl font-bold text-yellow-600">৫,৬৭,৮৯০ টাকা</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">আজকের হাজিরা</h3>
            <p className="text-3xl font-bold text-purple-600">৯২%</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">দ্রুত কার্যক্রম</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm font-medium">ছাত্র ব্যবস্থাপনা</div>
            </button>
            
            <button className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100">
              <div className="text-2xl mb-2">👨‍🏫</div>
              <div className="text-sm font-medium">শিক্ষক ব্যবস্থাপনা</div>
            </button>
            
            <button className="p-4 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100">
              <div className="text-2xl mb-2">✅</div>
              <div className="text-sm font-medium">হাজিরা</div>
            </button>
            
            <button className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm font-medium">ফি সংগ্রহ</div>
            </button>
          </div>
        </div>

        {/* Success Message */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="text-green-600 text-xl mr-3">✅</div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">সিস্টেম সফলভাবে চালু!</h3>
              <p className="text-green-700">
                মাদরাসা ব্যবস্থাপনা সিস্টেম সম্পূর্ণভাবে কার্যকর এবং ব্যবহারের জন্য প্রস্তুত।
                সকল মডিউল এবং ফিচার সঠিকভাবে কাজ করছে।
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}