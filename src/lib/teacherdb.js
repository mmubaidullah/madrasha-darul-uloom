// শিক্ষকদের জন্য ফাইল-ভিত্তিক ডাটাবেজ
import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'data');
const TEACHERS_FILE = path.join(DB_DIR, 'teachers.json');

// ডাটা ডিরেক্টরি তৈরি করুন
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// শিক্ষকদের ফাইল তৈরি করুন যদি না থাকে
if (!fs.existsSync(TEACHERS_FILE)) {
  const defaultTeachers = [
    {
      _id: "teacher1",
      teacherId: "TCH0001",
      nameBangla: "মাওলানা আব্দুল করিম",
      nameEnglish: "Maulana Abdul Karim",
      designation: "প্রধান শিক্ষক",
      subject: "হাদিস শরীফ",
      phone: "01712345678",
      email: "karim@madrasha.com",
      qualification: "দাওরায়ে হাদিস",
      experience: "১৫ বছর",
      salary: 25000,
      joiningDate: "2020-01-01",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: "teacher2", 
      teacherId: "TCH0002",
      nameBangla: "মাওলানা মোহাম্মদ রহিম",
      nameEnglish: "Maulana Mohammad Rahim",
      designation: "সহকারী শিক্ষক",
      subject: "কুরআন মজিদ",
      phone: "01812345678",
      email: "rahim@madrasha.com",
      qualification: "তাকমিল",
      experience: "১০ বছর",
      salary: 20000,
      joiningDate: "2021-03-15",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  fs.writeFileSync(TEACHERS_FILE, JSON.stringify(defaultTeachers, null, 2));
}

class TeacherDB {
  static generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  static generateTeacherId(teachers) {
    const count = teachers.length;
    return `TCH${String(count + 1).padStart(4, '0')}`;
  }

  static readTeachers() {
    try {
      const data = fs.readFileSync(TEACHERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('শিক্ষকদের ফাইল পড়তে সমস্যা:', error);
      return [];
    }
  }

  static writeTeachers(teachers) {
    try {
      fs.writeFileSync(TEACHERS_FILE, JSON.stringify(teachers, null, 2));
      return true;
    } catch (error) {
      console.error('শিক্ষকদের ফাইল লিখতে সমস্যা:', error);
      return false;
    }
  }

  static async createTeacher(teacherData) {
    const teachers = this.readTeachers();
    
    const newTeacher = {
      _id: this.generateId(),
      teacherId: this.generateTeacherId(teachers),
      ...teacherData,
      status: teacherData.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    teachers.push(newTeacher);
    
    if (this.writeTeachers(teachers)) {
      return newTeacher;
    } else {
      throw new Error('শিক্ষক সংরক্ষণ করতে ব্যর্থ');
    }
  }

  static async getTeachers(options = {}) {
    const teachers = this.readTeachers();
    let filteredTeachers = [...teachers];

    // অনুসন্ধান ফিল্টার
    if (options.search) {
      const searchTerm = options.search.toLowerCase();
      filteredTeachers = filteredTeachers.filter(teacher => 
        teacher.nameBangla?.toLowerCase().includes(searchTerm) ||
        teacher.nameEnglish?.toLowerCase().includes(searchTerm) ||
        teacher.teacherId?.toLowerCase().includes(searchTerm) ||
        teacher.subject?.toLowerCase().includes(searchTerm)
      );
    }

    // বিষয় ফিল্টার
    if (options.subject) {
      filteredTeachers = filteredTeachers.filter(teacher => 
        teacher.subject === options.subject
      );
    }

    // স্ট্যাটাস ফিল্টার
    if (options.status) {
      filteredTeachers = filteredTeachers.filter(teacher => 
        teacher.status === options.status
      );
    } else {
      // ডিফল্ট সক্রিয় শিক্ষক
      filteredTeachers = filteredTeachers.filter(teacher => 
        teacher.status === 'active'
      );
    }

    // তারিখ অনুযায়ী সাজান
    filteredTeachers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // পেজিনেশন
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const skip = (page - 1) * limit;
    
    const paginatedTeachers = filteredTeachers.slice(skip, skip + limit);
    
    return {
      data: paginatedTeachers,
      pagination: {
        page,
        limit,
        total: filteredTeachers.length,
        pages: Math.ceil(filteredTeachers.length / limit)
      }
    };
  }

  static async getTeacherById(id) {
    const teachers = this.readTeachers();
    return teachers.find(teacher => teacher._id === id || teacher.teacherId === id);
  }

  static async updateTeacher(id, updateData) {
    const teachers = this.readTeachers();
    const index = teachers.findIndex(teacher => teacher._id === id || teacher.teacherId === id);
    
    if (index === -1) {
      throw new Error('শিক্ষক পাওয়া যায়নি');
    }

    teachers[index] = {
      ...teachers[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    if (this.writeTeachers(teachers)) {
      return teachers[index];
    } else {
      throw new Error('শিক্ষকের তথ্য আপডেট করতে ব্যর্থ');
    }
  }

  static async deleteTeacher(id) {
    const teachers = this.readTeachers();
    const filteredTeachers = teachers.filter(teacher => 
      teacher._id !== id && teacher.teacherId !== id
    );

    if (teachers.length === filteredTeachers.length) {
      throw new Error('শিক্ষক পাওয়া যায়নি');
    }

    return this.writeTeachers(filteredTeachers);
  }
}

export default TeacherDB;