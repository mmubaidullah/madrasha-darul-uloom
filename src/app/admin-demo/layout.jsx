'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Toaster } from 'react-hot-toast';
import { FiMenu, FiBell, FiUser } from 'react-icons/fi';

function DemoAdminHeader({ setSidebarOpen }) {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <FiMenu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            মাদরাসা ব্যবস্থাপনা সিস্টেম (ডেমো)
          </h2>
        </div>
        
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <FiBell className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

          <div className="relative">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                <FiUser className="h-5 w-5 text-white" />
              </div>
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                  ডেমো অ্যাডমিন
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDemoLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main content */}
      <div className="lg:pl-64">
        <DemoAdminHeader setSidebarOpen={setSidebarOpen} />
        
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}