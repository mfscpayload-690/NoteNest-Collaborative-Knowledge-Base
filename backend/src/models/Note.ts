import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  docState?: Buffer;
  workspaceId: string;
  author: string; // user ID
  tags?: string[];
  yjsState?: Buffer; // Y.js document state
  version: number; // For optimistic concurrency control
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  docState: { type: Buffer }, // Y.js binary state
  workspaceId: { type: String, required: true },
  author: { type: String, required: true },
  tags: [{ type: String }],
  yjsState: { type: Buffer }, // Store Y.js document state
  version: { type: Number, default: 1 }, // For optimistic concurrency control
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<INote>('Note', NoteSchema);
