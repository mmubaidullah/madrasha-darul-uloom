import { NextResponse } from 'next/server';
import { StudentMongoDB } from '@/lib/mongodb-db';

const studentDB = new StudentMongoDB();

export async function PUT(request) {
  try {
    const { updates } = await request.json();
    
    if (!updates || !Array.isArray(updates)) {
      return NextResponse.json({
        success: false,
        error: 'আপডেট ডাটা প্রয়োজন'
      }, { status: 400 });
    }

    // Update each student's group
    const updatePromises = updates.map(async ({ id, group }) => {
      return await studentDB.updateById(id, { group });
    });

    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      message: 'গ্রুপ পরিবর্তন সফলভাবে সংরক্ষিত হয়েছে'
    });
  } catch (error) {
    console.error('Update groups error:', error);
    return NextResponse.json({
      success: false,
      error: 'গ্রুপ পরিবর্তন সংরক্ষণ করতে ব্যর্থ',
      details: error.message
    }, { status: 500 });
  }
}