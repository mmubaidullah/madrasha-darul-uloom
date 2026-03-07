'use client';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave, FiUpload, FiImage } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function GeneralSettingsPage() {
  const [logoPreview, setLogoPreview] = useState(null);
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      instituteName: 'দারুল উলুম মাদরাসা',
      instituteNameEnglish: 'Darul Uloom Madrasha',
      address: 'দেওবন্দ, উত্তর প্রদেশ, ভারত',
      phone: '০১৭১২৩৪৫৬৭৮',
      email: 'info@darululoom.edu',
      website: 'www.darululoom.edu',
      establishedYear: '১৮৬৬',
      principalName: 'মাওলানা আব্দুল হাই',
      themeColor: '#059669'
    }
  });

  const onSubmit = (data) => {
    console.log('Settings data:', data);
    toast.success('সেটিংস সফলভাবে সংরক্ষিত হয়েছে!');
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      toast.success('লোগো আপলোড হয়েছে');
    }
  };

  const themeColors = [
    { name: 'সবুজ', value: '#059669' },
    { name: 'নীল', value: '#2563EB' },
    { name: 'বেগুনি', value: '#7C3AED' },
    { name: 'গোলাপি', value: '#DB2777' },
    { name: 'কমলা', value: '#EA580C' },
    { name: 'লাল', value: '#DC2626' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">সাধারণ সেটিংস</h1>
        <p className="mt-1 text-sm text-gray-600">
          আপনার প্রতিষ্ঠানের মূল তথ্য এবং ব্র্যান্ডিং পরিবর্তন করুন
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Institution Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">প্রতিষ্ঠানের তথ্য</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                প্রতিষ্ঠানের নাম (বাংলা) *
              </label>
              <input
                type="text"
                {...register('instituteName', { required: 'এই ফিল্ডটি আবশ্যক' })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.instituteName && (
                <p className="mt-1 text-sm text-red-600">{errors.instituteName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                প্রতিষ্ঠানের নাম (ইংরেজি) *
              </label>
              <input
                type="text"
                {...register('instituteNameEnglish', { required: 'এই ফিল্ডটি আবশ্যক' })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.instituteNameEnglish && (
                <p className="mt-1 text-sm text-red-600">{errors.instituteNameEnglish.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ঠিকানা *
              </label>
              <textarea
                {...register('address', { required: 'এই ফিল্ডটি আবশ্যক' })}
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ফোন নম্বর *
              </label>
              <input
                type="tel"
                {...register('phone', { required: 'এই ফিল্ডটি আবশ্যক' })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ইমেইল
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ওয়েবসাইট
              </label>
              <input
                type="url"
                {...register('website')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                প্রতিষ্ঠার বছর
              </label>
              <input
                type="text"
                {...register('establishedYear')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                অধ্যক্ষের নাম
              </label>
              <input
                type="text"
                {...register('principalName')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">প্রতিষ্ঠানের লোগো</h3>
          
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain rounded-lg" />
                ) : (
                  <div className="text-center">
                    <FiImage className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">লোগো প্রিভিউ</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                নতুন লোগো আপলোড করুন
              </label>
              <div className="flex items-center space-x-4">
                <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <FiUpload className="mr-2 h-4 w-4" />
                  ফাইল নির্বাচন করুন
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                PNG, JPG, GIF ফরম্যাট সাপোর্ট করে। সর্বোচ্চ সাইজ ২MB।
              </p>
            </div>
          </div>
        </div>

        {/* Theme Color */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">থিম কালার</h3>
          <p className="text-sm text-gray-600 mb-4">
            আপনার পছন্দের রঙ নির্বাচন করুন। এই রঙটি পুরো সিস্টেমে ব্যবহৃত হবে।
          </p>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {themeColors.map((color) => (
              <label key={color.value} className="cursor-pointer">
                <input
                  type="radio"
                  {...register('themeColor')}
                  value={color.value}
                  className="sr-only"
                />
                <div className={`
                  w-16 h-16 rounded-lg border-4 transition-all
                  ${watch('themeColor') === color.value 
                    ? 'border-gray-900 scale-110' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `} style={{ backgroundColor: color.value }}>
                </div>
                <p className="text-center text-xs text-gray-600 mt-1">{color.name}</p>
              </label>
            ))}
          </div>
        </div>

        {/* Academic Year Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">একাডেমিক সেটিংস</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                বর্তমান শিক্ষাবর্ষ
              </label>
              <select
                {...register('currentAcademicYear')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="2024">২০২৪</option>
                <option value="2025">২০২৫</option>
                <option value="2026">২০২৬</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                সেশন শুরুর মাস
              </label>
              <select
                {...register('sessionStartMonth')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="1">জানুয়ারি</option>
                <option value="2">ফেব্রুয়ারি</option>
                <option value="3">মার্চ</option>
                <option value="4">এপ্রিল</option>
                <option value="5">মে</option>
                <option value="6">জুন</option>
                <option value="7">জুলাই</option>
                <option value="8">আগস্ট</option>
                <option value="9">সেপ্টেম্বর</option>
                <option value="10">অক্টোবর</option>
                <option value="11">নভেম্বর</option>
                <option value="12">ডিসেম্বর</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            <FiSave className="mr-2 h-5 w-5" />
            পরিবর্তন সেভ করুন
          </button>
        </div>
      </form>
    </div>
  );
}
