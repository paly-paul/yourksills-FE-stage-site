import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  rewrites: async () => ({
    beforeFiles: [
      {
        source: "/api/:path*",
        destination: "http://44.194.196.18:8000/:path*", // Proxy through your backend
      },
      {
        source: "/ai/:path*",
        destination: "https://engine.yourskills.ai/:path*",
      },
    ],
  }),
};

export default nextConfig;