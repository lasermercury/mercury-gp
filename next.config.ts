import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel handles output format automatically */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
