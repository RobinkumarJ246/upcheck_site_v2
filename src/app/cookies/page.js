'use client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      
      <div className="relative overflow-hidden pt-16 pb-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              <span className="block bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">Cookies Policy</span>
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
              <h2 className="text-3xl font-bold text-slate-900 mb-4">1. What Are Cookies?</h2>
              <p className="text-slate-600 leading-relaxed">
                Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit 
                our website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">2. How We Use Cookies</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                UpCheck uses cookies to enhance your experience on our website and mobile application. We use cookies for the 
                following purposes:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li><strong>Essential Cookies:</strong> Enable core functionality such as security, authentication, and accessibility</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting statistical information</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings to provide a personalized experience</li>
                <li><strong>Marketing Cookies:</strong> Track your activity to deliver relevant advertisements and measure campaign effectiveness</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">3.1 Strictly Necessary Cookies</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                These cookies are essential for the operation of our website. They enable basic functions like page navigation, 
                access to secure areas, and authentication. The website cannot function properly without these cookies.
              </p>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3">3.2 Performance and Analytics Cookies</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use Google Analytics and other analytics tools to collect information about how visitors use our website. 
                These cookies help us:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Count the number of visitors to our website</li>
                <li>Understand how visitors navigate through the site</li>
                <li>Identify which pages are most popular</li>
                <li>Improve website performance and user experience</li>
              </ul>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3">3.3 Functionality Cookies</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                These cookies allow our website to remember choices you make (such as language preference, region, or username) 
                and provide enhanced, personalized features.
              </p>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3">3.4 Targeting and Advertising Cookies</h3>
              <p className="text-slate-600 leading-relaxed">
                These cookies may be set through our website by our advertising partners. They may be used to build a profile 
                of your interests and show you relevant advertisements on other websites.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">4. Third-Party Cookies</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We work with third-party service providers who may also set cookies on your device. These include:
              </p>
              
              <div className="space-y-4">
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Google Analytics</h4>
                  <p className="text-slate-600">
                    We use Google Analytics to analyze website traffic and usage patterns. Google Analytics sets cookies to 
                    help us understand visitor behavior.
                  </p>
                  <p className="text-slate-600 mt-2">
                    <a href="https://policies.google.com/privacy" className="text-teal-600 hover:text-teal-700 underline" target="_blank" rel="noopener noreferrer">
                      Google Privacy Policy
                    </a>
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Social Media Platforms</h4>
                  <p className="text-slate-600">
                    Our website may include social media features and widgets that are provided by third-party platforms. 
                    These features may set cookies to enable proper functionality.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">5. How to Control Cookies</h2>
              
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">5.1 Browser Settings</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. You can set your browser to:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Block all cookies</li>
                <li>Accept or reject cookies on a case-by-case basis</li>
                <li>Delete cookies after you close your browser</li>
                <li>Browse in private or incognito mode</li>
              </ul>

              <p className="text-slate-600 leading-relaxed mb-4">
                Here are links to cookie management guides for popular browsers:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li><a href="https://support.google.com/chrome/answer/95647" className="text-teal-600 hover:text-teal-700 underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-teal-600 hover:text-teal-700 underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-teal-600 hover:text-teal-700 underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-teal-600 hover:text-teal-700 underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
              </ul>

              <h3 className="text-2xl font-semibold text-slate-900 mb-3">5.2 Opt-Out Tools</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                You can also opt-out of certain types of cookies using these tools:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li><a href="https://tools.google.com/dlpage/gaoptout" className="text-teal-600 hover:text-teal-700 underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
                <li><a href="https://optout.networkadvertising.org/" className="text-teal-600 hover:text-teal-700 underline" target="_blank" rel="noopener noreferrer">Network Advertising Initiative Opt-out</a></li>
                <li><a href="https://www.youronlinechoices.com/" className="text-teal-600 hover:text-teal-700 underline" target="_blank" rel="noopener noreferrer">Your Online Choices</a></li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">6. Impact of Disabling Cookies</h2>
              <p className="text-slate-600 leading-relaxed">
                Please note that if you disable or refuse cookies, some parts of our website may become inaccessible or not 
                function properly. Disabling cookies may affect your ability to use certain features, such as staying logged in, 
                saving preferences, or accessing personalized content.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">7. Mobile Application Cookies</h2>
              <p className="text-slate-600 leading-relaxed">
                Our mobile application may use similar tracking technologies to cookies. You can manage these through your 
                device settings or by adjusting the app permissions.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">8. Updates to This Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Cookies Policy from time to time to reflect changes in our practices or for other operational, 
                legal, or regulatory reasons. We will notify you of any material changes by updating the "Last updated" date at 
                the top of this policy.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">9. More Information</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                For more information about how we handle your personal data, please refer to our Privacy Policy. If you have 
                specific questions about our use of cookies, please contact us.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">10. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have any questions or concerns about our use of cookies, please contact us at:
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
