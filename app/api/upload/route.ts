/* eslint-disable */
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import Image from '@/models/Image';
import { UploadResponse } from '@/types/image';
import { Readable } from 'stream';

export async function POST(
  request: NextRequest
): Promise<NextResponse<UploadResponse>> {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid file type. Only JPEG, PNG and WEBP are allowed.' 
        },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File too large. Max 5MB.' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Get the MongoDB native driver
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection failed');
    }
    
    // Create a GridFS bucket
    const bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: 'property_images'
    });
    
    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const filename = `${timestamp}-${sanitizedName}`;
    
    // Upload to GridFS with content type in metadata
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        contentType: file.type,
        originalName: file.name,
        uploadDate: new Date()
      }
    });
    
    // Create a promise to handle the upload completion
    const gridFsId = await new Promise<mongoose.Types.ObjectId>((resolve, reject) => {
      // Handle upload completion
      uploadStream.on('finish', () => {
        resolve(uploadStream.id as mongoose.Types.ObjectId);
      });
      
      // Handle errors
      uploadStream.on('error', (error) => {
        reject(error);
      });
      
      // Write the buffer to the stream
      uploadStream.write(buffer);
      uploadStream.end();
    });
    
    // Create an image record in our Image model
    const image = await Image.create({
      filename: filename,
      originalName: file.name,
      contentType: file.type,
      size: file.size,
      gridFsId: gridFsId
    });
    
    // Return the URL path
    const imageUrl = `/api/images/${gridFsId.toString()}`;
    
    return NextResponse.json({
      success: true,
      imageUrl,
      imageId: image._id.toString(),
      message: 'Image uploaded successfully to MongoDB'
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    
    // Handle specific MongoDB errors
    if (error instanceof mongoose.Error) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database error during upload' 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Upload failed' 
      },
      { status: 500 }
    );
  }
}