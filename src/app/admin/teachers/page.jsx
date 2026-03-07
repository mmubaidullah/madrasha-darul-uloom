'use client';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiPhone, FiMail } from 'react-icons/fi';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // শিক্ষকদের তথ্য লোড করুন
  const loadTeachers = async (page = 1, search = '', subjectFilter = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...(search && { search }),
        ...(subjectFilter && { subject: subjectFilter })
      });
      
      const response = await fetch(`/api/teachers?${params}`);
      const result = await response.json();
      
      if (result.success) {
        setTeachers(result.data);
        setPagination(result.pagination);
      } else {
        toast.error('শিক্ষকদের তথ্য লোড করতে সমস্যা হয়েছে');
        console.error('API Error:', result.error);
      }
    } catch (error) {
      console.error('শিক্ষকদের তথ্য লোড করতে সমস্যা:', error);
      toast.error('শিক্ষকদের তথ্য লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  // কম্পোনেন্ট মাউন্টে শিক্ষকদের তথ্য লোড করুন
  useEffect(() => {
    loadTeachers();
  }, []);

  // অনুসন্ধান হ্যান্ডল করুন
  const handleSearch = (e) => {
    e.preventDefault();
    loadTeachers(1, searchTerm, selectedSubject);
  };

  // বিষয় ফিল্টার পরিবর্তন হ্যান্ডল করুন
  const handleSubjectChange = (newSubject) => {
    setSelectedSubject(newSubject);
    loadTeachers(1, searchTerm, newSubject);
  };

  // ফিল্টার রিসেট করুন
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedSubject('');
    loadTeachers(1, '', '');
  };

  // শিক্ষক ডিলিট করুন
  const deleteTeacher = async (teacherId) => {
    if (!confirm('আপনি কি নিশ্চিত যে এই শিক্ষকের তথ্য ডিলিট করতে চান?')) {
      return;
    }

    try {
      const response = await fetch(`/api/teachers?id=${teacherId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      
      if (result.success) {
        toast.success('শিক্ষকের তথ্য ডিলিট হয়েছে');
        loadTeachers(pagination.page, searchTerm, selectedSubject);
      } else {
        toast.error(result.error || 'ডিলিট করতে সমস্যা হয়েছে');
      }
    } catch (error) {
      console.error('ডিলিট করতে সমস্যা:', error);
      toast.error('ডিলিট করতে সমস্যা হয়েছে');
    }
  };

  // শিক্ষকের স্ট্যাটাস পরিবর্তন করুন
  const toggleTeacherStatus = async (teacherId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      const response = await fetch('/api/teachers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: teacherId,
          status: newStatus
        }),
      });
      const result = await response.json();
      
      if (result.success) {
        toast.success(`শিক্ষকের স্ট্যাটাস ${newStatus === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'} করা হয়েছে`);
        loadTeachers(pagination.page, searchTerm, selectedSubject);
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
      {/* পেজ হেডার */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">শিক্ষক ব্যবস্থাপনা</h1>
          <p className="mt-1 text-sm text-gray-600">
            সকল শিক্ষকের তথ্য দেখুন এবং পরিচালনা করুন
          </p>
        </div>
        <Link
          href="/admin/teachers/add"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          <FiPlus className="mr-2 h-4 w-4" />
          নতুন শিক্ষক যোগ করুন
        </Link>
      </div>

      {/* ফিল্টার */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              অনুসন্ধান
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="নাম বা বিষয় দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              বিষয়
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={selectedSubject}
              onChange={(e) => handleSubjectChange(e.target.value)}
            >
              <option value="">সব বিষয়</option>
              <option value="কুরআন মজিদ">কুরআন মজিদ</option>
              <option value="হাদিস শরীফ">হাদিস শরীফ</option>
              <option value="আরবি ব্যাকরণ">আরবি ব্যাকরণ</option>
              <option value="ফিকহ">ফিকহ</option>
              <option value="আকিদা">আকিদা</option>
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

      {/* শিক্ষকদের টেবিল */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  শিক্ষকের তথ্য
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  বিষয়
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  যোগাযোগ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  বেতন
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
              ) : teachers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    কোন শিক্ষক পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                teachers.map((teacher) => (
                  <tr key={teacher._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {teacher.nameBangla}
                        </div>
                        <div className="text-sm text-gray-500">
                          {teacher.designation} | আইডি: {teacher.teacherId}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {teacher.subject}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <FiPhone className="w-3 h-3 mr-1" />
                          {teacher.phone}
                        </div>
                        {teacher.email && (
                          <div className="flex items-center text-sm text-gray-600">
                            <FiMail className="w-3 h-3 mr-1" />
                            {teacher.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ৳{teacher.salary?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        teacher.status === 'active' ? 'bg-green-100 text-green-800' :
                        teacher.status === 'inactive' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {teacher.status === 'active' ? 'সক্রিয়' : 
                         teacher.status === 'inactive' ? 'নিষ্ক্রিয়' : teacher.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => alert('শিক্ষকের বিস্তারিত তথ্য দেখার ফিচার শীঘ্রই আসছে')}
                          className="text-blue-600 hover:text-blue-900"
                          title="বিস্তারিত দেখুন"
                        >
                          <FiEye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => toggleTeacherStatus(teacher._id, teacher.status)}
                          className={`${teacher.status === 'active' ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'}`}
                          title={teacher.status === 'active' ? 'নিষ্ক্রিয় করুন' : 'সক্রিয় করুন'}
                        >
                          <FiEdit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => deleteTeacher(teacher._id)}
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

      {/* পেজিনেশন */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
        <div className="flex-1 flex justify-between sm:hidden">
          <button 
            onClick={() => loadTeachers(pagination.page - 1, searchTerm, selectedSubject)}
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
            onClick={() => loadTeachers(pagination.page + 1, searchTerm, selectedSubject)}
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
              মোট <span className="font-medium">{pagination.total}</span> জন শিক্ষক
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button 
                onClick={() => loadTeachers(pagination.page - 1, searchTerm, selectedSubject)}
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
                onClick={() => loadTeachers(pagination.page + 1, searchTerm, selectedSubject)}
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

// Teacher Form Modal Component
function TeacherFormModal({ isOpen, onClose, teacher, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    subjects: [],
    phone: '',
    email: '',
    address: '',
    joiningDate: '',
    salary: '',
    qualification: '',
    experience: ''
  });

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name || '',
        designation: teacher.designation || '',
        subjects: teacher.subjects || [],
        phone: teacher.phone || '',
        email: teacher.email || '',
        address: teacher.address || '',
        joiningDate: teacher.joiningDate || '',
        salary: teacher.salary || '',
        qualification: teacher.qualification || '',
        experience: teacher.experience || ''
      });
    } else {
      setFormData({
        name: '',
        designation: '',
        subjects: [],
        phone: '',
        email: '',
        address: '',
        joiningDate: '',
        salary: '',
        qualification: '',
        experience: ''
      });
    }
  }, [teacher]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={teacher ? 'শিক্ষকের তথ্য সম্পাদনা' : 'নতুন শিক্ষক যোগ করুন'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="নাম *"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <FormInput
            label="পদবি *"
            value={formData.designation}
            onChange={(e) => setFormData({...formData, designation: e.target.value})}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="ফোন নম্বর *"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
          <FormInput
            label="ইমেইল"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <FormInput
          label="ঠিকানা"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="যোগদানের তারিখ *"
            type="date"
            value={formData.joiningDate}
            onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
            required
          />
          <FormInput
            label="বেতন (টাকা) *"
            type="number"
            value={formData.salary}
            onChange={(e) => setFormData({...formData, salary: parseInt(e.target.value)})}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="শিক্ষাগত যোগ্যতা"
            value={formData.qualification}
            onChange={(e) => setFormData({...formData, qualification: e.target.value})}
          />
          <FormInput
            label="অভিজ্ঞতা (বছর)"
            type="number"
            value={formData.experience}
            onChange={(e) => setFormData({...formData, experience: e.target.value})}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            বাতিল
          </Button>
          <Button type="submit">
            {teacher ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// Teacher View Modal Component
function TeacherViewModal({ isOpen, onClose, teacher }) {
  if (!teacher) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="শিক্ষকের বিস্তারিত তথ্য"
      size="lg"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">ব্যক্তিগত তথ্য</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">নাম:</span>
                <p className="text-gray-900">{teacher.name}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">পদবি:</span>
                <p className="text-gray-900">{teacher.designation}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">ফোন:</span>
                <p className="text-gray-900">{teacher.phone}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">ইমেইল:</span>
                <p className="text-gray-900">{teacher.email}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">পেশাগত তথ্য</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">বিষয়সমূহ:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {teacher.subjects.map((subject, index) => (
                    <Badge key={index} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">যোগদানের তারিখ:</span>
                <p className="text-gray-900">{teacher.joiningDate}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">বেতন:</span>
                <p className="text-gray-900">৳{teacher.salary?.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">অবস্থা:</span>
                <Badge variant={teacher.status === 'active' ? 'success' : 'secondary'}>
                  {TEACHER_STATUS_LABELS[teacher.status]}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
