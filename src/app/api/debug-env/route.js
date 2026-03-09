import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not set',
    mongoUriLength: process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0,
    nodeEnv: process.env.NODE_ENV,
    envKeys: Object.keys(process.env).filter(key => key.includes('MONGO')),
    timestamp: new Date().toISOString()
  });
}