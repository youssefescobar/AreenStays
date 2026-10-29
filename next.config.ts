import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporary filler photos (content/stock.ts) until the hotel's own photos are in /public/photos
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
};

export default nextConfig;
