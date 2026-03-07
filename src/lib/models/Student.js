import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  studentId: {
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
  nidOrBirth: String,
  
  // Contact Information
  currentAddress: {
    type: String,
    required: true
  },
  permanentAddress: String,
  phone: String,
  email: String,
  
  // Guardian Information
  fatherName: {
    type: String,
    required: true
  },
  motherName: {
    type: String,
    required: true
  },
  fatherOccupation: String,
  motherOccupation: String,
  guardianPhone: {
    type: String,
    required: true
  },
  monthlyIncome: Number,
  
  // Academic Information
  admissionClass: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  admissionDate: {
    type: Date,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  previousSchool: String,
  hostelRequired: {
    type: Boolean,
    default: false
  },
  
  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated', 'transferred'],
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

// Generate student ID automatically
StudentSchema.pre('save', async function(next) {
  if (!this.studentId) {
    const count = await mongoose.model('Student').countDocuments();
    this.studentId = `STD${String(count + 1).padStart(4, '0')}`;
  }
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);