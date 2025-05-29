import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongo';
import { ObjectId } from 'mongodb';

// POST handler to submit a survey response
export async function POST(request) {
  try {
    const body = await request.json();
    const { surveyId, responses, respondentInfo } = body;
    
    // Validate required fields
    if (!surveyId || !responses || !Array.isArray(responses)) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }
    
    // Validate ObjectId
    if (!ObjectId.isValid(surveyId)) {
      return NextResponse.json({ error: 'Invalid survey ID' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('resources'); // Use the resources database
    
    // Try to find the survey using multiple approaches
    console.log('API Responses: Looking for survey with ID:', surveyId);
    let survey = null;
    
    // Try with ObjectId if valid
    if (ObjectId.isValid(surveyId)) {
      console.log('API Responses: Trying with ObjectId');
      survey = await db.collection('surveys').findOne({
        _id: new ObjectId(surveyId)
      });
    }
    
    // Try with string ID if not found
    if (!survey) {
      console.log('API Responses: Trying with string ID');
      survey = await db.collection('surveys').findOne({
        id: surveyId
      });
    }
    
    // Try with string _id if not found
    if (!survey) {
      console.log('API Responses: Trying with string _id');
      survey = await db.collection('surveys').findOne({
        _id: surveyId
      });
    }
    
    if (!survey) {
      console.log('API Responses: Survey not found with any ID format');
      return NextResponse.json({ error: 'Survey not found' }, { status: 404 });
    }
    
    console.log('API Responses: Found survey:', survey.title);
    
    // The responses now come with more information from the client
    console.log('API Responses: Processing responses:', responses);
    
    // Process and store the enhanced response format
    const formattedResponses = responses.map(item => {
      // The client now sends questionType and questionTitle, but let's verify them
      const question = survey.questions.find(q => {
        const questionId = q.id || q._id;
        return questionId === item.questionId;
      });
      
      console.log('API Responses: Processing response for question:', item.questionId);
      
      // Use the question data from the survey as the source of truth, but fall back to client data
      const questionType = question ? question.type : (item.questionType || 'unknown');
      const questionTitle = question ? (question.title || question.text || 'Question ' + item.questionId) : (item.questionTitle || 'Unknown Question');
      
      // For choice-based questions, ensure we store both ID and text values
      let formattedAnswer = item.answer;
      
      // Log the answer format for debugging
      console.log('API Responses: Answer format for', item.questionId, ':', typeof formattedAnswer, Array.isArray(formattedAnswer) ? 'array' : '', formattedAnswer);
      
      return {
        questionId: item.questionId,
        questionTitle: questionTitle,
        questionType: questionType,
        answer: formattedAnswer
      };
    });
    
    // Create the survey response document
    const surveyResponse = {
      surveyId: new ObjectId(surveyId),
      surveyTitle: survey.title,
      responses: formattedResponses,
      respondentInfo: respondentInfo || {},
      submittedAt: new Date(),
      status: 'completed'
    };
    
    // Insert the response into MongoDB
    const result = await db.collection('survey_responses').insertOne(surveyResponse);
    
    // Update the response count in the survey document
    // Use the same ID format that was found in the original query
    const updateQuery = {};
    if (survey._id) {
      if (typeof survey._id === 'string') {
        updateQuery._id = survey._id;
      } else {
        // Assume it's an ObjectId
        updateQuery._id = survey._id;
      }
    } else if (survey.id) {
      updateQuery.id = survey.id;
    }
    
    console.log('API Responses: Updating survey with query:', updateQuery);
    await db.collection('surveys').updateOne(
      updateQuery,
      { $inc: { responseCount: 1 } }
    );
    
    return NextResponse.json({
      message: 'Survey response submitted successfully',
      responseId: result.insertedId,
      thankYouMessage: survey.settings?.thankYouMessage || 'Thank you for your submission!'
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting survey response:', error);
    return NextResponse.json({ error: 'Failed to submit survey response' }, { status: 500 });
  }
}
