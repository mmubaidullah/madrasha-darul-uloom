const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// MongoDB connection string - update this with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/madrasha_management';

async function createMuhtamimUser() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('madrasha_management');
    const usersCollection = db.collection('users');
    
    // Check if muhtamim user already exists
    const existingUser = await usersCollection.findOne({ 
      email: 'muhtamim@madrasha.com' 
    });
    
    if (existingUser) {
      console.log('মুহতামিম ব্যবহারকারী ইতিমধ্যে বিদ্যমান');
      return;
    }
    
    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash('muhtamim123', saltRounds);
    
    // Create muhtamim user
    const muhtamimUser = {
      name: 'মুহতামিম সাহেব',
      email: 'muhtamim@madrasha.com',
      password: hashedPassword,
      phone: '01712345678',
      role: 'muhtamim',
      department: 'প্রশাসন',
      address: 'মাদরাসা দারুল উলুম',
      status: 'active',
      emailVerified: true,
      lastLogin: null,
      loginAttempts: 0,
      lockedUntil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await usersCollection.insertOne(muhtamimUser);
    
    console.log('✅ মুহতামিম ব্যবহারকারী সফলভাবে তৈরি হয়েছে!');
    console.log('📧 ইমেইল: muhtamim@madrasha.com');
    console.log('🔑 পাসওয়ার্ড: muhtamim123');
    console.log('👤 ভূমিকা: মুহতামিম (Super Admin)');
    console.log('🆔 User ID:', result.insertedId);
    
    // Also create some other admin users for testing
    const otherAdmins = [
      {
        name: 'বিভাগীয় প্রধান',
        email: 'bivagiya@madrasha.com',
        password: await bcrypt.hash('bivagiya123', saltRounds),
        phone: '01712345679',
        role: 'bivagiya_prodhan',
        department: 'আরবি বিভাগ',
        address: 'মাদরাসা দারুল উলুম',
        status: 'active',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'নেগরান উস্তায',
        email: 'negaran@madrasha.com',
        password: await bcrypt.hash('negaran123', saltRounds),
        phone: '01712345680',
        role: 'negaran_ustaz',
        department: 'শিক্ষা বিভাগ',
        address: 'মাদরাসা দারুল উলুম',
        status: 'active',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'হিসাব রক্ষক',
        email: 'hisab@madrasha.com',
        password: await bcrypt.hash('hisab123', saltRounds),
        phone: '01712345681',
        role: 'hisab_rokkhok',
        department: 'হিসাব বিভাগ',
        address: 'মাদরাসা দারুল উলুম',
        status: 'active',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await usersCollection.insertMany(otherAdmins);
    console.log('✅ অন্যান্য প্রশাসনিক ব্যবহারকারী তৈরি হয়েছে!');
    
    console.log('\n📋 সকল টেস্ট অ্যাকাউন্ট:');
    console.log('1. মুহতামিম: muhtamim@madrasha.com / muhtamim123');
    console.log('2. বিভাগীয় প্রধান: bivagiya@madrasha.com / bivagiya123');
    console.log('3. নেগরান উস্তায: negaran@madrasha.com / negaran123');
    console.log('4. হিসাব রক্ষক: hisab@madrasha.com / hisab123');
    
  } catch (error) {
    console.error('❌ Error creating muhtamim user:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the script
createMuhtamimUser();