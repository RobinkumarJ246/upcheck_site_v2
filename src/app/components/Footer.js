import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaLinkedin, FaYoutube, FaEnvelope } from "react-icons/fa";
import { translations } from '../translations';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';

export default function Footer() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const t = translations[language].footer || translations['en'].footer;

  return (
    <footer id="contact" className="bg-slate-50 border-t border-slate-200 text-slate-600 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center md:text-left">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              <div className="bg-transparent">
                <Image
                  src="/Logo.svg"
                  alt="UpCheck Logo"
                  width={200}
                  height={60}
                  className="h-14 md:h-16 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4">{t.contactUs}</h4>
            <div className="flex items-center space-x-2 text-gray-600 hover:text-brand-cyan transition-colors duration-200">
              <FaEnvelope className="h-6 w-6" />
              <a href="mailto:admin@upcheck.in" className="text-sm underline">
                admin@upcheck.in
              </a>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 hover:text-brand-cyan transition-colors duration-200 mt-2">
              <FaEnvelope className="h-6 w-6" />
              <a href="mailto:care@upcheck.in" className="text-sm underline">
                care@upcheck.in
              </a>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 hover:text-brand-cyan transition-colors duration-200 mt-2">
              <FaEnvelope className="h-6 w-6" />
              <a href="mailto:upcheck.team@gmail.com" className="text-sm underline">
                upcheck.team@gmail.com
              </a>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4">{t.followUs}</h4>
            <div className="flex space-x-6">
              <a
                href="https://www.instagram.com/upcheck_india"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-500 transition-colors duration-200"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/upcheck-india-a4aa02343"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-8 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}