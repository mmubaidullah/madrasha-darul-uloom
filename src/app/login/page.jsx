'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, getSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { getRoleBasedRedirectUrl } from '@/lib/auth';

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const error = searchParams.get('error');
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Show error message if there's an authentication error
  useEffect(() => {
    if (error) {
      const errorMessages = {
        CredentialsSignin: 'ভুল ইমেইল বা পাসওয়ার্ড',
        OAuthSignin: 'OAuth সাইন ইন এ সমস্যা হয়েছে',
        OAuthCallback: 'OAuth কলব্যাক এ সমস্যা হয়েছে',
        OAuthCreateAccount: 'OAuth অ্যাকাউন্ট তৈরিতে সমস্যা হয়েছে',
        EmailCreateAccount: 'ইমেইল অ্যাকাউন্ট তৈরিতে সমস্যা হয়েছে',
        Callback: 'কলব্যাক এ সমস্যা হয়েছে',
        OAuthAccountNotLinked: 'এই ইমেইল দিয়ে ইতিমধ্যে অন্য পদ্ধতিতে অ্যাকাউন্ট আছে',
        EmailSignin: 'ইমেইল সাইন ইন এ সমস্যা হয়েছে',
        CredentialsSignup: 'অ্যাকাউন্ট তৈরিতে সমস্যা হয়েছে',
        SessionRequired: 'লগইন প্রয়োজন',
      };
      
      toast.error(errorMessages[error] || 'লগইন করতে সমস্যা হয়েছে');
    }
  }, [error]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.ok) {
        toast.success('সফলভাবে লগইন হয়েছে!');
        
        // Get session to determine role-based redirect
        const session = await getSession();
        if (session?.user?.role) {
          const redirectUrl = getRoleBasedRedirectUrl(session.user.role);
          router.push(callbackUrl !== '/dashboard' ? callbackUrl : redirectUrl);
        } else {
          router.push(callbackUrl);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthSignIn = async (provider) => {
    try {
      await signIn(provider, { callbackUrl });
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
      toast.error(`${provider} দিয়ে লগইন করতে সমস্যা হয়েছে`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-green-600 rounded-full flex items-center justify-center">
            <FiLogIn className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            আপনার অ্যাকাউন্টে লগইন করুন
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            মাদরাসা ব্যবস্থাপনা সিস্টেমে প্রবেশ করুন
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ইমেইল ঠিকানা *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'ইমেইল আবশ্যক',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'সঠিক ইমেইল ঠিকানা প্রদান করুন'
                    }
                  })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="example@email.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                পাসওয়ার্ড *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { 
                    required: 'পাসওয়ার্ড আবশ্যক'
                  })}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="আপনার পাসওয়ার্ড"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
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
                <Link href="/forgot-password" className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200">
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
            </button>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">অথবা</span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={() => handleOAuthSignIn('google')}
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              <FaGoogle className="h-5 w-5 text-red-500 mr-3" />
              Google দিয়ে লগইন করুন
            </button>

            {/* Facebook Sign In */}
            <button
              type="button"
              onClick={() => handleOAuthSignIn('facebook')}
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              <FaFacebook className="h-5 w-5 text-blue-600 mr-3" />
              Facebook দিয়ে লগইন করুন
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              নতুন ব্যবহারকারী?{' '}
              <Link href="/register" className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200">
                নিবন্ধন করুন
              </Link>
            </p>
          </div>

          {/* Demo Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="text-sm text-blue-800">
              <strong>টেস্ট অ্যাকাউন্ট:</strong><br/>
              <strong>ইমেইল:</strong> admin@madrasha.com<br/>
              <strong>পাসওয়ার্ড:</strong> admin123<br/>
              <strong>ভূমিকা:</strong> Super Admin
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}