// scripts/seedBlog.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Blog from '../src/models/Blog';

const { MONGO_URI } = process.env;
if (!MONGO_URI) throw new Error('MONGO_URI missing');

async function run() {
    if (!MONGO_URI) throw new Error('MONGO_URI missing');
    await mongoose.connect(MONGO_URI);
    const b = await Blog.create({
        title: 'Hello MongoDB',
        slug: 'mongodb',
        markdown: '## Hello\nThis is a sample blog. Written by **test user**.',
        authorName: 'testuser'
    });
    console.log('Inserted', b.slug);
    process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
