/** @type {import('next').NextConfig} */
const nextConfig = {
  // Module I.3: Image Optimization configured with modern AVIF and WebP support
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    // Enable modern App router server action optimizations
  },
};

export default nextConfig;
