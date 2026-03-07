// মাদরাসার বিভাগসমূহ
export const DEPARTMENTS = {
  MAKTAB: 'মক্তব বিভাগ',
  TAHFIZ: 'তাহফীযুল কুরআন বিভাগ',
  KITAB: 'কিতাব বিভাগ',
  RESEARCH: 'উচ্চতর গবেষণা বিভাগ'
};

// বিভাগ অনুযায়ী ডিফল্ট জামাত/ক্লাস (এডিট করা যাবে)
export const DEFAULT_DEPARTMENT_CLASSES = {
  [DEPARTMENTS.MAKTAB]: [
    'নূরানী',
    'নাজেরা'
  ],
  
  [DEPARTMENTS.TAHFIZ]: [
    'হিফজ',
    'রিভিশন'
  ],
  
  [DEPARTMENTS.KITAB]: [
    'ইবতিদাইয়্যাহ-১ (উর্দূ)',
    'ইবতিদাইয়্যাহ-২ (তাইসীর)',
    'মুতাওয়াসসিতাহ-১ (মিযান)',
    'মুতাওয়াসসিতাহ-২ (নাহবেমীর)',
    'মুতাওয়াসসিতাহ-ৃ (হেদায়াতুন্নাহু)',
    'সানাবিয়া \'আম্মাহ (কাফিয়া-শরহে জামী)',
    'সানাবিয়া উলইয়া (শরহে বেকায়া)',
    'ফযিলত-১ (জালালাইন)',
    'ফযিলত-২ (মেশকাত)',
    'তাকমীল (দাওরায়ে হাদীস)'
  ],

  [DEPARTMENTS.RESEARCH]: [
    'ইফতা (ইসলামি আইন ও ফতোয়া বিভাগ)',
    'আদব (উচ্চতর আরবি সাহিত্য বিভাগ)'
  ]
};

// রানটাইমে ব্যবহারের জন্য (localStorage থেকে লোড হবে বা ডিফল্ট ব্যবহার হবে)
export let DEPARTMENT_CLASSES = { ...DEFAULT_DEPARTMENT_CLASSES };

// localStorage থেকে জামাত/ক্লাস লোড করার ফাংশন (প্রথমে এটি কল করতে হবে)
export const loadDepartmentClasses = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('departmentClasses');
    if (saved) {
      try {
        const loadedClasses = JSON.parse(saved);
        DEPARTMENT_CLASSES = loadedClasses;
        return loadedClasses;
      } catch (error) {
        console.error('Error loading department classes:', error);
        DEPARTMENT_CLASSES = { ...DEFAULT_DEPARTMENT_CLASSES };
      }
    }
  }
  return DEPARTMENT_CLASSES;
};

// বর্তমান জামাত/ক্লাস পেতে (localStorage থেকে লোড করে)
export const getCurrentDepartmentClasses = () => {
  loadDepartmentClasses();
  return DEPARTMENT_CLASSES;
};

// জামাত/ক্লাস আপডেট করার ফাংশন
export const updateDepartmentClasses = (department, classes) => {
  DEPARTMENT_CLASSES[department] = classes;
  // localStorage এ সেভ করা
  if (typeof window !== 'undefined') {
    localStorage.setItem('departmentClasses', JSON.stringify(DEPARTMENT_CLASSES));
  }
  return DEPARTMENT_CLASSES;
};

// একটি নির্দিষ্ট বিভাগে নতুন ক্লাস যোগ করা
export const addClassToDepartment = (department, className) => {
  if (!DEPARTMENT_CLASSES[department]) {
    DEPARTMENT_CLASSES[department] = [];
  }
  
  if (!DEPARTMENT_CLASSES[department].includes(className)) {
    DEPARTMENT_CLASSES[department].push(className);
    if (typeof window !== 'undefined') {
      localStorage.setItem('departmentClasses', JSON.stringify(DEPARTMENT_CLASSES));
    }
    return true;
  }
  return false; // Already exists
};

// একটি নির্দিষ্ট বিভাগ থেকে ক্লাস সরানো
export const removeClassFromDepartment = (department, className) => {
  if (DEPARTMENT_CLASSES[department]) {
    const index = DEPARTMENT_CLASSES[department].indexOf(className);
    if (index > -1) {
      DEPARTMENT_CLASSES[department].splice(index, 1);
      if (typeof window !== 'undefined') {
        localStorage.setItem('departmentClasses', JSON.stringify(DEPARTMENT_CLASSES));
      }
      return true;
    }
  }
  return false;
};

// ক্লাসের নাম পরিবর্তন করা
export const renameClass = (department, oldName, newName) => {
  if (DEPARTMENT_CLASSES[department]) {
    const index = DEPARTMENT_CLASSES[department].indexOf(oldName);
    if (index > -1) {
      DEPARTMENT_CLASSES[department][index] = newName;
      if (typeof window !== 'undefined') {
        localStorage.setItem('departmentClasses', JSON.stringify(DEPARTMENT_CLASSES));
      }
      return true;
    }
  }
  return false;
};

// ডিফল্ট রিসেট করার ফাংশন
export const resetToDefaultClasses = () => {
  DEPARTMENT_CLASSES = { ...DEFAULT_DEPARTMENT_CLASSES };
  if (typeof window !== 'undefined') {
    localStorage.setItem('departmentClasses', JSON.stringify(DEPARTMENT_CLASSES));
  }
  return DEPARTMENT_CLASSES;
};

// সব জামাত/ক্লাসের তালিকা
export const getAllClasses = () => {
  loadDepartmentClasses();
  return [
    ...DEPARTMENT_CLASSES[DEPARTMENTS.MAKTAB],
    ...DEPARTMENT_CLASSES[DEPARTMENTS.TAHFIZ],
    ...DEPARTMENT_CLASSES[DEPARTMENTS.KITAB],
    ...DEPARTMENT_CLASSES[DEPARTMENTS.RESEARCH]
  ];
};

// শুধুমাত্র ক্লাস আছে এমন বিভাগের তালিকা (খালি বিভাগ দেখাবে না)
export const getActiveDepartments = () => {
  loadDepartmentClasses();
  const activeDepartments = {};
  
  Object.entries(DEPARTMENTS).forEach(([key, departmentName]) => {
    const classes = DEPARTMENT_CLASSES[departmentName];
    if (classes && classes.length > 0) {
      activeDepartments[key] = departmentName;
    }
  });
  
  return activeDepartments;
};

// একটি বিভাগে ক্লাস আছে কিনা চেক করা
export const isDepartmentActive = (department) => {
  loadDepartmentClasses();
  const classes = DEPARTMENT_CLASSES[department];
  return classes && classes.length > 0;
};

// একটি নির্দিষ্ট বিভাগের সব ক্লাস
export const getClassesByDepartment = (department) => {
  loadDepartmentClasses();
  return DEPARTMENT_CLASSES[department] || [];
};

// জামাত/ক্লাস থেকে বিভাগ খুঁজে বের করা
export const getDepartmentByClass = (className) => {
  loadDepartmentClasses();
  for (const [department, classes] of Object.entries(DEPARTMENT_CLASSES)) {
    if (classes.includes(className)) {
      return department;
    }
  }
  return null;
};

// বিভাগের সংক্ষিপ্ত নাম
export const DEPARTMENT_SHORT_NAMES = {
  [DEPARTMENTS.MAKTAB]: 'মক্তব',
  [DEPARTMENTS.TAHFIZ]: 'তাহফীজ',
  [DEPARTMENTS.KITAB]: 'কিতাব',
  [DEPARTMENTS.RESEARCH]: 'গবেষণা'
};

// বিভাগের বিস্তারিত তথ্য
export const DEPARTMENT_INFO = {
  [DEPARTMENTS.MAKTAB]: {
    name: DEPARTMENTS.MAKTAB,
    shortName: 'মক্তব',
    description: 'প্রাথমিক কুরআন শিক্ষা বিভাগ',
    icon: '📖',
    defaultClasses: ['নূরানী', 'নাজেরা']
  },
  [DEPARTMENTS.TAHFIZ]: {
    name: DEPARTMENTS.TAHFIZ,
    shortName: 'তাহফীজ',
    description: 'কুরআন হিফজ ও রিভিশন বিভাগ',
    icon: '📿',
    defaultClasses: ['হিফজ', 'রিভিশন']
  },
  [DEPARTMENTS.KITAB]: {
    name: DEPARTMENTS.KITAB,
    shortName: 'কিতাব',
    description: 'উচ্চতর ইসলামী শিক্ষা বিভাগ',
    icon: '📚',
    defaultClasses: [
      'ইবতিদাইয়্যাহ-১ (উর্দূ)',
      'ইবতিদাইয়্যাহ-২ (তাইসীর)',
      'মুতাওয়াসসিতাহ-১ (মিযান)',
      'মুতাওয়াসসিতাহ-২ (নাহবেমীর)',
      'মুতাওয়াসসিতাহ-৩ (হেদায়াতুন্নাহু)',
      'সানাবিয়া \'আম্মাহ (কাফিয়া-শরহে জামী)',
      'সানাবিয়া উলইয়া (শরহে বেকায়া)',
      'ফযিলত-১ (জালালাইন)',
      'ফযিলত-২ (মেশকাত)',
      'তাকমীল (দাওরায়ে হাদীস)'
    ]
  },
  [DEPARTMENTS.RESEARCH]: {
    name: DEPARTMENTS.RESEARCH,
    shortName: 'গবেষণা',
    description: 'উচ্চতর গবেষণা ও বিশেষায়িত শিক্ষা',
    icon: '🎓',
    defaultClasses: [
      'ইফতা (ইসলামি আইন ও ফতোয়া বিভাগ)',
      'আদব (উচ্চতর আরবি সাহিত্য বিভাগ)'
    ]
  }
};

// ইনিশিয়ালাইজেশন ফাংশন (অ্যাপ শুরুতে কল করতে হবে)
export const initializeDepartments = () => {
  if (typeof window !== 'undefined') {
    loadDepartmentClasses();
  }
};

export default DEPARTMENTS;