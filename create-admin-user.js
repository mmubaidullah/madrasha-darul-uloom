const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://madrasha_db:9UYJqnb9XGioT6y1@madrasha.tynatyq.mongodb.net/madrasha_management?retryWrites=true&w=majority&appName=madrasha';

async function createAdminUser() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('madrasha_management');
    const usersCollection = db.collection('users');
    
    // Check if admin user already exists
    const existingAdmin = await usersCollection.findOne({ email: 'admin@madrasha.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }
    
    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash('admin123', saltRounds);
    
    // Create admin user
    const adminUser = {
      name: 'Super Admin',
      email: 'admin@madrasha.com',
      password: hashedPassword,
      phone: '01712345678',
      role: 'super_admin',
      status: 'active',
      emailVerified: true,
      lastLogin: null,
      loginAttempts: 0,
      lockedUntil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await usersCollection.insertOne(adminUser);
    console.log('Admin user created successfully:', result.insertedId);
    
    // Create a test teacher user
    const teacherPassword = await bcrypt.hash('teacher123', saltRounds);
    const teacherUser = {
      name: 'Test Teacher',
      email: 'teacher@madrasha.com',
      password: teacherPassword,
      phone: '01712345679',
      role: 'teacher',
      status: 'active',
      emailVerified: true,
      lastLogin: null,
      loginAttempts: 0,
      lockedUntil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const teacherResult = await usersCollection.insertOne(teacherUser);
    console.log('Teacher user created successfully:', teacherResult.insertedId);
    
    // Create a test student user
    const studentPassword = await bcrypt.hash('student123', saltRounds);
    const studentUser = {
      name: 'Test Student',
      email: 'student@madrasha.com',
      password: studentPassword,
      phone: '01712345680',
      role: 'student',
      status: 'active',
      emailVerified: true,
      lastLogin: null,
      loginAttempts: 0,
      lockedUntil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const studentResult = await usersCollection.insertOne(studentUser);
    console.log('Student user created successfully:', studentResult.insertedId);
    
    // Create a test parent user
    const parentPassword = await bcrypt.hash('parent123', saltRounds);
    const parentUser = {
      name: 'Test Parent',
      email: 'parent@madrasha.com',
      password: parentPassword,
      phone: '01712345681',
      role: 'parent',
      status: 'active',
      emailVerified: true,
      lastLogin: null,
      loginAttempts: 0,
      lockedUntil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const parentResult = await usersCollection.insertOne(parentUser);
    console.log('Parent user created successfully:', parentResult.insertedId);
    
    console.log('\n=== Test Users Created ===');
    console.log('Super Admin: admin@madrasha.com / admin123');
    console.log('Teacher: teacher@madrasha.com / teacher123');
    console.log('Student: student@madrasha.com / student123');
    console.log('Parent: parent@madrasha.com / parent123');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await client.close();
  }
}

createAdminUser();