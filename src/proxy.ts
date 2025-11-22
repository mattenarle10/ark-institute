import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  // Run proxy on all app routes (exclude _next internals and static assets)
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

export default async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get('host') || '';
  const [hostname] = host.split(':');

  console.log('[proxy] request', {
    host,
    hostname,
    pathname: url.pathname,
  });

  // Check if the request is for the admin subdomain
  // This handles "admin.localhost:3000", "admin.localhost", "admin.arkinstitute.com", etc.
  const isAdminSubdomain =
    hostname === 'admin.localhost' || hostname.startsWith('admin.');

  if (isAdminSubdomain) {
    // Rewrite to the /admin directory without double-prefixing
    // e.g. admin.arkinstitute.com/dashboard -> /admin/dashboard
    const pathname = url.pathname.startsWith('/admin')
      ? url.pathname
      : `/admin${url.pathname}`;

    return NextResponse.rewrite(new URL(pathname, req.url));
  }

  // Default behavior: do nothing, let Next.js handle the route
  return NextResponse.next();
}
