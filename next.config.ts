import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin Turbopack root to this workspace to avoid picking parent lockfiles
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
