// src/app/thank-you/page.js
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaCheckCircle, FaHome, FaBook, FaHeart } from 'react-icons/fa'

export default function ThankYouPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-100 to-blue-50 flex flex-col justify-center items-center text-center px-6">
      {/* Thank You Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl">
        <FaCheckCircle className="text-teal-600 text-6xl mb-4 mx-auto" />
        <h1 className="text-3xl font-bold mb-4 text-teal-700">Subscription success!</h1>
        
        {/* Heart icon with Thank You text */}
        <div className="flex items-center justify-center mb-4 space-x-2">
          <FaHeart size={20} className="text-teal-600" />
          <h1 className="text-xl font-bold text-teal-700">Thank You for Subscribing!</h1>
        </div>

        <p className="text-gray-600 mb-6">
          We're excited to have you on board! You'll now receive email notifications regarding our app launch. You can opt-out anytime.
        </p>
        <p className="text-gray-600 mb-6">
          Stay tuned and register as the first ever member!
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            passHref
            className="flex items-center space-x-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-800 transition font-bold"
          >
            <FaHome size={20} />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/resources"
            passHref
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition font-bold"
          >
            <FaBook size={20} />
            <span>Explore Resources</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500">
        &copy; 2025 UpCheck. All rights reserved.
      </footer>
    </div>
  )
}