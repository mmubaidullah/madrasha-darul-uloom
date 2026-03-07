'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiBook, FiSearch, FiFilter, FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample data - এটা পরে API দিয়ে replace করা হবে
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBooks([
        {
          id: 1,
          title: 'সহীহ বুখারী',
          titleEnglish: 'Sahih Bukhari',
          author: 'ইমাম বুখারী (রহ.)',
          category: 'হাদিস',
          isbn: '978-984-123-456-7',
          totalCopies: 10,
          availableCopies: 7,
          location: 'A-1-001',
          language: 'আরবি-বাংলা',
          publisher: 'ইসলামিক ফাউন্ডেশন',
          publishYear: '2020',
          status: 'available'
        },
        {
          id: 2,
          title: 'তাফসীরে ইবনে কাসীর',
          titleEnglish: 'Tafseer Ibn Kathir',
          author: 'ইমাম ইবনে কাসীর (রহ.)',
          category: 'তাফসীর',
          isbn: '978-984-123-456-8',
          totalCopies: 5,
          availableCopies: 3,
          location: 'B-2-015',
          language: 'আরবি-বাংলা',
          publisher: 'আল-কুরআন একাডেমি',
          publishYear: '2019',
          status: 'available'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = [
    'কুরআন মজিদ',
    'তাফসীর',
    'হাদিস',
    'ফিকহ',
    'আকিদা',
    'সীরাত',
    'ইসলামিক ইতিহাস',
    'আরবি ব্যাকরণ',
    'আরবি সাহিত্য',
    'বাংলা',
    'ইংরেজি',
    'গণিত',
    'বিজ্ঞান'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic
    toast.info('অনুসন্ধান ফিচার শীঘ্রই আসছে');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">লাইব্রেরি ব্যবস্থাপনা</h1>
          <p className="mt-1 text-sm text-gray-600">
            বই ও সম্পদ পরিচালনা করুন
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          <FiPlus className="mr-2 h-4 w-4" />
          নতুন বই যোগ করুন
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiBook className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">মোট বই</dt>
                  <dd className="text-lg font-medium text-gray-900">১,২৫০</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiBook className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">উপলব্ধ</dt>
                  <dd className="text-lg font-medium text-gray-900">৯৮৫</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiBook className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">ইস্যুকৃত</dt>
                  <dd className="text-lg font-medium text-gray-900">২৬৫</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiBook className="h-6 w-6 text-red-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">বিলম্বিত</dt>
                  <dd className="text-lg font-medium text-gray-900">১২</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              অনুসন্ধান
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="বইয়ের নাম বা লেখক..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              <FiSearch className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              বিভাগ
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">সব বিভাগ</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end space-x-2">
            <button 
              onClick={handleSearch}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              <FiSearch className="inline mr-2 h-4 w-4" />
              খুঁজুন
            </button>
            <button 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              <FiFilter className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  বইয়ের তথ্য
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  লেখক
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  বিভাগ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  কপি
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  অবস্থান
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  কার্যক্রম
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    লোড হচ্ছে...
                  </td>
                </tr>
              ) : books.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    কোন বই পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {book.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          ISBN: {book.isbn}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {book.author}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>মোট: {book.totalCopies}</div>
                        <div className="text-green-600">উপলব্ধ: {book.availableCopies}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {book.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          title="বিস্তারিত দেখুন"
                        >
                          <FiEye className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-900"
                          title="সম্পাদনা করুন"
                        >
                          <FiEdit className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          title="ডিলিট করুন"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">দ্রুত কাজ</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-center transition-colors">
            <FiBook className="mx-auto h-6 w-6 text-blue-600 mb-2" />
            <div className="text-blue-600 font-medium">বই ইস্যু করুন</div>
          </button>
          <button className="bg-green-50 hover:bg-green-100 p-4 rounded-lg text-center transition-colors">
            <FiDownload className="mx-auto h-6 w-6 text-green-600 mb-2" />
            <div className="text-green-600 font-medium">বই ফেরত নিন</div>
          </button>
          <button className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg text-center transition-colors">
            <FiSearch className="mx-auto h-6 w-6 text-purple-600 mb-2" />
            <div className="text-purple-600 font-medium">বই খুঁজুন</div>
          </button>
          <button className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg text-center transition-colors">
            <FiBook className="mx-auto h-6 w-6 text-yellow-600 mb-2" />
            <div className="text-yellow-600 font-medium">রিপোর্ট দেখুন</div>
          </button>
        </div>
      </div>
    </div>
  );
}