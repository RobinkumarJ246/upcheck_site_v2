// src/app/components/Pricing.js
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function Pricing({ translations }) {
  return (
    <div className="bg-transparent py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            {translations.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {translations.subtitle}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Basic Plan */}
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col">
            <div className="p-8 flex-1">
              <h3 className="text-2xl font-medium text-slate-900">
                {translations.basic.title}
              </h3>
              <p className="mt-4 text-sm text-slate-500">
                {translations.basic.description}
              </p>
              <p className="mt-8">
                <span className="text-4xl font-bold text-slate-900">
                  {translations.basic.price}
                </span>
              </p>
              <ul className="mt-8 space-y-4">
                {translations.basic.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-brand-cyan mr-2" />
                    <span className="text-sm text-slate-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 pt-0">
              <Link href='/'>
                <button className="w-full bg-slate-100 text-slate-700 py-3 px-4 rounded-lg hover:bg-slate-200 transition-colors font-medium">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] border-2 border-brand-cyan/30 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-brand-cyan/10 text-brand-dark text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Must Have</span>
            </div>
            <div className="p-8 flex-1">
              <h3 className="text-2xl font-medium text-slate-900">
                {translations.pro.title}
              </h3>
              <p className="mt-4 text-sm text-slate-500">
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
                    <Check className="h-5 w-5 text-brand-cyan mr-2" />
                    <span className="text-sm text-slate-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 pt-0">
              <Link href="/upgrade_enq">
                <button className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-white py-3 px-4 rounded-lg hover:brightness-110 transition-all font-medium shadow-md">
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