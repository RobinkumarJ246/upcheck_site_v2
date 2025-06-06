/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all domains
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**', // Allow all domains
        pathname: '/**',
      }
    ],
    // For very long URLs or complex paths, increase the device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  }
};

export default nextConfig;
