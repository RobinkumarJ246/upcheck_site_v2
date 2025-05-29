'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSurveys() {
      try {
        const response = await fetch('/api/surveys');
        
        if (!response.ok) {
          throw new Error('Failed to fetch surveys');
        }
        
        const data = await response.json();
        console.log('Surveys data received:', data); // Debug log
        
        // Handle different response structures
        const surveyArray = data.surveys || data || [];
        console.log('Processed surveys array:', surveyArray); // Debug log
        
        setSurveys(surveyArray);
      } catch (err) {
        console.error('Error fetching surveys:', err);
        setError('Failed to load surveys. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchSurveys();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-4 p-6 border rounded-lg bg-gray-50">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (surveys.length === 0) {
    return (
      <div className="p-6 text-center border rounded-lg bg-gray-50">
        <p className="text-gray-600">No surveys available at the moment. Please check back later.</p>
      </div>
    );
  }
  
  // Debug information about available surveys
  console.log('Rendering surveys with IDs:', surveys.map(s => ({ id: s._id, title: s.title })));

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {surveys.map((survey) => {
        // Handle different ID formats - use _id, id, or string representation
        const surveyId = survey._id?.toString() || survey.id || survey._id;
        console.log('Survey link ID:', surveyId, 'Original:', survey._id);
        
        return (
          <Link href={`/surveys/${surveyId}`} key={surveyId}>
            <div className="relative group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              {survey.category && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                    {survey.category}
                  </span>
                </div>
              )}
              
              <h2 className="text-xl font-semibold mb-2 pr-20">{survey.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{survey.description}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{survey.questionCount || 0} questions</span>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Est. time: {survey.estimatedTimeMinutes || 5} min</span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-sm hover:shadow-md transition-all duration-300">
                  Participate
                </span>
              </div>
              
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-200 group-hover:ring-teal-500 transition-colors duration-300" />
            </div>
          </Link>
        );
      })}
      
      {surveys.length === 0 && (
        <div className="col-span-full p-8 text-center bg-white rounded-xl shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">No surveys available</h3>
          <p className="mt-2 text-gray-500">Check back later for new surveys to participate in.</p>
        </div>
      )}
    </div>
  );
}
