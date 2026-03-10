// Role definitions with Bangla names
export const ROLES = {
  MUHTAMIM: 'muhtamim',
  BIVAGIYA_PRODHAN: 'bivagiya_prodhan',
  NEGARAN_USTAZ: 'negaran_ustaz',
  NAZEME_DARUL_IKAMA: 'nazeme_darul_ikama',
  NAZEME_TALIMAAT: 'nazeme_talimaat',
  HISAB_ROKKHOK: 'hisab_rokkhok',
  TEACHER: 'teacher',
  STUDENT: 'student',
  PARENT: 'parent'
};

// Role display names in Bangla
export const ROLE_NAMES = {
  [ROLES.MUHTAMIM]: 'মুহতামিম',
  [ROLES.BIVAGIYA_PRODHAN]: 'বিভাগীয় প্রধান',
  [ROLES.NEGARAN_USTAZ]: 'নেগরান উস্তায',
  [ROLES.NAZEME_DARUL_IKAMA]: 'নাযেমে দারুল ইকামা',
  [ROLES.NAZEME_TALIMAAT]: 'নাযেমে তালিমাত',
  [ROLES.HISAB_ROKKHOK]: 'হিসাব রক্ষক',
  [ROLES.TEACHER]: 'শিক্ষক',
  [ROLES.STUDENT]: 'ছাত্র',
  [ROLES.PARENT]: 'অভিভাবক'
};

// Module definitions
export const MODULES = {
  STUDENTS: 'students',
  TEACHERS: 'teachers',
  ATTENDANCE: 'attendance',
  FEES: 'fees',
  EXAMS: 'exams',
  LIBRARY: 'library',
  HOSTEL: 'hostel',
  REPORTS: 'reports',
  SETTINGS: 'settings',
  USERS: 'users',
  COMMUNICATION: 'communication',
  CERTIFICATES: 'certificates'
};

// Action types
export const ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
};

// Role hierarchy (higher number = more privileges)
export const ROLE_HIERARCHY = {
  [ROLES.MUHTAMIM]: 9,
  [ROLES.BIVAGIYA_PRODHAN]: 7,
  [ROLES.NEGARAN_USTAZ]: 6,
  [ROLES.NAZEME_DARUL_IKAMA]: 5,
  [ROLES.NAZEME_TALIMAAT]: 5,
  [ROLES.HISAB_ROKKHOK]: 5,
  [ROLES.TEACHER]: 4,
  [ROLES.STUDENT]: 2,
  [ROLES.PARENT]: 2
};

// Role-based permissions
export const ROLE_PERMISSIONS = {
  [ROLES.MUHTAMIM]: {
    // মুহতামিম - Full system control
    [MODULES.STUDENTS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.TEACHERS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.ATTENDANCE]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.FEES]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.EXAMS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.LIBRARY]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.HOSTEL]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.REPORTS]: [ACTIONS.READ],
    [MODULES.SETTINGS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.USERS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.COMMUNICATION]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.CERTIFICATES]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE]
  },
  
  [ROLES.BIVAGIYA_PRODHAN]: {
    // বিভাগীয় প্রধান - Department management
    [MODULES.STUDENTS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE],
    [MODULES.TEACHERS]: [ACTIONS.READ],
    [MODULES.ATTENDANCE]: [ACTIONS.READ],
    [MODULES.EXAMS]: [ACTIONS.READ],
    [MODULES.REPORTS]: [ACTIONS.READ]
  },
  
  [ROLES.NEGARAN_USTAZ]: {
    // নেগরান উস্তায - Attendance and marks entry
    [MODULES.STUDENTS]: [ACTIONS.READ],
    [MODULES.ATTENDANCE]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE],
    [MODULES.EXAMS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE]
  },
  
  [ROLES.NAZEME_DARUL_IKAMA]: {
    // নাযেমে দারুল ইকামা - Hostel management
    [MODULES.STUDENTS]: [ACTIONS.READ],
    [MODULES.HOSTEL]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.REPORTS]: [ACTIONS.READ]
  },
  
  [ROLES.NAZEME_TALIMAAT]: {
    // নাযেমে তালিমাত - Academic management
    [MODULES.STUDENTS]: [ACTIONS.READ],
    [MODULES.EXAMS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE, ACTIONS.DELETE],
    [MODULES.REPORTS]: [ACTIONS.READ],
    [MODULES.CERTIFICATES]: [ACTIONS.CREATE, ACTIONS.READ]
  },
  
  [ROLES.HISAB_ROKKHOK]: {
    // হিসাব রক্ষক - Financial management
    [MODULES.STUDENTS]: [ACTIONS.READ],
    [MODULES.FEES]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE],
    [MODULES.REPORTS]: [ACTIONS.READ]
  },
  
  [ROLES.TEACHER]: {
    // শিক্ষক - Teaching related
    [MODULES.STUDENTS]: [ACTIONS.READ],
    [MODULES.ATTENDANCE]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE],
    [MODULES.EXAMS]: [ACTIONS.CREATE, ACTIONS.READ, ACTIONS.UPDATE]
  },
  
  [ROLES.STUDENT]: {
    // ছাত্র - View own data
    [MODULES.ATTENDANCE]: [ACTIONS.READ],
    [MODULES.EXAMS]: [ACTIONS.READ],
    [MODULES.FEES]: [ACTIONS.READ],
    [MODULES.LIBRARY]: [ACTIONS.READ],
    [MODULES.COMMUNICATION]: [ACTIONS.READ]
  },
  
  [ROLES.PARENT]: {
    // অভিভাবক - View child's data
    [MODULES.STUDENTS]: [ACTIONS.READ],
    [MODULES.ATTENDANCE]: [ACTIONS.READ],
    [MODULES.EXAMS]: [ACTIONS.READ],
    [MODULES.FEES]: [ACTIONS.READ],
    [MODULES.COMMUNICATION]: [ACTIONS.READ]
  }
};

// Helper function to check if user has permission
export function hasPermission(userRole, module, action) {
  const permissions = ROLE_PERMISSIONS[userRole];
  if (!permissions) return false;
  
  const modulePermissions = permissions[module];
  if (!modulePermissions) return false;
  
  return modulePermissions.includes(action);
}

// Helper function to check if user has minimum role level
export function hasMinimumRole(userRole, minimumRole) {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minimumRole];
}

// Helper function to get accessible modules for a role
export function getAccessibleModules(userRole) {
  const permissions = ROLE_PERMISSIONS[userRole];
  if (!permissions) return [];
  
  return Object.keys(permissions);
}

// Helper function to get role-based redirect URL
export function getRoleBasedRedirectUrl(role) {
  const roleRedirects = {
    [ROLES.MUHTAMIM]: '/dashboard/admin',
    [ROLES.BIVAGIYA_PRODHAN]: '/dashboard/admin',
    [ROLES.NEGARAN_USTAZ]: '/dashboard/teacher',
    [ROLES.NAZEME_DARUL_IKAMA]: '/dashboard/admin',
    [ROLES.NAZEME_TALIMAAT]: '/dashboard/admin',
    [ROLES.HISAB_ROKKHOK]: '/dashboard/admin',
    [ROLES.TEACHER]: '/dashboard/teacher',
    [ROLES.STUDENT]: '/dashboard/student',
    [ROLES.PARENT]: '/dashboard/parent'
  };

  return roleRedirects[role] || '/dashboard';
}

// Public routes that don't require authentication
export const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/teachers',
  '/notice',
  '/result-search',
  '/contact',
  '/login',
  '/register',
  '/forgot-password'
];

// Check if route is public
export function isPublicRoute(pathname) {
  return PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route));
}
