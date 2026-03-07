import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    required: true,
    unique: true
  },
  nameBangla: {
    type: String,
    required: true
  },
  nameEnglish: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  religion: {
    type: String,
    required: true
  },
  nid: String,
  
  // Contact Information
  currentAddress: {
    type: String,
    required: true
  },
  permanentAddress: String,
  phone: {
    type: String,
    required: true
  },
  email: String,
  
  // Professional Information
  designation: {
    type: String,
    required: true
  },
  department: String,
  subjects: [String],
  joiningDate: {
    type: Date,
    required: true
  },
  qualification: String,
  experience: Number,
  
  // Salary Information
  basicSalary: {
    type: Number,
    required: true
  },
  allowances: {
    house: { type: Number, default: 0 },
    medical: { type: Number, default: 0 },
    transport: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  
  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'resigned', 'terminated'],
    default: 'active'
  },
  
  // Photo
  photo: String,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate teacher ID automatically
TeacherSchema.pre('save', async function(next) {
  if (!this.teacherId) {
    const count = await mongoose.model('Teacher').countDocuments();
    this.teacherId = `TCH${String(count + 1).padStart(4, '0')}`;
  }
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);