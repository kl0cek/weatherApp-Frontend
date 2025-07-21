import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

eslint: {
    ignoreDuringBuilds: false,
  },
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/:path*`,
      }
    ]
  }
};

export default nextConfig;
