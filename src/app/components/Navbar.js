'use client'

import { useState, useRef, useEffect } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'

export default function Navbar() {
  const { language, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const langMenuRef = useRef(null)

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'bn', name: 'বাংলা' }
  ]

  const navigation = [
    { name: 'About', href: 'about' },
    { name: 'Resources', href: 'resources' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Join us', href: 'careers' }
  ]

  // Load language from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [setLanguage])

  // Save language to localStorage whenever it changes
  useEffect(() => {
    if (language) {
      localStorage.setItem('selectedLanguage', language)
    }
  }, [language])

  // Close language menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Detect scrolling to add/remove floating effect
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`${
        isScrolled ? 'bg-white shadow-lg' : 'bg-gradient-to-r from-teal-50 to-blue-50'
      } fixed top-0 left-0 right-0 mx-auto w-full md:w-11/12 lg:w-10/12 xl:w-9/12 rounded-b-2xl z-10 transition-all duration-300 ease-in-out`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-2 rounded-full">
                <img
                  src="logo.jpg" // Replace with the actual path to your logo
                  alt="Upcheck Logo"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Upcheck
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}

            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <Globe className="h-5 w-5" />
                <span>{languages.find((l) => l.code === language)?.name}</span>
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ease-out scale-100 z-10">
                  <div className="py-1" role="menu">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code)
                          setIsLangMenuOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 transition-colors duration-200"
                        role="menuitem"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-teal-600 p-2 rounded-lg transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg mt-2 shadow-lg">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-600 hover:text-teal-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              {/* Language options in mobile menu */}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="flex items-center px-3 py-2 text-gray-600">
                  <Globe className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Select Language</span>
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code)
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left text-gray-600 hover:text-teal-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}