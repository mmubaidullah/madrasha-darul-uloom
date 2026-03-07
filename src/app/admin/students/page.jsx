'use client';
import { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { DEPARTMENTS, DEPARTMENT_CLASSES, getDepartmentByClass } from '@/lib/departments';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Load students from API
  const loadStudents = async (page = 1, search = '', classFilter = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...(search && { search }),
        ...(classFilter && { class: classFilter })
      });
      
      const response = await fetch(`/api/students?${params}`);
      const result = await response.json();
      
      if (result.success) {
        setStudents(result.data);
        setPagination(result.pagination);
      } else {
        toast.error('ছাত্রদের তথ্য লোড করতে সমস্যা হয়েছে');
        console.error('API Error:', result.error);
      }
    } catch (error) {
      console.error('Load students error:', error);
      toast.error('ছাত্রদের তথ্য লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  // Load students on component mount
  useEffect(() => {
    loadStudents();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    loadStudents(1, searchTerm, selectedClass);
  };

  // Handle class filter change
  const handleClassChange = (newClass) => {
    setSelectedClass(newClass);
    loadStudents(1, searchTerm, newClass);
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedClass('');
    setSelectedDepartment('');
    loadStudents(1, '', '');
  };

  // ছাত্র ডিলিট করুন
  const deleteStudent = async (studentId) => {
    if (!confirm('আপনি কি নিশ্চিত যে এই ছাত্রের তথ্য ডিলিট করতে চান?')) {
      return;
    }

    try {
      const response = await fetch(`/api/students?id=${studentId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      
      if (result.success) {
        toast.success('ছাত্রের তথ্য ডিলিট হয়েছে');
        loadStudents(pagination.page, searchTerm, selectedClass); // রিলোড করুন
      } else {
        toast.error(result.error || 'ডিলিট করতে সমস্যা হয়েছে');
      }
    } catch (error) {
      console.error('ডিলিট করতে সমস্যা:', error);
      toast.error('ডিলিট করতে সমস্যা হয়েছে');
    }
  };

  // ছাত্রের স্ট্যাটাস পরিবর্তন করুন
  const toggleStudentStatus = async (studentId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      const response = await fetch('/api/students', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: studentId,
          status: newStatus
        }),
      });
      const result = await response.json();
      
      if (result.success) {
        toast.success(`ছাত্রের স্ট্যাটাস ${newStatus === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'} করা হয়েছে`);
        loadStudents(pagination.page, searchTerm, selectedClass); // রিলোড করুন
      } else {
        toast.error(result.error || 'স্ট্যাটাস পরিবর্তন করতে সমস্যা হয়েছে');
      }
    } catch (error) {
      console.error('স্ট্যাটাস পরিবর্তন করতে সমস্যা:', error);
      toast.error('স্ট্যাটাস পরিবর্তন করতে সমস্যা হয়েছে');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ছাত্র তালিকা</h1>
          <p className="mt-1 text-sm text-gray-600">
            সকল ছাত্রের তথ্য দেখুন এবং পরিচালনা করুন
          </p>
        </div>
        <Link
          href="/admin/students/admission"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          <FiPlus className="mr-2 h-4 w-4" />
          নতুন ছাত্র ভর্তি
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              অনুসন্ধান
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="নাম বা আইডি দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              বিভাগ
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedClass(''); // Reset class when department changes
                loadStudents(1, searchTerm, '');
              }}
            >
              <option value="">সব বিভাগ</option>
              {Object.values(DEPARTMENTS).map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              জামাত/ক্লাস
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              disabled={!selectedDepartment}
            >
              <option value="">
                {selectedDepartment ? 'সব জামাত/ক্লাস' : 'প্রথমে বিভাগ নির্বাচন করুন'}
              </option>
              {selectedDepartment && DEPARTMENT_CLASSES[selectedDepartment]?.map((className) => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button 
              onClick={handleResetFilters}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              ফিল্টার রিসেট
            </button>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ছাত্র তথ্য
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  জামাত ও বিভাগ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  পিতার নাম
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  মোবাইল
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  অবস্থা
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
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    কোন ছাত্র পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {student.studentName || student.nameBangla}
                        </div>
                        <div className="text-sm text-gray-500">
                          আইডি: {student.studentId}
                        </div>
                        {student.status === 'pending' && (
                          <div className="text-xs text-orange-600 font-medium">
                            অনুমোদনের অপেক্ষায়
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {student.admissionClass}
                      </div>
                      <div className="text-xs text-gray-500">
                        {student.department}
                      </div>
                      <div className="text-xs text-gray-500">
                        গ্রুপ: {student.group || 'অনির্ধারিত'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.fatherName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {student.guardianMobile || student.primaryMobile || student.mobileNumber || student.phone}
                      </div>
                      {student.guardianEmail && (
                        <div className="text-xs text-gray-500">
                          {student.guardianEmail}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.status === 'active' ? 'bg-green-100 text-green-800' :
                        student.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        student.status === 'inactive' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {student.status === 'active' ? 'সক্রিয়' : 
                         student.status === 'pending' ? 'অপেক্ষমাণ' :
                         student.status === 'inactive' ? 'নিষ্ক্রিয়' : student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/students/${student._id}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="বিস্তারিত দেখুন"
                        >
                          <FiEye className="h-4 w-4" />
                        </Link>
                        <button 
                          onClick={() => toggleStudentStatus(student._id, student.status)}
                          className={`${student.status === 'active' ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'}`}
                          title={student.status === 'active' ? 'নিষ্ক্রিয় করুন' : 'সক্রিয় করুন'}
                        >
                          <FiEdit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => deleteStudent(student._id)}
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

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
        <div className="flex-1 flex justify-between sm:hidden">
          <button 
            onClick={() => loadStudents(pagination.page - 1, searchTerm, selectedClass)}
            disabled={pagination.page <= 1}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
              pagination.page <= 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            পূর্ববর্তী
          </button>
          <button 
            onClick={() => loadStudents(pagination.page + 1, searchTerm, selectedClass)}
            disabled={pagination.page >= pagination.pages}
            className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
              pagination.page >= pagination.pages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            পরবর্তী
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              মোট <span className="font-medium">{pagination.total}</span> জন ছাত্র
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button 
                onClick={() => loadStudents(pagination.page - 1, searchTerm, selectedClass)}
                disabled={pagination.page <= 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                  pagination.page <= 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                পূর্ববর্তী
              </button>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                {pagination.page} / {pagination.pages}
              </span>
              <button 
                onClick={() => loadStudents(pagination.page + 1, searchTerm, selectedClass)}
                disabled={pagination.page >= pagination.pages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                  pagination.page >= pagination.pages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                পরবর্তী
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}