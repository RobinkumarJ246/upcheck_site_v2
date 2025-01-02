import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Use the dedicated viewport export
export const viewport = 'width=device-width, initial-scale=1';

export const metadata = {
  title: "Upcheck: Indian Aquaculture Monitoring and Assisting Solution",
  description: "Official website of Upcheck India\nUpCheck is an innovative aquaculture monitoring and assisting solution designed to optimize shrimp farming. Our platform leverages real-time data and advanced analytics to enhance pond management, predict growth patterns, inventory management, peer and market networks and ensure sustainable practices.\nOur mobile app provides actionable insights, market updates, and fosters a community of farmers. Designed for sustainability and productivity, UpCheck bridges traditional farming with modern technology. Available in English, Tamil, Hindi, Telugu, and Bengali",
  other: {
    // Google Analytics Tag
    'gtag-script': `
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-GN0QCJVMT0"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-GN0QCJVMT0');
      </script>
    `,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
