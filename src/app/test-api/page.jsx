'use client';
import { useState } from 'react';

export default function TestAPIPage() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testAPI = async (apiCall, description) => {
    setLoading(true);
    try {
      const response = await apiCall();
      const data = await response.json();
      setResult(`${description}:\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`${description} - Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setResult('');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API টেস্ট পেজ</h1>
      <p className="mb-4 text-gray-600">ফাইল-ভিত্তিক ডাটাবেজের সাথে সব API টেস্ট করুন</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {/* MongoDB কানেকশন টেস্ট */}
        <button
          onClick={() => testAPI(() => fetch('/api/test-db'), 'MongoDB কানেকশন টেস্ট')}
          disabled={loading}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 font-bold"
        >
          MongoDB টেস্ট
        </button>

        {/* ছাত্র API */}
        <button
          onClick={() => testAPI(() => fetch('/api/students'), 'ছাত্রদের তালিকা')}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          ছাত্রদের তালিকা
        </button>
        
        <button
          onClick={() => testAPI(() => fetch('/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nameBangla: 'টেস্ট ছাত্র',
              nameEnglish: 'Test Student',
              dateOfBirth: '2010-01-01',
              gender: 'male',
              religion: 'islam',
              currentAddress: 'টেস্ট ঠিকানা',
              fatherName: 'টেস্ট পিতা',
              motherName: 'টেস্ট মাতা',
              guardianPhone: '01712345678',
              admissionClass: 'class-6',
              section: 'A',
              admissionDate: new Date().toISOString(),
              academicYear: '2024'
            })
          }), 'নতুন ছাত্র যোগ')}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          নতুন ছাত্র যোগ
        </button>

        {/* শিক্ষক API */}
        <button
          onClick={() => testAPI(() => fetch('/api/teachers'), 'শিক্ষকদের তালিকা')}
          disabled={loading}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          শিক্ষকদের তালিকা
        </button>

        <button
          onClick={() => testAPI(() => fetch('/api/teachers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nameBangla: 'টেস্ট শিক্ষক',
              nameEnglish: 'Test Teacher',
              designation: 'সহকারী শিক্ষক',
              subject: 'কুরআন মজিদ',
              phone: '01812345678',
              email: 'test@teacher.com',
              qualification: 'তাকমিল',
              experience: '৫ বছর',
              salary: 20000,
              joiningDate: new Date().toISOString().split('T')[0]
            })
          }), 'নতুন শিক্ষক যোগ')}
          disabled={loading}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
        >
          নতুন শিক্ষক যোগ
        </button>

        {/* হাজিরা API */}
        <button
          onClick={() => testAPI(() => fetch('/api/attendance'), 'হাজিরার তালিকা')}
          disabled={loading}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          হাজিরার তালিকা
        </button>

        <button
          onClick={() => testAPI(() => fetch('/api/attendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              studentId: 'STD0001',
              studentName: 'টেস্ট ছাত্র',
              class: 'class-6',
              section: 'A',
              date: new Date().toISOString().split('T')[0],
              status: 'present'
            })
          }), 'হাজিরা মার্ক')}
          disabled={loading}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
        >
          হাজিরা মার্ক
        </button>

        {/* ফি API */}
        <button
          onClick={() => testAPI(() => fetch('/api/fees'), 'ফি তালিকা')}
          disabled={loading}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 disabled:opacity-50"
        >
          ফি তালিকা
        </button>

        <button
          onClick={() => testAPI(() => fetch('/api/fees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              studentId: 'STD0001',
              studentName: 'টেস্ট ছাত্র',
              class: 'class-6',
              section: 'A',
              feeType: 'monthly',
              month: 'মার্চ ২০২৪',
              amount: 1500,
              paidAmount: 1500,
              paymentDate: new Date().toISOString().split('T')[0],
              paymentMethod: 'cash',
              collectedBy: 'অ্যাডমিন'
            })
          }), 'ফি কালেক্ট')}
          disabled={loading}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          ফি কালেক্ট
        </button>

        <button
          onClick={clearResult}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          ক্লিয়ার
        </button>
      </div>
      
      <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-sm">
        {loading ? 'লোড হচ্ছে...' : (result || 'একটি বাটনে ক্লিক করে API টেস্ট করুন')}
      </pre>
    </div>
  );
}