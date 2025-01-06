// src/app/components/Pricing.js
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function Pricing({ translations }) {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-teal-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {translations.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {translations.subtitle}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Basic Plan */}
          <div className="bg-white rounded-2xl shadow-xl">
            <div className="p-8">
              <h3 className="text-2xl font-medium text-gray-900">
                {translations.basic.title}
              </h3>
              <p className="mt-4 text-sm text-gray-500">
                {translations.basic.description}
              </p>
              <p className="mt-8">
                <span className="text-4xl font-bold text-gray-900">
                  {translations.basic.price}
                </span>
              </p>
              <ul className="mt-8 space-y-4">
                {translations.basic.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-teal-500 mr-2" />
                    <span className="text-sm text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href='/'>
              <button className="mt-8 w-full bg-teal-100 text-teal-700 py-3 px-4 rounded-lg hover:bg-teal-200 transition-colors">
                Get Started
              </button>
              </Link>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-teal-500">
            <div className="p-8">
              <h3 className="text-2xl font-medium text-gray-900">
                {translations.pro.title}
              </h3>
              <p className="mt-4 text-sm text-gray-500">
                {translations.pro.description}
              </p>
              {/*}<p className="mt-8">
                <span className="text-4xl font-bold text-gray-900">
                  {translations.pro.price}
                </span>
                <span className="text-gray-500">{translations.pro.period}</span>
              </p>{*/}
              <ul className="mt-8 space-y-4">
                {translations.pro.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-teal-500 mr-2" />
                    <span className="text-sm text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/upgrade_enq">
              <button className="mt-8 w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors">
                Contact team
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}