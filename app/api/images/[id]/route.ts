import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { RouteContext } from '@/types/next';

// Define a type for GridFS file with proper typing
interface GridFSFile {
  _id: mongoose.Types.ObjectId;
  length: number;
  chunkSize: number;
  uploadDate: Date;
  filename: string;
  metadata?: {
    contentType?: string;
    originalName?: string;
    [key: string]: unknown;
  };
  contentType?: string;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // Await the params (Next.js 15+ requirement)
    const { id } = await context.params;
    
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid image ID' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();
    
    // Get the MongoDB native driver
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection failed');
    }
    
    // Create a GridFS bucket
    const bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: 'property_images'
    });
    
    // Check if file exists
    const files = await bucket
      .find({ _id: new mongoose.Types.ObjectId(id) })
      .toArray() as GridFSFile[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
    
    const file = files[0];
    
    // Get content type from metadata or use default
    const contentType = file.metadata?.contentType || 
                       file.contentType || 
                       'image/jpeg';
    
    // Create a readable stream
    const stream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(id)
    );
    
    // Convert stream to buffer using a Promise
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      
      stream.on('data', (chunk) => {
        chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk));
      });
      
      stream.on('error', (error) => {
        reject(error);
      });
      
      stream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
    });
    
    // Convert Buffer to Uint8Array for NextResponse
    const uint8Array = new Uint8Array(buffer);
    
    // Return the image with proper headers
    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': file.length.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('Image retrieval error:', error);
    
    // Check if it's a MongoDB error
    if (error instanceof mongoose.Error) {
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to retrieve image' },
      { status: 500 }
    );
  }
}

// HEAD method for checking if image exists
export async function HEAD(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse(null, { status: 400 });
    }

    await connectDB();
    
    const db = mongoose.connection.db;
    if (!db) {
      return new NextResponse(null, { status: 500 });
    }
    
    const bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: 'property_images'
    });
    
    const files = await bucket
      .find({ _id: new mongoose.Types.ObjectId(id) })
      .toArray() as GridFSFile[];
    
    if (!files || files.length === 0) {
      return new NextResponse(null, { status: 404 });
    }
    
    const file = files[0];
    const contentType = file.metadata?.contentType || 
                       file.contentType || 
                       'image/jpeg';
    
    return new NextResponse(null, { 
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': file.length.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Access-Control-Allow-Origin': '*',
      }
    });
    
  } catch (error) {
    console.error('HEAD request error:', error);
    return new NextResponse(null, { status: 500 });
  }
}

// OPTIONS method for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}