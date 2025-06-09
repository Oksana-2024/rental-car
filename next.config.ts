import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://ac.goit.global/**")],
  },
};

export default nextConfig;
