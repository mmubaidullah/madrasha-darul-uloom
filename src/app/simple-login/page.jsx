'use client';
import { useState } from 'react';

export default function SimpleLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('=== SIMPLE LOGIN CLICKED ===');
    
    if (email && password) {
      console.log('Storing auth data...');
      
      // Store auth data
      localStorage.setItem('auth_token', JSON.stringify('simple-token-' + Date.now()));
      localStorage.setItem('user_data', JSON.stringify({
        id: 1,
        name: 'প্রশাসক',
        email: email,
        role: 'admin'
      }));
      
      console.log('Auth data stored, redirecting...');
      alert('লগইন সফল! Admin panel এ যাচ্ছি...');
      
      // Direct redirect
      window.location.href = '/admin';
    } else {
      alert('ইমেইল এবং পাসওয়ার্ড দিন');
    }
  };

  const clearStorage = () => {
    localStorage.clear();
    alert('localStorage cleared!');
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Simple Login Test</h1>
        
        <div className="space-y-4">
          <input
            type="email"
            placeholder="ইমেইল"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
          />
          
          <input
            type="password"
            placeholder="পাসওয়ার্ড"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded"
          />
          
          <button
            onClick={handleLogin}
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            লগইন করুন
          </button>
          
          <button
            onClick={clearStorage}
            className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700"
          >
            localStorage Clear
          </button>
          
          <button
            onClick={() => window.location.href = '/admin'}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Direct Admin Test
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-600 hover:underline">
            Original Login Page
          </a>
        </div>
      </div>
    </div>
  );
}