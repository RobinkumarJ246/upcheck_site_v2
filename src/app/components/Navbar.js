'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
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

  const exploreDropdown = [
    { name: 'About', href: '/about' },
    { name: 'Resources', href: '/resources' },
    { name: 'Products', href: '/products' }
  ]

  const participateDropdown = [
    { name: 'Surveys', href: '/surveys' },
    { name: 'Polls', href: '/polls' },
    { name: 'Feedback', href: '/feedback' },
    { name: 'Events', href: '/events' }
  ]

  const mainNavigation = [
    { name: 'Contact', href: '/#contact' },
    { name: 'Join us', href: '/careers' }
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
      className={`${isScrolled ? 'backdrop-blur-md bg-white/90 shadow-sm border-b border-slate-200/50' : 'backdrop-blur-sm bg-white/60 border-b border-transparent'
        } fixed top-0 left-0 right-0 mx-auto w-full md:w-11/12 lg:w-10/12 xl:w-9/12 rounded-b-2xl z-10 transition-all duration-300 ease-in-out`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div className="bg-transparent">
              <Image
                src="/Logo.svg"
                alt="UpCheck Logo"
                width={200}
                height={60}
                className="h-14 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Explore Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-brand-dark px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 group-hover:text-brand-dark">
                <span>Explore</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ease-out opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible z-10">
                <div className="py-1" role="menu">
                  {exploreDropdown.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-dark transition-colors duration-200"
                      role="menuitem"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Participate Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-brand-dark px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 group-hover:text-brand-dark">
                <span>Participate</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ease-out opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible z-10">
                <div className="py-1" role="menu">
                  {participateDropdown.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-dark transition-colors duration-200"
                      role="menuitem"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Regular Navigation Items */}
            {mainNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-brand-dark px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}

            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-brand-dark px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
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
                        className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-dark transition-colors duration-200"
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
              className="text-gray-600 hover:text-brand-dark p-2 rounded-lg transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg mt-2 shadow-lg">
              {/* Explore Section */}
              <div className="border-b border-gray-100 pb-2 mb-2">
                <div className="px-3 py-2 text-sm font-semibold text-gray-500">Explore</div>
                {exploreDropdown.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-gray-600 hover:text-brand-dark hover:bg-gradient-to-r hover:from-brand-cyan/10 hover:to-brand-blue/10 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Participate Section */}
              <div className="border-b border-gray-100 pb-2 mb-2">
                <div className="px-3 py-2 text-sm font-semibold text-gray-500">Participate</div>
                {participateDropdown.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-gray-600 hover:text-brand-dark hover:bg-gradient-to-r hover:from-brand-cyan/10 hover:to-brand-blue/10 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Main Navigation */}
              <div>
                {mainNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-gray-600 hover:text-brand-dark hover:bg-gradient-to-r hover:from-brand-cyan/10 hover:to-brand-blue/10 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

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
                    className="block w-full text-left text-gray-600 hover:text-brand-dark hover:bg-gradient-to-r hover:from-brand-cyan/10 hover:to-brand-blue/10 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
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