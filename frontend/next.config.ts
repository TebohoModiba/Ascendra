import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["*"],
};

module.exports = {
  allowedDevOrigins: ['10.114.224.37'],
}

export default nextConfig;