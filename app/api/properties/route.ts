import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';
import Image from '@/models/Image';
import mongoose from 'mongoose';
import { Property as PropertyType } from '@/types/property';

export async function GET() {
  try {
    await connectDB();
    
    const properties = await Property.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    
    // Convert MongoDB documents to plain objects
    const formattedProperties: PropertyType[] = properties.map(prop => ({
      ...prop,
      _id: prop._id.toString(),
      createdAt: prop.createdAt?.toISOString(),
      updatedAt: prop.updatedAt?.toISOString(),
    }));
    
    return NextResponse.json(formattedProperties);
    
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Partial<PropertyType>;
    await connectDB();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'price', 'type', 'bedrooms', 'bathrooms', 'area', 'location'];
    for (const field of requiredFields) {
      if (!body[field as keyof PropertyType]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Create the property
    const property = await Property.create({
      ...body,
      status: body.status || 'available'
    });
    
    // If there are images, update them with the property ID
    if (body.images && body.images.length > 0) {
      // Extract GridFS IDs from image URLs
      const gridFsIds = body.images
        .map((url: string) => {
          const match = url.match(/\/api\/images\/([a-f0-9]+)/i);
          return match ? match[1] : null;
        })
        .filter((id: string | null): id is string => id !== null);
      
      // Update images with propertyId
      for (const gridFsId of gridFsIds) {
        if (mongoose.Types.ObjectId.isValid(gridFsId)) {
          await Image.findOneAndUpdate(
            { gridFsId: new mongoose.Types.ObjectId(gridFsId) },
            { propertyId: property._id }
          );
        }
      }
    }
    
    // Return formatted property
    const formattedProperty: PropertyType = {
      ...property.toObject(),
      _id: property._id.toString(),
      createdAt: property.createdAt?.toISOString(),
      updatedAt: property.updatedAt?.toISOString(),
    };
    
    return NextResponse.json(formattedProperty, { status: 201 });
    
  } catch (error) {
    console.error('Error creating property:', error);
    
    // Handle duplicate key errors or other MongoDB errors
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}