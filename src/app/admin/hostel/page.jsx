'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiHome, FiUsers, FiSettings } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function HostelPage() {
  const [activeTab, setActiveTab] = useState('rooms');
  const [rooms, setRooms] = useState([]);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data
  useEffect(() => {
    setTimeout(() => {
      setRooms([
        {
          id: 1,
          roomNumber: '101',
          floor: '১ম তলা',
          capacity: 4,
          occupied: 3,
          type: 'সাধারণ',
          facilities: ['ফ্যান', 'লাইট', 'আলমারি'],
          status: 'available',
          monthlyRent: 2000
        },
        {
          id: 2,
          roomNumber: '102',
          floor: '১ম তলা',
          capacity: 4,
          occupied: 4,
          type: 'সাধারণ',
          facilities: ['ফ্যান', 'লাইট', 'আলমারি'],
          status: 'full',
          monthlyRent: 2000
        },
        {
          id: 3,
          roomNumber: '201',
          floor: '২য় তলা',
          capacity: 2,
          occupied: 1,
          type: 'প্রিমিয়াম',
          facilities: ['এসি', 'লাইট', 'আলমারি', 'টেবিল'],
          status: 'available',
          monthlyRent: 3500
        }
      ]);

      setResidents([
        {
          id: 1,
          name: 'মোহাম্মদ আব্দুল্লাহ',
          studentId: 'STD0001',
          roomNumber: '101',
          admissionDate: '2024-01-15',
          phoneNumber: '01712345678',
          guardianPhone: '01812345678',
          monthlyRent: 2000,
          status: 'active'
        },
        {
          id: 2,
          name: 'আহমদ হাসান',
          studentId: 'STD0002',
          roomNumber: '102',
          admissionDate: '2024-01-20',
          phoneNumber: '01712345679',
          guardianPhone: '01812345679',
          monthlyRent: 2000,
          status: 'active'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const tabs = [
    { id: 'rooms', name: 'রুম ব্যবস্থাপনা', icon: FiHome },
    { id: 'residents', name: 'আবাসিক ছাত্র', icon: FiUsers },
    { id: 'facilities', name: 'সুবিধাসমূহ', icon: FiSettings },
    { id: 'reports', name: 'রিপোর্ট', icon: FiEye }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">হোস্টেল ব্যবস্থাপনা</h1>
          <p className="mt-1 text-sm text-gray-600">
            আবাসিক ছাত্রদের থাকার ব্যবস্থা পরিচালনা করুন
          </p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          <FiPlus className="mr-2 h-4 w-4" />
          নতুন রুম যোগ করুন
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiHome className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">মোট রুম</dt>
                  <dd className="text-lg font-medium text-gray-900">৫০</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiUsers className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">আবাসিক ছাত্র</dt>
                  <dd className="text-lg font-medium text-gray-900">১৮৫</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiHome className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">খালি রুম</dt>
                  <dd className="text-lg font-medium text-gray-900">১৫</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiHome className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">মাসিক আয়</dt>
                  <dd className="text-lg font-medium text-gray-900">৳৪,২৫,০০০</dd>
                </dl>
              </div>
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
          {activeTab === 'rooms' && <RoomsTab rooms={rooms} loading={loading} />}
          {activeTab === 'residents' && <ResidentsTab residents={residents} loading={loading} />}
          {activeTab === 'facilities' && <FacilitiesTab />}
          {activeTab === 'reports' && <ReportsTab />}
        </div>
      </div>
    </div>
  );
}

// Rooms Tab Component
function RoomsTab({ rooms, loading }) {
  if (loading) {
    return <div className="text-center py-8">লোড হচ্ছে...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">রুম তালিকা</h3>
        <div className="flex space-x-2">
          <select className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
            <option value="">সব তলা</option>
            <option value="1">১ম তলা</option>
            <option value="2">২য় তলা</option>
            <option value="3">৩য় তলা</option>
          </select>
          <select className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
            <option value="">সব ধরন</option>
            <option value="সাধারণ">সাধারণ</option>
            <option value="প্রিমিয়াম">প্রিমিয়াম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-gray-50 rounded-lg p-6 border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  রুম {room.roomNumber}
                </h4>
                <p className="text-sm text-gray-600">{room.floor}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                room.status === 'available' ? 'bg-green-100 text-green-800' :
                room.status === 'full' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {room.status === 'available' ? 'উপলব্ধ' :
                 room.status === 'full' ? 'পূর্ণ' : 'রক্ষণাবেক্ষণ'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ধরন:</span>
                <span className="font-medium">{room.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ধারণক্ষমতা:</span>
                <span className="font-medium">{room.capacity} জন</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">বর্তমান:</span>
                <span className="font-medium">{room.occupied} জন</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ভাড়া:</span>
                <span className="font-medium">৳{room.monthlyRent}/মাস</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">সুবিধাসমূহ:</p>
              <div className="flex flex-wrap gap-1">
                {room.facilities.map((facility, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                    {facility}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 text-xs bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
                বিস্তারিত
              </button>
              <button className="flex-1 text-xs bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
                সম্পাদনা
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Residents Tab Component
function ResidentsTab({ residents, loading }) {
  if (loading) {
    return <div className="text-center py-8">লোড হচ্ছে...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">আবাসিক ছাত্র তালিকা</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          নতুন ছাত্র ভর্তি
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ছাত্রের তথ্য</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">রুম</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">যোগাযোগ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ভাড়া</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">কার্যক্রম</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {residents.map((resident) => (
              <tr key={resident.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{resident.name}</div>
                    <div className="text-sm text-gray-500">ID: {resident.studentId}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {resident.roomNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{resident.phoneNumber}</div>
                  <div className="text-sm text-gray-500">অভিভাবক: {resident.guardianPhone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ৳{resident.monthlyRent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FiEye className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <FiEdit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Facilities Tab Component
function FacilitiesTab() {
  const facilities = [
    { name: 'খাবার হল', status: 'চালু', capacity: '200 জন', timing: '৬:০০ - ২২:০০' },
    { name: 'অধ্যয়ন কক্ষ', status: 'চালু', capacity: '50 জন', timing: '২৪ ঘন্টা' },
    { name: 'প্রার্থনা কক্ষ', status: 'চালু', capacity: '100 জন', timing: '২৪ ঘন্টা' },
    { name: 'বিনোদন কক্ষ', status: 'চালু', capacity: '30 জন', timing: '১৬:০০ - ২২:০০' },
    { name: 'লন্ড্রি', status: 'চালু', capacity: '-', timing: '৮:০০ - ১৮:০০' },
    { name: 'জেনারেটর', status: 'বন্ধ', capacity: '50 KVA', timing: 'জরুরি সময়' }
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">হোস্টেল সুবিধাসমূহ</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 border">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{facility.name}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                facility.status === 'চালু' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {facility.status}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ধারণক্ষমতা:</span>
                <span className="font-medium">{facility.capacity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">সময়:</span>
                <span className="font-medium">{facility.timing}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reports Tab Component
function ReportsTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">হোস্টেল রিপোর্ট</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">মাসিক আয়-ব্যয়</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">মোট আয়:</span>
              <span className="font-medium text-green-600">৳৪,২৫,০০০</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">মোট ব্যয়:</span>
              <span className="font-medium text-red-600">৳১,৮৫,০০০</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-900 font-semibold">নিট লাভ:</span>
              <span className="font-semibold text-green-600">৳২,৪০,০০০</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">রুম দখল হার</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">মোট রুম:</span>
              <span className="font-medium">৫০</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">দখলকৃত:</span>
              <span className="font-medium">৩৫</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-900 font-semibold">দখল হার:</span>
              <span className="font-semibold text-blue-600">৭০%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}