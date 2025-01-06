// src/app/api/posts/[id]/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongo'
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("resources");
    
    // First try to find by string id
    let post = await db.collection("web").findOne({ id: params.id });
    
    // If not found, try to find by ObjectId
    if (!post) {
      try {
        post = await db.collection("web").findOne({
          _id: new ObjectId(params.id)
        });
      } catch (error) {
        console.error('Invalid ObjectId format');
      }
    }

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}