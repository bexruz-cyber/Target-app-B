import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60,
    // Optimize images to appropriate sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 170, 256, 384],
  },
  // Enable gzip compression
  compress: true,
  // Add asset prefetching for faster loading
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
