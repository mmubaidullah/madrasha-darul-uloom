'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiDownload, FiPrinter, FiAward, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { DEPARTMENTS, DEPARTMENT_CLASSES } from '@/lib/departments';

export default function CertificatesPage() {
  const [activeTab, setActiveTab] = useState('certificates');
  const [certificates, setCertificates] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data
  useEffect(() => {
    setTimeout(() => {
      setCertificates([
        {
          id: 1,
          studentName: 'মোহাম্মদ আব্দুল্লাহ',
          studentId: 'STD0001',
          certificateType: 'সমাপনী সার্টিফিকেট',
          class: 'ফযিলত-২ (মেশকাত)',
          issueDate: '2024-03-01',
          certificateNumber: 'CERT-2024-001',
          grade: 'মুমতাজ',
          status: 'issued'
        },
        {
          id: 2,
          studentName: 'আহমদ হাসান',
          studentId: 'STD0002',
          certificateType: 'চরিত্র সনদপত্র',
          class: 'সানাবিয়া উলইয়া (শরহে বেকায়া)',
          issueDate: '2024-02-28',
          certificateNumber: 'CERT-2024-002',
          grade: 'জায়্যিদ জিদ্দান',
          status: 'issued'
        },
        {
          id: 3,
          studentName: 'মুহাম্মদ ইব্রাহিম',
          studentId: 'STD0003',
          certificateType: 'হিফজ সার্টিফিকেট',
          class: 'ইবতিদাইয়্যাহ-১ (উর্দূ)',
          issueDate: '2024-03-05',
          certificateNumber: 'CERT-2024-003',
          grade: 'মুমতাজ',
          status: 'pending'
        }
      ]);

      setTemplates([
        {
          id: 1,
          name: 'সমাপনী সার্টিফিকেট টেমপ্লেট',
          type: 'সমাপনী সার্টিফিকেট',
          description: 'কোর্স সমাপনের জন্য সার্টিফিকেট',
          createdDate: '2024-01-15',
          status: 'active'
        },
        {
          id: 2,
          name: 'চরিত্র সনদপত্র টেমপ্লেট',
          type: 'চরিত্র সনদপত্র',
          description: 'ছাত্রের চরিত্র সনদপত্র',
          createdDate: '2024-01-20',
          status: 'active'
        },
        {
          id: 3,
          name: 'হিফজ সার্টিফিকেট টেমপ্লেট',
          type: 'হিফজ সার্টিফিকেট',
          description: 'কুরআন হিফজ সম্পন্নের সার্টিফিকেট',
          createdDate: '2024-01-25',
          status: 'active'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const tabs = [
    { id: 'certificates', name: 'সার্টিফিকেট তালিকা', icon: FiAward },
    { id: 'generate', name: 'নতুন সার্টিফিকেট', icon: FiPlus },
    { id: 'templates', name: 'টেমপ্লেট', icon: FiFileText },
    { id: 'reports', name: 'রিপোর্ট', icon: FiEye }
  ];

  const certificateTypes = [
    'সমাপনী সার্টিফিকেট',
    'চরিত্র সনদপত্র',
    'হিফজ সার্টিফিকেট',
    'উপস্থিতি সনদপত্র',
    'পুরস্কার সার্টিফিকেট',
    'অংশগ্রহণ সার্টিফিকেট'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">সার্টিফিকেট ব্যবস্থাপনা</h1>
          <p className="mt-1 text-sm text-gray-600">
            ছাত্রদের সার্টিফিকেট তৈরি ও পরিচালনা করুন
          </p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          <FiPlus className="mr-2 h-4 w-4" />
          নতুন সার্টিফিকেট তৈরি
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiAward className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">মোট সার্টিফিকেট</dt>
                  <dd className="text-lg font-medium text-gray-900">৩৫০</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiFileText className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">এই মাসে</dt>
                  <dd className="text-lg font-medium text-gray-900">২৫</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiEye className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">অপেক্ষমাণ</dt>
                  <dd className="text-lg font-medium text-gray-900">৮</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiFileText className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">টেমপ্লেট</dt>
                  <dd className="text-lg font-medium text-gray-900">৬</dd>
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
          {activeTab === 'certificates' && <CertificatesTab certificates={certificates} loading={loading} />}
          {activeTab === 'generate' && <GenerateTab certificateTypes={certificateTypes} />}
          {activeTab === 'templates' && <TemplatesTab templates={templates} loading={loading} />}
          {activeTab === 'reports' && <ReportsTab />}
        </div>
      </div>
    </div>
  );
}

// Certificates Tab Component
function CertificatesTab({ certificates, loading }) {
  if (loading) {
    return <div className="text-center py-8">লোড হচ্ছে...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">সার্টিফিকেট তালিকা</h3>
        <div className="flex space-x-2">
          <select className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
            <option value="">সব ধরন</option>
            <option value="সমাপনী সার্টিফিকেট">সমাপনী সার্টিফিকেট</option>
            <option value="চরিত্র সনদপত্র">চরিত্র সনদপত্র</option>
            <option value="হিফজ সার্টিফিকেট">হিফজ সার্টিফিকেট</option>
          </select>
          <input
            type="text"
            placeholder="ছাত্রের নাম বা ID..."
            className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ছাত্রের তথ্য</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">সার্টিফিকেট</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">গ্রেড</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">তারিখ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">অবস্থা</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">কার্যক্রম</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {certificates.map((cert) => (
              <tr key={cert.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{cert.studentName}</div>
                    <div className="text-sm text-gray-500">ID: {cert.studentId}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{cert.certificateType}</div>
                    <div className="text-sm text-gray-500">{cert.class}</div>
                    <div className="text-sm text-gray-500">#{cert.certificateNumber}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {cert.grade}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(cert.issueDate).toLocaleDateString('bn-BD')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    cert.status === 'issued' ? 'bg-green-100 text-green-800' :
                    cert.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {cert.status === 'issued' ? 'প্রদান করা হয়েছে' :
                     cert.status === 'pending' ? 'অপেক্ষমাণ' : 'বাতিল'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900" title="দেখুন">
                      <FiEye className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900" title="ডাউনলোড">
                      <FiDownload className="h-4 w-4" />
                    </button>
                    <button className="text-purple-600 hover:text-purple-900" title="প্রিন্ট">
                      <FiPrinter className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900" title="ডিলিট">
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

// Generate Tab Component
function GenerateTab({ certificateTypes }) {
  const [formData, setFormData] = useState({
    studentId: '',
    certificateType: '',
    class: '',
    grade: '',
    issueDate: new Date().toISOString().split('T')[0],
    remarks: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('সার্টিফিকেট তৈরি করা হয়েছে!');
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">নতুন সার্টিফিকেট তৈরি করুন</h3>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ছাত্র ID *
            </label>
            <input
              type="text"
              value={formData.studentId}
              onChange={(e) => setFormData({...formData, studentId: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="STD0001"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              সার্টিফিকেটের ধরন *
            </label>
            <select
              value={formData.certificateType}
              onChange={(e) => setFormData({...formData, certificateType: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            >
              <option value="">নির্বাচন করুন</option>
              {certificateTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              জামাত/কোর্স *
            </label>
            <input
              type="text"
              value={formData.class}
              onChange={(e) => setFormData({...formData, class: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="দাওরায়ে হাদিস"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              গ্রেড *
            </label>
            <select
              value={formData.grade}
              onChange={(e) => setFormData({...formData, grade: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            >
              <option value="">নির্বাচন করুন</option>
              <option value="মুমতাজ">মুমতাজ (A+)</option>
              <option value="জায়্যিদ জিদ্দান">জায়্যিদ জিদ্দান (A)</option>
              <option value="জায়্যিদ">জায়্যিদ (B)</option>
              <option value="মাকবুল">মাকবুল (C)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              প্রদানের তারিখ *
            </label>
            <input
              type="date"
              value={formData.issueDate}
              onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              মন্তব্য
            </label>
            <textarea
              value={formData.remarks}
              onChange={(e) => setFormData({...formData, remarks: e.target.value})}
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="অতিরিক্ত মন্তব্য..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            বাতিল
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            সার্টিফিকেট তৈরি করুন
          </button>
        </div>
      </form>
    </div>
  );
}

// Templates Tab Component
function TemplatesTab({ templates, loading }) {
  if (loading) {
    return <div className="text-center py-8">লোড হচ্ছে...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">সার্টিফিকেট টেমপ্লেট</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          নতুন টেমপ্লেট
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-gray-50 rounded-lg p-6 border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{template.name}</h4>
                <p className="text-sm text-gray-600">{template.type}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                template.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {template.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{template.description}</p>

            <div className="text-sm text-gray-500 mb-4">
              তৈরি: {new Date(template.createdDate).toLocaleDateString('bn-BD')}
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 text-xs bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
                প্রিভিউ
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

// Reports Tab Component
function ReportsTab() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">সার্টিফিকেট রিপোর্ট</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">মাসিক পরিসংখ্যান</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">এই মাসে প্রদান:</span>
              <span className="font-medium">২৫</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">গত মাসে প্রদান:</span>
              <span className="font-medium">৩২</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-900 font-semibold">পরিবর্তন:</span>
              <span className="font-semibold text-red-600">-২২%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">ধরন অনুযায়ী</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">সমাপনী সার্টিফিকেট:</span>
              <span className="font-medium">১৫০</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">চরিত্র সনদপত্র:</span>
              <span className="font-medium">১২০</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">হিফজ সার্টিফিকেট:</span>
              <span className="font-medium">৮০</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}