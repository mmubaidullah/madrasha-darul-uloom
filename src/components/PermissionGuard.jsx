'use client';
import { useSession } from 'next-auth/react';
import { hasPermission } from '@/lib/rolePermissions';

/**
 * Permission Guard Component
 * Conditionally renders children based on user permissions
 * 
 * @param {string} module - Module name (e.g., 'students', 'teachers')
 * @param {string} action - Action type (e.g., 'create', 'read', 'update', 'delete')
 * @param {ReactNode} children - Content to render if permission granted
 * @param {ReactNode} fallback - Content to render if permission denied (optional)
 */
export default function PermissionGuard({ module, action, children, fallback = null }) {
  const { data: session } = useSession();

  if (!session?.user?.role) {
    return fallback;
  }

  const hasAccess = hasPermission(session.user.role, module, action);

  return hasAccess ? children : fallback;
}
