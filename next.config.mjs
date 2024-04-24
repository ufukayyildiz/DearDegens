/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: [
      '@react-email/components',
      '@react-email/render',
      '@react-email/html',
      'resend'
    ],
  },
  transpilePackages: [
    '@react-email/components',
    '@react-email/render',
    '@react-email/html',
    'resend'
  ],
  images: {
    domains: ["uploadthing.com", "lh3.googleusercontent.com", 'media.giphy.com'],
  },
}

export default nextConfig
