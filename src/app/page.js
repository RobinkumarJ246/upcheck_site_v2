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
import { Analytics } from "@vercel/analytics/react"

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
      <Analytics/>
      <Navbar language={language} setLanguage={setLanguage} />
      <NewsTicker translations={t.news} />
      <Hero translations={t.hero} />
      <Features translations={t.features} />
      <Pricing translations={t.pricing} />
      
      {/* Email Subscription iFrame */}
      <div className="py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe for Our Newsletter</h2>
        <iframe 
          width="540" 
          height="520" 
          src="https://68756547.sibforms.com/serve/MUIFANRKDI17rBB29QoRH5RzszOLYqghOm6NsGyUOi3aoFgmUkWvvVAuKTDraEcLZnA0MPicpL-NWVM5toqczqfmmackgXsWechTJn7ggIqinSxYxQkw0TLx69FNb0glgE8PGItc-ZUk41ki7p6eLP_ZKUJbVjwrtw9kuUyTRgSuoedsCHFnnp_s3h7GC9ytIHTRiftbpKwfzzP3" 
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