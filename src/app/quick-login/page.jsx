'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function QuickLoginPage() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (email && password) {
        // Create mock user data
        const mockUser = {
          id: 1,
          name: 'প্রশাসক',
          email: email,
          role: 'admin'
        };
        
        const mockToken = 'demo-jwt-token-' + Date.now();
        
        // Store in localStorage
        localStorage.setItem('auth_token', JSON.stringify(mockToken));
        localStorage.setItem('user_data', JSON.stringify(mockUser));
        
        alert('লগইন সফল! Admin panel এ যাচ্ছি...');
        
        // Redirect to admin
        window.location.href = '/admin';
      } else {
        alert('ইমেইল এবং পাসওয়ার্ড দিন');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('লগইন করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-green-100">
            <Image
              src="/images/Madrasha-Logo.jpeg"
              alt="মাদরাসা লোগো"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Quick Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            মাদরাসা ব্যবস্থাপনা সিস্টেম
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ইমেইল ঠিকানা
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="আপনার পাসওয়ার্ড"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  লগইন হচ্ছে...
                </div>
              ) : (
                'লগইন করুন'
              )}
            </button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              ডেমো লগইন: যেকোনো ইমেইল এবং পাসওয়ার্ড ব্যবহার করুন
            </p>
            
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="text-xs text-red-600 hover:text-red-700 px-2 py-1 border border-red-200 rounded"
              >
                Clear Storage
              </button>
              
              <button
                type="button"
                onClick={() => window.location.href = '/admin'}
                className="text-xs text-blue-600 hover:text-blue-700 px-2 py-1 border border-blue-200 rounded"
              >
                Direct Admin
              </button>
              
              <button
                type="button"
                onClick={() => window.location.href = '/test-auth'}
                className="text-xs text-purple-600 hover:text-purple-700 px-2 py-1 border border-purple-200 rounded"
              >
                Test Auth
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}