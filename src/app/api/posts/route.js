// src/app/api/posts/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongo';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("resources");
    const posts = await db.collection("web")
      .find({})
      .sort({ publishedAt: -1 }) // Sort by date, newest first
      .toArray();
    
    return NextResponse.json(posts);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}