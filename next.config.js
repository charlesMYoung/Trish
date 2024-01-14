/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: '*.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
