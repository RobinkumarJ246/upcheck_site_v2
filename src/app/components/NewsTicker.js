import { useState, useEffect } from 'react';
import Marquee from "react-fast-marquee";

export default function NewsTicker({ translations }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % translations.items.length);
    }, 5000); // Change the interval as needed for scrolling speed

    return () => clearInterval(timer);
  }, [translations.items.length]);

  return (
    <div className="bg-teal-600 text-white py-2 relative overflow-hidden" style={{ marginTop: '80px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium bg-white text-teal-600 px-3 py-1 rounded-full">
            {translations.title}
          </span>
          <div className="relative flex-1 overflow-hidden">
            <Marquee
              direction="left"           // Scroll from right to left
              speed={50}                  // Adjust the scrolling speed (px per second)
              gradient={false}            // Disable the gradient fade effect
              loop={0}                    // Infinite loop (0 means no limit)
              pauseOnHover={true}         // Pause scrolling when hovering
              style={{ whiteSpace: 'nowrap' }} // Ensure the text does not wrap
            >
              {translations.items.map((item, index) => (
                <span key={index} className="inline-block px-6 text-sm sm:text-base">
                  {item}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
}