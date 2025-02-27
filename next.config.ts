import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    GIT_TOKEN: process.env.GIT_TOKEN as string,
  },
  experimental: {
    optimizeCss: true,
  }
};

export default nextConfig;
