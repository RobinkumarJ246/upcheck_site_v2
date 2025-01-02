import { FaInstagram, FaLinkedin, FaYoutube, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-r from-teal-50 to-blue-50 text-gray-600 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-center md:text-left">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-2 rounded-full">
                <img
                  src="logo.jpg" // Replace with your logo path
                  alt="Upcheck Logo"
                  className="h-12 w-12 rounded-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                UpCheck
              </span>
            </div>
            <p className="text-sm">
              UpCheck is your ultimate shrimp aquaculture solution, offering real-time monitoring, predictions, and insights for sustainable and profitable farming.
            </p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="flex items-center space-x-2 text-gray-600 hover:text-teal-500 transition-colors duration-200">
              <FaEnvelope className="h-6 w-6" />
              <a href="mailto:admin@upcheck.in" className="text-sm underline">
                admin@upcheck.in
              </a>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 hover:text-teal-500 transition-colors duration-200 mt-2">
              <FaEnvelope className="h-6 w-6" />
              <a href="mailto:care@upcheck.in" className="text-sm underline">
                care@upcheck.in
              </a>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 hover:text-teal-500 transition-colors duration-200 mt-2">
              <FaEnvelope className="h-6 w-6" />
              <a href="mailto:upcheck.team@gmail.com" className="text-sm underline">
                upcheck.team@gmail.com
              </a>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-6">
              <a
                href="https://www.instagram.com/upcheck_india"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-500 transition-colors duration-200"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/upcheck-india-a4aa02343"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              {/*}<a
                href="https://youtube.com/your-channel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                <FaYoutube className="h-6 w-6" />
              </a>{*/}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-8 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} UpCheck. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}