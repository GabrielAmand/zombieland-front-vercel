// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*", // tout ce qui commence par /api/proxy/...
        destination: "https://zombieland-api.onrender.com/:path*", // sera redirigé vers Render
      },
    ];
  },
};

export default nextConfig;