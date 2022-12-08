/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      unoptimized: true
    }
  },
  compiler: {
    styledComponents: { ssr: true, displayName: true }
  },
  async rewrites() {
    return [
      {
        source: '/api',
        destination: '/'
      }
    ]
  }
}

module.exports = nextConfig
