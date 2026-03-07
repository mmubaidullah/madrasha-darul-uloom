'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  FiArrowLeft, 
  FiEdit, 
  FiTrash2, 
  FiUser, 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiCalendar,
  FiBook,
  FiActivity,
  FiDollarSign,
  FiFileText
} from 'react-icons/fi';

export default function StudentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (params.id) {
      fetchStudentDetails();
    }
  }, [params.id]);

  const fetchStudentDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/students?id=${params.id}`);
      const result = await response.json();
      
      if (result.success && result.data.length > 0) {
        setStudent(result.data[0]);
      } else {
        toast.error('ছাত্রের তথ্য পাওয়া যায়নি');
        router.push('/admin/students');
      }
    } catch (error) {
      console.error('Student details fetch error:', error);
      toast.error('ছাত্রের তথ্য লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('আপনি কি নিশ্চিত যে এই ছাত্রের তথ্য ডিলিট করতে চান?')) {
      return;
    }

    try {
      const response = await fetch(`/api/students?id=${params.id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      
      if (result.success) {
        toast.success('ছাত্রের তথ্য ডিলিট হয়েছে');
        router.push('/admin/students');
      } else {
        toast.error(result.error || 'ডিলিট করতে সমস্যা হয়েছে');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('ডিলিট করতে সমস্যা হয়েছে');
    }
  };

  const tabs = [
    { id: 'basic', name: 'মূল তথ্য', icon: FiUser },
    { id: 'academic', name: 'একাডেমিক', icon: FiBook },
    { id: 'attendance', name: 'হাজিরা', icon: FiActivity },
    { id: 'fees', name: 'ফি', icon: FiDollarSign },
    { id: 'documents', name: 'ডকুমেন্ট', icon: FiFileText }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">ছাত্রের তথ্য পাওয়া যায়নি</p>
        <Link
          href="/admin/students"
          className="mt-4 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/students"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <FiArrowLeft className="mr-2 h-4 w-4" />
              ফিরে যান
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {student.nameBangla}
              </h1>
              <p className="text-sm text-gray-600">
                ছাত্র ID: {student.studentId} | {student.admissionClass}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link
              href={`/admin/students/${params.id}/edit`}
              className="flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
            >
              <FiEdit className="mr-2 h-4 w-4" />
              সম্পাদনা
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200"
            >
              <FiTrash2 className="mr-2 h-4 w-4" />
              ডিলিট
            </button>
          </div>
        </div>
      </div>

      {/* Student Status Card */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <FiUser className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {student.nameBangla}
              </h2>
              <p className="text-gray-600">{student.nameEnglish}</p>
              <div className="flex items-center mt-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  student.status === 'active' ? 'bg-green-100 text-green-800' :
                  student.status === 'inactive' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {student.status === 'active' ? 'সক্রিয়' : 
                   student.status === 'inactive' ? 'নিষ্ক্রিয়' : student.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500">ভর্তির তারিখ</div>
            <div className="text-lg font-medium text-gray-900">
              {new Date(student.admissionDate).toLocaleDateString('bn-BD')}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'basic' && (
            <BasicInfoTab student={student} />
          )}
          {activeTab === 'academic' && (
            <AcademicInfoTab student={student} />
          )}
          {activeTab === 'attendance' && (
            <AttendanceTab studentId={student.studentId} />
          )}
          {activeTab === 'fees' && (
            <FeesTab studentId={student.studentId} />
          )}
          {activeTab === 'documents' && (
            <DocumentsTab student={student} />
          )}
        </div>
      </div>
    </div>
  );
}

// Basic Info Tab Component
function BasicInfoTab({ student }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">ব্যক্তিগত তথ্য</h3>
        <div className="space-y-4">
          <InfoItem icon={FiUser} label="নাম (বাংলা)" value={student.nameBangla} />
          <InfoItem icon={FiUser} label="নাম (ইংরেজি)" value={student.nameEnglish} />
          <InfoItem icon={FiUser} label="পিতার নাম" value={student.fatherName} />
          <InfoItem icon={FiUser} label="মাতার নাম" value={student.motherName} />
          <InfoItem icon={FiCalendar} label="জন্ম তারিখ" value={student.dateOfBirth} />
          <InfoItem icon={FiActivity} label="রক্তের গ্রুপ" value={student.bloodGroup} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">যোগাযোগের তথ্য</h3>
        <div className="space-y-4">
          <InfoItem icon={FiPhone} label="মোবাইল নম্বর" value={student.phoneNumber} />
          <InfoItem icon={FiPhone} label="অভিভাবকের নম্বর" value={student.guardianPhone} />
          <InfoItem icon={FiMail} label="ইমেইল" value={student.email} />
          <InfoItem icon={FiMapPin} label="ঠিকানা" value={student.address} />
        </div>
      </div>
    </div>
  );
}

// Academic Info Tab Component
function AcademicInfoTab({ student }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">একাডেমিক তথ্য</h3>
        <div className="space-y-4">
          <InfoItem icon={FiBook} label="ভর্তির জামাত" value={student.admissionClass} />
          <InfoItem icon={FiBook} label="সেকশন" value={student.section} />
          <InfoItem icon={FiBook} label="রোল নম্বর" value={student.rollNumber} />
          <InfoItem icon={FiCalendar} label="ভর্তির তারিখ" value={student.admissionDate} />
          <InfoItem icon={FiBook} label="পূর্ববর্তী প্রতিষ্ঠান" value={student.previousInstitution} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">অতিরিক্ত তথ্য</h3>
        <div className="space-y-4">
          <InfoItem icon={FiActivity} label="অবস্থা" value={
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              student.status === 'active' ? 'bg-green-100 text-green-800' :
              student.status === 'inactive' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {student.status === 'active' ? 'সক্রিয়' : 
               student.status === 'inactive' ? 'নিষ্ক্রিয়' : student.status}
            </span>
          } />
          <InfoItem icon={FiCalendar} label="তৈরির তারিখ" value={
            new Date(student.createdAt).toLocaleDateString('bn-BD')
          } />
          <InfoItem icon={FiCalendar} label="শেষ আপডেট" value={
            new Date(student.updatedAt).toLocaleDateString('bn-BD')
          } />
        </div>
      </div>
    </div>
  );
}

// Attendance Tab Component
function AttendanceTab({ studentId }) {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, [studentId]);

  const fetchAttendance = async () => {
    try {
      const response = await fetch(`/api/attendance?studentId=${studentId}&limit=30`);
      const result = await response.json();
      
      if (result.success) {
        setAttendance(result.data);
      }
    } catch (error) {
      console.error('Attendance fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">হাজিরার তথ্য লোড হচ্ছে...</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">সাম্প্রতিক হাজিরা</h3>
      {attendance.length === 0 ? (
        <p className="text-gray-500 text-center py-8">কোন হাজিরার তথ্য পাওয়া যায়নি</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">তারিখ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ক্লাস</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">অবস্থা</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendance.map((record, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.date).toLocaleDateString('bn-BD')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.class}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      record.status === 'present' ? 'bg-green-100 text-green-800' :
                      record.status === 'absent' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status === 'present' ? 'উপস্থিত' :
                       record.status === 'absent' ? 'অনুপস্থিত' : 'দেরি'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Fees Tab Component
function FeesTab({ studentId }) {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFees();
  }, [studentId]);

  const fetchFees = async () => {
    try {
      const response = await fetch(`/api/fees?search=${studentId}&limit=20`);
      const result = await response.json();
      
      if (result.success) {
        setFees(result.data);
      }
    } catch (error) {
      console.error('Fees fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">ফি এর তথ্য লোড হচ্ছে...</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">ফি পেমেন্ট হিস্টরি</h3>
      {fees.length === 0 ? (
        <p className="text-gray-500 text-center py-8">কোন ফি পেমেন্টের তথ্য পাওয়া যায়নি</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">মাস</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">পরিমাণ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">পরিশোধিত</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">অবস্থা</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">তারিখ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fees.map((fee, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fee.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ৳{fee.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ৳{fee.paidAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      fee.status === 'paid' ? 'bg-green-100 text-green-800' :
                      fee.status === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {fee.status === 'paid' ? 'পরিশোধিত' :
                       fee.status === 'partial' ? 'আংশিক' : 'বকেয়া'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(fee.paymentDate).toLocaleDateString('bn-BD')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Documents Tab Component
function DocumentsTab({ student }) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">ডকুমেন্ট ও সার্টিফিকেট</h3>
      <div className="text-center py-12 text-gray-500">
        <FiFileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p>ডকুমেন্ট ব্যবস্থাপনা ফিচার শীঘ্রই আসছে</p>
      </div>
    </div>
  );
}

// Info Item Component
function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start space-x-3">
      <Icon className="h-5 w-5 text-gray-400 mt-0.5" />
      <div className="flex-1">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">{value || 'তথ্য নেই'}</dd>
      </div>
    </div>
  );
}