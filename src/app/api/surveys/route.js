import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

export const dynamic = 'force-dynamic';

// GET handler to fetch all surveys
export async function GET() {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }
    const db = client.db('resources'); // Use the resources database

    // Fetch surveys from MongoDB - similar to how posts are fetched
    const surveys = await db.collection('surveys')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Process surveys for the frontend if needed
    const processedSurveys = surveys.map(survey => {
      // Calculate question count if questions array exists
      const questionCount = survey.questions ? survey.questions.length : 0;

      return {
        ...survey,
        questionCount,
        estimatedTimeMinutes: Math.max(5, Math.ceil(questionCount * 1.5))
      };
    });

    return NextResponse.json({ surveys: processedSurveys });
  } catch (error) {
    console.error('Error fetching surveys:', error);
    return NextResponse.json({ error: 'Failed to fetch surveys' }, { status: 500 });
  }
}
