const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://madrasha_db:WB3DrdltatkGaaJk@madrasha.tynatyq.mongodb.net/madrasha_db?retryWrites=true&w=majority&appName=madrasha';

async function testConnection() {
  console.log('🔍 Testing MongoDB connection...');
  
  try {
    const client = new MongoClient(uri);
    console.log('📡 Connecting to MongoDB...');
    
    await client.connect();
    console.log('✅ Connected successfully!');
    
    const db = client.db('madrasha_db');
    const collection = db.collection('students');
    
    // Test basic operations
    console.log('📊 Getting student count...');
    const count = await collection.countDocuments();
    console.log(`📋 Total students: ${count}`);
    
    // Test creating a new student
    console.log('📝 Testing student creation...');
    const testStudent = {
      studentName: 'টেস্ট ছাত্র ' + Date.now(),
      fatherName: 'টেস্ট পিতা',
      guardianName: 'টেস্ট অভিভাবক',
      guardianMobile: '01700000000',
      presentAddress: {
        village: 'টেস্ট গ্রাম',
        district: 'টেস্ট জেলা'
      },
      department: 'কিতাব বিভাগ',
      admissionClass: 'ইবতিদাইয়্যাহ-১ (উর্দূ)',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    const result = await collection.insertOne(testStudent);
    console.log('✅ Student created with ID:', result.insertedId);
    
    // Get updated count
    const newCount = await collection.countDocuments();
    console.log(`📋 New total students: ${newCount}`);
    
    await client.close();
    console.log('🎉 All tests passed! MongoDB is working perfectly.');
    
  } catch (error) {
    console.error('❌ MongoDB test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

testConnection();