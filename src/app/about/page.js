'use client';
import { FaAndroid, FaApple } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react'
import { translations } from '../translations';

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

  const [language, setLanguage] = useState('en')
      const [mounted, setMounted] = useState(false)
    
      useEffect(() => {
        setMounted(true)
        const savedLang = localStorage.getItem('language') || 'en'
        setLanguage(savedLang)
      }, [])
    
      if (!mounted) return null
    
      const t = translations[language]

  const toggleFAQ = (index) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false }
      )
    );
  };

  return (
    <div>
        <Navbar language={language} setLanguage={setLanguage} />
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-blue-50 text-gray-800">
      {/* Intro Section */}
      <section className="py-12 bg-gradient-to-r from-teal-600 to-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 mt-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About UpCheck</h1>
          <p className="text-lg">
            UpCheck is dedicated to transforming shrimp farming through innovative solutions that empower farmers. We enable sustainable aquaculture, higher yields, and reduced environmental impact by providing real-time data, optimized farming practices, and market connectivity. Our mission is to revolutionize shrimp farming by fostering smarter practices, improving pond conditions, and supporting farmers in building a sustainable and prosperous aquaculture ecosystem.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg leading-relaxed">
            One day, we happened to meet the father of a mutual neighborhood friend, a hardworking shrimp farmer from a small town near ours. What began as casual small talk soon turned into something deeper as he opened up about the struggles he faced every day. <br /><br />
            His words stayed with us long after the conversation ended. That evening, as we discussed what we had heard, we couldn't shake off a feeling, we had to do something. Shrimp farming shouldn't be this hard. Farmers like him deserved better tools, better support, and a way to make their hard work pay off. <br /><br />
            That's how UpCheck was born. We started with one clear goal: to help shrimp farmers like him take control of their ponds and their future. From that one conversation, we’ve come a long way. But our purpose remains the same: to bring hope, support, and change to the hardworking farmers who are the backbone of aquaculture.
          </p>
        </div>
      </section>

      {/* The Values We Add */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">The Values We Add</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Sustainability", desc: "We promote sustainable practices to ensure long-term environmental benefits." },
              { title: "Empowerment", desc: "We empower farmers with actionable data and tools for better decision-making." },
              { title: "Affordability", desc: "We offer solutions that are accessible and affordable for all farmers." },
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-12 text-center px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Kiran Sekar S", role: "Core member", desc: "Passionate about sustainable farming and empowering communities.", img: "kiran_sekar.jpg" },
              { name: "Lathikaa Shri S", role: "Core member", desc: "Expert in AI and IoT solutions for agriculture.", img: "https://avatar.iran.liara.run/public/56" },
              { name: "Magesh S", role: "Core member", desc: "Focused on delivering value to farmers and stakeholders.", img: "https://avatar.iran.liara.run/public/9" },
              { name: "Nithish Kumar B", role: "Core member", desc: "Focused on delivering value to farmers and stakeholders.", img: "https://avatar.iran.liara.run/public/9" },
              { name: "Robinkumar J", role: "Core member", desc: "Focused on delivering value to farmers and stakeholders.", img: "https://avatar.iran.liara.run/public/42" },
            ].map((member, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <p className="text-sm mt-2">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  {faq.isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </div>
                {faq.isOpen && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}