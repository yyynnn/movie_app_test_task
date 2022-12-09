/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: './dist',
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
