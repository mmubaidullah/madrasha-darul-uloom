'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      // Call the API endpoint
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Store in localStorage for client-side access (as plain strings)
        localStorage.setItem('auth_token', result.token);
        localStorage.setItem('user_data', JSON.stringify(result.user));
        
        // Show success message
        toast.success('সফলভাবে লগইন হয়েছে!');
        
        // Redirect to admin (cookie is set by API)
        window.location.href = '/admin';
      } else {
        toast.error(result.message || 'লগইন করতে সমস্যা হয়েছে');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('লগইন করতে সমস্যা হয়েছে');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-green-100">
            <Image
              src="/images/Madrasha-Logo.jpeg"
              alt="মাদরাসা লোগো"
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            মাদরাসা ব্যবস্থাপনা সিস্টেম
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            আপনার অ্যাকাউন্টে লগইন করুন
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                ইমেইল ঠিকানা
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', { 
                    required: 'ইমেইল ঠিকানা আবশ্যক',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'সঠিক ইমেইল ঠিকানা দিন'
                    }
                  })}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                পাসওয়ার্ড
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password', { 
                    required: 'পাসওয়ার্ড আবশ্যক',
                    minLength: {
                      value: 6,
                      message: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে'
                    }
                  })}
                  className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="আপনার পাসওয়ার্ড"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                আমাকে মনে রাখুন
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-green-600 hover:text-green-500">
                পাসওয়ার্ড ভুলে গেছেন?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  লগইন হচ্ছে...
                </div>
              ) : (
                'লগইন করুন'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ডেমো লগইন: যেকোনো ইমেইল এবং পাসওয়ার্ড ব্যবহার করুন
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}