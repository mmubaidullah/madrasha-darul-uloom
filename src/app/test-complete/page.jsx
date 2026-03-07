'use client';

import { useState, useEffect } from 'react';

export default function CompleteTestPage() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testAPIs = async () => {
    setLoading(true);
    const testResults = {};

    try {
      // Test MongoDB Connection
      console.log('Testing MongoDB connection...');
      const mongoResponse = await fetch('/api/test-mongodb');
      const mongoData = await mongoResponse.json();
      testResults.mongodb = {
        status: mongoResponse.ok ? 'সফল' : 'ব্যর্থ',
        data: mongoData
      };

      // Test Students API
      console.log('Testing Students API...');
      const studentsResponse = await fetch('/api/students');
      const studentsData = await studentsResponse.json();
      testResults.students = {
        status: studentsResponse.ok ? 'সফল' : 'ব্যর্থ',
        data: studentsData
      };

      // Test Teachers API
      console.log('Testing Teachers API...');
      const teachersResponse = await fetch('/api/teachers');
      const teachersData = await teachersResponse.json();
      testResults.teachers = {
        status: teachersResponse.ok ? 'সফল' : 'ব্যর্থ',
        data: teachersData
      };

      // Test Attendance API
      console.log('Testing Attendance API...');
      const attendanceResponse = await fetch('/api/attendance');
      const attendanceData = await attendanceResponse.json();
      testResults.attendance = {
        status: attendanceResponse.ok ? 'সফল' : 'ব্যর্থ',
        data: attendanceData
      };

      // Test Fees API
      console.log('Testing Fees API...');
      const feesResponse = await fetch('/api/fees');
      const feesData = await feesResponse.json();
      testResults.fees = {
        status: feesResponse.ok ? 'সফল' : 'ব্যর্থ',
        data: feesData
      };

      // Test Dashboard API
      console.log('Testing Dashboard API...');
      const dashboardResponse = await fetch('/api/dashboard');
      const dashboardData = await dashboardResponse.json();
      testResults.dashboard = {
        status: dashboardResponse.ok ? 'সফল' : 'ব্যর্থ',
        data: dashboardData
      };

    } catch (error) {
      console.error('Test error:', error);
      testResults.error = error.message;
    }

    setResults(testResults);
    setLoading(false);
  };

  useEffect(() => {
    testAPIs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          MongoDB Integration সম্পূর্ণ টেস্ট
        </h1>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">API গুলো টেস্ট করা হচ্ছে...</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(results).map(([key, result]) => (
            <div key={key} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 capitalize">
                {key === 'mongodb' && 'MongoDB Connection'}
                {key === 'students' && 'Students API'}
                {key === 'teachers' && 'Teachers API'}
                {key === 'attendance' && 'Attendance API'}
                {key === 'fees' && 'Fees API'}
                {key === 'dashboard' && 'Dashboard API'}
                {key === 'error' && 'Error'}
              </h3>
              
              {key === 'error' ? (
                <div className="text-red-600">
                  <p className="font-medium">Error:</p>
                  <p className="text-sm">{result}</p>
                </div>
              ) : (
                <>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                    result.status === 'সফল' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.status}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p><strong>Success:</strong> {result.data?.success ? 'হ্যাঁ' : 'না'}</p>
                    {result.data?.data && (
                      <>
                        {Array.isArray(result.data.data) && (
                          <p><strong>Records:</strong> {result.data.data.length}</p>
                        )}
                        {result.data.pagination && (
                          <p><strong>Total:</strong> {result.data.pagination.total}</p>
                        )}
                        {result.data.data?.stats && (
                          <div className="mt-2">
                            <p><strong>Students:</strong> {result.data.data.stats.totalStudents}</p>
                            <p><strong>Teachers:</strong> {result.data.data.stats.totalTeachers}</p>
                          </div>
                        )}
                      </>
                    )}
                    {result.data?.error && (
                      <p className="text-red-600"><strong>Error:</strong> {result.data.error}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={testAPIs}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? 'টেস্ট চলছে...' : 'আবার টেস্ট করুন'}
          </button>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Raw Results (Debug)</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}