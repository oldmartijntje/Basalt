// src/models/Blog.ts
import { Schema, model, Document } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    slug: string;
    markdown: string;
    html?: string;       // optional cached HTML
    authorId?: string;   // ObjectId string of user
    authorName?: string; // denormalized author name (for quick rendering)
    visibility?: 'public' | 'private';
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    markdown: { type: String, required: true },
    html: { type: String },
    authorId: { type: String },
    authorName: { type: String },
    visibility: { type: String, default: 'public' },
}, { timestamps: true });

export default model<IBlog>('Blog', BlogSchema);
