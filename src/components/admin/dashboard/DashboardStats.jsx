'use client';
import { useState, useEffect } from 'react';
import { FiUsers, FiBookOpen, FiDollarSign, FiClipboard } from 'react-icons/fi';

export default function DashboardStats() {
  const [stats, setStats] = useState([
    {
      name: 'মোট ছাত্র',
      value: '...',
      icon: FiUsers,
      change: '',
      changeType: 'increase',
      color: 'bg-blue-500'
    },
    {
      name: 'মোট শিক্ষক',
      value: '...',
      icon: FiBookOpen,
      change: '',
      changeType: 'increase',
      color: 'bg-green-500'
    },
    {
      name: 'মাসিক আয়',
      value: '...',
      icon: FiDollarSign,
      change: '',
      changeType: 'increase',
      color: 'bg-yellow-500'
    },
    {
      name: 'আজকের হাজিরা',
      value: '...',
      icon: FiClipboard,
      change: '',
      changeType: 'decrease',
      color: 'bg-purple-500'
    }
  ]);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      // ছাত্রদের সংখ্যা
      const studentsResponse = await fetch('/api/students?limit=1');
      const studentsData = await studentsResponse.json();
      const totalStudents = studentsData.success ? studentsData.pagination?.total || 0 : 0;

      // শিক্ষকদের সংখ্যা
      const teachersResponse = await fetch('/api/teachers?limit=1');
      const teachersData = await teachersResponse.json();
      const totalTeachers = teachersData.success ? teachersData.pagination?.total || 0 : 0;

      // ডিফল্ট ভ্যালু (ফাইল ডাটাবেজের জন্য)
      const todayAttendance = 85; // ডিফল্ট
      const monthlyCollection = 45000; // ডিফল্ট

      setStats([
        {
          name: 'মোট ছাত্র',
          value: totalStudents.toString(),
          icon: FiUsers,
          change: '+১২%',
          changeType: 'increase',
          color: 'bg-blue-500'
        },
        {
          name: 'মোট শিক্ষক',
          value: totalTeachers.toString(),
          icon: FiBookOpen,
          change: '+৩%',
          changeType: 'increase',
          color: 'bg-green-500'
        },
        {
          name: 'মাসিক আয়',
          value: `৳${monthlyCollection.toLocaleString()}`,
          icon: FiDollarSign,
          change: '+৮%',
          changeType: 'increase',
          color: 'bg-yellow-500'
        },
        {
          name: 'আজকের হাজিরা',
          value: `${todayAttendance}%`,
          icon: FiClipboard,
          change: '-২%',
          changeType: 'decrease',
          color: 'bg-purple-500'
        }
      ]);
    } catch (error) {
      console.error('ড্যাশবোর্ড পরিসংখ্যান লোড করতে সমস্যা:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
        >
          <dt>
            <div className={`absolute rounded-md p-3 ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            {stat.change && (
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            )}
          </dd>
        </div>
      ))}
    </div>
  );
}