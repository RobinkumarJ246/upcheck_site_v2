'use client';
import React, { useState, useEffect } from 'react';
import {
    Code,
  Terminal, 
  Smartphone, 
  Clock,
  Share2,
  ChevronRight,
  Globe,
} from 'lucide-react';
import { FaAndroid, FaCode } from 'react-icons/fa';

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
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-2xl md:text-3xl font-bold text-green-600">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm text-gray-600 capitalize">{unit}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function AndroidComingSoon({ translations }) {
  const features = [
    {
      title: "Native Performance",
      description: "Built with ReactNative for smooth, responsive experience",
      icon: Terminal,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Multilingual Support",
      description: "Supports multiple languages for accessibility accross India",
      icon: Globe,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Real-time Sync",
      description: "Instant data synchronization across devices",
      icon: Share2,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-6">
              <FaAndroid className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Stay tuned
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're putting the finishing touches on your ultimate shrimp farming companion
          </p>
        </div>

        {/* Development Progress */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-6">Development Progress</h3>
            <div className="space-y-4">
              {[
    { task: "Core Features", progress: 85 },
    { task: "UI Development", progress: 90 },
    { task: "API Integration", progress: 100 },
    { task: "User Authentication", progress: 90 },
    { task: "User Profile Management", progress: 65 },
    { task: "Localization/Translations", progress: 75 },
    { task: "Notifications & Alerts", progress: 20 },
    { task: "Performance Optimization", progress: 15 },
    { task: "Testing Phase", progress: 5 },
]
.map((item) => (
                <div key={item.task}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{item.task}</span>
                    <span className="text-green-600 font-medium">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 rounded-full h-2 transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Countdown Section */}
        <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Launching In
            </h2>
            <CountdownTimer targetDate="2025-03-28T00:00:00" />
            <p className="text-center mt-6 text-gray-600">
              Expected launch date: March 28, 2025
            </p>
          </div>

        {/* Features Grid */}
        <div className="flex flex-col justify-center mt-20">
        <h2 className="text-2xl font-semibold text-center mb-6">
              These are being brewed
            </h2>  
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 mt-5">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`${feature.bgColor} rounded-lg p-4 inline-block mb-4`}>
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