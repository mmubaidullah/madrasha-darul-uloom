import mongoose from 'mongoose';

const FeeStructureSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  fees: {
    admissionFee: { type: Number, default: 0 },
    monthlyFee: { type: Number, default: 0 },
    examFee: { type: Number, default: 0 },
    libraryFee: { type: Number, default: 0 },
    developmentFee: { type: Number, default: 0 },
    sportsFee: { type: Number, default: 0 },
    computerFee: { type: Number, default: 0 }
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

const FeePaymentSchema = new mongoose.Schema({
  receiptNo: {
    type: String,
    required: true,
    unique: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  paymentDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  fees: {
    admissionFee: { type: Number, default: 0 },
    monthlyFee: { type: Number, default: 0 },
    examFee: { type: Number, default: 0 },
    libraryFee: { type: Number, default: 0 },
    developmentFee: { type: Number, default: 0 },
    sportsFee: { type: Number, default: 0 },
    computerFee: { type: Number, default: 0 }
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'bkash', 'bank', 'card'],
    required: true
  },
  transactionId: String,
  remarks: String,
  collectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate receipt number automatically
FeePaymentSchema.pre('save', async function(next) {
  if (!this.receiptNo) {
    const count = await mongoose.model('FeePayment').countDocuments();
    this.receiptNo = `RCP${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

FeeStructureSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const FeeStructure = mongoose.models.FeeStructure || mongoose.model('FeeStructure', FeeStructureSchema);
export const FeePayment = mongoose.models.FeePayment || mongoose.model('FeePayment', FeePaymentSchema);