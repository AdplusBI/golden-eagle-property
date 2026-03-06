import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Define the cached connection type
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare global mongoose cache
declare global {
  var mongoose: MongooseCache;
}

// Initialize cache with better defaults for serverless
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new MongoDB connection');
    
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Limit connection pool size for serverless
      minPoolSize: 0,  // Don't maintain minimum connections
      socketTimeoutMS: 5000, // Socket timeout
      connectTimeoutMS: 5000, // Connection timeout
      serverSelectionTimeoutMS: 5000, // Server selection timeout
      retryWrites: true,
      retryReads: true,
    };

    // Type assertion here since we've already checked MONGODB_URI exists
    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;