'use client';

import { useState } from 'react';

export default function SimpleTestPage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setCount(count + 1);
    setMessage(`Button clicked ${count + 1} times!`);
  };

  const handleReset = () => {
    setCount(0);
    setMessage('Reset successful!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Simple Test Page
        </h1>
        
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-blue-600">
            {count}
          </div>
          
          <div className="text-gray-600">
            {message || 'Click the button to test!'}
          </div>
          
          <div className="space-y-2">
            <button
              onClick={handleClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Click Me ({count})
            </button>
            
            <button
              onClick={handleReset}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Reset
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Status:</h3>
            <p className="text-sm text-green-700">
              {count > 0 ? '✅ JavaScript working properly!' : '⏳ Waiting for interaction...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}