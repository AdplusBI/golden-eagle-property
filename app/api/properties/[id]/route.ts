import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params
    const { id } = await params;
    
    console.log('Fetching property with ID:', id); // Debug log
    
    await connectDB();
    
    // Find the property by ID
    const property = await Property.findById(id).lean();
    
    if (!property) {
      console.log('Property not found with ID:', id);
      return NextResponse.json(
        { error: 'Property not found' }, 
        { status: 404 }
      );
    }
    
    // Convert MongoDB _id to string and remove __v
    const formattedProperty = {
      ...property,
      _id: property._id.toString(),
    };
    
    console.log('Property found:', formattedProperty._id);
    return NextResponse.json(formattedProperty);
    
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property' }, 
      { status: 500 }
    );
  }
}

// If you have other methods (PUT, DELETE), update them similarly
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    await connectDB();
    
    const property = await Property.findByIdAndUpdate(
      id,
      { ...body, updatedAt: Date.now() },
      { new: true }
    ).lean();
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      ...property,
      _id: property._id.toString(),
    });
    
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { error: 'Failed to update property' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await connectDB();
    
    const property = await Property.findByIdAndDelete(id);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Property deleted successfully' }
    );
    
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { error: 'Failed to delete property' }, 
      { status: 500 }
    );
  }
}