'use client';
import { useState } from 'react';

export default function TestDBConnection() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/test-connection');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Network error',
        details: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const testStudentSubmission = async () => {
    setLoading(true);
    try {
      const testData = {
        studentName: 'Test Student',
        fatherName: 'Test Father',
        motherName: 'Test Mother',
        guardianName: 'Test Guardian',
        guardianMobile: '01712345678',
        presentAddress: {
          village: 'Test Village',
          postOffice: 'Test Post Office',
          upazila: 'Test Upazila',
          district: 'Test District'
        },
        department: 'কিতাব বিভাগ',
        admissionClass: 'ইবতিদাইয়্যাহ-১',
        academicYear: '2024'
      };

      const response = await fetch('http://localhost:3001/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Network error',
        details: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Database Connection Test</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={testConnection}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test MongoDB Connection'}
            </button>
            
            <button
              onClick={testStudentSubmission}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Student Submission'}
            </button>
          </div>

          {result && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Test Result:</h3>
              <div className={`p-4 rounded ${result.success ? 'bg-green-100 border border-green-400' : 'bg-red-100 border border-red-400'}`}>
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}