export const metadata = {
  title: 'Events | UpCheck',
  description: 'Discover and participate in our upcoming events.',
};

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Events</h1>
      
      <div className="w-24 h-24 mb-8 relative">
        <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-75"></div>
        <div className="relative flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 w-24 h-24">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Coming Soon!</h2>
      <p className="text-gray-600 max-w-2xl mb-8">
        We're planning exciting events to connect with our community. 
        Stay tuned for webinars, workshops, and meetups that will provide valuable insights and networking opportunities.
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
