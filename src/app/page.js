// src/app/page.js
'use client'

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import NewsTicker from './components/NewsTicker'
import { translations } from './translations_old'
import Script from 'next/script'
import Footer from './components/Footer'

export default function Home() {
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
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50">
      <Navbar language={language} setLanguage={setLanguage} />
      <NewsTicker translations={t.news} />
      <Hero translations={t.hero} />
      <Features translations={t.features} />
      <Pricing translations={t.pricing} />
      
      {/* Email Subscription iFrame */}
      <div className="py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe for Our Email Updates</h2>
        <iframe 
          width="540" 
          height="820" 
          src="https://68756547.sibforms.com/serve/MUIFAOIf6A1XBbCeAO_K-hZiUy7F692-C5XDBe7d_MfQa46Tgh3Cg_6DOrUbwhWoVlVR-QK9ArYf219QFZ0RAXYN875hhRnh34qL4OjA6jb3flIB5ogq7VLO33mkTTPW-hmTgDuZtPpjo85xtG2xP0oZhlMHw7UQgbfIU9Vqe4oUN0VMOahZcR0jQAT5iTEyBN95iol1k8O0qYSp" 
          frameBorder="0" 
          scrolling="auto" 
          allowFullScreen 
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', maxWidth: '100%' }} 
        />
      </div>

      <Footer translations={t.footer} />

      {/* Brevo Conversations Chat Widget */}
      <Script
        id="brevo-conversations"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
          (function(d, w, c) {
            w.BrevoConversationsID = '673ce31e5cfa8310a8073180';
            w[c] = w[c] || function() {
              (w[c].q = w[c].q || []).push(arguments);
            };
            var s = d.createElement('script');
            s.async = true;
            s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
            if (d.head) d.head.appendChild(s);
          })(document, window, 'BrevoConversations');
        `,
        }}
      />
    </div>
  )
}