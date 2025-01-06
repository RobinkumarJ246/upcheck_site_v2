import React from 'react';
import { 
  Activity, AlertCircle, Users, LineChart,
  Droplets, ThermometerSun, Wind, Fish
} from 'lucide-react';

const YouTubeEmbed = ({ videoId }) => (
  <div className="relative w-full overflow-hidden pt-[56.25%]">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

export default function Features({ translations, youtubeVideoId }) {
  const features = [
    {
      icon: ThermometerSun,
      title: translations.monitoring.title || "Real-time Monitoring",
      description: translations.monitoring.description || "Track water quality parameters, temperature, and pond conditions in real-time with our advanced sensors.",
      iconColor: "text-teal-500",
      bgColor: "bg-teal-50"
    },
    {
      icon: AlertCircle,
      title: translations.prediction.title || "Early Warning System",
      description: translations.prediction.description || "Get instant alerts and predictive insights to prevent diseases and maintain optimal pond conditions.",
      iconColor: "text-red-500",
      bgColor: "bg-red-50"
    },
    {
      icon: Fish,
      title: translations.feeding.title || "Smart Feeding Management",
      description: translations.feeding.description || "Optimize feed conversion ratio with AI-powered feeding recommendations and tracking.",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Users,
      title: translations.community.title || "Expert Community",
      description: translations.community.description || "Connect with aquaculture experts and fellow farmers for advice and knowledge sharing.",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
            {translations.title || "Transform Your Shrimp Farm"}
          </h2>
          <p className="text-xl text-gray-600">
            {translations.subtitle || "Harness the power of technology to maximize your farm's productivity and sustainability"}
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`${feature.bgColor} rounded-xl inline-flex p-4 mb-6`}>
                <feature.icon 
                  className={`h-8 w-8 ${feature.iconColor}`} 
                  aria-hidden="true" 
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-200 group-hover:ring-teal-500 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="mt-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-2xl shadow-xl">
              <YouTubeEmbed videoId={youtubeVideoId || "sxu62fm_Z5E?si=Xx1aFnL43oP5h3VS"} />
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {translations.videoTitle || "See Upcheck in Action"}
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {translations.videoDescription || "Watch how Upcheck is revolutionizing shrimp farming through smart technology and data-driven insights."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}