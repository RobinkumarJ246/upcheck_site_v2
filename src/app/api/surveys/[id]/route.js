import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongo';
import { ObjectId } from 'mongodb';

// GET handler to fetch a specific survey by ID
export async function GET(request, { params }) {
  try {
    // Correctly access params in Next.js App Router - params is already destructured and awaited
    const id = params.id;
    console.log('API: Received request for survey ID:', id);
    
    const client = await clientPromise;
    const db = client.db('resources'); // Use the resources database
    
    // First, try to get all surveys to see what's available
    const allSurveys = await db.collection('surveys').find({}).toArray();
    console.log('API: Found', allSurveys.length, 'total surveys');
    
    // Try multiple approaches to find the survey
    let survey = null;
    
    // Try with ObjectId if valid
    if (ObjectId.isValid(id)) {
      console.log('API: Trying with ObjectId');
      survey = await db.collection('surveys').findOne({
        _id: new ObjectId(id)
      });
    }
    
    // Try with string ID if not found
    if (!survey) {
      console.log('API: Trying with string ID');
      survey = await db.collection('surveys').findOne({
        id: id
      });
    }
    
    // Try with string _id if not found
    if (!survey) {
      console.log('API: Trying with string _id');
      survey = await db.collection('surveys').findOne({
        _id: id
      });
    }
    
    // Try with numeric ID if not found
    if (!survey && !isNaN(id)) {
      console.log('API: Trying with numeric ID');
      survey = await db.collection('surveys').findOne({
        id: parseInt(id)
      });
    }
    
    // If still not found, check if we have any surveys at all
    if (!survey) {
      console.log('API: Survey not found with any ID format. Available surveys:', 
        allSurveys.map(s => ({ id: s._id || s.id, title: s.title })));
      return NextResponse.json({ 
        error: 'Survey not found', 
        availableSurveys: allSurveys.map(s => ({ id: s._id || s.id, title: s.title }))
      }, { status: 404 });
    }
    
    console.log('API: Survey found:', survey.title);
    return NextResponse.json({ survey });
  } catch (error) {
    console.error('Error fetching survey:', error);
    return NextResponse.json({ error: 'Failed to fetch survey' }, { status: 500 });
  }
}
