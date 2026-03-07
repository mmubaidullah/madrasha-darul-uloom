import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    // MongoDB কানেকশন টেস্ট
    const client = await clientPromise;
    const db = client.db('madrasha_management');
    
    // Database ping করুন
    await db.admin().ping();
    
    // Collections তালিকা পান
    const collections = await db.listCollections().toArray();
    
    // কিছু টেস্ট ডাটা ইনসার্ট করুন
    const testCollection = db.collection('test');
    const testDoc = {
      message: 'MongoDB কানেকশন সফল!',
      timestamp: new Date(),
      collections: collections.map(c => c.name)
    };
    
    await testCollection.insertOne(testDoc);
    
    // টেস্ট ডাটা রিড করুন
    const insertedDoc = await testCollection.findOne({ message: 'MongoDB কানেকশন সফল!' });
    
    // টেস্ট ডাটা ডিলিট করুন
    await testCollection.deleteOne({ _id: insertedDoc._id });

    return NextResponse.json({
      success: true,
      message: 'MongoDB কানেকশন সফল!',
      details: {
        database: 'madrasha_management',
        collections: collections.map(c => c.name),
        testInsert: 'সফল',
        testRead: 'সফল',
        testDelete: 'সফল',
        connectionTime: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('MongoDB কানেকশন এরর:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        errorType: error.name,
        mongodbUri: process.env.MONGODB_URI ? 'সেট করা আছে' : 'সেট করা নেই',
        suggestion: 'MongoDB URI এবং নেটওয়ার্ক কানেকশন চেক করুন'
      }
    }, { status: 500 });
  }
}