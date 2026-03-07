'use client';
import { useEffect } from 'react';

export default function RedirectTestPage() {
  useEffect(() => {
    // Test different redirect methods
    const testRedirects = () => {
      console.log('Testing redirects...');
      
      // Method 1: window.location.href
      setTimeout(() => {
        console.log('Redirecting with window.location.href...');
        window.location.href = '/admin';
      }, 2000);
    };
    
    testRedirects();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold">Redirect Test</h1>
        <p className="text-gray-600 mt-2">Redirecting to admin panel in 2 seconds...</p>
        
        <div className="mt-6 space-y-2">
          <button
            onClick={() => window.location.href = '/admin'}
            className="block mx-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Manual Redirect to Admin
          </button>
          
          <button
            onClick={() => window.location.href = '/quick-login'}
            className="block mx-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Quick Login
          </button>
        </div>
      </div>
    </div>
  );
}