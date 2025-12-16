'use client';

import { Suspense, useState, useEffect } from 'react';
import SurveyList from '../components/SurveyList';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

export default function SurveysPage() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if user was redirected from a successful survey submission
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
      setShowThankYou(true);
      // Clear the URL parameter without refreshing the page
      window.history.replaceState({}, document.title, '/surveys');

      // Hide the thank you message after 5 seconds
      setTimeout(() => setShowThankYou(false), 5000);
    }
  }, []);

  if (!mounted) return null;

  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section - styled like the main Hero component */}
      <div className="relative overflow-hidden pt-16 pb-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left mt-8">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                <span className="block text-slate-900">Surveys</span>
              </h1>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                <span className="block bg-gradient-to-r from-blue-900 to-teal-500 bg-clip-text text-transparent mt-4 pb-2">Share Your Insights</span>
              </h1>
              <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Participate in our surveys to help us improve our services and shape the future of aquaculture.
                Your feedback is invaluable to our continuous improvement.
              </p>
            </div>
            <div className="relative mt-12 sm:mx-auto lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
              <div className="relative mx-auto w-full rounded-2xl shadow-xl lg:max-w-md overflow-hidden border border-slate-100">
                <div className="relative block w-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                  <img
                    className="w-full"
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                    alt="Survey illustration"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Message */}
      {showThankYou && (
        <div className="bg-teal-50/50 border-l-4 border-teal-500 text-teal-800 p-4 my-4 mx-auto max-w-4xl rounded-r-lg shadow-sm">
          <div className="flex items-center">
            <div className="py-1">
              <svg className="h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Thank you for your submission!</p>
              <p className="text-sm">Your response has been recorded successfully.</p>
            </div>
          </div>
        </div>
      )}

      {/* Surveys List Section - styled like Features component */}
      <div className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl mb-6">
              Available Surveys
            </h2>
            <p className="text-xl text-slate-600">
              Select a survey below to participate and share your valuable insights
            </p>
          </div>

          <div className="mt-12">
            <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] border border-slate-100">
              <Suspense fallback={<Loading />}>
                <SurveyList />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section - styled like Features component */}
      <div className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl mb-6">
              Why Participate in Our Surveys?
            </h2>
            <p className="text-xl text-slate-600">
              Your input helps us create better solutions for the aquaculture industry
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Shape the Future",
                description: "Your feedback directly influences our product development and improvements.",
                iconColor: "text-teal-600",
                bgColor: "bg-teal-50",
                icon: "📊"
              },
              {
                title: "Gain Insights",
                description: "Learn about the latest trends and challenges in the industry through our surveys.",
                iconColor: "text-blue-600",
                bgColor: "bg-blue-50",
                icon: "💡"
              },
              {
                title: "Join Our Community",
                description: "Become part of a growing community of professionals sharing knowledge and experiences.",
                iconColor: "text-purple-600",
                bgColor: "bg-purple-50",
                icon: "👥"
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="relative group bg-white p-8 rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100"
              >
                <div className={`${benefit.bgColor} rounded-xl inline-flex p-4 mb-6`}>
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600">
                    {benefit.description}
                  </p>
                </div>
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-100 group-hover:ring-teal-500/50 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer translations={t.footer} />
    </div>
  );
}
