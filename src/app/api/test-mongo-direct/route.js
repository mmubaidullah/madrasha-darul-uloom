import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    console.log('🔍 Testing direct MongoDB connection...');
    
    const uri = process.env.MONGODB_URI;
    console.log('URI exists:', !!uri);
    console.log('URI length:', uri ? uri.length : 0);
    
    if (!uri) {
      return NextResponse.json({
        success: false,
        error: 'MongoDB URI not found'
      });
    }
    
    console.log('Creating MongoDB client...');
    const client = new MongoClient(uri);
    
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    const db = client.db('madrasha_db');
    const collection = db.collection('students');
    
    console.log('Getting student count...');
    const count = await collection.countDocuments();
    console.log('Student count:', count);
    
    await client.close();
    console.log('Connection closed');
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      studentCount: count,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'MongoDB connection failed',
      details: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}