/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: ["uploadthing.com", "lh3.googleusercontent.com"],
  },
}

export default nextConfig
