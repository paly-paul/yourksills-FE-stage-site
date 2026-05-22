import type { NextConfig } from "next";

const upstream = (
  process.env.API_UPSTREAM_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  ""
).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    if (!upstream) return [];
    return [
      {
        // Forwards any /api/* request that has no matching Next.js route handler
        // to the real backend. Existing route handlers (login, extract-cv,
        // generate-all-insights) take priority and are NOT affected.
        source: "/api/:path*",
        destination: `${upstream}/:path*`,
      },
    ];
  },
};

export default nextConfig;
