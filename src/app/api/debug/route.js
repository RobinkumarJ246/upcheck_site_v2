import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

export const dynamic = 'force-dynamic';

// GET handler to fetch a sample survey for debugging
export async function GET() {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ message: 'Database not connected (Build mode)' });
    }
    const db = client.db('resources');

    // Get a list of all collections in the database
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    // Get a sample survey if available
    let sampleSurvey = null;
    if (collectionNames.includes('surveys')) {
      sampleSurvey = await db.collection('surveys').findOne({});
    }

    return NextResponse.json({
      collections: collectionNames,
      sampleSurvey,
      message: 'This is a debug endpoint to help troubleshoot database issues'
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json({ error: 'Failed to fetch debug info' }, { status: 500 });
  }
}
