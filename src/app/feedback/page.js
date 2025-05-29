export const metadata = {
  title: 'Feedback | UpCheck',
  description: 'Share your feedback and help us improve our services.',
};

export default function FeedbackPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Feedback</h1>
      
      <div className="w-24 h-24 mb-8 relative">
        <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-75"></div>
        <div className="relative flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 w-24 h-24">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Coming Soon!</h2>
      <p className="text-gray-600 max-w-2xl mb-8">
        We're building a comprehensive feedback system to hear your thoughts and suggestions. 
        Your input is invaluable to us, and we're excited to create a platform where you can share your ideas.
      </p>
      
      <a 
        href="/" 
        className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Back to Home
      </a>
    </div>
  );
}
