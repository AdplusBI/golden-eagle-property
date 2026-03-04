/* eslint-disable */
import { Property } from './property';

export interface Image {
  _id: string;
  filename: string;
  originalName: string;
  contentType: string;
  size: number;
  propertyId?: string;
  gridFsId: string;
  uploadDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadResponse {
  success: boolean;
  imageUrl?: string;
  imageId?: string;
  message?: string;
  error?: string;
}

export interface ImageWithProperty extends Image {
  property?: Property;
}

// For GridFS file metadata
export interface GridFSMetadata {
  contentType: string;
  originalName: string;
  uploadDate: Date;
}

// For GridFS file
export interface GridFSFile {
  _id: { toString(): string };
  length: number;
  chunkSize: number;
  uploadDate: Date;
  filename: string;
  metadata?: GridFSMetadata;
  contentType?: string;
}