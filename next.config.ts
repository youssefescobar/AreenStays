import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Room photos uploaded in the admin (Cloudflare R2), plus the temporary Unsplash fillers
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.areenstay.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" }, // no embedding the site in other domains' frames
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
