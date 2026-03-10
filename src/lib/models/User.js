import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: [
      'muhtamim',              // মুহতামিম (Super Admin)
      'bivagiya_prodhan',      // বিভাগীয় প্রধান
      'negaran_ustaz',         // নেগরান উস্তায
      'nazeme_darul_ikama',    // নাযেমে দারুল ইকামা
      'nazeme_talimaat',       // নাযেমে তালিমাত
      'hisab_rokkhok',         // হিসাব রক্ষক
      'teacher',               // শিক্ষক (general)
      'student',               // ছাত্র
      'parent'                 // অভিভাবক
    ],
    default: 'student'
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[0-9+\-\s()]+$/, 'Please enter a valid phone number']
  },
  address: {
    type: String,
    trim: true,
    maxLength: [500, 'Address cannot exceed 500 characters']
  },
  designation: {
    type: String,
    trim: true,
    maxLength: [100, 'Designation cannot exceed 100 characters']
  },
  department: {
    type: String,
    trim: true,
    maxLength: [100, 'Department cannot exceed 100 characters']
  },
  joiningDate: {
    type: Date,
    default: Date.now
  },
  salary: {
    type: Number,
    min: [0, 'Salary cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  department: {
    type: String,
    trim: true,
    maxLength: [100, 'Department cannot exceed 100 characters']
  },
  studentId: {
    type: String,
    sparse: true,
    unique: true
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  permissions: [{
    module: {
      type: String,
      enum: ['students', 'teachers', 'attendance', 'fees', 'exams', 'library', 'hostel', 'reports', 'settings', 'users', 'communication', 'certificates']
    },
    actions: [{
      type: String,
      enum: ['create', 'read', 'update', 'delete']
    }]
  }],
  profileImage: {
    type: String,
    default: null
  },
  lastLogin: {
    type: Date,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for better performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });

// Virtual for full name display
UserSchema.virtual('displayName').get(function() {
  return this.name;
});

// Method to check if user has permission
UserSchema.methods.hasPermission = function(module, action) {
  // মুহতামিম has all permissions
  if (this.role === 'muhtamim') return true;
  
  const permission = this.permissions.find(p => p.module === module);
  return permission && permission.actions.includes(action);
};

// Method to get user's modules based on role
UserSchema.methods.getAccessibleModules = function() {
  const roleModules = {
    muhtamim: ['students', 'teachers', 'attendance', 'fees', 'exams', 'library', 'hostel', 'reports', 'settings', 'users', 'communication', 'certificates'],
    bivagiya_prodhan: ['students', 'teachers', 'attendance', 'reports'],
    negaran_ustaz: ['students', 'attendance', 'exams'],
    nazeme_darul_ikama: ['students', 'hostel'],
    nazeme_talimaat: ['students', 'exams', 'reports'],
    hisab_rokkhok: ['fees', 'reports'],
    teacher: ['students', 'attendance', 'exams'],
    student: ['attendance', 'exams'],
    parent: ['students', 'attendance', 'exams', 'fees']
  };
  
  return roleModules[this.role] || [];
};

// Method to get role display name in Bangla
UserSchema.methods.getRoleDisplayName = function() {
  const roleNames = {
    muhtamim: 'মুহতামিম',
    bivagiya_prodhan: 'বিভাগীয় প্রধান',
    negaran_ustaz: 'নেগরান উস্তায',
    nazeme_darul_ikama: 'নাযেমে দারুল ইকামা',
    nazeme_talimaat: 'নাযেমে তালিমাত',
    hisab_rokkhok: 'হিসাব রক্ষক',
    teacher: 'শিক্ষক',
    student: 'ছাত্র',
    parent: 'অভিভাবক'
  };
  
  return roleNames[this.role] || this.role;
};

export default mongoose.models.User || mongoose.model('User', UserSchema);