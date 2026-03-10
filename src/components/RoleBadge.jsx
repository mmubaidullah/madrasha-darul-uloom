import { ROLE_NAMES } from '@/lib/rolePermissions';

/**
 * Role Badge Component
 * Displays a styled badge for user roles
 * 
 * @param {string} role - User role
 * @param {string} size - Badge size ('sm', 'md', 'lg')
 */
export default function RoleBadge({ role, size = 'md' }) {
  const roleColors = {
    muhtamim: 'bg-purple-100 text-purple-800 border-purple-200',
    bivagiya_prodhan: 'bg-blue-100 text-blue-800 border-blue-200',
    negaran_ustaz: 'bg-green-100 text-green-800 border-green-200',
    nazeme_darul_ikama: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    nazeme_talimaat: 'bg-orange-100 text-orange-800 border-orange-200',
    hisab_rokkhok: 'bg-pink-100 text-pink-800 border-pink-200',
    teacher: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    student: 'bg-gray-100 text-gray-800 border-gray-200',
    parent: 'bg-teal-100 text-teal-800 border-teal-200'
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  const colorClass = roleColors[role] || 'bg-gray-100 text-gray-800 border-gray-200';
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${colorClass} ${sizeClass}`}>
      {ROLE_NAMES[role] || role}
    </span>
  );
}
