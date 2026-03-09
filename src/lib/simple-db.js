// Simple in-memory database for development
class SimpleDB {
  constructor() {
    this.students = [];
    this.teachers = [];
    this.attendance = [];
    this.fees = [];
    this.nextId = 1;
  }

  generateId() {
    return (this.nextId++).toString();
  }

  // Student operations
  createStudent(studentData) {
    const student = {
      _id: this.generateId(),
      ...studentData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.students.push(student);
    return student;
  }

  getStudents(options = {}) {
    const { search, class: className, department, group, status = 'active', page = 1, limit = 10 } = options;
    
    let filtered = this.students.filter(student => {
      if (status && student.status !== status) return false;
      if (className && student.admissionClass !== className) return false;
      if (department && student.department !== department) return false;
      if (group && student.group !== group) return false;
      if (search) {
        const searchLower = search.toLowerCase();
        return (
          student.studentName?.toLowerCase().includes(searchLower) ||
          student.nameBangla?.toLowerCase().includes(searchLower) ||
          student.studentId?.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });

    const total = filtered.length;
    const pages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const data = filtered.slice(skip, skip + limit);

    return {
      data,
      total,
      page,
      pages
    };
  }

  getStudentById(id) {
    return this.students.find(student => student._id === id) || null;
  }

  updateStudent(id, updateData) {
    const index = this.students.findIndex(student => student._id === id);
    if (index === -1) return null;
    
    this.students[index] = {
      ...this.students[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    return this.students[index];
  }

  deleteStudent(id) {
    const index = this.students.findIndex(student => student._id === id);
    if (index === -1) return false;
    
    this.students.splice(index, 1);
    return true;
  }

  // Get stats
  getStats() {
    return {
      totalStudents: this.students.length,
      activeStudents: this.students.filter(s => s.status === 'active').length,
      pendingStudents: this.students.filter(s => s.status === 'pending').length,
      totalTeachers: this.teachers.length,
      totalAttendance: this.attendance.length,
      totalFees: this.fees.length
    };
  }
}

// Create a global instance
let simpleDB;
if (typeof global !== 'undefined') {
  if (!global.simpleDB) {
    global.simpleDB = new SimpleDB();
  }
  simpleDB = global.simpleDB;
} else {
  simpleDB = new SimpleDB();
}

export default simpleDB;