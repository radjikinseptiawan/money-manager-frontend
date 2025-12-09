import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return[
      {
        source:"/api/dashboard/:api*",
        destination:"https://api.zeverial.online/transaction/path"
      }
    ]
  },
};

export default nextConfig;
