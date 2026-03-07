'use client';
import { FiMenu, FiBell, FiUser, FiLogOut, FiHome } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminHeader({ onSidebarToggle }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get user data from localStorage
    try {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error reading user data:', error);
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Call logout API
      await fetch('/api/auth', {
        method: 'DELETE'
      });
      
      // Clear localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      
      toast.success('সফলভাবে লগ আউট হয়েছে');
      
      // Redirect to login
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local data and redirect
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
  };

  const handleMenuToggle = () => {
    onSidebarToggle(true);
  };

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white/95 backdrop-blur-sm px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 w-full">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden transition-colors"
        onClick={handleMenuToggle}
      >
        <span className="sr-only">Open sidebar</span>
        <FiMenu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center">
          <Link href="/" className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
            মাদরাসা ব্যবস্থাপনা সিস্টেম
          </Link>
        </div>
        
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Home Button */}
          <Link
            href="/"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 flex items-center gap-2 transition-colors"
            title="মূল পাতায় যান"
          >
            <FiHome className="h-6 w-6" />
            <span className="hidden sm:inline text-sm">মূল পাতা</span>
          </Link>
          
          {/* Notifications */}
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 transition-colors relative"
          >
            <span className="sr-only">View notifications</span>
            <FiBell className="h-6 w-6" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">3</span>
            </span>
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

          {/* Profile dropdown */}
          <div className="relative">
            <button
              type="button"
              className="-m-1.5 flex items-center p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center shadow-md">
                <FiUser className="h-5 w-5 text-white" />
              </div>
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                  {user?.name || 'অ্যাডমিন'}
                </span>
              </span>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-gray-900/5 border border-gray-100">
                <button
                  className="flex w-full items-center px-4 py-2 text-sm leading-6 text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={handleLogout}
                >
                  <FiLogOut className="mr-3 h-4 w-4" />
                  লগ আউট
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}