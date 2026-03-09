import { NextResponse } from 'next/server';
import { StudentMongoDB } from '@/lib/mongodb-db';
import simpleDB from '@/lib/simple-db';

export async function GET() {
  try {
    console.log('Testing database connections...');
    
    // First try MongoDB
    let mongoResult = null;
    try {
      const studentDB = new StudentMongoDB();
      const collection = await studentDB.getCollection();
      const count = await collection.countDocuments();
      mongoResult = {
        connected: true,
        database: 'madrasha_management',
        collection: 'students',
        studentCount: count,
        type: 'MongoDB Atlas'
      };
      console.log('MongoDB connection successful');
    } catch (mongoError) {
      console.log('MongoDB connection failed, using Simple DB');
      mongoResult = {
        connected: false,
        error: mongoError.message,
        type: 'MongoDB Atlas'
      };
    }
    
    // Always test Simple DB as fallback
    const simpleStats = simpleDB.getStats();
    const simpleResult = {
      connected: true,
      database: 'simple-memory-db',
      collection: 'students',
      stats: simpleStats,
      type: 'Simple In-Memory DB'
    };
    
    return NextResponse.json({
      success: true,
      message: 'Database connection test completed',
      data: {
        mongodb: mongoResult,
        simpleDB: simpleResult,
        activeDatabase: mongoResult.connected ? 'MongoDB' : 'Simple DB'
      }
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    return NextResponse.json({
      success: false,
      error: 'Database connection test failed',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}