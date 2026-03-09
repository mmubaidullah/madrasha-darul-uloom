'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave, FiArrowLeft, FiUser, FiUsers } from 'react-icons/fi';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  DEPARTMENTS, 
  getCurrentDepartmentClasses,
  initializeDepartments,
  getActiveDepartments 
} from '@/lib/departments';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function StudentAdmissionPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departmentClasses, setDepartmentClasses] = useState({});
  const [activeDepartments, setActiveDepartments] = useState({});
  
  // Watch department selection to update class options
  const watchedDepartment = watch('department');
  const watchSameAddress = watch('sameAsPermanent');
  const watchDateOfBirth = watch('dateOfBirth');

  // Initialize departments and load classes
  useEffect(() => {
    initializeDepartments();
    const classes = getCurrentDepartmentClasses();
    const active = getActiveDepartments();
    setDepartmentClasses(classes);
    setActiveDepartments(active);
  }, []);

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return { years: '', months: '' };
    
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    return { years: years.toString(), months: months.toString() };
  };

  // Auto-calculate age when date of birth changes
  useEffect(() => {
    if (watchDateOfBirth) {
      const age = calculateAge(watchDateOfBirth);
      setValue('ageYears', age.years);
      setValue('ageMonths', age.months);
    }
  }, [watchDateOfBirth, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting form data:', data);
      
      // Process form data
      const processedData = {
        // Basic Information
        studentName: data.studentName,
        nationality: data.nationality || 'বাংলাদেশী',
        dateOfBirth: data.dateOfBirth,
        ageYears: data.ageYears,
        ageMonths: data.ageMonths,
        bloodGroup: data.bloodGroup,
        fatherName: data.fatherName,
        fatherProfession: data.fatherProfession,
        fatherMobile: data.fatherMobile,
        motherName: data.motherName,
        motherProfession: data.motherProfession,
        motherMobile: data.motherMobile,
        birthCertificate: data.birthCertificate,
        photo: data.photo?.[0]?.name || null, // File handling would need proper implementation
        
        // Address Information
        presentAddress: {
          village: data.presentVillage,
          postOffice: data.presentPostOffice,
          upazila: data.presentUpazila,
          district: data.presentDistrict
        },
        permanentAddress: data.sameAsPermanent ? {
          village: data.presentVillage,
          postOffice: data.presentPostOffice,
          upazila: data.presentUpazila,
          district: data.presentDistrict
        } : {
          village: data.permanentVillage,
          postOffice: data.permanentPostOffice,
          upazila: data.permanentUpazila,
          district: data.permanentDistrict
        },
        
        // Guardian Information
        guardianName: data.guardianName,
        guardianRelation: data.guardianRelation,
        guardianMobile: data.guardianMobile,
        guardianEmail: data.guardianEmail,
        
        // Educational Information
        previousInstitution: data.previousInstitution,
        department: data.department,
        admissionClass: data.admissionClass,
        academicYear: data.academicYear,
        hostelRequired: data.hostelRequired || 'no',
        specialComments: data.specialComments,
        
        // System fields
        admissionDate: new Date().toISOString(),
        status: 'pending',
        group: 'অনির্ধারিত',
        studentId: `STD${Date.now()}`
      };
      
      const response = await fetch('http://localhost:3001/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success('ভর্তি আবেদন সফলভাবে জমা হয়েছে!');
        setTimeout(() => {
          window.location.href = '/admin/students';
        }, 2000);
      } else {
        toast.error(result.error || 'ভর্তি আবেদন জমা দিতে সমস্যা হয়েছে');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('ভর্তি আবেদন জমা দিতে সমস্যা হয়েছে');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { id: 1, name: 'ব্যক্তিগত ও ঠিকানা', icon: FiUser },
    { id: 2, name: 'অভিভাবক ও শিক্ষাগত', icon: FiUsers }
  ];
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/students" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <FiArrowLeft className="mr-2 h-4 w-4" />
            ফিরে যান
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">নতুন ছাত্র ভর্তি</h1>
            <p className="mt-1 text-sm text-gray-600">মাদরাসা দারুল উলুম আল ইসলামিয়া - ভর্তি ফরম</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white shadow rounded-lg p-6">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                <div className="flex items-center">
                  <div className={`relative flex h-10 w-10 items-center justify-center rounded-full ${
                      step.id <= currentStep ? 'bg-green-600 text-white' : 'border-2 border-gray-300 bg-white text-gray-500'
                    }`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div className={`absolute top-5 left-5 -ml-px mt-0.5 h-0.5 w-full ${
                      step.id < currentStep ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white shadow rounded-lg p-6">
          {/* Step 1: Personal Information & Address */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="flex items-center space-x-2 mb-6">
                <FiUser className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-medium text-gray-900">ব্যক্তিগত তথ্য ও ঠিকানা</h3>
              </div>
              
              {/* ব্যক্তিগত তথ্য */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-md font-medium text-gray-800 mb-4">ব্যক্তিগত তথ্য</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* First Row */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">নাম *</label>
                    <input type="text" {...register('studentName', { required: 'ছাত্রের নাম আবশ্যক' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="মোহাম্মদ আব্দুল্লাহ" />
                    {errors.studentName && <p className="mt-1 text-sm text-red-600">{errors.studentName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">জাতীয়তা</label>
                    <input type="text" {...register('nationality')} defaultValue="বাংলাদেশী"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="বাংলাদেশী" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ছবি</label>
                    <input type="file" {...register('photo')} accept="image/*"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                  </div>

                  {/* Second Row */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">জন্ম তারিখ *</label>
                    <input type="date" {...register('dateOfBirth', { required: 'জন্ম তারিখ আবশ্যক' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                    {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">বয়স</label>
                    <div className="flex space-x-2">
                      <input type="text" {...register('ageYears')} readOnly
                        className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm" placeholder="বছর" />
                      <input type="text" {...register('ageMonths')} readOnly
                        className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm" placeholder="মাস" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">রক্তের গ্রুপ</label>
                    <select {...register('bloodGroup')}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                      <option value="">নির্বাচন করুন</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  {/* Third Row */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">পিতার নাম *</label>
                    <input type="text" {...register('fatherName', { required: 'পিতার নাম আবশ্যক' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="মোহাম্মদ আব্দুর রহমান" />
                    {errors.fatherName && <p className="mt-1 text-sm text-red-600">{errors.fatherName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">পেশা</label>
                    <input type="text" {...register('fatherProfession')}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="কৃষক/ব্যবসায়ী/চাকরিজীবী" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">মোবাইল</label>
                    <input type="tel" {...register('fatherMobile')}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="০১৭১২৩৪৫৬৭৮" />
                  </div>

                  {/* Fourth Row */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">মাতার নাম *</label>
                    <input type="text" {...register('motherName', { required: 'মাতার নাম আবশ্যক' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="মোসাম্মৎ ফাতিমা খাতুন" />
                    {errors.motherName && <p className="mt-1 text-sm text-red-600">{errors.motherName.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">পেশা</label>
                    <input type="text" {...register('motherProfession')}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="গৃহিণী/শিক্ষক/অন্যান্য" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">মোবাইল</label>
                    <input type="tel" {...register('motherMobile')}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="০১৭১২৩৪৫৬৭৮" />
                  </div>

                  {/* Fifth Row */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">জন্ম নিবন্ধন নম্বর</label>
                    <input type="text" {...register('birthCertificate')}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="১২৩৪৫৬৭৮৯০১২৩৪৫৬৭" />
                  </div>
                </div>
              </div>
              {/* ঠিকানা */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-md font-medium text-gray-800 mb-4">ঠিকানা</h4>
                
                {/* বর্তমান ঠিকানা */}
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">বর্তমান ঠিকানা</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input type="text" {...register('presentVillage', { required: 'গ্রামের নাম আবশ্যক' })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="গ্রাম *" />
                      {errors.presentVillage && <p className="mt-1 text-sm text-red-600">{errors.presentVillage.message}</p>}
                    </div>
                    <div>
                      <input type="text" {...register('presentPostOffice', { required: 'ডাকঘরের নাম আবশ্যক' })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="ডাকঘর *" />
                      {errors.presentPostOffice && <p className="mt-1 text-sm text-red-600">{errors.presentPostOffice.message}</p>}
                    </div>
                    <div>
                      <input type="text" {...register('presentUpazila', { required: 'উপজেলার নাম আবশ্যক' })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="উপজেলা *" />
                      {errors.presentUpazila && <p className="mt-1 text-sm text-red-600">{errors.presentUpazila.message}</p>}
                    </div>
                    <div>
                      <input type="text" {...register('presentDistrict', { required: 'জেলার নাম আবশ্যক' })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="জেলা *" />
                      {errors.presentDistrict && <p className="mt-1 text-sm text-red-600">{errors.presentDistrict.message}</p>}
                    </div>
                  </div>
                </div>

                {/* স্থায়ী ঠিকানা */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-sm font-medium text-gray-700">স্থায়ী ঠিকানা</h5>
                    <div className="flex items-center">
                      <input type="checkbox" {...register('sameAsPermanent')}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-900">বর্তমান ঠিকানার মতোই</label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input type="text" {...register('permanentVillage', { required: !watchSameAddress ? 'গ্রামের নাম আবশ্যক' : false })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="গ্রাম *" disabled={watchSameAddress} />
                      {errors.permanentVillage && <p className="mt-1 text-sm text-red-600">{errors.permanentVillage.message}</p>}
                    </div>
                    <div>
                      <input type="text" {...register('permanentPostOffice', { required: !watchSameAddress ? 'ডাকঘরের নাম আবশ্যক' : false })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="ডাকঘর *" disabled={watchSameAddress} />
                      {errors.permanentPostOffice && <p className="mt-1 text-sm text-red-600">{errors.permanentPostOffice.message}</p>}
                    </div>
                    <div>
                      <input type="text" {...register('permanentUpazila', { required: !watchSameAddress ? 'উপজেলার নাম আবশ্যক' : false })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="উপজেলা *" disabled={watchSameAddress} />
                      {errors.permanentUpazila && <p className="mt-1 text-sm text-red-600">{errors.permanentUpazila.message}</p>}
                    </div>
                    <div>
                      <input type="text" {...register('permanentDistrict', { required: !watchSameAddress ? 'জেলার নাম আবশ্যক' : false })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="জেলা *" disabled={watchSameAddress} />
                      {errors.permanentDistrict && <p className="mt-1 text-sm text-red-600">{errors.permanentDistrict.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Step 2: Guardian & Educational Information */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="flex items-center space-x-2 mb-6">
                <FiUsers className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-medium text-gray-900">অভিভাবক ও শিক্ষাগত তথ্য</h3>
              </div>
              
              {/* অভিভাবকের তথ্য */}
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="text-md font-medium text-gray-800 mb-4">অভিভাবকের তথ্য</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">অভিভাবকের নাম *</label>
                    <input type="text" {...register('guardianName', { required: 'অভিভাবকের নাম আবশ্যক' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="মোহাম্মদ আব্দুর রহমান" />
                    {errors.guardianName && <p className="mt-1 text-sm text-red-600">{errors.guardianName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">সম্পর্ক</label>
                    <select {...register('guardianRelation')}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                      <option value="">নির্বাচন করুন</option>
                      <option value="father">পিতা</option>
                      <option value="mother">মাতা</option>
                      <option value="uncle">চাচা</option>
                      <option value="aunt">খালা</option>
                      <option value="grandfather">দাদা</option>
                      <option value="grandmother">নানী</option>
                      <option value="brother">ভাই</option>
                      <option value="other">অন্যান্য</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">অভিভাবকের মোবাইল *</label>
                    <input type="tel" {...register('guardianMobile', { required: 'অভিভাবকের মোবাইল নম্বর আবশ্যক' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="০১৭১২৩৪৫৬৭৮" />
                    {errors.guardianMobile && <p className="mt-1 text-sm text-red-600">{errors.guardianMobile.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">অভিভাবকের ইমেইল</label>
                    <input type="email" {...register('guardianEmail')}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="example@email.com" />
                  </div>
                </div>
              </div>
              {/* শিক্ষাগত তথ্য */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-md font-medium text-gray-800 mb-4">শিক্ষাগত তথ্য</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">বিভাগ *</label>
                    <select {...register('department', { required: 'বিভাগ নির্বাচন আবশ্যক' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                      <option value="">বিভাগ নির্বাচন করুন</option>
                      {Object.values(activeDepartments).map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">জামাত/ক্লাস *</label>
                    <select {...register('admissionClass', { required: 'জামাত/ক্লাস নির্বাচন আবশ্যক' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      disabled={!watchedDepartment}>
                      <option value="">{watchedDepartment ? 'জামাত/ক্লাস নির্বাচন করুন' : 'প্রথমে বিভাগ নির্বাচন করুন'}</option>
                      {watchedDepartment && departmentClasses[watchedDepartment]?.map((className) => (
                        <option key={className} value={className}>{className}</option>
                      ))}
                    </select>
                    {errors.admissionClass && <p className="mt-1 text-sm text-red-600">{errors.admissionClass.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">শিক্ষাবর্ষ *</label>
                    <select {...register('academicYear', { required: 'শিক্ষাবর্ষ নির্বাচন আবশ্যক' })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                      <option value="">নির্বাচন করুন</option>
                      <option value="2024">২০২৪</option>
                      <option value="2025">২০২৫</option>
                      <option value="2026">২০২৬</option>
                      <option value="2027">২০২৭</option>
                    </select>
                    {errors.academicYear && <p className="mt-1 text-sm text-red-600">{errors.academicYear.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">পূর্বের শিক্ষা প্রতিষ্ঠান</label>
                    <input type="text" {...register('previousInstitution')}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="পূর্বের স্কুল/মাদরাসার নাম" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">হোস্টেল প্রয়োজন?</label>
                    <select {...register('hostelRequired')}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                      <option value="no">না</option>
                      <option value="yes">হ্যাঁ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">বিশেষ মন্তব্য</label>
                    <textarea {...register('specialComments')} rows={3}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="যদি কোনো বিশেষ তথ্য বা অনুরোধ থাকে" />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button type="button" onClick={prevStep} disabled={currentStep === 1}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                currentStep === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}>
              পূর্ববর্তী
            </button>
            
            <div className="flex space-x-3">
              {currentStep < 2 ? (
                <button type="button" onClick={nextStep}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                  পরবর্তী
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  <FiSave className="mr-2 h-5 w-5" />
                  {isSubmitting ? 'ভর্তি প্রক্রিয়া চলছে...' : 'ভর্তি আবেদন জমা দিন'}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}