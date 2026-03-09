'use client';
import { useSession } from 'next-auth/react';
import { FiUser } from 'react-icons/fi';

export default function UserInfo({ className = '' }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <div className="space-y-1">
            <div className="h-3 w-20 bg-gray-300 rounded"></div>
            <div className="h-2 w-16 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const getRoleBadgeColor = (role) => {
    const colors = {
      super_admin: 'bg-red-100 text-red-800',
      admin: 'bg-purple-100 text-purple-800',
      teacher: 'bg-blue-100 text-blue-800',
      student: 'bg-green-100 text-green-800',
      parent: 'bg-yellow-100 text-yellow-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const getRoleDisplayName = (role) => {
    const names = {
      super_admin: 'সুপার অ্যাডমিন',
      admin: 'অ্যাডমিন',
      teacher: 'শিক্ষক',
      student: 'ছাত্র',
      parent: 'অভিভাবক'
    };
    return names[role] || role;
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex-shrink-0">
        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
          <FiUser className="h-4 w-4 text-green-600" />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900 truncate">
          {session.user.name}
        </p>
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRoleBadgeColor(session.user.role)}`}>
          {getRoleDisplayName(session.user.role)}
        </span>
      </div>
    </div>
  );
}