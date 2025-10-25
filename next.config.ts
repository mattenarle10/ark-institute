import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 
   * WWW redirect removed - handle at hosting provider level instead
   * to avoid redirect loops. Configure in your hosting dashboard:
   * - Vercel: Domains > Redirect www to non-www
   * - Netlify: Domain settings > Configure redirects
   */
};

export default nextConfig;
