/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  outputFileTracingRoot: process.cwd(),
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
