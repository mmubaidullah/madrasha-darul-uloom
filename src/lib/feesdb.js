// ফি কালেকশনের জন্য ফাইল-ভিত্তিক ডাটাবেজ
import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'data');
const FEES_FILE = path.join(DB_DIR, 'fees.json');

// ডাটা ডিরেক্টরি তৈরি করুন
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// ফি ফাইল তৈরি করুন যদি না থাকে
if (!fs.existsSync(FEES_FILE)) {
  const defaultFees = [
    {
      _id: "fee1",
      receiptNo: "RCP0001",
      studentId: "STD0001",
      studentName: "পরীক্ষা ছাত্র",
      class: "class-6",
      section: "A",
      feeType: "monthly",
      month: "জানুয়ারি ২০২৪",
      amount: 1500,
      paidAmount: 1500,
      dueAmount: 0,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: "cash",
      status: "paid",
      collectedBy: "অ্যাডমিন",
      remarks: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  fs.writeFileSync(FEES_FILE, JSON.stringify(defaultFees, null, 2));
}

class FeesDB {
  static generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  static generateReceiptNo(fees) {
    const count = fees.length;
    return `RCP${String(count + 1).padStart(4, '0')}`;
  }

  static readFees() {
    try {
      const data = fs.readFileSync(FEES_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('ফি ফাইল পড়তে সমস্যা:', error);
      return [];
    }
  }

  static writeFees(fees) {
    try {
      fs.writeFileSync(FEES_FILE, JSON.stringify(fees, null, 2));
      return true;
    } catch (error) {
      console.error('ফি ফাইল লিখতে সমস্যা:', error);
      return false;
    }
  }

  static async collectFee(feeData) {
    const fees = this.readFees();
    
    const newFee = {
      _id: this.generateId(),
      receiptNo: this.generateReceiptNo(fees),
      ...feeData,
      status: feeData.paidAmount >= feeData.amount ? 'paid' : 'partial',
      dueAmount: feeData.amount - feeData.paidAmount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    fees.push(newFee);
    
    if (this.writeFees(fees)) {
      return newFee;
    } else {
      throw new Error('ফি সংরক্ষণ করতে ব্যর্থ');
    }
  }

  static async getFees(options = {}) {
    const fees = this.readFees();
    let filteredFees = [...fees];

    // অনুসন্ধান ফিল্টার
    if (options.search) {
      const searchTerm = options.search.toLowerCase();
      filteredFees = filteredFees.filter(fee => 
        fee.studentName?.toLowerCase().includes(searchTerm) ||
        fee.studentId?.toLowerCase().includes(searchTerm) ||
        fee.receiptNo?.toLowerCase().includes(searchTerm)
      );
    }

    // ক্লাস ফিল্টার
    if (options.class) {
      filteredFees = filteredFees.filter(fee => 
        fee.class === options.class
      );
    }

    // স্ট্যাটাস ফিল্টার
    if (options.status) {
      filteredFees = filteredFees.filter(fee => 
        fee.status === options.status
      );
    }

    // মাস ফিল্টার
    if (options.month) {
      filteredFees = filteredFees.filter(fee => 
        fee.month === options.month
      );
    }

    // তারিখ অনুযায়ী সাজান (নতুন প্রথমে)
    filteredFees.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // পেজিনেশন
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 20;
    const skip = (page - 1) * limit;
    
    const paginatedFees = filteredFees.slice(skip, skip + limit);
    
    return {
      data: paginatedFees,
      pagination: {
        page,
        limit,
        total: filteredFees.length,
        pages: Math.ceil(filteredFees.length / limit)
      }
    };
  }

  static async getFeeById(id) {
    const fees = this.readFees();
    return fees.find(fee => fee._id === id || fee.receiptNo === id);
  }

  static async updateFee(id, updateData) {
    const fees = this.readFees();
    const index = fees.findIndex(fee => fee._id === id || fee.receiptNo === id);
    
    if (index === -1) {
      throw new Error('ফি রেকর্ড পাওয়া যায়নি');
    }

    fees[index] = {
      ...fees[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    // স্ট্যাটাস আপডেট করুন
    if (updateData.paidAmount !== undefined) {
      fees[index].dueAmount = fees[index].amount - fees[index].paidAmount;
      fees[index].status = fees[index].paidAmount >= fees[index].amount ? 'paid' : 'partial';
    }

    if (this.writeFees(fees)) {
      return fees[index];
    } else {
      throw new Error('ফি আপডেট করতে ব্যর্থ');
    }
  }

  static async deleteFee(id) {
    const fees = this.readFees();
    const filteredFees = fees.filter(fee => 
      fee._id !== id && fee.receiptNo !== id
    );

    if (fees.length === filteredFees.length) {
      throw new Error('ফি রেকর্ড পাওয়া যায়নি');
    }

    return this.writeFees(filteredFees);
  }

  static async getFeeStats(options = {}) {
    const fees = this.readFees();
    let filteredFees = [...fees];

    // তারিখ রেঞ্জ ফিল্টার
    if (options.startDate && options.endDate) {
      filteredFees = filteredFees.filter(fee => 
        fee.paymentDate >= options.startDate && fee.paymentDate <= options.endDate
      );
    }

    // ক্লাস ফিল্টার
    if (options.class) {
      filteredFees = filteredFees.filter(fee => 
        fee.class === options.class
      );
    }

    const totalAmount = filteredFees.reduce((sum, fee) => sum + fee.amount, 0);
    const totalPaid = filteredFees.reduce((sum, fee) => sum + fee.paidAmount, 0);
    const totalDue = filteredFees.reduce((sum, fee) => sum + fee.dueAmount, 0);
    
    const paidCount = filteredFees.filter(f => f.status === 'paid').length;
    const partialCount = filteredFees.filter(f => f.status === 'partial').length;
    const dueCount = filteredFees.filter(f => f.status === 'due').length;

    return {
      totalRecords: filteredFees.length,
      totalAmount,
      totalPaid,
      totalDue,
      paidCount,
      partialCount,
      dueCount,
      collectionPercentage: totalAmount > 0 ? ((totalPaid / totalAmount) * 100).toFixed(2) : 0
    };
  }
}

export default FeesDB;