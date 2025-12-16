import { Lexend_Mega } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from './contexts/LanguageContext'
import Script from 'next/script'

const lexendMega = Lexend_Mega({
  variable: "--font-lexend-mega",
  subsets: ["latin"],
});

// Use the dedicated viewport export
export const viewport = 'width=device-width, initial-scale=1';

export const metadata = {
  title: "Upcheck: Indian Aquaculture Monitoring and Assisting Solution",
  description: "Official website of Upcheck India\nUpCheck is an innovative aquaculture monitoring and assisting solution designed to optimize shrimp farming. Our platform leverages real-time data and advanced analytics to enhance pond management, predict growth patterns, inventory management, peer and market networks and ensure sustainable practices.\nOur mobile app provides actionable insights, market updates, and fosters a community of farmers. Designed for sustainability and productivity, UpCheck bridges traditional farming with modern technology. Available in English, Tamil, Hindi, Telugu, and Bengali",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lexendMega.variable} antialiased font-sans`}
      >
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-GN0QCJVMT0"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GN0QCJVMT0');
          `}
        </Script>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
