/**
 * Validates survey responses before submission
 * @param {Object} survey - The survey object
 * @param {Object} responses - The user's responses
 * @param {Object} respondentInfo - The respondent's information
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
export function validateSurveyResponses(survey, responses, respondentInfo) {
  const errors = [];
  
  // Validate required respondent info
  if (survey.requiredFields) {
    if (survey.requiredFields.includes('name') && !respondentInfo.name.trim()) {
      errors.push('Name is required');
    }
    
    if (survey.requiredFields.includes('email') && !respondentInfo.email.trim()) {
      errors.push('Email is required');
    } else if (
      survey.requiredFields.includes('email') && 
      respondentInfo.email.trim() && 
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(respondentInfo.email)
    ) {
      errors.push('Please enter a valid email address');
    }
    
    if (survey.requiredFields.includes('phone') && !respondentInfo.phone.trim()) {
      errors.push('Phone number is required');
    }
  }
  
  // Validate required questions
  if (survey.questions) {
    survey.questions.forEach(question => {
      if (question.required) {
        // Use question.id or question._id, whichever is available
        const questionId = question.id || question._id;
        const response = responses[questionId];
        const questionTitle = question.title || question.text || 'Question ' + questionId;
        
        console.log('Validating question:', questionId, questionTitle, 'Response:', response);
        
        if (question.type === 'multipleChoice' || question.type === 'checkbox') {
          if (!response || !Array.isArray(response) || response.length === 0) {
            errors.push(`Question "${questionTitle}" requires at least one selection`);
          }
        } else if (!response || (typeof response === 'string' && !response.trim())) {
          errors.push(`Question "${questionTitle}" requires an answer`);
        }
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
