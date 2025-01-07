import { useState, useEffect } from 'react';

const Skeleton = ({ variant = 'default' }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (variant === 'post') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Skeleton */}
        <div className="w-full h-[50vh] bg-gray-200 animate-pulse" />
        
        {/* Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          {/* Article Card */}
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-10">
            {/* Categories */}
            <div className="flex gap-2 mb-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
            
            {/* Title */}
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-6" />
            
            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-100">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 w-32 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
            
            {/* Content */}
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant (resources page)
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-16">
      {/* Header Skeleton */}
      <div className="text-center mb-12">
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
        <div className="h-4 w-96 max-w-full bg-gray-200 rounded animate-pulse mx-auto" />
      </div>

      {/* Search and Filter Skeleton */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="w-full md:w-96 h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-4">
            <div className="h-48 bg-gray-200 rounded-lg animate-pulse mb-4" />
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="space-y-2 mb-4">
              {[1, 2].map((j) => (
                <div key={j} className="h-4 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;