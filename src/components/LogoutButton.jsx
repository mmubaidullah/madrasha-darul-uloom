'use client';
import { signOut, useSession } from 'next-auth/react';
import { FiLogOut } from 'react-icons/fi';

export default function LogoutButton({ className = '' }) {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <button
      onClick={handleLogout}
      className={`inline-flex items-center text-red-600 hover:text-red-700 transition-colors duration-200 ${className}`}
      title="লগআউট"
    >
      <FiLogOut className="h-4 w-4 mr-2" />
      লগআউট
    </button>
  );
}