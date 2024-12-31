import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-50 to-blue-50 text-gray-600 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-2 rounded-full">
                <img
                  src="logo.jpg" // Replace with your logo path
                  alt="Upcheck Logo"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Upcheck
              </span>
            </div>
            <p className="mt-4 text-sm">
              UpCheck is your ultimate shrimp aquaculture solution, offering real-time monitoring, predictions, and insights for sustainable and profitable farming.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="justify-end">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-6">
              <a
                href="https://instagram.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-500 transition-colors duration-200"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com/your-channel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                <FaYoutube className="h-6 w-6" />
              </a>
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