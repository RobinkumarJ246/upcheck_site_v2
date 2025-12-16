'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { validateSurveyResponses } from '../utils/surveyValidation';

export default function SurveyDetail({ id }) {
  const router = useRouter();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const [respondentInfo, setRespondentInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState('');

  useEffect(() => {
    async function fetchSurvey() {
      try {
        console.log('Fetching survey with ID:', id);
        const response = await fetch(`/api/surveys/${id}`);

        // Log the response for debugging
        console.log('Survey API response status:', response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch survey: ${response.status}`);
        }

        const data = await response.json();
        console.log('Survey data received:', data);
        setSurvey(data.survey);

        // Initialize responses object based on survey questions
        if (data.survey && data.survey.questions) {
          const initialResponses = {};
          data.survey.questions.forEach(question => {
            // Use question.id or question._id, whichever is available
            const questionId = question.id || question._id;
            console.log('Initializing response for question:', questionId, question.title || question.text);

            switch (question.type) {
              case 'multipleChoice':
                initialResponses[questionId] = [];
                break;
              case 'singleChoice':
              case 'dropdown':
                initialResponses[questionId] = '';
                break;
              case 'rating':
                initialResponses[questionId] = 0;
                break;
              case 'date':
                initialResponses[questionId] = '';
                break;
              case 'number':
                initialResponses[questionId] = '';
                break;
              default: // text and other types
                initialResponses[questionId] = '';
            }
          });
          console.log('Initialized responses:', initialResponses);
          setResponses(initialResponses);
        }
      } catch (err) {
        console.error('Error fetching survey:', err);
        setError('Failed to load survey. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchSurvey();
    }
  }, [id]);

  // Find the text value for a given option ID in a question
  const findOptionText = (questionId, optionId) => {
    if (!survey || !survey.questions) return '';

    const question = survey.questions.find(q => {
      const qId = q.id || q._id;
      return qId === questionId;
    });

    if (!question || !question.options) return '';

    const option = question.options.find(opt => {
      if (typeof opt === 'object') {
        return opt.id === optionId;
      }
      return opt === optionId;
    });

    return typeof option === 'object' ? option.text : option;
  };

  const handleInputChange = (questionId, value, type = 'text') => {
    if (type === 'multipleChoice') {
      // Handle multiple choice (checkbox)
      setResponses(prev => {
        const currentSelections = [...(prev[questionId] || [])];

        // Check if this value is already selected
        const valueIndex = currentSelections.findIndex(item => {
          if (typeof item === 'object') {
            return item.id === value;
          }
          return item === value;
        });

        if (valueIndex >= 0) {
          // Remove from selections
          return {
            ...prev,
            [questionId]: currentSelections.filter((_, index) => index !== valueIndex)
          };
        } else {
          // Add to selections with both ID and text
          const optionText = findOptionText(questionId, value);
          const optionValue = { id: value, text: optionText };

          return {
            ...prev,
            [questionId]: [...currentSelections, optionValue]
          };
        }
      });
    } else if (type === 'singleChoice' || type === 'dropdown') {
      // For single choice and dropdown, store both ID and text
      const optionText = findOptionText(questionId, value);
      setResponses(prev => ({
        ...prev,
        [questionId]: { id: value, text: optionText }
      }));
    } else {
      // Handle other input types (text, number, date, etc.)
      setResponses(prev => ({
        ...prev,
        [questionId]: value
      }));
    }
  };

  const handleRespondentInfoChange = (e) => {
    const { name, value } = e.target;
    setRespondentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      console.log('Submitting survey responses:', responses);
      console.log('Survey questions:', survey.questions);

      // Validate survey responses
      const validation = validateSurveyResponses(survey, responses, respondentInfo);
      console.log('Validation result:', validation);

      if (!validation.isValid) {
        // Display validation errors in a more user-friendly way
        setError(
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Please fix the following errors:</h3>
                <div className="mt-2 text-sm text-red-700">
                  <ul className="list-disc pl-5 space-y-1">
                    {validation.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
        setSubmitting(false);
        // Scroll to the error message
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      console.log('Preparing to submit responses:', responses);

      // Transform responses to array format for submission
      const formattedResponses = Object.entries(responses).map(([questionId, answer]) => {
        // Find the question to get its type
        const question = survey.questions.find(q => {
          const qId = q.id || q._id;
          return qId === questionId;
        });

        const questionType = question ? question.type : 'unknown';
        const questionTitle = question ? (question.title || question.text) : 'Unknown';

        // Format the answer based on the question type
        let formattedAnswer = answer;

        // For choice-based questions, include both ID and text values
        if (questionType === 'singleChoice' || questionType === 'dropdown') {
          // Single choice and dropdown are already in the correct format (object with id and text)
        } else if (questionType === 'multipleChoice') {
          // Multiple choice is an array of objects with id and text
        }

        return {
          questionId,
          questionType,
          questionTitle,
          answer: formattedAnswer
        };
      });

      const response = await fetch('/api/surveys/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surveyId: id,
          responses: formattedResponses,
          respondentInfo
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit survey');
      }

      const responseData = await response.json();
      setThankYouMessage(responseData.thankYouMessage || '');
      setSuccess(true);

      // Redirect to thank you page or show success message
      setTimeout(() => {
        router.push('/surveys?submitted=true');
      }, 2000);

    } catch (err) {
      console.error('Error submitting survey:', err);
      setError(err.message || 'Failed to submit survey. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-cyan mr-3"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Survey...</h2>
        </div>

        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>

          {/* Respondent info skeleton */}
          <div className="p-6 border rounded-xl bg-gray-50 mb-8">
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="mb-4">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-10 bg-gray-100 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Questions skeleton */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-6 border rounded-xl bg-white mb-6">
              <div className="flex items-start mb-4">
                <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="ml-8">
                <div className="h-10 bg-gray-100 rounded w-full"></div>
              </div>
            </div>
          ))}

          {/* Submit button skeleton */}
          <div className="flex justify-end mt-8">
            <div className="h-12 bg-gray-300 rounded-lg w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 border rounded-xl shadow-md bg-white">
        {/* If error is a React element (JSX), render it directly */}
        {React.isValidElement(error) ? (
          <>
            {error}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  // Show a brief loading state when returning to the form
                  setSubmitting(true);
                  setTimeout(() => {
                    setError(null);
                    setSubmitting(false);
                  }, 300);
                }}
                className="px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-lg shadow hover:shadow-lg transition-all flex items-center justify-center mx-auto"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  'Try Again'
                )}
              </button>
            </div>
          </>
        ) : (
          // Otherwise render the error as a string
          <>
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => router.push('/surveys')}
                className="px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-lg shadow hover:shadow-lg transition-all"
              >
                Back to Surveys
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="p-6 text-center border rounded-xl shadow-md bg-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-gray-600 mb-4">Survey not found.</p>
        <button
          onClick={() => router.push('/surveys')}
          className="px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-lg shadow hover:shadow-lg transition-all"
        >
          Back to Surveys
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-3xl mx-auto my-8 p-8 bg-white rounded-xl shadow-xl">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-blue rounded-full opacity-20 blur-xl"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="relative h-20 w-20 mx-auto text-brand-cyan mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">Thank You!</h2>
          <p className="text-gray-700 text-lg mb-8">
            {thankYouMessage || 'Your survey response has been submitted successfully.'}
          </p>
          <button
            onClick={() => router.push('/surveys')}
            className="px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Back to Surveys
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-3">{survey.title}</h1>
      <p className="text-gray-600 mb-6">{survey.description}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Respondent Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name {survey.requiredFields?.includes('name') && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                name="name"
                value={respondentInfo.name}
                onChange={handleRespondentInfoChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
                required={survey.requiredFields?.includes('name')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email {survey.requiredFields?.includes('email') && <span className="text-red-500">*</span>}
              </label>
              <input
                type="email"
                name="email"
                value={respondentInfo.email}
                onChange={handleRespondentInfoChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
                required={survey.requiredFields?.includes('email')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone {survey.requiredFields?.includes('phone') && <span className="text-red-500">*</span>}
              </label>
              <input
                type="tel"
                name="phone"
                value={respondentInfo.phone}
                onChange={handleRespondentInfoChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
                required={survey.requiredFields?.includes('phone')}
              />
            </div>
          </div>
        </div>

        {/* Survey Questions */}
        <div className="space-y-8">
          {survey.questions && survey.questions.map((question, index) => (
            <div key={question.id} className="p-6 border rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-3 flex items-start">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-sm mr-2">
                  {index + 1}
                </span>
                <span>{question.title}</span>
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </h3>
              {question.description && (
                <p className="text-gray-600 text-sm mb-4 ml-8">{question.description}</p>
              )}

              {question.type === 'text' && (
                <div className="ml-8">
                  <input
                    type="text"
                    value={responses[question.id] || ''}
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
                    placeholder={question.placeholder || 'Type your answer here...'}
                    required={question.required}
                  />
                  {question.helpText && (
                    <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>
                  )}
                </div>
              )}

              {question.type === 'textarea' && (
                <div className="ml-8">
                  <textarea
                    value={responses[question.id] || ''}
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
                    placeholder={question.placeholder || 'Type your detailed answer here...'}
                    required={question.required}
                  />
                  {question.helpText && (
                    <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>
                  )}
                </div>
              )}

              {question.type === 'singleChoice' && (
                <div className="ml-8 space-y-3">
                  {question.options && question.options.map((option, optIndex) => {
                    // Handle both simple string options and object options with id/text properties
                    const optionValue = typeof option === 'object' ? option.id : option;
                    const optionText = typeof option === 'object' ? option.text : option;

                    return (
                      <label key={optIndex} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name={`question_${question.id}`}
                          value={optionValue}
                          checked={responses[question.id] === optionValue}
                          onChange={() => handleInputChange(question.id, optionValue)}
                          className="w-4 h-4 text-brand-dark focus:ring-brand-cyan"
                          required={question.required && !responses[question.id]}
                        />
                        <span className="ml-3">{optionText}</span>
                      </label>
                    );
                  })}
                  {question.helpText && (
                    <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>
                  )}
                </div>
              )}

              {question.type === 'multipleChoice' && (
                <div className="ml-8 space-y-3">
                  {question.options && question.options.map((option, optIndex) => {
                    // Handle both simple string options and object options with id/text properties
                    const optionValue = typeof option === 'object' ? option.id : option;
                    const optionText = typeof option === 'object' ? option.text : option;

                    // Check if this option is selected
                    const isSelected = Array.isArray(responses[question.id]) &&
                      responses[question.id].some(item => {
                        if (typeof item === 'object') {
                          return item.id === optionValue;
                        }
                        return item === optionValue;
                      });

                    return (
                      <label key={optIndex} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          value={optionValue}
                          checked={isSelected}
                          onChange={() => handleInputChange(question.id, optionValue, 'multipleChoice')}
                          className="w-4 h-4 text-brand-dark focus:ring-brand-cyan"
                        />
                        <span className="ml-3">{optionText}</span>
                      </label>
                    );
                  })}
                  {question.helpText && (
                    <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>
                  )}
                </div>
              )}

              {question.type === 'dropdown' && (
                <div className="ml-8">
                  <div className="relative">
                    <select
                      value={responses[question.id] || ''}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all pr-10"
                      required={question.required}
                    >
                      <option value="" disabled>Select an option...</option>
                      {question.options && question.options.map((option, optIndex) => {
                        // Handle both simple string options and object options with id/text properties
                        const optionValue = typeof option === 'object' ? option.id : option;
                        const optionText = typeof option === 'object' ? option.text : option;

                        return (
                          <option key={optIndex} value={optionValue}>
                            {optionText}
                          </option>
                        );
                      })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  {question.helpText && (
                    <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>
                  )}
                </div>
              )}

              {question.type === 'date' && (
                <div className="ml-8">
                  <input
                    type="date"
                    value={responses[question.id] || ''}
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
                    required={question.required}
                    min={question.min}
                    max={question.max}
                  />
                  {question.helpText && (
                    <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>
                  )}
                </div>
              )}

              {question.type === 'number' && (
                <div className="ml-8">
                  <input
                    type="number"
                    value={responses[question.id] || ''}
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
                    placeholder={question.placeholder || 'Enter a number...'}
                    required={question.required}
                    min={question.min}
                    max={question.max}
                    step={question.step || 1}
                  />
                  {question.helpText && (
                    <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>
                  )}
                </div>
              )}

              {question.type === 'rating' && (
                <div className="ml-8">
                  <div className="flex space-x-2">
                    {[...Array(5)].map((_, i) => {
                      const ratingValue = i + 1;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleInputChange(question.id, ratingValue)}
                          className={`w-12 h-12 rounded-full focus:outline-none transition-all ${responses[question.id] >= ratingValue
                              ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-md'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                          {ratingValue}
                        </button>
                      );
                    })}
                  </div>
                  {question.helpText && (
                    <p className="text-xs text-gray-500 mt-2">{question.helpText}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={submitting}
            className={`px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center min-w-[150px] ${submitting
                ? 'bg-gradient-to-r from-brand-cyan to-brand-blue cursor-wait'
                : 'bg-gradient-to-r from-brand-blue to-brand-cyan hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300'
              }`}
          >
            {submitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Survey'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}