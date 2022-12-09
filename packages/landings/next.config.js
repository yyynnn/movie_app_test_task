/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: './dist',
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
