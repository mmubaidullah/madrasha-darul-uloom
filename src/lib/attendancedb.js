// হাজিরার জন্য ফাইল-ভিত্তিক ডাটাবেজ
import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'data');
const ATTENDANCE_FILE = path.join(DB_DIR, 'attendance.json');

// ডাটা ডিরেক্টরি তৈরি করুন
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// হাজিরার ফাইল তৈরি করুন যদি না থাকে
if (!fs.existsSync(ATTENDANCE_FILE)) {
  fs.writeFileSync(ATTENDANCE_FILE, JSON.stringify([], null, 2));
}

class AttendanceDB {
  static generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  static readAttendance() {
    try {
      const data = fs.readFileSync(ATTENDANCE_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('হাজিরার ফাইল পড়তে সমস্যা:', error);
      return [];
    }
  }

  static writeAttendance(attendance) {
    try {
      fs.writeFileSync(ATTENDANCE_FILE, JSON.stringify(attendance, null, 2));
      return true;
    } catch (error) {
      console.error('হাজিরার ফাইল লিখতে সমস্যা:', error);
      return false;
    }
  }

  static async markAttendance(attendanceData) {
    const attendanceRecords = this.readAttendance();
    
    // একই তারিখে একই ছাত্রের হাজিরা আছে কিনা চেক করুন
    const existingRecord = attendanceRecords.find(record => 
      record.studentId === attendanceData.studentId && 
      record.date === attendanceData.date
    );

    if (existingRecord) {
      // আপডেট করুন
      existingRecord.status = attendanceData.status;
      existingRecord.updatedAt = new Date().toISOString();
    } else {
      // নতুন রেকর্ড যোগ করুন
      const newRecord = {
        _id: this.generateId(),
        ...attendanceData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      attendanceRecords.push(newRecord);
    }
    
    if (this.writeAttendance(attendanceRecords)) {
      return existingRecord || attendanceRecords[attendanceRecords.length - 1];
    } else {
      throw new Error('হাজিরা সংরক্ষণ করতে ব্যর্থ');
    }
  }

  static async getAttendance(options = {}) {
    const attendanceRecords = this.readAttendance();
    let filteredRecords = [...attendanceRecords];

    // তারিখ ফিল্টার
    if (options.date) {
      filteredRecords = filteredRecords.filter(record => 
        record.date === options.date
      );
    }

    // ক্লাস ফিল্টার
    if (options.class) {
      filteredRecords = filteredRecords.filter(record => 
        record.class === options.class
      );
    }

    // ছাত্র আইডি ফিল্টার
    if (options.studentId) {
      filteredRecords = filteredRecords.filter(record => 
        record.studentId === options.studentId
      );
    }

    // তারিখ অনুযায়ী সাজান (নতুন প্রথমে)
    filteredRecords.sort((a, b) => new Date(b.date) - new Date(a.date));

    // পেজিনেশন
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 50;
    const skip = (page - 1) * limit;
    
    const paginatedRecords = filteredRecords.slice(skip, skip + limit);
    
    return {
      data: paginatedRecords,
      pagination: {
        page,
        limit,
        total: filteredRecords.length,
        pages: Math.ceil(filteredRecords.length / limit)
      }
    };
  }

  static async getAttendanceStats(options = {}) {
    const attendanceRecords = this.readAttendance();
    let filteredRecords = [...attendanceRecords];

    // তারিখ রেঞ্জ ফিল্টার
    if (options.startDate && options.endDate) {
      filteredRecords = filteredRecords.filter(record => 
        record.date >= options.startDate && record.date <= options.endDate
      );
    }

    // ক্লাস ফিল্টার
    if (options.class) {
      filteredRecords = filteredRecords.filter(record => 
        record.class === options.class
      );
    }

    const totalRecords = filteredRecords.length;
    const presentCount = filteredRecords.filter(r => r.status === 'present').length;
    const absentCount = filteredRecords.filter(r => r.status === 'absent').length;
    const lateCount = filteredRecords.filter(r => r.status === 'late').length;

    return {
      total: totalRecords,
      present: presentCount,
      absent: absentCount,
      late: lateCount,
      presentPercentage: totalRecords > 0 ? ((presentCount / totalRecords) * 100).toFixed(2) : 0
    };
  }

  static async bulkMarkAttendance(attendanceList) {
    const attendanceRecords = this.readAttendance();
    
    for (const attendanceData of attendanceList) {
      // একই তারিখে একই ছাত্রের হাজিরা আছে কিনা চেক করুন
      const existingIndex = attendanceRecords.findIndex(record => 
        record.studentId === attendanceData.studentId && 
        record.date === attendanceData.date
      );

      if (existingIndex !== -1) {
        // আপডেট করুন
        attendanceRecords[existingIndex] = {
          ...attendanceRecords[existingIndex],
          ...attendanceData,
          updatedAt: new Date().toISOString()
        };
      } else {
        // নতুন রেকর্ড যোগ করুন
        const newRecord = {
          _id: this.generateId(),
          ...attendanceData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        attendanceRecords.push(newRecord);
      }
    }
    
    if (this.writeAttendance(attendanceRecords)) {
      return { success: true, count: attendanceList.length };
    } else {
      throw new Error('বাল্ক হাজিরা সংরক্ষণ করতে ব্যর্থ');
    }
  }
}

export default AttendanceDB;