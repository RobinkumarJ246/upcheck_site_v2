export const metadata = {
  title: 'Products | UpCheck',
  description: 'Explore our innovative products designed to help you succeed.',
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Our Products</h1>
      
      <div className="w-24 h-24 mb-8 relative">
        <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-75"></div>
        <div className="relative flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 w-24 h-24">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Coming Soon!</h2>
      <p className="text-gray-600 max-w-2xl mb-8">
        We're working hard to bring you innovative products that will revolutionize your experience. 
        Stay tuned for exciting updates and announcements.
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
