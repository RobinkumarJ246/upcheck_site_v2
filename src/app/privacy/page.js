'use client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      
      <div className="relative overflow-hidden pt-16 pb-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              <span className="block bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">Privacy Policy</span>
            </h1>
            <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed">
                Welcome to UpCheck. We are committed to protecting your personal information and your right to privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use 
                our mobile application and website (collectively, the "Services").
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">2.1 Personal Information</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide when using our Services, including:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Name and contact information (email address, phone number)</li>
                <li>Account credentials (username, password)</li>
                <li>Farm location and details</li>
                <li>Pond parameters and aquaculture data</li>
                <li>Survey and feedback responses</li>
              </ul>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                When you access our Services, we may automatically collect:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Device information (device type, operating system, browser type)</li>
                <li>Usage data (pages visited, features used, time spent)</li>
                <li>IP address and location data</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3">2.3 Weather and Environmental Data</h3>
              <p className="text-slate-600 leading-relaxed">
                We collect and process weather data and environmental parameters to provide accurate predictions and insights 
                for shrimp aquaculture management.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>To provide, maintain, and improve our Services</li>
                <li>To create and manage your account</li>
                <li>To deliver real-time monitoring, predictions, and insights</li>
                <li>To send you notifications, updates, and marketing communications</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To conduct research and analytics to improve our platform</li>
                <li>To detect, prevent, and address technical issues and fraud</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">4. Data Sharing and Disclosure</h2>
              
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">4.1 Third-Party Service Providers</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                We may share your information with third-party service providers who perform services on our behalf, including:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Cloud hosting and storage providers</li>
                <li>Analytics and data processing services</li>
                <li>Payment processors</li>
                <li>Communication and marketing platforms</li>
              </ul>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3">4.2 Legal Requirements</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                We may disclose your information when required by law or in response to valid requests by public authorities.
              </p>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3">4.3 Business Transfers</h3>
              <p className="text-slate-600 leading-relaxed">
                In connection with any merger, sale of company assets, financing, or acquisition, your information may be 
                transferred to the acquiring entity.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">5. Data Security</h2>
              <p className="text-slate-600 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information 
                from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the 
                internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">6. Data Retention</h2>
              <p className="text-slate-600 leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy 
                Policy, unless a longer retention period is required or permitted by law.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">7. Your Rights</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li><strong>Access:</strong> Request access to your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a structured format</li>
                <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
                <li><strong>Withdraw Consent:</strong> Withdraw your consent at any time</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">8. Children's Privacy</h2>
              <p className="text-slate-600 leading-relaxed">
                Our Services are not intended for children under the age of 13. We do not knowingly collect personal 
                information from children under 13. If you become aware that a child has provided us with personal information, 
                please contact us.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">9. International Data Transfers</h2>
              <p className="text-slate-600 leading-relaxed">
                Your information may be transferred to and maintained on servers located outside of your country. We ensure 
                that appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date. Your continued use of our Services after 
                any modifications indicates your acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">11. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <p className="text-slate-700"><strong>Email:</strong> care@upcheck.in</p>
                <p className="text-slate-700"><strong>Website:</strong> www.upcheck.in</p>
              </div>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
