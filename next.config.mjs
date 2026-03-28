/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bserc.org',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      
    ],
  },
}

export default nextConfig