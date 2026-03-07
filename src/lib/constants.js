// App Configuration
export const APP_NAME = 'মাদরাসা ব্যবস্থাপনা সিস্টেম';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'একটি সম্পূর্ণ মাদরাসা ব্যবস্থাপনা সিস্টেম';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
export const API_TIMEOUT = 30000; // 30 seconds

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

// Academic Configuration
export const ACADEMIC_YEARS = ['2024', '2025', '2026'];
export const CURRENT_ACADEMIC_YEAR = '2024';

export const CLASSES = [
  { value: 'class-6', label: 'ক্লাস ৬' },
  { value: 'class-7', label: 'ক্লাস ৭' },
  { value: 'class-8', label: 'ক্লাস ৮' },
  { value: 'class-9', label: 'ক্লাস ৯' },
  { value: 'class-10', label: 'ক্লাস ১০' }
];

export const SECTIONS = [
  { value: 'A', label: 'ক' },
  { value: 'B', label: 'খ' },
  { value: 'C', label: 'গ' }
];

export const SUBJECTS = [
  'আরবি',
  'বাংলা',
  'ইংরেজি',
  'গণিত',
  'বিজ্ঞান',
  'সমাজবিজ্ঞান',
  'ইসলামিক স্টাডিজ',
  'কুরআন মজিদ',
  'হাদিস শরিফ',
  'ফিকহ'
];

// Student Status
export const STUDENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  GRADUATED: 'graduated',
  TRANSFERRED: 'transferred'
};

export const STUDENT_STATUS_LABELS = {
  [STUDENT_STATUS.ACTIVE]: 'সক্রিয়',
  [STUDENT_STATUS.INACTIVE]: 'নিষ্ক্রিয়',
  [STUDENT_STATUS.GRADUATED]: 'স্নাতক',
  [STUDENT_STATUS.TRANSFERRED]: 'স্থানান্তরিত'
};

// Teacher Status
export const TEACHER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  RESIGNED: 'resigned',
  TERMINATED: 'terminated'
};

export const TEACHER_STATUS_LABELS = {
  [TEACHER_STATUS.ACTIVE]: 'সক্রিয়',
  [TEACHER_STATUS.INACTIVE]: 'নিষ্ক্রিয়',
  [TEACHER_STATUS.RESIGNED]: 'পদত্যাগ',
  [TEACHER_STATUS.TERMINATED]: 'বরখাস্ত'
};

// Attendance Status
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late'
};

export const ATTENDANCE_STATUS_LABELS = {
  [ATTENDANCE_STATUS.PRESENT]: 'উপস্থিত',
  [ATTENDANCE_STATUS.ABSENT]: 'অনুপস্থিত',
  [ATTENDANCE_STATUS.LATE]: 'দেরি'
};

// Payment Methods
export const PAYMENT_METHODS = {
  CASH: 'cash',
  BKASH: 'bkash',
  BANK: 'bank',
  CARD: 'card'
};

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.CASH]: 'নগদ',
  [PAYMENT_METHODS.BKASH]: 'বিকাশ',
  [PAYMENT_METHODS.BANK]: 'ব্যাংক',
  [PAYMENT_METHODS.CARD]: 'কার্ড'
};

// Fee Types
export const FEE_TYPES = {
  ADMISSION: 'admissionFee',
  MONTHLY: 'monthlyFee',
  EXAM: 'examFee',
  LIBRARY: 'libraryFee',
  DEVELOPMENT: 'developmentFee',
  SPORTS: 'sportsFee',
  COMPUTER: 'computerFee'
};

export const FEE_TYPE_LABELS = {
  [FEE_TYPES.ADMISSION]: 'ভর্তি ফি',
  [FEE_TYPES.MONTHLY]: 'মাসিক বেতন',
  [FEE_TYPES.EXAM]: 'পরীক্ষার ফি',
  [FEE_TYPES.LIBRARY]: 'লাইব্রেরি ফি',
  [FEE_TYPES.DEVELOPMENT]: 'উন্নয়ন ফি',
  [FEE_TYPES.SPORTS]: 'খেলাধুলা ফি',
  [FEE_TYPES.COMPUTER]: 'কম্পিউটার ফি'
};

// Exam Types
export const EXAM_TYPES = {
  HALF_YEARLY: 'half-yearly',
  ANNUAL: 'annual',
  TEST: 'test',
  MONTHLY: 'monthly'
};

export const EXAM_TYPE_LABELS = {
  [EXAM_TYPES.HALF_YEARLY]: 'অর্ধবার্ষিক পরীক্ষা',
  [EXAM_TYPES.ANNUAL]: 'বার্ষিক পরীক্ষা',
  [EXAM_TYPES.TEST]: 'টেস্ট পরীক্ষা',
  [EXAM_TYPES.MONTHLY]: 'মাসিক পরীক্ষা'
};

// Grade System
export const GRADE_SYSTEM = [
  { min: 80, max: 100, grade: 'A+', gpa: 5.0, description: 'অসাধারণ' },
  { min: 70, max: 79, grade: 'A', gpa: 4.0, description: 'অতি উত্তম' },
  { min: 60, max: 69, grade: 'A-', gpa: 3.5, description: 'উত্তম' },
  { min: 50, max: 59, grade: 'B', gpa: 3.0, description: 'ভালো' },
  { min: 40, max: 49, grade: 'C', gpa: 2.0, description: 'গ্রহণযোগ্য' },
  { min: 33, max: 39, grade: 'D', gpa: 1.0, description: 'অকৃতকার্য' },
  { min: 0, max: 32, grade: 'F', gpa: 0.0, description: 'অকৃতকার্য' }
];

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  ACCOUNTANT: 'accountant',
  LIBRARIAN: 'librarian',
  STAFF: 'staff'
};

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'প্রশাসক',
  [USER_ROLES.TEACHER]: 'শিক্ষক',
  [USER_ROLES.ACCOUNTANT]: 'হিসাবরক্ষক',
  [USER_ROLES.LIBRARIAN]: 'গ্রন্থাগারিক',
  [USER_ROLES.STAFF]: 'কর্মচারী'
};

// Gender Options
export const GENDER_OPTIONS = [
  { value: 'male', label: 'পুরুষ' },
  { value: 'female', label: 'মহিলা' }
];

// Religion Options
export const RELIGION_OPTIONS = [
  { value: 'islam', label: 'ইসলাম' },
  { value: 'hinduism', label: 'হিন্দু' },
  { value: 'christianity', label: 'খ্রিস্টান' },
  { value: 'buddhism', label: 'বৌদ্ধ' },
  { value: 'others', label: 'অন্যান্য' }
];

// Months in Bengali
export const BENGALI_MONTHS = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

// Days in Bengali
export const BENGALI_DAYS = [
  'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'
];

// Theme Colors
export const THEME_COLORS = [
  { name: 'সবুজ', value: '#059669' },
  { name: 'নীল', value: '#2563EB' },
  { name: 'বেগুনি', value: '#7C3AED' },
  { name: 'গোলাপি', value: '#DB2777' },
  { name: 'কমলা', value: '#EA580C' },
  { name: 'লাল', value: '#DC2626' }
];

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed'
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  
  // Students
  STUDENTS: '/students',
  STUDENT_BY_ID: (id) => `/students/${id}`,
  
  // Teachers
  TEACHERS: '/teachers',
  TEACHER_BY_ID: (id) => `/teachers/${id}`,
  
  // Attendance
  ATTENDANCE: '/attendance',
  ATTENDANCE_BY_DATE: (date) => `/attendance/${date}`,
  
  // Fees
  FEES: '/fees',
  FEE_STRUCTURE: '/fees/structure',
  FEE_PAYMENT: '/fees/payment',
  
  // Exams
  EXAMS: '/exams',
  EXAM_BY_ID: (id) => `/exams/${id}`,
  
  // Reports
  REPORTS: '/reports',
  DASHBOARD_STATS: '/reports/dashboard'
};