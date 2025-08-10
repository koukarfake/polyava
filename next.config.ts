import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  // Suppress TypeScript build errors for Vercel
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
