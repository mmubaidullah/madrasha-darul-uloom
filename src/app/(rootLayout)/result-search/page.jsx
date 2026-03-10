'use client';
import { useState } from 'react';
import { FiSearch, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ResultSearchPage() {
  const [searchType, setSearchType] = useState('studentId');
  const [searchValue, setSearchValue] = useState('');
  const [examType, setExamType] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      toast.error('অনুসন্ধান ক্ষেত্র পূরণ করুন');
      return;
    }

    if (!examType) {
      toast.error('পরীক্ষার ধরন নির্বাচন করুন');
      return;
    }

    setIsSearching(true);
    
    try {
      // API call to search result
      const response = await fetch(`/api/results/search?${searchType}=${searchValue}&examType=${examType}`);
      const data = await response.json();
      
      if (data.success) {
        setResult(data.data);
        if (!data.data) {
          toast.error('কোনো ফলাফল পাওয়া যায়নি');
        }
      } else {
        toast.error(data.error || 'ফলাফল খুঁজে পাওয়া যায়নি');
        setResult(null);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('ফলাফল অনুসন্ধানে সমস্যা হয়েছে');
      setResult(null);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <FiFileText className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            পরীক্ষার ফলাফল অনুসন্ধান
          </h1>
          <p className="text-gray-600">
            আপনার ছাত্র আইডি বা রোল নম্বর দিয়ে ফলাফল দেখুন
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Search Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                অনুসন্ধানের ধরন
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSearchType('studentId')}
                  className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                    searchType === 'studentId'
                      ? 'border-green-600 bg-green-50 text-green-600'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  ছাত্র আইডি
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType('rollNumber')}
                  className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
                    searchType === 'rollNumber'
                      ? 'border-green-600 bg-green-50 text-green-600'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  রোল নম্বর
                </button>
              </div>
            </div>

            {/* Search Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {searchType === 'studentId' ? 'ছাত্র আইডি' : 'রোল নম্বর'}
              </label>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={searchType === 'studentId' ? 'যেমন: STD0001' : 'যেমন: 101'}
              />
            </div>

            {/* Exam Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                পরীক্ষার ধরন
              </label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">পরীক্ষা নির্বাচন করুন</option>
                <option value="monthly">মাসিক পরীক্ষা</option>
                <option value="midterm">অর্ধবার্ষিক পরীক্ষা</option>
                <option value="final">বার্ষিক পরীক্ষা</option>
                <option value="test">টেস্ট পরীক্ষা</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={isSearching}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isSearching ? (
                'অনুসন্ধান করা হচ্ছে...'
              ) : (
                <>
                  <FiSearch className="mr-2" />
                  ফলাফল অনুসন্ধান করুন
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result Display */}
        {result && (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="border-b pb-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                পরীক্ষার ফলাফল
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">ছাত্রের নাম:</span>
                  <span className="ml-2 font-semibold">{result.studentName}</span>
                </div>
                <div>
                  <span className="text-gray-600">ছাত্র আইডি:</span>
                  <span className="ml-2 font-semibold">{result.studentId}</span>
                </div>
                <div>
                  <span className="text-gray-600">শ্রেণী:</span>
                  <span className="ml-2 font-semibold">{result.class}</span>
                </div>
                <div>
                  <span className="text-gray-600">রোল নম্বর:</span>
                  <span className="ml-2 font-semibold">{result.rollNumber}</span>
                </div>
              </div>
            </div>

            {/* Marks Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">বিষয়</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">পূর্ণমান</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">প্রাপ্ত নম্বর</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">গ্রেড</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {result.subjects?.map((subject, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-800">{subject.name}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-600">{subject.totalMarks}</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-gray-800">
                        {subject.obtainedMarks}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          subject.grade === 'A+' ? 'bg-green-100 text-green-800' :
                          subject.grade === 'A' ? 'bg-blue-100 text-blue-800' :
                          subject.grade === 'B' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {subject.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">মোট</td>
                    <td className="px-4 py-3 text-sm text-center font-semibold text-gray-800">
                      {result.totalMarks}
                    </td>
                    <td className="px-4 py-3 text-sm text-center font-bold text-green-600">
                      {result.obtainedMarks}
                    </td>
                    <td className="px-4 py-3 text-sm text-center font-bold text-green-600">
                      {result.overallGrade}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-gray-600 mb-1">মোট নম্বর</div>
                <div className="text-2xl font-bold text-gray-800">{result.obtainedMarks}/{result.totalMarks}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">শতকরা</div>
                <div className="text-2xl font-bold text-green-600">{result.percentage}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">মেধা স্থান</div>
                <div className="text-2xl font-bold text-blue-600">{result.position}</div>
              </div>
            </div>

            {/* Print Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => window.print()}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                ফলাফল প্রিন্ট করুন
              </button>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="max-w-2xl mx-auto mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 mb-2">নোট:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• ফলাফল অনুসন্ধানের জন্য সঠিক ছাত্র আইডি বা রোল নম্বর প্রদান করুন</li>
            <li>• পরীক্ষার ধরন সঠিকভাবে নির্বাচন করুন</li>
            <li>• ফলাফল প্রকাশের পর এই পেজ থেকে দেখতে পারবেন</li>
            <li>• কোনো সমস্যা হলে মাদরাসা অফিসে যোগাযোগ করুন</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
