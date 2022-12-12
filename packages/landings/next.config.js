/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: './dist',
  compiler: {
    styledComponents: { ssr: true, displayName: true }
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
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
