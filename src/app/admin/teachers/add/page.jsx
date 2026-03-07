'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiSave, FiArrowLeft, FiUser, FiPhone, FiBook } from 'react-icons/fi';
import Link from 'next/link';
import { DEPARTMENTS } from '@/lib/departments';

export default function AddTeacherPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nameBangla: '',
    nameEnglish: '',
    designation: '',
    department: '',
    subject: '',
    qualification: '',
    experience: '',
    phoneNumber: '',
    email: '',
    address: '',
    joiningDate: new Date().toISOString().split('T')[0],
    salary: '',
    bloodGroup: '',
    nidNumber: '',
    emergencyContact: '',
    previousInstitution: '',
    specialization: '',
    teachingLevel: '',
    status: 'active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('শিক্ষক সফলভাবে যোগ করা হয়েছে!');
        router.push('/admin/teachers');
      } else {
        toast.error(result.error || 'শিক্ষক যোগ করতে ব্যর্থ');
      }
    } catch (error) {
      console.error('Add teacher error:', error);
      toast.error('শিক্ষক যোগ করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const designations = [
    'প্রধান শিক্ষক',
    'সহকারী প্রধান শিক্ষক',
    'সিনিয়র শিক্ষক',
    'জুনিয়র শিক্ষক',
    'হিফজ শিক্ষক',
    'নাজেরা শিক্ষক',
    'আরবি শিক্ষক',
    'বাংলা শিক্ষক',
    'ইংরেজি শিক্ষক',
    'গণিত শিক্ষক',
    'বিজ্ঞান শিক্ষক',
    'ইসলামিক স্টাডিজ শিক্ষক'
  ];

  const subjects = [
    'কুরআন মজিদ',
    'হাদিস শরিফ',
    'ফিকহ',
    'আকিদা',
    'তাফসির',
    'আরবি ব্যাকরণ',
    'আরবি সাহিত্য',
    'বাংলা',
    'ইংরেজি',
    'গণিত',
    'বিজ্ঞান',
    'ইতিহাস',
    'ভূগোল',
    'হিফজুল কুরআন'
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">নতুন শিক্ষক যোগ করুন</h1>
            <p className="mt-1 text-sm text-gray-600">
              শিক্ষকের সম্পূর্ণ তথ্য পূরণ করুন
            </p>
          </div>
          <Link
            href="/admin/teachers"
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            ফিরে যান
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FiUser className="mr-2" />
            ব্যক্তিগত তথ্য
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                নাম (বাংলা) *
              </label>
              <input
                type="text"
                name="nameBangla"
                value={formData.nameBangla}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="মাওলানা আবু বকর সিদ্দিক"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                নাম (ইংরেজি)
              </label>
              <input
                type="text"
                name="nameEnglish"
                value={formData.nameEnglish}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Maulana Abu Bakr Siddique"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                পদবী *
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">পদবী নির্বাচন করুন</option>
                {designations.map(designation => (
                  <option key={designation} value={designation}>
                    {designation}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                বিভাগ *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">বিভাগ নির্বাচন করুন</option>
                {Object.values(DEPARTMENTS).map(dept => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                বিষয় *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">বিষয় নির্বাচন করুন</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                শিক্ষাগত যোগ্যতা *
              </label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="দাওরায়ে হাদিস, এমএ ইসলামিক স্টাডিজ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                অভিজ্ঞতা
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="১৫ বছর"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                রক্তের গ্রুপ
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">রক্তের গ্রুপ নির্বাচন করুন</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                জাতীয় পরিচয়পত্র নম্বর
              </label>
              <input
                type="text"
                name="nidNumber"
                value={formData.nidNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="১২৩৪৫৬৭৮৯০১২৩"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FiPhone className="mr-2" />
            যোগাযোগের তথ্য
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                মোবাইল নম্বর *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="০১৭১২৩৪৫৬১৮"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ইমেইল
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="teacher@madrasha.edu.bd"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                জরুরি যোগাযোগ
              </label>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="০১৮১২৩৪৫৬৭৮"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ঠিকানা *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="গ্রাম, পোস্ট অফিস, থানা, জেলা"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <FiBook className="mr-2" />
            পেশাগত তথ্য
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                যোগদানের তারিখ *
              </label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                মাসিক বেতন
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="২৫০০০"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                পূর্ববর্তী প্রতিষ্ঠান
              </label>
              <input
                type="text"
                name="previousInstitution"
                value={formData.previousInstitution}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="জামিয়া ইসলামিয়া ঢাকা"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                বিশেষত্ব
              </label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="তাজবিদ, কিরাত"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                শিক্ষাদানের জামাত
              </label>
              <select
                name="teachingLevel"
                value={formData.teachingLevel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">জামাত নির্বাচন করুন</option>
                <option value="ইবতিদাইয়্যাহ-১ (উর্দূ)">ইবতিদাইয়্যাহ-১ (উর্দূ)</option>
                <option value="ইবতিদাইয়্যাহ-২ (তাইসীর)">ইবতিদাইয়্যাহ-২ (তাইসীর)</option>
                <option value="মুতাওয়াসসিতাহ-১ (মিযান)">মুতাওয়াসসিতাহ-১ (মিযান)</option>
                <option value="মুতাওয়াসসিতাহ-২ (নাহবেমীর)">মুতাওয়াসসিতাহ-২ (নাহবেমীর)</option>
                <option value="মুতাওয়াসসিতাহ-৩ (হেদায়াতুন্নাহু)">মুতাওয়াসসিতাহ-৩ (হেদায়াতুন্নাহু)</option>
                <option value="সানাবিয়া 'আম্মাহ (কাফিয়া-শরহে জামী)">সানাবিয়া 'আম্মাহ (কাফিয়া-শরহে জামী)</option>
                <option value="সানাবিয়া উলইয়া (শরহে বেকায়া)">সানাবিয়া উলইয়া (শরহে বেকায়া)</option>
                <option value="ফযিলত-১ (জালালাইন)">ফযিলত-১ (জালালাইন)</option>
                <option value="ফযিলত-২ (মেশকাত)">ফযিলত-২ (মেশকাত)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                অবস্থা
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="active">সক্রিয়</option>
                <option value="inactive">নিষ্ক্রিয়</option>
                <option value="on_leave">ছুটিতে</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/teachers"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            বাতিল
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            <FiSave className="mr-2 h-4 w-4" />
            {loading ? 'সংরক্ষণ করা হচ্ছে...' : 'সংরক্ষণ করুন'}
          </button>
        </div>
      </form>
    </div>
  );
}