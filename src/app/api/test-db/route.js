import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not Set');
    
    await connectDB();
    console.log('✅ MongoDB connected successfully!');
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB সফলভাবে কানেক্ট হয়েছে!',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: 'MongoDB কানেকশনে সমস্যা হয়েছে'
    }, { status: 500 });
  }
}