import { NextResponse } from 'next/server';
import { FeesMongoDB } from '@/lib/mongodb-db';

const feesDB = new FeesMongoDB();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const search = searchParams.get('search') || '';
    const classFilter = searchParams.get('class') || '';
    const status = searchParams.get('status') || '';
    const month = searchParams.get('month') || '';
    
    const result = await feesDB.getFees({
      search,
      class: classFilter,
      status,
      month,
      page,
      limit
    });
    
    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: {
        page: result.page,
        limit: parseInt(limit),
        total: result.total,
        pages: result.pages
      }
    });
  } catch (error) {
    console.error('ফি তথ্য আনতে সমস্যা:', error);
    return NextResponse.json({
      success: false,
      error: 'ফি তথ্য আনতে ব্যর্থ',
      details: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const feeData = await request.json();
    
    // Validate required fields
    if (!feeData.studentId || !feeData.amount) {
      return NextResponse.json({
        success: false,
        error: 'ছাত্রের ID এবং ফি পরিমাণ আবশ্যক'
      }, { status: 400 });
    }
    
    const newFee = await feesDB.collectFee(feeData);
    
    return NextResponse.json({
      success: true,
      message: 'ফি সফলভাবে কালেক্ট করা হয়েছে',
      data: newFee
    });
  } catch (error) {
    console.error('ফি কালেক্ট করতে সমস্যা:', error);
    return NextResponse.json({
      success: false,
      error: 'ফি কালেক্ট করতে ব্যর্থ',
      details: error.message
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const updateData = await request.json();
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ফি রেকর্ডের ID প্রয়োজন'
      }, { status: 400 });
    }
    
    const updatedFee = await feesDB.updateById(id, updateData);
    
    return NextResponse.json({
      success: true,
      message: 'ফি রেকর্ড আপডেট হয়েছে',
      data: updatedFee
    });
  } catch (error) {
    console.error('ফি আপডেট করতে সমস্যা:', error);
    return NextResponse.json({
      success: false,
      error: 'ফি আপডেট করতে ব্যর্থ',
      details: error.message
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ফি রেকর্ডের ID প্রয়োজন'
      }, { status: 400 });
    }
    
    const deleted = await feesDB.deleteById(id);
    
    if (deleted) {
      return NextResponse.json({
        success: true,
        message: 'ফি রেকর্ড মুছে ফেলা হয়েছে'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'ফি রেকর্ড পাওয়া যায়নি'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('ফি ডিলিট করতে সমস্যা:', error);
    return NextResponse.json({
      success: false,
      error: 'ফি রেকর্ড মুছতে ব্যর্থ',
      details: error.message
    }, { status: 500 });
  }
}