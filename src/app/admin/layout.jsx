'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = (open) => {
    setSidebarOpen(open);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <AdminSidebar 
        sidebarOpen={sidebarOpen} 
        onToggle={handleSidebarToggle}
      />
      
      {/* Main content wrapper - takes full width and adjusts for sidebar */}
      <div className="flex flex-col min-h-screen transition-all duration-300 lg:ml-64">
        <AdminHeader onSidebarToggle={handleSidebarToggle} />
        
        <main className="flex-1 py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}