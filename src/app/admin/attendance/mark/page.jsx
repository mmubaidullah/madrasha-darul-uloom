'use client';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiClock, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { 
  DEPARTMENTS, 
  getCurrentDepartmentClasses,
  initializeDepartments,
  getActiveDepartments 
} from '@/lib/departments';

export default function MarkAttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [showStudents, setShowStudents] = useState(false);
  const [loading, setLoading] = useState(false);
  const [departmentClasses, setDepartmentClasses] = useState({});
  const [activeDepartments, setActiveDepartments] = useState({});

  // Initialize departments and load classes
  useEffect(() => {
    initializeDepartments();
    const classes = getCurrentDepartmentClasses();
    const active = getActiveDepartments();
    setDepartmentClasses(classes);
    setActiveDepartments(active);
  }, []);

  // Get available groups based on selected department
  const getAvailableGroups = () => {
    // This will be populated from database based on created groups for this class
    return ['১', '২', '৩', '৪', '৫']; // Temporary - should come from API
  };

  const loadStudents = async () => {
    if (!selectedDepartment || !selectedClass || !selectedSection) {
      toast.error('বিভাগ, জামাত/ক্লাস এবং গ্রুপ নির্বাচন করুন');
      return;
    }
    
    setLoading(true);
    try {
      // রিয়েল ছাত্র ডাটা লোড করুন
      const response = await fetch(`/api/students?department=${selectedDepartment}&class=${selectedClass}&group=${selectedSection}`);
      const result = await response.json();
      
      if (result.success && result.data.length > 0) {
        const studentList = result.data.map((student, index) => ({
          id: student._id,
          studentId: student.studentId,
          name: student.nameBangla,
          rollNo: student.rollNo || (index + 1).toString()
        }));
        
        setStudents(studentList);
        
        // Initialize attendance with all present
        const initialAttendance = {};
        studentList.forEach(student => {
          initialAttendance[student.id] = 'present';
        });
        setAttendance(initialAttendance);
        setShowStudents(true);
        toast.success(`${studentList.length} জন ছাত্রের তালিকা লোড হয়েছে`);
      } else {
        // যদি কোনো ছাত্র না পাওয়া যায়, নমুনা ডাটা দেখান
        const sampleStudents = [
          { id: 'sample1', studentId: 'STD001', name: 'মোহাম্মদ আলী', rollNo: '১' },
          { id: 'sample2', studentId: 'STD002', name: 'আব্দুর রহমান', rollNo: '২' },
          { id: 'sample3', studentId: 'STD003', name: 'মোহাম্মদ ইব্রাহিম', rollNo: '৩' },
          { id: 'sample4', studentId: 'STD004', name: 'আব্দুল্লাহ', rollNo: '৪' },
          { id: 'sample5', studentId: 'STD005', name: 'ইউসুফ আলী', rollNo: '৫' }
        ];
        
        setStudents(sampleStudents);
        const initialAttendance = {};
        sampleStudents.forEach(student => {
          initialAttendance[student.id] = 'present';
        });
        setAttendance(initialAttendance);
        setShowStudents(true);
        toast.success('নমুনা ছাত্র তালিকা লোড হয়েছে (কোনো ছাত্র পাওয়া যায়নি)');
      }
    } catch (error) {
      console.error('ছাত্র লোড করতে সমস্যা:', error);
      toast.error('ছাত্র তালিকা লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const updateAttendance = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const submitAttendance = async () => {
    if (Object.keys(attendance).length === 0) {
      toast.error('প্রথমে ছাত্র তালিকা লোড করুন');
      return;
    }

    try {
      const attendanceData = {
        date: selectedDate,
        class: selectedClass,
        section: selectedSection,
        attendance: Object.entries(attendance).map(([studentId, status]) => {
          const student = students.find(s => s.id === studentId);
          return {
            studentId: student?.studentId || studentId,
            studentName: student?.name || 'অজানা',
            status: status
          };
        })
      };

      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendanceData),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('হাজিরা সফলভাবে জমা হয়েছে!');
        // Reset form
        setShowStudents(false);
        setStudents([]);
        setAttendance({});
      } else {
        toast.error(result.error || 'হাজিরা জমা দিতে সমস্যা হয়েছে');
      }
    } catch (error) {
      console.error('হাজিরা জমা দিতে সমস্যা:', error);
      toast.error('হাজিরা জমা দিতে সমস্যা হয়েছে');
    }
  };

  const getAttendanceStats = () => {
    const total = Object.keys(attendance).length;
    const present = Object.values(attendance).filter(status => status === 'present').length;
    const absent = Object.values(attendance).filter(status => status === 'absent').length;
    const late = Object.values(attendance).filter(status => status === 'late').length;
    
    return { total, present, absent, late };
  };

  const stats = getAttendanceStats();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">হাজিরা দিন</h1>
        <p className="mt-1 text-sm text-gray-600">
          ছাত্রদের দৈনিক হাজিরা নিন
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              তারিখ *
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              বিভাগ *
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedClass(''); // Reset class when department changes
              }}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="">বিভাগ নির্বাচন করুন</option>
              {Object.values(activeDepartments).map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              জামাত/ক্লাস *
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              disabled={!selectedDepartment}
            >
              <option value="">
                {selectedDepartment ? 'জামাত/ক্লাস নির্বাচন করুন' : 'প্রথমে বিভাগ নির্বাচন করুন'}
              </option>
              {selectedDepartment && departmentClasses[selectedDepartment]?.map((className) => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              গ্রুপ *
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              disabled={!selectedClass}
            >
              <option value="">
                {selectedClass ? 'গ্রুপ নির্বাচন করুন' : 'প্রথমে জামাত/ক্লাস নির্বাচন করুন'}
              </option>
              {getAvailableGroups().map(group => (
                <option key={group} value={group}>গ্রুপ {group}</option>
              ))}
              <option value="অনির্ধারিত">অনির্ধারিত</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={loadStudents}
              disabled={loading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'লোড হচ্ছে...' : 'ছাত্র দেখুন'}
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Stats */}
      {showStudents && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{stats.total}</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">মোট ছাত্র</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <FiCheck className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">উপস্থিত: {stats.present}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <FiX className="w-4 h-4 text-red-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">অনুপস্থিত: {stats.absent}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FiClock className="w-4 h-4 text-yellow-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">দেরি: {stats.late}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Students List */}
      {showStudents && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                ছাত্র তালিকা - {selectedClass} ({selectedSection})
              </h3>
              <button
                onClick={submitAttendance}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                <FiSave className="mr-2 h-4 w-4" />
                হাজিরা জমা দিন
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      রোল নং
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ছাত্রের নাম
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      আইডি
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      হাজিরা
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.rollNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => updateAttendance(student.id, 'present')}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              attendance[student.id] === 'present'
                                ? 'bg-green-100 text-green-800 border-2 border-green-500'
                                : 'bg-gray-100 text-gray-800 border-2 border-transparent hover:bg-green-50'
                            }`}
                          >
                            <FiCheck className="mr-1 h-3 w-3" />
                            উপস্থিত
                          </button>
                          <button
                            onClick={() => updateAttendance(student.id, 'absent')}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              attendance[student.id] === 'absent'
                                ? 'bg-red-100 text-red-800 border-2 border-red-500'
                                : 'bg-gray-100 text-gray-800 border-2 border-transparent hover:bg-red-50'
                            }`}
                          >
                            <FiX className="mr-1 h-3 w-3" />
                            অনুপস্থিত
                          </button>
                          <button
                            onClick={() => updateAttendance(student.id, 'late')}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              attendance[student.id] === 'late'
                                ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-500'
                                : 'bg-gray-100 text-gray-800 border-2 border-transparent hover:bg-yellow-50'
                            }`}
                          >
                            <FiClock className="mr-1 h-3 w-3" />
                            দেরি
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
