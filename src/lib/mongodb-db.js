import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

class MongoDB {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  async getCollection() {
    try {
      const client = await clientPromise;
      const db = client.db('madrasha_management');
      return db.collection(this.collectionName);
    } catch (error) {
      console.error(`MongoDB connection error for collection ${this.collectionName}:`, error);
      throw new Error(`Database connection failed: ${error.message}`);
    }
  }

  generateId() {
    return new ObjectId().toString();
  }

  async create(data) {
    try {
      const collection = await this.getCollection();
      const document = {
        ...data,
        _id: new ObjectId(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await collection.insertOne(document);
      return { ...document, _id: result.insertedId.toString() };
    } catch (error) {
      console.error(`Error creating document in ${this.collectionName}:`, error);
      throw error;
    }
  }

  async findAll(options = {}) {
    try {
      const collection = await this.getCollection();
      const {
        filter = {},
        sort = { createdAt: -1 },
        limit = 50,
        skip = 0,
        projection = {}
      } = options;

      const cursor = collection.find(filter, { projection });
      
      if (sort) cursor.sort(sort);
      if (skip) cursor.skip(skip);
      if (limit) cursor.limit(limit);

      const documents = await cursor.toArray();
      const total = await collection.countDocuments(filter);

      return {
        data: documents.map(doc => ({ ...doc, _id: doc._id.toString() })),
        total,
        page: Math.floor(skip / limit) + 1,
        pages: Math.ceil(total / limit)
      };
    } catch (error) {
      console.error(`Error finding documents in ${this.collectionName}:`, error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const collection = await this.getCollection();
      const document = await collection.findOne({ _id: new ObjectId(id) });
      return document ? { ...document, _id: document._id.toString() } : null;
    } catch (error) {
      console.error(`Error finding document by ID in ${this.collectionName}:`, error);
      throw error;
    }
  }

  async findOne(filter) {
    try {
      const collection = await this.getCollection();
      const document = await collection.findOne(filter);
      return document ? { ...document, _id: document._id.toString() } : null;
    } catch (error) {
      console.error(`Error finding document in ${this.collectionName}:`, error);
      throw error;
    }
  }

  async updateById(id, updateData) {
    try {
      const collection = await this.getCollection();
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            ...updateData, 
            updatedAt: new Date() 
          } 
        }
      );

      if (result.matchedCount === 0) {
        throw new Error('Document not found');
      }

      return await this.findById(id);
    } catch (error) {
      console.error(`Error updating document in ${this.collectionName}:`, error);
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const collection = await this.getCollection();
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting document in ${this.collectionName}:`, error);
      throw error;
    }
  }

  async search(searchTerm, searchFields = []) {
    try {
      const collection = await this.getCollection();
      const searchQuery = {
        $or: searchFields.map(field => ({
          [field]: { $regex: searchTerm, $options: 'i' }
        }))
      };

      const documents = await collection.find(searchQuery).sort({ createdAt: -1 }).toArray();
      return documents.map(doc => ({ ...doc, _id: doc._id.toString() }));
    } catch (error) {
      console.error(`Error searching documents in ${this.collectionName}:`, error);
      throw error;
    }
  }

  async count(filter = {}) {
    try {
      const collection = await this.getCollection();
      return await collection.countDocuments(filter);
    } catch (error) {
      console.error(`Error counting documents in ${this.collectionName}:`, error);
      throw error;
    }
  }
}

// User Management Class
export class UserMongoDB extends MongoDB {
  constructor() {
    super('users');
  }

  async createUser(userData) {
    try {
      // Check if email already exists
      const existingUser = await this.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে');
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      // Prepare user data
      const processedData = {
        name: userData.name,
        email: userData.email.toLowerCase(),
        password: hashedPassword,
        phone: userData.phone,
        role: userData.role,
        status: 'active',
        emailVerified: false,
        lastLogin: null,
        loginAttempts: 0,
        lockedUntil: null
      };

      return await this.create(processedData);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async findByEmail(email) {
    return await this.findOne({ email: email.toLowerCase() });
  }

  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async updateLastLogin(userId) {
    return await this.updateById(userId, { 
      lastLogin: new Date(),
      loginAttempts: 0,
      lockedUntil: null
    });
  }

  async incrementLoginAttempts(userId) {
    const user = await this.findById(userId);
    if (!user) return null;

    const attempts = (user.loginAttempts || 0) + 1;
    const updateData = { loginAttempts: attempts };

    // Lock account after 5 failed attempts for 30 minutes
    if (attempts >= 5) {
      updateData.lockedUntil = new Date(Date.now() + 30 * 60 * 1000);
    }

    return await this.updateById(userId, updateData);
  }

  async isAccountLocked(user) {
    if (!user.lockedUntil) return false;
    return new Date() < new Date(user.lockedUntil);
  }

  async getUsers(options = {}) {
    const { search, role, status, page = 1, limit = 10 } = options;
    
    let filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role) {
      filter.role = role;
    }

    if (status) {
      filter.status = status;
    }

    return await this.findAll({
      filter,
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      projection: { password: 0 } // Exclude password from results
    });
  }
}

// Specific database classes
export class StudentMongoDB extends MongoDB {
  constructor() {
    super('students');
  }

  generateStudentId(count) {
    return `STD${String(count + 1).padStart(4, '0')}`;
  }

  async createStudent(studentData) {
    const totalStudents = await this.count();
    const studentId = this.generateStudentId(totalStudents);
    
    return await this.create({
      ...studentData,
      studentId,
      status: studentData.status || 'active'
    });
  }

  async getStudents(options = {}) {
    const { search, class: className, department, group, status, page = 1, limit = 10 } = options;
    
    console.log('MongoDB getStudents called with options:', options);
    
    let filter = {};
    
    // Only filter by status if explicitly provided
    if (status) {
      filter.status = status;
    }
    
    if (search) {
      filter.$or = [
        { nameBangla: { $regex: search, $options: 'i' } },
        { nameEnglish: { $regex: search, $options: 'i' } },
        { studentName: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (className) {
      filter.admissionClass = className;
    }

    if (department) {
      filter.department = department;
    }

    if (group) {
      filter.group = group;
    }

    console.log('MongoDB filter:', JSON.stringify(filter, null, 2));

    const result = await this.findAll({
      filter,
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit)
    });

    console.log('MongoDB getStudents result:', {
      dataCount: result.data.length,
      total: result.total,
      page: result.page,
      pages: result.pages
    });

    return result;
  }
}

export class TeacherMongoDB extends MongoDB {
  constructor() {
    super('teachers');
  }

  generateTeacherId(count) {
    return `TCH${String(count + 1).padStart(4, '0')}`;
  }

  async createTeacher(teacherData) {
    const totalTeachers = await this.count();
    const teacherId = this.generateTeacherId(totalTeachers);
    
    return await this.create({
      ...teacherData,
      teacherId,
      status: teacherData.status || 'active'
    });
  }

  async getTeachers(options = {}) {
    const { search, subject, status = 'active', page = 1, limit = 10 } = options;
    
    let filter = { status };
    
    if (search) {
      filter.$or = [
        { nameBangla: { $regex: search, $options: 'i' } },
        { nameEnglish: { $regex: search, $options: 'i' } },
        { teacherId: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (subject) {
      filter.subject = subject;
    }

    return await this.findAll({
      filter,
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit)
    });
  }
}

export class AttendanceMongoDB extends MongoDB {
  constructor() {
    super('attendance');
  }

  async markAttendance(attendanceData) {
    // Check if attendance already exists for this student and date
    const existing = await this.findOne({
      studentId: attendanceData.studentId,
      date: attendanceData.date
    });

    if (existing) {
      return await this.updateById(existing._id, {
        status: attendanceData.status,
        updatedAt: new Date()
      });
    } else {
      return await this.create(attendanceData);
    }
  }

  async getAttendance(options = {}) {
    const { date, class: className, studentId, page = 1, limit = 50 } = options;
    
    let filter = {};
    
    if (date) filter.date = date;
    if (className) filter.class = className;
    if (studentId) filter.studentId = studentId;

    return await this.findAll({
      filter,
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit)
    });
  }

  async bulkMarkAttendance(attendanceList) {
    const results = [];
    for (const attendance of attendanceList) {
      const result = await this.markAttendance(attendance);
      results.push(result);
    }
    return { success: true, count: results.length, data: results };
  }
}

export class FeesMongoDB extends MongoDB {
  constructor() {
    super('fees');
  }

  generateReceiptNo(count) {
    return `RCP${String(count + 1).padStart(4, '0')}`;
  }

  async collectFee(feeData) {
    const totalFees = await this.count();
    const receiptNo = this.generateReceiptNo(totalFees);
    
    return await this.create({
      ...feeData,
      receiptNo,
      status: feeData.paidAmount >= feeData.amount ? 'paid' : 'partial',
      dueAmount: feeData.amount - feeData.paidAmount
    });
  }

  async getFees(options = {}) {
    const { search, class: className, status, month, page = 1, limit = 20 } = options;
    
    let filter = {};
    
    if (search) {
      filter.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { receiptNo: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (className) filter.class = className;
    if (status) filter.status = status;
    if (month) filter.month = month;

    return await this.findAll({
      filter,
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit)
    });
  }
}

export default MongoDB;