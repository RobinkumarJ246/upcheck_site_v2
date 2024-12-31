// src/app/components/NewsTicker.js
import { useState, useEffect } from 'react';

export default function NewsTicker({ translations }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => 
        (prev + 1) % translations.news.items.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [translations.news.items.length]);

  return (
    <div className="bg-teal-600 text-white py-2 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium bg-white text-teal-600 px-3 py-1 rounded-full">
            {translations.news.title}
          </span>
          <div className="relative flex-1 overflow-hidden">
            <div
              className="whitespace-nowrap transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {translations.news.items.map((item, index) => (
                <span
                  key={index}
                  className="inline-block w-full text-sm sm:text-base"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}