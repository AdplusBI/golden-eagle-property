import mongoose from 'mongoose';

// This model will help us track images in GridFS
const ImageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  length: Number,
  uploadDate: { type: Date, default: Date.now },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  gridFsId: mongoose.Schema.Types.ObjectId, // Reference to the file in GridFS
}, { timestamps: true });

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);