import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host");

  // Define your main domain and subdomain
  // In development, we handle localhost
  const isDev = process.env.NODE_ENV === "development";
  const mainDomain = isDev ? "localhost:3000" : "arkinstitute.com";
  const adminSubdomain = `admin.${mainDomain}`;

  // Get the subdomain from the hostname
  // e.g. "admin.localhost:3000" -> "admin"
  // e.g. "localhost:3000" -> null
  // e.g. "arkinstitute.com" -> null
  
  // Check if we are on the admin subdomain
  const isLocalAdmin = isDev && hostname === "admin.localhost:3000";
  const isProdAdmin = !isDev && hostname === "admin.arkinstitute.com";

  if (isLocalAdmin || isProdAdmin) {
    // Rewrite to the /admin directory
    // e.g. admin.arkinstitute.com/dashboard -> /admin/dashboard
    return NextResponse.rewrite(new URL(`/admin${url.pathname}`, req.url));
  }

  // Default behavior: do nothing, let Next.js handle the route
  return NextResponse.next();
}
