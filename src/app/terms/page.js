'use client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      
      <div className="relative overflow-hidden pt-16 pb-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              <span className="block bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">Terms of Service</span>
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
              <h2 className="text-3xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing and using UpCheck's website and mobile application (collectively, the "Services"), you accept 
                and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not 
                use our Services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">2. Description of Services</h2>
              <p className="text-slate-600 leading-relaxed">
                UpCheck provides an aquaculture monitoring and assisting solution designed to optimize shrimp farming. Our 
                Services include real-time data monitoring, predictive analytics, weather forecasts, pond management tools, 
                market updates, and community features. We reserve the right to modify, suspend, or discontinue any aspect 
                of our Services at any time without prior notice.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">3. User Accounts</h2>
              
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">3.1 Registration</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                To access certain features of our Services, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and update your account information to keep it accurate</li>
                <li>Maintain the security and confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorized access or security breach</li>
              </ul>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3">3.2 Account Responsibilities</h3>
              <p className="text-slate-600 leading-relaxed">
                You are responsible for all activities that occur under your account. You may not share your account 
                credentials with others or allow others to access your account.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">4. Acceptable Use</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You agree not to use our Services to:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Engage in fraudulent or deceptive practices</li>
                <li>Interfere with or disrupt the Services or servers</li>
                <li>Attempt to gain unauthorized access to any part of the Services</li>
                <li>Use automated systems to access the Services without permission</li>
                <li>Collect or harvest information about other users</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">5. Intellectual Property Rights</h2>
              
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">5.1 Our Content</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                All content, features, and functionality of the Services, including but not limited to text, graphics, logos, 
                images, software, and data compilations, are owned by UpCheck or its licensors and are protected by 
                intellectual property laws.
              </p>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3">5.2 Your Content</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                You retain ownership of any content you submit to our Services. By submitting content, you grant us a 
                worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content for the 
                purpose of providing and improving our Services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">6. Data and Privacy</h2>
              <p className="text-slate-600 leading-relaxed">
                Your use of our Services is also governed by our Privacy Policy. By using our Services, you consent to the 
                collection, use, and sharing of your information as described in our Privacy Policy.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">7. Subscriptions and Payments</h2>
              
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">7.1 Fees</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Some features of our Services may require payment of fees. You agree to pay all applicable fees as described 
                at the time of purchase. All fees are non-refundable unless otherwise stated.
              </p>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3">7.2 Subscription Terms</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                If you subscribe to a paid plan, your subscription will automatically renew unless you cancel before the 
                renewal date. We reserve the right to change our pricing with reasonable notice.
              </p>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3">7.3 Payment Information</h3>
              <p className="text-slate-600 leading-relaxed">
                You agree to provide accurate and complete payment information. We use third-party payment processors and 
                do not store your full payment card details.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">8. Disclaimers and Limitations</h2>
              
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">8.1 No Warranty</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied. 
                We do not warrant that the Services will be uninterrupted, error-free, or secure.
              </p>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3">8.2 Aquaculture Advice</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                While we strive to provide accurate predictions and insights, UpCheck's recommendations should not be considered 
                as professional agricultural or aquaculture advice. Users should exercise their own judgment and consult with 
                qualified professionals for critical farming decisions.
              </p>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3">8.3 Limitation of Liability</h3>
              <p className="text-slate-600 leading-relaxed">
                To the maximum extent permitted by law, UpCheck shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including loss of profits, data, or other losses resulting from your use 
                of the Services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">9. Indemnification</h2>
              <p className="text-slate-600 leading-relaxed">
                You agree to indemnify, defend, and hold harmless UpCheck and its officers, directors, employees, and agents 
                from any claims, liabilities, damages, losses, and expenses arising out of your use of the Services or 
                violation of these Terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">10. Termination</h2>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to suspend or terminate your access to our Services at any time, with or without cause, 
                and with or without notice. You may also terminate your account at any time by contacting us. Upon termination, 
                your right to use the Services will immediately cease.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">11. Changes to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update these Terms from time to time. We will notify you of material changes by posting the updated 
                Terms on our website and updating the "Last updated" date. Your continued use of our Services after any 
                changes indicates your acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">12. Governing Law</h2>
              <p className="text-slate-600 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its 
                conflict of law provisions. Any disputes arising from these Terms or your use of the Services shall be subject 
                to the exclusive jurisdiction of the courts located in India.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">13. Severability</h2>
              <p className="text-slate-600 leading-relaxed">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue 
                to be valid and enforceable to the fullest extent permitted by law.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">14. Contact Information</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have any questions or concerns about these Terms of Service, please contact us at:
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
