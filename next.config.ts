import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.arkinstitutebc.com",
          },
        ],
        destination: "https://arkinstitutebc.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
