import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  content: string;
  createdBy: string;
  collaborators: string[];
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    default: ''
  },
  createdBy: {
    type: String,
    required: true
  },
  collaborators: [{
    type: String
  }]
}, {
  timestamps: true
});

export default mongoose.model<IDocument>('Document', DocumentSchema); 