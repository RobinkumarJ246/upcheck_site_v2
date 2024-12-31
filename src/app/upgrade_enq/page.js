'use client';
import { useState } from "react";
import { BsStars } from 'react-icons/bs';
import { Mail, CheckCircle, AlarmClock, Cpu, Shield, Headphones } from "lucide-react";

export default function ProPlanPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if email is provided
    if (!email) {
      alert("Please provide a valid email.");
      return;
    }
  
    // Create the mailto URL with prefilled content
    const subject = encodeURIComponent("Pro Plan Subscription Request");
    const body = encodeURIComponent(`Hello, I am interested in subscribing to the Pro Plan. Please send me more details.
  
    My email address: ${email}`);
    const mailtoURL = `mailto:admin@upcheck.in?subject=${subject}&body=${body}`;
  
    // Open the user's email client with the prefilled content
    window.location.href = mailtoURL;
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header Section */}
      <section className="bg-teal-600 text-white py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
            Pro Plan: Enhanced Monitoring & Predictions
          </h1>
          <p className="text-lg mb-6">
            Upgrade to our Pro Plan and gain access to dedicated hardware for accurate pond monitoring, instant alerts, expert recommendations, and more.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">What You'll Get with Pro Plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="mb-4 text-teal-600">
                <Cpu size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Dedicated Hardware</h3>
              <p>Install dedicated sensors to ensure accurate data monitoring.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="mb-4 text-teal-600">
                <AlarmClock size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-time Alerts</h3>
              <p>Get instant notifications for critical pond parameters.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="mb-4 text-teal-600">
                <Shield size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Recommendations</h3>
              <p>Receive expert advice tailored to your pond's unique needs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="mb-4 text-teal-600">
                <BsStars size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Advanced Predictions</h3>
              <p>Get predictions on shrimp growth and yield based on real-time data.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="mb-4 text-teal-600">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Custom Alerts</h3>
              <p>Set custom alerts based on your pond's conditions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="mb-4 text-teal-600">
                <Headphones size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p>Access dedicated support for any issues or questions regarding your system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Subscription Form */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Subscribe to the Pro Plan</h2>
          <p className="text-lg mb-8">
            Fill out the form below to start enquiring about our Pro Plan subscription.
          </p>
          <p className="text-sm text-gray-600 mt-3 mb-6">
          Our team will contact you with more details as soon as possible.
          </p>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Enter your email to subscribe
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-teal-500 transition duration-200"
              placeholder="Your email address"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-3 rounded-full text-xl font-medium hover:bg-teal-700 transition duration-300 flex items-center justify-center gap-2"
            >
              {loading ? "Sending..." : "Subscribe Now"}
              <Mail size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-teal-600 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 UpCheck | All rights reserved</p>
          <p>Contact us: <a href="mailto:admin@upcheck.in" className="underline">admin@upcheck.in</a></p>
        </div>
      </footer>
    </div>
  );
}