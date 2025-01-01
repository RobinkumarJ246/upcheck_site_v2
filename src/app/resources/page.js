'use client';
import { FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import { translations } from '../translations';
import Image from 'next/image';
import { AlertCircle } from 'lucide-react';

export default function ResourcesPage() {

  const [language, setLanguage] = useState('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem('language') || 'en'
    setLanguage(savedLang)
  }, [])

  if (!mounted) return null

  const t = translations[language]

  return (
    <div>
      <Navbar language={language} setLanguage={setLanguage} />
      <div className="min-h-screen bg-gradient-to-r from-teal-50 to-blue-50 text-gray-800">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-teal-600 to-blue-600 text-white text-center">
          <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Resources for Shrimp Farming</h1>
            <p className="text-lg">
              We're working on creating a valuable space filled with useful content, market updates, and insights for shrimp farmers and the aquaculture community in India. Stay tuned!
            </p>
          </div>
        </section>

        {/* Work In Progress Section */}
        <section className="py-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Work in Progress</h2>

            {/* SVG Image Below Title */}
            <div className="mb-6 justify-center content-center flex items-center">
              <Image 
                src="work_in_progress.svg" 
                alt="Work in Progress" 
                width={150} 
                height={150}
              />
            </div>
            <div className="flex text-gray-500">
            <AlertCircle/><p className="text-lg mb-4 text-gray-500">
            We're currently building this section with useful articles, aquaculture tips, market trends, and regular updates to help you stay informed. Stay connected with us for more updates!
            </p></div>
            <div className="mb-6">
              <div className="text-xl font-semibold mb-2">What you can expect here:</div>
              <ul className="list-disc list-inside">
                <li>Best practices for sustainable shrimp farming</li>
                <li>Market insights and trends in Indian aquaculture</li>
                <li>Tips on optimizing pond conditions for better yields</li>
                <li>Regular updates on aquaculture news and events</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <button className="bg-teal-600 hover:bg-teal-800 px-6 py-3 rounded-lg flex items-center space-x-3 text-white font-bold">
                <FaArrowRight size={20} />
                <span>Subscribe for Updates</span>
              </button>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="py-6 bg-teal-600 text-white text-center">
          <p>&copy; 2025 UpCheck. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}