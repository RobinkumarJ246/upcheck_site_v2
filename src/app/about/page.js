'use client';
import { FaAndroid, FaApple } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react'
import { translations } from '../translations';
import { useLanguage } from '../contexts/LanguageContext';

export default function AboutPage() {

  const [faqs, setFaqs] = useState([
    {
      question: "What is UpCheck?",
      answer: "UpCheck is a shrimp aquaculture solution offering real-time monitoring, predictions, and insights for sustainable farming.",
      isOpen: false,
    },
    {
      question: "How does UpCheck work?",
      answer: "We use weather data, pond parameters, and AI-based predictions to help shrimp farmers optimize their practices.",
      isOpen: false,
    },
    {
      question: "Is UpCheck available worldwide?",
      answer: "Currently, UpCheck is focused on shrimp farmers in India but plans to expand globally in the future.",
      isOpen: false,
    },
  ]);

  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
    
      const t = translations[language].about

  const toggleFAQ = (index) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false }
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 text-gray-800">
        <Navbar />
      {/* Intro Section - styled like the main Hero component */}
      <div className="relative overflow-hidden bg-gradient-to-b from-teal-50 to-blue-50 pt-16 pb-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left mt-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block text-teal-600">About UpCheck</span>
              </h1>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                <span className="block text-blue-600 mt-4">Our Mission & Vision</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                {t.intro}
              </p>
            </div>
            <div className="relative mt-12 sm:mx-auto lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                  <img
                    className="w-full"
                    src="https://images.unsplash.com/photo-1581922819941-6ab31ab79afc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                    alt="Shrimp farming"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story - styled like Features component */}
      <div className="py-24 bg-gradient-to-b from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">{t.story_title}</h2>
          </div>
          
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <p className="text-lg leading-relaxed text-gray-600">
                {t.story_para1} <br /><br />
                {t.story_para2} <br /><br />
                {t.story_para3}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Values We Add - styled like Features component */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">The Values We Add</h2>
            <p className="text-xl text-gray-600">
              Our core principles that drive everything we do
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { 
                title: "Sustainability", 
                desc: "We promote sustainable practices to ensure long-term environmental benefits.", 
                icon: "🌱",
                iconColor: "text-green-500",
                bgColor: "bg-green-50"
              },
              { 
                title: "Empowerment", 
                desc: "We empower farmers with actionable data and tools for better decision-making.", 
                icon: "💪",
                iconColor: "text-blue-500",
                bgColor: "bg-blue-50"
              },
              { 
                title: "Affordability", 
                desc: "We offer solutions that are accessible and affordable for all farmers.", 
                icon: "💰",
                iconColor: "text-teal-500",
                bgColor: "bg-teal-50"
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="relative group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`${value.bgColor} rounded-xl inline-flex p-4 mb-6`}>
                  <span className="text-3xl">{value.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-200 group-hover:ring-teal-500 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Team - styled like Features component */}
      <div className="py-24 bg-gradient-to-b from-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">Our Team</h2>
            <p className="text-xl text-gray-600">
              Meet the passionate individuals behind UpCheck
            </p>
          </div>
          
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Kiran Sekar S", role: "Core member", desc: "Passionate about sustainable farming and empowering communities.", img: "https://avatar.iran.liara.run/public/35" },
              { name: "Lathikaa Shri S", role: "Core member", desc: "Expert in AI and IoT solutions for agriculture.", img: "https://avatar.iran.liara.run/public/56" },
              { name: "Magesh S", role: "Core member", desc: "Focused on delivering value to farmers and stakeholders.", img: "https://avatar.iran.liara.run/public/9" },
              { name: "Nithish Kumar B", role: "Core member", desc: "Focused on delivering value to farmers and stakeholders.", img: "https://avatar.iran.liara.run/public/9" },
              { name: "Robinkumar J", role: "Core member", desc: "Focused on delivering value to farmers and stakeholders.", img: "https://avatar.iran.liara.run/public/13" },
            ].map((member, idx) => (
              <div
                key={idx}
                className="relative group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative mx-auto w-24 h-24 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-300 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover relative z-10 border-2 border-white"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-teal-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.desc}</p>
                </div>
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-200 group-hover:ring-teal-500 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-r from-teal-600 to-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Download the UpCheck App</h2>
          <p className="mb-6">Experience the future of shrimp farming. Our app is currently in development, but stay tuned!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-teal-600 hover:bg-teal-800 px-6 py-3 rounded-lg flex items-center space-x-3 font-bold">
              <FaAndroid size={20} />
              <span>Download for Android</span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-800 px-6 py-3 rounded-lg flex items-center space-x-3 font-bold">
              <FaApple size={20} />
              <span>Download for iOS</span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section - styled like Features component */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">FAQs</h2>
            <p className="text-xl text-gray-600">
              Answers to commonly asked questions about UpCheck
            </p>
          </div>
          
          <div className="mt-12 space-y-6 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-xl font-semibold text-gray-900">{faq.question}</h3>
                  <div className={`p-2 rounded-full bg-gradient-to-r from-teal-100 to-blue-100 transition-transform duration-300 ${faq.isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    {faq.isOpen ? <FiChevronUp size={20} className="text-teal-600" /> : <FiChevronDown size={20} className="text-blue-600" />}
                  </div>
                </div>
                {faq.isOpen && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-200 group-hover:ring-teal-500 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer translations={t.footer} />
    </div>
  );
}