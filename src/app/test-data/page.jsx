'use client';

import { useState } from 'react';

export default function TestDataPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const addResult = (message, type = 'info') => {
    setResults(prev => [...prev, { message, type, time: new Date().toLocaleTimeString() }]);
  };

  const createSampleData = async () => {
    setLoading(true);
    setResults([]);

    try {
      // Create sample student
      addResult('Sample student তৈরি করা হচ্ছে...', 'info');
      const studentData = {
        nameBangla: 'মোহাম্মদ আব্দুল্লাহ',
        nameEnglish: 'Mohammad Abdullah',
        fatherName: 'মোহাম্মদ ইব্রাহিম',
        motherName: 'ফাতিমা খাতুন',
        dateOfBirth: '2010-01-15',
        admissionClass: 'ইবতিদাইয়্যাহ-১ (উর্দূ)',
        section: 'ক',
        rollNumber: '001',
        address: 'ঢাকা, বাংলাদেশ',
        phoneNumber: '01712345678',
        guardianPhone: '01812345678',
        bloodGroup: 'B+',
        previousInstitution: 'স্থানীয় মক্তব',
        admissionDate: new Date().toISOString().split('T')[0]
      };

      const studentResponse = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      });

      const studentResult = await studentResponse.json();
      if (studentResult.success) {
        addResult(`Student তৈরি সফল: ${studentResult.data.studentId}`, 'success');
      } else {
        addResult(`Student তৈরি ব্যর্থ: ${studentResult.error}`, 'error');
      }

      // Create sample teacher
      addResult('Sample teacher তৈরি করা হচ্ছে...', 'info');
      const teacherData = {
        nameBangla: 'মাওলানা আবু বকর সিদ্দিক',
        nameEnglish: 'Maulana Abu Bakr Siddique',
        designation: 'প্রধান শিক্ষক',
        subject: 'কুরআন ও হাদিস',
        qualification: 'দাওরায়ে হাদিস',
        experience: '15 বছর',
        phoneNumber: '01712345679',
        email: 'teacher@madrasha.edu.bd',
        address: 'ঢাকা, বাংলাদেশ',
        joiningDate: new Date().toISOString().split('T')[0],
        salary: 25000
      };

      const teacherResponse = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherData)
      });

      const teacherResult = await teacherResponse.json();
      if (teacherResult.success) {
        addResult(`Teacher তৈরি সফল: ${teacherResult.data.teacherId}`, 'success');
      } else {
        addResult(`Teacher তৈরি ব্যর্থ: ${teacherResult.error}`, 'error');
      }

      // Create sample attendance
      if (studentResult.success) {
        addResult('Sample attendance তৈরি করা হচ্ছে...', 'info');
        const attendanceData = {
          studentId: studentResult.data.studentId,
          studentName: studentResult.data.nameBangla,
          date: new Date().toISOString().split('T')[0],
          class: studentResult.data.admissionClass,
          section: studentResult.data.section,
          status: 'present'
        };

        const attendanceResponse = await fetch('/api/attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(attendanceData)
        });

        const attendanceResult = await attendanceResponse.json();
        if (attendanceResult.success) {
          addResult('Attendance তৈরি সফল', 'success');
        } else {
          addResult(`Attendance তৈরি ব্যর্থ: ${attendanceResult.error}`, 'error');
        }

        // Create sample fee
        addResult('Sample fee তৈরি করা হচ্ছে...', 'info');
        const feeData = {
          studentId: studentResult.data.studentId,
          studentName: studentResult.data.nameBangla,
          class: studentResult.data.admissionClass,
          month: 'জানুয়ারি ২০২৬',
          amount: 2000,
          paidAmount: 2000,
          paymentMethod: 'নগদ',
          paymentDate: new Date().toISOString().split('T')[0]
        };

        const feeResponse = await fetch('/api/fees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(feeData)
        });

        const feeResult = await feeResponse.json();
        if (feeResult.success) {
          addResult(`Fee তৈরি সফল: ${feeResult.data.receiptNo}`, 'success');
        } else {
          addResult(`Fee তৈরি ব্যর্থ: ${feeResult.error}`, 'error');
        }
      }

      addResult('সব sample data তৈরি সম্পন্ন!', 'success');

    } catch (error) {
      addResult(`Error: ${error.message}`, 'error');
    }

    setLoading(false);
  };

  const testDashboard = async () => {
    addResult('Dashboard API টেস্ট করা হচ্ছে...', 'info');
    
    try {
      const response = await fetch('/api/dashboard');
      const result = await response.json();
      
      if (result.success) {
        addResult('Dashboard API সফল', 'success');
        addResult(`Total Students: ${result.data.stats.totalStudents}`, 'info');
        addResult(`Total Teachers: ${result.data.stats.totalTeachers}`, 'info');
        addResult(`Attendance: ${result.data.stats.attendancePercentage}%`, 'info');
        addResult(`Monthly Collection: ৳${result.data.stats.monthlyCollection}`, 'info');
      } else {
        addResult(`Dashboard API ব্যর্থ: ${result.error}`, 'error');
      }
    } catch (error) {
      addResult(`Dashboard Error: ${error.message}`, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          MongoDB Test Data Creator
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4 justify-center">
            <button
              onClick={createSampleData}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
            >
              {loading ? 'তৈরি করা হচ্ছে...' : 'Sample Data তৈরি করুন'}
            </button>
            
            <button
              onClick={testDashboard}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Dashboard টেস্ট করুন
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Test Results</h3>
          
          {results.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              কোন test result নেই। উপরের বাটন দিয়ে test শুরু করুন।
            </p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-l-4 ${
                    result.type === 'success'
                      ? 'bg-green-50 border-green-400 text-green-800'
                      : result.type === 'error'
                      ? 'bg-red-50 border-red-400 text-red-800'
                      : 'bg-blue-50 border-blue-400 text-blue-800'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span>{result.message}</span>
                    <span className="text-xs opacity-75">{result.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}