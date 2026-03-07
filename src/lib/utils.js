// Date formatting utilities
export const formatDate = (date, locale = 'bn-BD') => {
  if (!date) return '';
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Date(date).toLocaleDateString(locale, options);
};

export const formatDateShort = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-CA'); // YYYY-MM-DD format
};

// Number formatting utilities
export const formatCurrency = (amount, currency = 'BDT') => {
  if (!amount && amount !== 0) return '';
  
  return new Intl.NumberFormat('bn-BD', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (number) => {
  if (!number && number !== 0) return '';
  return new Intl.NumberFormat('bn-BD').format(number);
};

// String utilities
export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generateId = (prefix = '', length = 6) => {
  const chars = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return prefix + result;
};

// Validation utilities
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;
  return phoneRegex.test(phone);
};

// Class and section utilities
export const getClassList = () => [
  { value: 'class-6', label: 'ক্লাস ৬' },
  { value: 'class-7', label: 'ক্লাস ৭' },
  { value: 'class-8', label: 'ক্লাস ৮' },
  { value: 'class-9', label: 'ক্লাস ৯' },
  { value: 'class-10', label: 'ক্লাস ১০' }
];

export const getSectionList = () => [
  { value: 'A', label: 'ক' },
  { value: 'B', label: 'খ' },
  { value: 'C', label: 'গ' }
];

// Grade calculation
export const calculateGrade = (marks, fullMarks) => {
  const percentage = (marks / fullMarks) * 100;
  
  if (percentage >= 80) return { grade: 'A+', gpa: 5.0 };
  if (percentage >= 70) return { grade: 'A', gpa: 4.0 };
  if (percentage >= 60) return { grade: 'A-', gpa: 3.5 };
  if (percentage >= 50) return { grade: 'B', gpa: 3.0 };
  if (percentage >= 40) return { grade: 'C', gpa: 2.0 };
  if (percentage >= 33) return { grade: 'D', gpa: 1.0 };
  return { grade: 'F', gpa: 0.0 };
};

// Attendance utilities
export const calculateAttendancePercentage = (present, total) => {
  if (total === 0) return 0;
  return Math.round((present / total) * 100);
};

// File upload utilities
export const validateFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file, maxSizeInMB) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

// Local storage utilities
export const setLocalStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = (key, defaultValue = null) => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  }
  return defaultValue;
};

export const removeLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

// API utilities
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    return error.response.data.message || 'সার্ভার এরর হয়েছে';
  } else if (error.request) {
    // Request was made but no response received
    return 'নেটওয়ার্ক এরর হয়েছে';
  } else {
    // Something else happened
    return 'অজানা এরর হয়েছে';
  }
};