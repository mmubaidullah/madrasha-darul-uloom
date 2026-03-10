'use client';
import { useSession } from 'next-auth/react';
import { hasPermission, hasMinimumRole, getAccessibleModules } from '@/lib/rolePermissions';

/**
 * Custom hook for checking user permissions
 * 
 * @returns {Object} Permission checking utilities
 */
export function usePermission() {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  /**
   * Check if user has permission for a specific module and action
   * @param {string} module - Module name
   * @param {string} action - Action type
   * @returns {boolean}
   */
  const checkPermission = (module, action) => {
    if (!userRole) return false;
    return hasPermission(userRole, module, action);
  };

  /**
   * Check if user has minimum required role level
   * @param {string} minimumRole - Minimum required role
   * @returns {boolean}
   */
  const checkMinimumRole = (minimumRole) => {
    if (!userRole) return false;
    return hasMinimumRole(userRole, minimumRole);
  };

  /**
   * Get list of modules accessible to user
   * @returns {string[]}
   */
  const accessibleModules = userRole ? getAccessibleModules(userRole) : [];

  /**
   * Check if user can access a specific module
   * @param {string} module - Module name
   * @returns {boolean}
   */
  const canAccessModule = (module) => {
    return accessibleModules.includes(module);
  };

  return {
    userRole,
    checkPermission,
    checkMinimumRole,
    accessibleModules,
    canAccessModule,
    isAuthenticated: !!session,
    user: session?.user
  };
}
