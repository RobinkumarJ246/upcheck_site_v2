// src/app/components/Features.js
import { 
    Activity, AlertCircle, Users, LineChart,
    Droplets, ThermometerSun, Wind, Fish
  } from 'lucide-react';
  
  export default function Features({ translations }) {
    const features = [
      {
        icon: Activity,
        title: translations.monitoring.title,
        description: translations.monitoring.description,
        iconColor: "text-teal-500"
      },
      {
        icon: AlertCircle,
        title: translations.prediction.title,
        description: translations.prediction.description,
        iconColor: "text-red-500"
      },
      {
        icon: LineChart,
        title: translations.feeding.title,
        description: translations.feeding.description,
        iconColor: "text-blue-500"
      },
      {
        icon: Users,
        title: translations.community.title,
        description: translations.community.description,
        iconColor: "text-purple-500"
      }
    ];
  
    return (
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {translations.title}
            </h2>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <span className={`rounded-lg inline-flex p-3 ring-4 ring-white ${feature.iconColor} bg-opacity-10`}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <a href="#" className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {feature.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }  