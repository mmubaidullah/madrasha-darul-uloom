'use client';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { FiPlus, FiTrash2, FiSave, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CreateExamPage() {
  const { register, control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      examName: '',
      academicYear: '2024',
      examType: 'annual',
      startDate: '',
      endDate: '',
      classes: ['class-8'],
      subjects: [
        { name: 'আরবি', fullMarks: 100, passMarks: 40, examDate: '', examTime: '10:00' },
        { name: 'বাংলা', fullMarks: 100, passMarks: 40, examDate: '', examTime: '10:00' }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subjects'
  });

  const onSubmit = (data) => {
    console.log('Exam data:', data);
    toast.success('পরীক্ষা সফলভাবে তৈরি হয়েছে!');
  };

  const addSubject = () => {
    append({ name: '', fullMarks: 100, passMarks: 40, examDate: '', examTime: '10:00' });
  };

  const examTypes = [
    { value: 'half-yearly', label: 'অর্ধবার্ষিক পরীক্ষা' },
    { value: 'annual', label: 'বার্ষিক পরীক্ষা' },
    { value: 'test', label: 'টেস্ট পরীক্ষা' },
    { value: 'monthly', label: 'মাসিক পরীক্ষা' }
  ];

  const classes = [
    { value: 'class-6', label: 'ক্লাস ৬' },
    { value: 'class-7', label: 'ক্লাস ৭' },
    { value: 'class-8', label: 'ক্লাস ৮' },
    { value: 'class-9', label: 'ক্লাস ৯' },
    { value: 'class-10', label: 'ক্লাস ১০' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">নতুন পরীক্ষা তৈরি</h1>
        <p className="mt-1 text-sm text-gray-600">
          নতুন পরীক্ষার সকল তথ্য এবং রুটিন তৈরি করুন
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">মূল তথ্য</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                পরীক্ষার নাম *
              </label>
              <input
                type="text"
                {...register('examName', { required: 'পরীক্ষার নাম আবশ্যক' })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="বার্ষিক পরীক্ষা ২০২৪"
              />
              {errors.examName && (
                <p className="mt-1 text-sm text-red-600">{errors.examName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                পরীক্ষার ধরন *
              </label>
              <select
                {...register('examType', { required: 'পরীক্ষার ধরন নির্বাচন করুন' })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                {examTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              {errors.examType && (
                <p className="mt-1 text-sm text-red-600">{errors.examType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                শিক্ষাবর্ষ *
              </label>
              <select
                {...register('academicYear', { required: 'শিক্ষাবর্ষ নির্বাচন করুন' })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="2024">২০২৪</option>
                <option value="2025">২০২৫</option>
                <option value="2026">২০২৬</option>
              </select>
              {errors.academicYear && (
                <p className="mt-1 text-sm text-red-600">{errors.academicYear.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                প্রযোজ্য ক্লাস *
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
                {classes.map(cls => (
                  <label key={cls.value} className="flex items-center">
                    <input
                      type="checkbox"
                      value={cls.value}
                      {...register('classes', { required: 'কমপক্ষে একটি ক্লাস নির্বাচন করুন' })}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-900">{cls.label}</span>
                  </label>
                ))}
              </div>
              {errors.classes && (
                <p className="mt-1 text-sm text-red-600">{errors.classes.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                শুরুর তারিখ *
              </label>
              <input
                type="date"
                {...register('startDate', { required: 'শুরুর তারিখ আবশ্যক' })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                শেষের তারিখ *
              </label>
              <input
                type="date"
                {...register('endDate', { required: 'শেষের তারিখ আবশ্যক' })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Subjects and Routine */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">বিষয় ও রুটিন</h3>
            <button
              type="button"
              onClick={addSubject}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
            >
              <FiPlus className="mr-1 h-4 w-4" />
              বিষয় যোগ করুন
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-md font-medium text-gray-900">বিষয় {index + 1}</h4>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      বিষয়ের নাম *
                    </label>
                    <input
                      type="text"
                      {...register(`subjects.${index}.name`, { required: 'বিষয়ের নাম আবশ্যক' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="আরবি"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      পূর্ণ নম্বর *
                    </label>
                    <input
                      type="number"
                      {...register(`subjects.${index}.fullMarks`, { required: 'পূর্ণ নম্বর আবশ্যক' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      পাস নম্বর *
                    </label>
                    <input
                      type="number"
                      {...register(`subjects.${index}.passMarks`, { required: 'পাস নম্বর আবশ্যক' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="40"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      পরীক্ষার তারিখ *
                    </label>
                    <input
                      type="date"
                      {...register(`subjects.${index}.examDate`, { required: 'পরীক্ষার তারিখ আবশ্যক' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      সময় *
                    </label>
                    <input
                      type="time"
                      {...register(`subjects.${index}.examTime`, { required: 'পরীক্ষার সময় আবশ্যক' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">নির্দেশনা</h3>
          <textarea
            {...register('instructions')}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="পরীক্ষার বিশেষ নির্দেশনা লিখুন..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            বাতিল
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            <FiSave className="mr-2 h-4 w-4" />
            পরীক্ষা তৈরি করুন
          </button>
        </div>
      </form>
    </div>
  );
}
