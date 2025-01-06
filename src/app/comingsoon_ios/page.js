'use client';
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Share2,
  ChevronRight,
  Command,
  Lock,
  Zap
} from 'lucide-react';
import { FaApple } from 'react-icons/fa';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-4 backdrop-blur-sm bg-white/80">
            <div className="text-2xl md:text-3xl font-bold text-blue-600">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm text-gray-600 capitalize">{unit}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function IOSComingSoon() {
  const features = [
    {
      title: "Swift Performance",
      description: "Built natively with SwiftUI for iOS 15+",
      icon: Zap,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Real-time Sync",
      description: "Sync your data across all your devices",
      icon: Share2,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Privacy Focus",
      description: "Enhanced data protection and security",
      icon: Lock,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    }
  ];

  const progressSteps = [
    { task: "Core Development", progress: 65 },
    { task: "UI/UX Design", progress: 80 },
    { task: "Testing", progress: 35 },
    { task: "App Store Review", progress: 20 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-blue-100 p-6">
              <FaApple className="w-12 h-12 md:w-16 md:h-16 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            iOS App Coming Soon
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of shrimp farming on your iPhone
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Phone Preview */}
          <div className="relative max-w-xs mx-auto md:max-w-sm">
            <div className="bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
              <div className="relative bg-black rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                {/* Notch */}
                <div className="absolute top-0 w-full h-6 bg-black">
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black rounded-full" />
                </div>
                <div className="absolute inset-0 rounded-[2.5rem] border-4 border-gray-800" />
                <div className="absolute inset-0 bg-blue-50/90 backdrop-blur-sm p-4">
                  {/* Development Progress */}
                  <div className="space-y-3 mt-8">
                    <h3 className="text-center text-sm font-semibold text-gray-800 mb-4">
                      Development Progress
                    </h3>
                    {progressSteps.map((item) => (
                      <div key={item.task} className="text-xs">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">{item.task}</span>
                          <span className="text-blue-600 font-medium">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-white/50 rounded-full h-1.5 backdrop-blur-sm">
                          <div 
                            className="bg-blue-500 rounded-full h-1.5 transition-all duration-500"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Countdown Section */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Launching In
            </h2>
            <CountdownTimer targetDate="2025-04-14T00:00:00" />
            <p className="text-center mt-6 text-gray-600">
              Expected launch date: April 14, 2025
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`${feature.bgColor} rounded-xl p-4 inline-block mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Notification Form */}
      <div className="py-12 text-center">
        <iframe 
          width="540" 
          height="560" 
          src="https://68756547.sibforms.com/serve/MUIFAIcfwN_H5hK0uFpuDWeDae-jo6m127PCVI3M4DRT9Gc82j_hHu-yjKfEPxCuPTeNoUUj6NWGGK3JUGmWtNsTRzVvEtzRSHI1JAmR29O0ycues8yDQQS3tslR-TOU5e9ROMRG-GYhh6XJ7iEb_qTOpo-ZgLmrNnywteFhEAlRYh4zgaDqJzVQomGncTrwNBY1R143vY5U50hv" 
          frameBorder="0" 
          scrolling="auto" 
          allowFullScreen 
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }} 
        />
      </div>
      </div>
    </div>
  );
}