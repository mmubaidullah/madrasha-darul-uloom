// Check MongoDB data
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv:/madrasha_db:lv9EKAwnd3dLSqYZ@madrasha.tynatyq.mongodb.net/?appName=madrasha';

async function checkData() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('madrasha_db');
    const collection = db.collection('students');
    
    const count = await collection.countDocuments();
    console.log('📊 Total students in MongoDB:', count);
    
    if (count > 0) {
      const students = await collection.find({}).limit(3).toArray();
      console.log('\n📋 Recent students:');
      students.forEach((student, index) => {
        console.log(`${index + 1}. ${student.studentName || student.studentId} (${student.createdAt})`);
      });
    }
    
    await client.close();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkData();