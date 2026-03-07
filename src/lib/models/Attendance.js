import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  students: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late'],
      required: true
    },
    remarks: String
  }],
  takenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure one attendance record per class per day
AttendanceSchema.index({ date: 1, class: 1, section: 1 }, { unique: true });

AttendanceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);