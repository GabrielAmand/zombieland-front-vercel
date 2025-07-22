// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // tout ce qui commence par /api/proxy/...
        destination: "https://projet-zombieland-sco4.onrender.com/:path*", // sera redirigé vers Render
      },
    ];
  },
};

export default nextConfig;