'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function TestAdmissionMongo() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const testAdmission = async () => {
    setIsSubmitting(true);
    setResult(null);
    
    try {
      const testData = {
        studentName: 'মোহাম্মদ আব্দুল্লাহ টেস্ট',
        nationality: 'বাংলাদেশী',
        dateOfBirth: '2010-01-15',
        ageYears: '14',
        ageMonths: '2',
        bloodGroup: 'B+',
        fatherName: 'মোহাম্মদ ইব্রাহিম',
        fatherProfession: 'ব্যবসা',
        fatherMobile: '01711111111',
        motherName: 'ফাতিমা খাতুন',
        motherProfession: 'গৃহিণী',
        motherMobile: '01722222222',
        presentAddress: {
          village: 'রামপুর',
          postOffice: 'রামপুর',
          upazila: 'সাভার',
          district: 'ঢাকা'
        },
        permanentAddress: {
          village: 'রামপুর',
          postOffice: 'রামপুর',
          upazila: 'সাভার',
          district: 'ঢাকা'
        },
        guardianName: 'মোহাম্মদ ইব্রাহিম',
        guardianRelation: 'পিতা',
        guardianMobile: '01711111111',
        guardianEmail: 'ibrahim@example.com',
        previousInstitution: 'স্থানীয় প্রাথমিক বিদ্যালয়',
        department: 'কিতাব বিভাগ',
        admissionClass: 'ইবতিদাইয়্যাহ-১ (উর্দূ)',
        academicYear: '২০২৬',
        hostelRequired: 'yes',
        specialComments: 'ভাল ছাত্র'
      };

      console.log('Sending admission data:', testData);

      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });

      const result = await response.json();
      console.log('API Response:', result);

      setResult(result);

      if (result.success) {
        toast.success('✅ MongoDB এ ছাত্র সফলভাবে সেভ হয়েছে!');
      } else {
        toast.error('❌ সমস্যা: ' + result.error);
      }
    } catch (error) {
      console.error('Test error:', error);
      toast.error('❌ টেস্ট ব্যর্থ: ' + error.message);
      setResult({ success: false, error: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const testConnection = async () => {
    try {
      const response = await fetch('/api/test-connection');
      const result = await response.json();
      console.log('Connection test:', result);
      setResult(result);
      
      if (result.success) {
        toast.success('✅ MongoDB কানেকশন সফল!');
      } else {
        toast.error('❌ MongoDB কানেকশন ব্যর্থ!');
      }
    } catch (error) {
      console.error('Connection test error:', error);
      toast.error('❌ কানেকশন টেস্ট ব্যর্থ!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            MongoDB Admission Test
          </h1>
          
          <div className="space-y-4">
            <button
              onClick={testConnection}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              🔍 MongoDB কানেকশন টেস্ট করুন
            </button>
            
            <button
              onClick={testAdmission}
              disabled={isSubmitting}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? '⏳ টেস্ট চলছে...' : '📝 Admission Form টেস্ট করুন'}
            </button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <h3 className="font-medium mb-2">টেস্ট রেজাল্ট:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}