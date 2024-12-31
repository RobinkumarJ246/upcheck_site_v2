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

export const metadata = {
  title: "Upcheck",
  description: "Official website of Upcheck India\nUpCheck is an innovative aquaculture monitoring and assisting solution designed to optimize shrimp farming. Our platform leverages real-time data and advanced analytics to enhance pond management, predict growth patterns, inventory management, peer and market networks and ensure sustainable practices. Discover how UpCheck is transforming aquaculture with smart, data-driven real-time solutions and start Upchecking now.\nOur mobile app provides actionable insights, market updates, and fosters a community of farmers. Designed for sustainability and productivity, UpCheck bridges traditional farming with modern technology. Available in English, Tamil, Hindi, Telugu, and Bengali",
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
