'use client';

import { useState, useEffect } from 'react';
import { FiUsers, FiEdit, FiSave, FiRefreshCw, FiPlus, FiX, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { 
  DEPARTMENTS, 
  getCurrentDepartmentClasses,
  initializeDepartments,
  getActiveDepartments 
} from '@/lib/departments';

export default function StudentGroupsPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [createdGroups, setCreatedGroups] = useState([]);
  const [showGroupCreator, setShowGroupCreator] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [departmentClasses, setDepartmentClasses] = useState({});
  const [showStudentList, setShowStudentList] = useState(false);
  const [activeDepartments, setActiveDepartments] = useState({});

  // Initialize departments and load classes
  useEffect(() => {
    initializeDepartments();
    const classes = getCurrentDepartmentClasses();
    const active = getActiveDepartments();
    setDepartmentClasses(classes);
    setActiveDepartments(active);
  }, []);

  // Get available groups (only created groups, no defaults)
  const getAvailableGroups = () => {
    return createdGroups;
  };

  // Add new group
  const addGroup = () => {
    if (!newGroupName.trim()) {
      toast.error('গ্রুপের নাম লিখুন');
      return;
    }
    
    if (createdGroups.includes(newGroupName.trim())) {
      toast.error('এই নামের গ্রুপ ইতিমধ্যে আছে');
      return;
    }
    
    setCreatedGroups([...createdGroups, newGroupName.trim()]);
    setNewGroupName('');
    toast.success('নতুন গ্রুপ তৈরি করা হয়েছে');
  };

  // Remove group
  const removeGroup = (groupToRemove) => {
    // Check if any student is assigned to this group
    const studentsInGroup = students.filter(student => student.group === groupToRemove);
    if (studentsInGroup.length > 0) {
      toast.error(`এই গ্রুপে ${studentsInGroup.length} জন ছাত্র আছে। প্রথমে তাদের অন্য গ্রুপে স্থানান্তর করুন।`);
      return;
    }
    
    setCreatedGroups(createdGroups.filter(group => group !== groupToRemove));
    toast.success('গ্রুপ সরানো হয়েছে');
  };

  // Clear all groups
  const clearAllGroups = () => {
    if (students.some(student => student.group !== 'অনির্ধারিত')) {
      toast.error('প্রথমে সব ছাত্রকে অনির্ধারিত গ্রুপে স্থানান্তর করুন');
      return;
    }
    setCreatedGroups([]);
    toast.success('সব গ্রুপ সাফ করা হয়েছে');
  };

  // Load students for selected class
  const loadStudents = async () => {
    if (!selectedDepartment || !selectedClass) {
      toast.error('বিভাগ এবং জামাত/ক্লাস নির্বাচন করুন');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/students?department=${selectedDepartment}&class=${selectedClass}`);
      const result = await response.json();
      
      if (result.success) {
        setStudents(result.data.map(student => ({
          ...student,
          group: student.group || 'অনির্ধারিত'
        })));
        setShowStudentList(true);
        toast.success(`${result.data.length} জন ছাত্রের তথ্য লোড হয়েছে`);
      } else {
        toast.error('ছাত্রদের তথ্য লোড করতে সমস্যা হয়েছে');
      }
    } catch (error) {
      console.error('Load students error:', error);
      toast.error('ছাত্রদের তথ্য লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  // Update student group
  const updateStudentGroup = (studentId, newGroup) => {
    setStudents(prev => prev.map(student => 
      student._id === studentId 
        ? { ...student, group: newGroup }
        : student
    ));
  };

  // Save all group changes
  const saveGroupChanges = async () => {
    setLoading(true);
    try {
      const updates = students.map(student => ({
        id: student._id,
        group: student.group
      }));

      const response = await fetch('/api/students/groups', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('গ্রুপ পরিবর্তন সংরক্ষিত হয়েছে');
        setEditMode(false);
      } else {
        toast.error('গ্রুপ পরিবর্তন সংরক্ষণ করতে সমস্যা হয়েছে');
      }
    } catch (error) {
      console.error('Save groups error:', error);
      toast.error('গ্রুপ পরিবর্তন সংরক্ষণ করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  // Auto-assign groups evenly
  const autoAssignGroups = () => {
    const availableGroups = getAvailableGroups();
    if (availableGroups.length === 0) {
      toast.error('প্রথমে কিছু গ্রুপ তৈরি করুন');
      return;
    }
    
    const studentsPerGroup = Math.ceil(students.length / availableGroups.length);
    
    const updatedStudents = students.map((student, index) => ({
      ...student,
      group: availableGroups[Math.floor(index / studentsPerGroup)] || availableGroups[0]
    }));
    
    setStudents(updatedStudents);
    setEditMode(true);
    toast.success('স্বয়ংক্রিয় গ্রুপ বিভাজন সম্পন্ন');
  };

  // Get group statistics
  const getGroupStats = () => {
    const stats = {};
    students.forEach(student => {
      stats[student.group] = (stats[student.group] || 0) + 1;
    });
    return stats;
  };

  const groupStats = getGroupStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ছাত্র গ্রুপ ব্যবস্থাপনা</h1>
        <p className="mt-1 text-sm text-gray-600">
          ছাত্রদের বিভিন্ন গ্রুপে ভাগ করুন
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              বিভাগ *
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedClass('');
                setStudents([]);
                setCreatedGroups([]);
                setShowStudentList(false);
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
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setStudents([]);
                setShowStudentList(false);
              }}
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

          <div className="flex items-end">
            <button
              onClick={loadStudents}
              disabled={!selectedDepartment || !selectedClass || loading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <FiEye className="mr-2 h-4 w-4" />
              {loading ? 'লোড হচ্ছে...' : 'ছাত্র দেখুন'}
            </button>
          </div>
        </div>
      </div>

      {/* Student List Preview (Before Group Creation) */}
      {showStudentList && students.length > 0 && !showGroupCreator && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {selectedClass} এর ছাত্র তালিকা ({students.length} জন)
            </h3>
            <button
              onClick={() => setShowGroupCreator(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <FiPlus className="mr-2 h-4 w-4" />
              গ্রুপ তৈরি করুন
            </button>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800">
              📋 এই জামাতে মোট <strong>{students.length} জন</strong> ছাত্র আছে। 
              গ্রুপ তৈরি করার জন্য উপরের "গ্রুপ তৈরি করুন" বাটনে ক্লিক করুন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student, index) => (
              <div key={student._id} className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-900">
                  {index + 1}. {student.nameBangla || student.studentName}
                </div>
                <div className="text-xs text-gray-500">
                  আইডি: {student.studentId}
                </div>
                <div className="text-xs text-gray-500">
                  বর্তমান গ্রুপ: {student.group}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Group Management */}
      {selectedDepartment && selectedClass && showGroupCreator && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">গ্রুপ ব্যবস্থাপনা</h3>
            <button
              onClick={() => setShowGroupCreator(!showGroupCreator)}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              <FiPlus className="mr-2 h-4 w-4" />
              গ্রুপ যোগ করুন
            </button>
          </div>

          {showGroupCreator && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="নতুন গ্রুপের নাম (যেমন: ৫, চ, ইত্যাদি)"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  onKeyPress={(e) => e.key === 'Enter' && addGroup()}
                />
                <button
                  onClick={addGroup}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  যোগ করুন
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-600">তৈরি করা গ্রুপসমূহ:</span>
            {createdGroups.length === 0 ? (
              <span className="text-sm text-gray-400 italic">কোনো গ্রুপ তৈরি করা হয়নি</span>
            ) : (
              createdGroups.map((group) => (
                <div key={group} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  <span>গ্রুপ {group}</span>
                  <button
                    onClick={() => removeGroup(group)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </div>
              ))
            )}
          </div>

          {createdGroups.length > 0 && (
            <button
              onClick={clearAllGroups}
              className="text-sm text-red-600 hover:text-red-800"
            >
              সব গ্রুপ সাফ করুন
            </button>
          )}
        </div>
      )}

      {/* Group Statistics */}
      {students.length > 0 && showGroupCreator && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">গ্রুপ পরিসংখ্যান</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(groupStats).map(([group, count]) => (
              <div key={group} className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{count}</div>
                <div className="text-sm text-gray-600">গ্রুপ {group}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {students.length > 0 && showGroupCreator && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setEditMode(!editMode)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <FiEdit className="mr-2 h-4 w-4" />
              {editMode ? 'সম্পাদনা বন্ধ করুন' : 'গ্রুপ সম্পাদনা করুন'}
            </button>
            
            <button
              onClick={autoAssignGroups}
              disabled={createdGroups.length === 0}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiRefreshCw className="mr-2 h-4 w-4" />
              স্বয়ংক্রিয় বিভাজন
            </button>

            {editMode && (
              <button
                onClick={saveGroupChanges}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                <FiSave className="mr-2 h-4 w-4" />
                {loading ? 'সংরক্ষণ হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Students List */}
      {students.length > 0 && showGroupCreator && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              ছাত্র তালিকা ({students.length} জন)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ছাত্র তথ্য
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    বর্তমান গ্রুপ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    নতুন গ্রুপ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {student.nameBangla || student.studentName}
                        </div>
                        <div className="text-sm text-gray-500">
                          আইডি: {student.studentId}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.group === 'অনির্ধারিত' 
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {student.group}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editMode ? (
                        <select
                          value={student.group}
                          onChange={(e) => updateStudentGroup(student._id, e.target.value)}
                          className="text-sm rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        >
                          <option value="অনির্ধারিত">অনির্ধারিত</option>
                          {getAvailableGroups().map(group => (
                            <option key={group} value={group}>
                              গ্রুপ {group}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-sm text-gray-500">
                          সম্পাদনা মোড চালু করুন
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {students.length === 0 && selectedDepartment && selectedClass && !loading && showStudentList && (
        <div className="bg-white shadow rounded-lg p-12 text-center">
          <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">কোনো ছাত্র পাওয়া যায়নি</h3>
          <p className="mt-1 text-sm text-gray-500">
            নির্বাচিত বিভাগ ও জামাতে কোনো ছাত্র নেই
          </p>
        </div>
      )}
    </div>
  );
}