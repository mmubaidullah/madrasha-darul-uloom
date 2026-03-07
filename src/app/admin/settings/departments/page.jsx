'use client';

import { useState, useEffect } from 'react';
import { FiEdit, FiSave, FiX, FiPlus, FiTrash2, FiRefreshCw, FiSettings } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { 
  DEPARTMENTS, 
  DEPARTMENT_INFO,
  getCurrentDepartmentClasses,
  updateDepartmentClasses,
  addClassToDepartment,
  removeClassFromDepartment,
  renameClass,
  resetToDefaultClasses,
  initializeDepartments
} from '@/lib/departments';

export default function DepartmentManagementPage() {
  const [departmentClasses, setDepartmentClasses] = useState({});
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingClass, setEditingClass] = useState(null);
  const [newClassName, setNewClassName] = useState('');
  const [editClassName, setEditClassName] = useState('');
  const [loading, setLoading] = useState(false);

  // Load department classes on component mount
  useEffect(() => {
    initializeDepartments();
    const classes = getCurrentDepartmentClasses();
    setDepartmentClasses(classes);
  }, []);

  // Add new class to department
  const handleAddClass = (department) => {
    if (!newClassName.trim()) {
      toast.error('ক্লাসের নাম লিখুন');
      return;
    }

    const success = addClassToDepartment(department, newClassName.trim());
    if (success) {
      const updatedClasses = getCurrentDepartmentClasses();
      setDepartmentClasses(updatedClasses);
      setNewClassName('');
      setEditingDepartment(null);
      toast.success('নতুন ক্লাস যোগ করা হয়েছে');
    } else {
      toast.error('এই নামের ক্লাস ইতিমধ্যে আছে');
    }
  };

  // Remove class from department
  const handleRemoveClass = (department, className) => {
    if (window.confirm(`"${className}" ক্লাসটি সরিয়ে দিতে চান?`)) {
      const success = removeClassFromDepartment(department, className);
      if (success) {
        const updatedClasses = getCurrentDepartmentClasses();
        setDepartmentClasses(updatedClasses);
        toast.success('ক্লাস সরানো হয়েছে');
      } else {
        toast.error('ক্লাস সরাতে সমস্যা হয়েছে');
      }
    }
  };

  // Rename class
  const handleRenameClass = (department, oldName) => {
    if (!editClassName.trim()) {
      toast.error('নতুন নাম লিখুন');
      return;
    }

    const success = renameClass(department, oldName, editClassName.trim());
    if (success) {
      const updatedClasses = getCurrentDepartmentClasses();
      setDepartmentClasses(updatedClasses);
      setEditingClass(null);
      setEditClassName('');
      toast.success('ক্লাসের নাম পরিবর্তন করা হয়েছে');
    } else {
      toast.error('নাম পরিবর্তন করতে সমস্যা হয়েছে');
    }
  };

  // Reset to default classes
  const handleResetToDefault = () => {
    if (window.confirm('সব বিভাগের ক্লাস ডিফল্ট অবস্থায় ফিরিয়ে আনতে চান? এতে আপনার সব পরিবর্তন মুছে যাবে।')) {
      setLoading(true);
      const defaultClasses = resetToDefaultClasses();
      setDepartmentClasses(defaultClasses);
      setEditingDepartment(null);
      setEditingClass(null);
      setNewClassName('');
      setEditClassName('');
      setLoading(false);
      toast.success('সব বিভাগ ডিফল্ট অবস্থায় ফিরিয়ে আনা হয়েছে');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">বিভাগ ও ক্লাস ব্যবস্থাপনা</h1>
          <p className="mt-1 text-sm text-gray-600">
            মাদরাসার বিভাগসমূহের ক্লাস/জামাত সম্পাদনা করুন
          </p>
        </div>
        <button
          onClick={handleResetToDefault}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          <FiRefreshCw className="mr-2 h-4 w-4" />
          ডিফল্ট রিসেট করুন
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <FiSettings className="h-5 w-5 text-blue-400 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">নির্দেশনা</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>প্রতিটি বিভাগে নতুন ক্লাস/জামাত যোগ করতে পারবেন</li>
                <li>বিদ্যমান ক্লাসের নাম পরিবর্তন করতে পারবেন</li>
                <li>অপ্রয়োজনীয় ক্লাস সরিয়ে দিতে পারবেন</li>
                <li>সব পরিবর্তন স্বয়ংক্রিয়ভাবে সংরক্ষিত হবে</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {Object.values(DEPARTMENTS).map((department) => {
          const departmentInfo = DEPARTMENT_INFO[department];
          const classes = departmentClasses[department] || [];
          
          return (
            <div key={department} className="bg-white shadow rounded-lg overflow-hidden">
              {/* Department Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{departmentInfo.icon}</span>
                  <div>
                    <h3 className="text-lg font-medium text-white">{departmentInfo.shortName}</h3>
                    <p className="text-green-100 text-sm">{departmentInfo.description}</p>
                  </div>
                </div>
              </div>

              {/* Classes List */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-900">ক্লাস/জামাত সমূহ ({classes.length}টি)</h4>
                  <button
                    onClick={() => setEditingDepartment(editingDepartment === department ? null : department)}
                    className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                  >
                    <FiPlus className="mr-1 h-3 w-3" />
                    যোগ করুন
                  </button>
                </div>

                {/* Add New Class Form */}
                {editingDepartment === department && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newClassName}
                        onChange={(e) => setNewClassName(e.target.value)}
                        placeholder="নতুন ক্লাসের নাম"
                        className="flex-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddClass(department)}
                      />
                      <button
                        onClick={() => handleAddClass(department)}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                      >
                        <FiSave className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingDepartment(null);
                          setNewClassName('');
                        }}
                        className="px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 text-sm"
                      >
                        <FiX className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Classes List */}
                <div className="space-y-2">
                  {classes.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">কোনো ক্লাস নেই</p>
                  ) : (
                    classes.map((className, index) => (
                      <div key={className} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        {editingClass === `${department}-${className}` ? (
                          <div className="flex items-center space-x-2 flex-1">
                            <input
                              type="text"
                              value={editClassName}
                              onChange={(e) => setEditClassName(e.target.value)}
                              className="flex-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                              onKeyPress={(e) => e.key === 'Enter' && handleRenameClass(department, className)}
                            />
                            <button
                              onClick={() => handleRenameClass(department, className)}
                              className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                            >
                              <FiSave className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingClass(null);
                                setEditClassName('');
                              }}
                              className="px-2 py-1 bg-gray-400 text-white rounded text-xs"
                            >
                              <FiX className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex-1">
                              <span className="text-sm text-gray-900">{className}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => {
                                  setEditingClass(`${department}-${className}`);
                                  setEditClassName(className);
                                }}
                                className="p-1 text-blue-600 hover:text-blue-800"
                                title="নাম পরিবর্তন করুন"
                              >
                                <FiEdit className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => handleRemoveClass(department, className)}
                                className="p-1 text-red-600 hover:text-red-800"
                                title="সরিয়ে দিন"
                              >
                                <FiTrash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Default Classes Info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    ডিফল্ট ক্লাস: {departmentInfo.defaultClasses.length}টি
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">সারসংক্ষেপ</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.values(DEPARTMENTS).map((department) => {
            const departmentInfo = DEPARTMENT_INFO[department];
            const classes = departmentClasses[department] || [];
            
            return (
              <div key={department} className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">{departmentInfo.icon}</div>
                <div className="text-lg font-semibold text-gray-900">{classes.length}</div>
                <div className="text-sm text-gray-600">{departmentInfo.shortName} ক্লাস</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}