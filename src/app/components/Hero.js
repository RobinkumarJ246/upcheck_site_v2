// src/app/components/Hero.js
import { ArrowRight, Phone, Play} from 'lucide-react';
import { FaAndroid, FaAppStoreIos, FaGooglePlay } from "react-icons/fa";

export default function Hero({ translations }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-teal-50 to-blue-50 pt-16 pb-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left mt-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-teal-600">{translations.title}</span>
            </h1>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              <span className="block text-blue-600 mt-4">{translations.subtitle}</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              {translations.description}
            </p>
            <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a href="comingsoon_android" className="flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-8 py-3 text-base font-medium text-white hover:bg-teal-700 md:py-4 md:px-10 md:text-lg">
                  <FaGooglePlay className="w-5 h-5 mr-2" />
                  {translations.cta.primary}
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a href="comingsoon_ios" className="flex items-center justify-center rounded-md border border-transparent bg-blue-100 px-8 py-3 text-base font-medium text-blue-700 hover:bg-blue-200 md:py-4 md:px-10 md:text-lg">
                  <FaAppStoreIos className="w-5 h-5 mr-2" />
                  {translations.cta.secondary}
                </a>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">{translations.cta.demoRelease}</p>
          </div>
          <div className="relative mt-12 sm:mx-auto lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
            {/* Add your hero image or animation here */}
          </div>
        </div>
      </div>
    </div>
  );
}