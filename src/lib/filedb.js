// Simple file-based database for development/testing
import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'data');
const STUDENTS_FILE = path.join(DB_DIR, 'students.json');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize students file if it doesn't exist
if (!fs.existsSync(STUDENTS_FILE)) {
  fs.writeFileSync(STUDENTS_FILE, JSON.stringify([], null, 2));
}

class FileDB {
  static generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  static generateStudentId(students) {
    const count = students.length;
    return `STD${String(count + 1).padStart(4, '0')}`;
  }

  static readStudents() {
    try {
      const data = fs.readFileSync(STUDENTS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading students file:', error);
      return [];
    }
  }

  static writeStudents(students) {
    try {
      fs.writeFileSync(STUDENTS_FILE, JSON.stringify(students, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing students file:', error);
      return false;
    }
  }

  static async createStudent(studentData) {
    const students = this.readStudents();
    
    const newStudent = {
      _id: this.generateId(),
      studentId: this.generateStudentId(students),
      ...studentData,
      status: studentData.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    students.push(newStudent);
    
    if (this.writeStudents(students)) {
      return newStudent;
    } else {
      throw new Error('Failed to save student');
    }
  }

  static async getStudents(options = {}) {
    const students = this.readStudents();
    let filteredStudents = [...students];

    // Apply search filter
    if (options.search) {
      const searchTerm = options.search.toLowerCase();
      filteredStudents = filteredStudents.filter(student => 
        student.nameBangla?.toLowerCase().includes(searchTerm) ||
        student.nameEnglish?.toLowerCase().includes(searchTerm) ||
        student.studentId?.toLowerCase().includes(searchTerm)
      );
    }

    // Apply class filter
    if (options.class) {
      filteredStudents = filteredStudents.filter(student => 
        student.admissionClass === options.class
      );
    }

    // Apply status filter
    if (options.status) {
      filteredStudents = filteredStudents.filter(student => 
        student.status === options.status
      );
    } else {
      // Default to active students only
      filteredStudents = filteredStudents.filter(student => 
        student.status === 'active'
      );
    }

    // Sort by creation date (newest first)
    filteredStudents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Apply pagination
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const skip = (page - 1) * limit;
    
    const paginatedStudents = filteredStudents.slice(skip, skip + limit);
    
    return {
      data: paginatedStudents,
      pagination: {
        page,
        limit,
        total: filteredStudents.length,
        pages: Math.ceil(filteredStudents.length / limit)
      }
    };
  }

  static async getStudentById(id) {
    const students = this.readStudents();
    return students.find(student => student._id === id || student.studentId === id);
  }

  static async updateStudent(id, updateData) {
    const students = this.readStudents();
    const index = students.findIndex(student => student._id === id || student.studentId === id);
    
    if (index === -1) {
      throw new Error('Student not found');
    }

    students[index] = {
      ...students[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    if (this.writeStudents(students)) {
      return students[index];
    } else {
      throw new Error('Failed to update student');
    }
  }

  static async deleteStudent(id) {
    const students = this.readStudents();
    const filteredStudents = students.filter(student => 
      student._id !== id && student.studentId !== id
    );

    if (students.length === filteredStudents.length) {
      throw new Error('Student not found');
    }

    return this.writeStudents(filteredStudents);
  }
}

export default FileDB;