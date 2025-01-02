import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Upcheck: Indian Aquaculture Monitoring and Assisting Solution",
  description: "Official website of Upcheck India\nUpCheck is an innovative aquaculture monitoring and assisting solution designed to optimize shrimp farming. Our platform leverages real-time data and advanced analytics to enhance pond management, predict growth patterns, inventory management, peer and market networks and ensure sustainable practices.\nOur mobile app provides actionable insights, market updates, and fosters a community of farmers. Designed for sustainability and productivity, UpCheck bridges traditional farming with modern technology. Available in English, Tamil, Hindi, Telugu, and Bengali",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Google Tag Manager */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GN0QCJVMT0"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GN0QCJVMT0');
            `,
          }}
        />
        {/* Add any other SEO or meta tags here */}
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
