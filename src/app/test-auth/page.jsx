'use client';
import { useState, useEffect } from 'react';

export default function TestAuthPage() {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage
    try {
      const token = localStorage.getItem('auth_token');
      const user = localStorage.getItem('user_data');
      
      setAuthData({
        token: token ? JSON.parse(token) : null,
        user: user ? JSON.parse(user) : null,
        hasToken: !!token,
        hasUser: !!user
      });
    } catch (error) {
      console.error('Error reading auth data:', error);
      setAuthData({ error: error.message });
    } finally {
      setLoading(false);
    }
  }, []);

  const testLogin = () => {
    const mockUser = {
      id: 1,
      name: 'প্রশাসক',
      email: 'test@example.com',
      role: 'admin'
    };
    
    const mockToken = 'test-token-' + Date.now();
    
    localStorage.setItem('auth_token', JSON.stringify(mockToken));
    localStorage.setItem('user_data', JSON.stringify(mockUser));
    
    alert('Test login data stored!');
    window.location.reload();
  };

  const clearAuth = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    alert('Auth data cleared!');
    window.location.reload();
  };

  const goToAdmin = () => {
    window.location.href = '/admin';
  };

  const goToLogin = () => {
    window.location.href = '/login';
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Authentication Test Page</h1>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Current Auth Status:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(authData, null, 2)}
            </pre>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={testLogin}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Test Login
            </button>
            
            <button
              onClick={clearAuth}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Clear Auth
            </button>
            
            <button
              onClick={goToAdmin}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Admin
            </button>
            
            <button
              onClick={goToLogin}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Go to Login
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded">
            <h3 className="font-semibold mb-2">Test Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Click "Test Login" to store mock auth data</li>
              <li>Click "Go to Admin" to test admin access</li>
              <li>Click "Clear Auth" to test logout</li>
              <li>Click "Go to Login" to test login page</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}