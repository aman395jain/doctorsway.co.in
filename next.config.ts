import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    assetPrefix: isDev ? undefined : "https://cdn.mydomain.com",
  };
};

export default nextConfig;
