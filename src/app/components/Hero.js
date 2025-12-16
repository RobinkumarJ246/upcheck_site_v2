// src/app/components/Hero.js
import { ArrowRight, Phone, Play } from 'lucide-react';
import { FaAndroid, FaAppStoreIos, FaGooglePlay } from "react-icons/fa";

export default function Hero({ translations }) {
  return (
    <div className="relative overflow-hidden bg-slate-50 min-h-screen flex items-center justify-center pt-16 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/HeroBackground.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-slate-50/90 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl mb-6">
            <span className="block bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent pb-2">
              {translations.subtitle}
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {translations.description}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="comingsoon_android"
              className="flex items-center justify-center rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan px-8 py-3 text-base font-bold text-white shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200 transform hover:-translate-y-1"
            >
              <FaGooglePlay className="w-5 h-5 mr-2" />
              {translations.cta.primary}
            </a>

            <a
              href="comingsoon_ios"
              className="flex items-center justify-center rounded-lg border-2 border-slate-200 bg-white px-8 py-3 text-base font-bold text-slate-700 shadow-sm hover:border-brand-cyan hover:text-brand-dark transition-all duration-200 transform hover:-translate-y-1"
            >
              <FaAppStoreIos className="w-6 h-6 mr-2" />
              {translations.cta.secondary}
            </a>
          </div>

          <p className="mt-6 text-sm text-slate-500 font-medium tracking-wide">
            {translations.cta.demoRelease}
          </p>
        </div>
      </div>
    </div>
  );
}