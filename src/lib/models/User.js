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
    enum: ['admin', 'teacher', 'accountant', 'librarian', 'staff'],
    default: 'staff'
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
  permissions: [{
    module: {
      type: String,
      enum: ['students', 'teachers', 'attendance', 'fees', 'exams', 'library', 'hostel', 'reports', 'settings']
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
  if (this.role === 'admin') return true;
  
  const permission = this.permissions.find(p => p.module === module);
  return permission && permission.actions.includes(action);
};

// Method to get user's modules
UserSchema.methods.getAccessibleModules = function() {
  if (this.role === 'admin') {
    return ['students', 'teachers', 'attendance', 'fees', 'exams', 'library', 'hostel', 'reports', 'settings'];
  }
  
  return this.permissions.map(p => p.module);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);