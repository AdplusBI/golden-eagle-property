import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';

export async function GET() {
  try {
    await connectDB();
    const properties = await Property.find({}).lean();
    
    // Log the images to see what's stored
    console.log('Properties with images:', properties.map(p => ({
      id: p._id,
      title: p.title,
      images: p.images
    })));
    
    return NextResponse.json({
      count: properties.length,
      properties: properties.map(p => ({
        id: p._id,
        title: p.title,
        images: p.images
      }))
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({ error: 'Debug failed' }, { status: 500 });
  }
}