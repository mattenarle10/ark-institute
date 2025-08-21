import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full mt-auto bg-gradient-to-br from-primary to-[#122a4e] text-white">

      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Brand */}
          <div className="md:col-span-5 lg:col-span-5">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative h-6 w-6">
                  <Image src="/logo/ark-transpa.png" alt="Ark Institute" fill className="object-contain" />
                </div>
                <span className="text-base font-semibold tracking-wide">ARK Institute</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed max-w-md">
                TESDA‑accredited training for real skills and real opportunities.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Facebook" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06C2 17.08 5.66 21.21 10.44 22v-7.02H7.9v-2.92h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.92h-2.34V22C18.34 21.21 22 17.08 22 12.06z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11.001A5.5 5.5 0 0 1 12 7.5zm0 2a3.5 3.5 0 1 0 0 7.001A3.5 3.5 0 0 0 12 9.5zm5.25-2.5a1 1 0 1 1 0 2.001 1 1 0 0 1 0-2z" />
                  </svg>
                </a>
                <a href="#" aria-label="YouTube" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.68 3.5 12 3.5 12 3.5s-7.68 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.72.6 9.4.6 9.4.6s7.68 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 text-white/70" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.076 2.004a.75.75 0 00-.152 0A7.5 7.5 0 002.5 9.5c0 2.544 1.318 4.62 2.707 6.09a20.1 20.1 0 003.862 3.082.75.75 0 00.862 0 20.1 20.1 0 003.862-3.081C16.182 14.12 17.5 12.044 17.5 9.5a7.5 7.5 0 00-7.424-7.496zM10 11.5a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>
                  Victorina Drive, Victorina Heights Subdivision, Brgy. Mansilingan, Bacolod City, Negros Occidental 6100, Philippines
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8l8 5 8-5" />
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                </svg>
                <a href="mailto:info@arkinstitutebc.com" className="hover:text-white transition-colors">
                  info@arkinstitutebc.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/85 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/courses" className="text-white/85 hover:text-white transition-colors">Courses</Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/85 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-white/70">
          <p>&copy; {year} ARK Institute. All rights reserved.</p>
          <p>Bacolod City, Negros Occidental</p>
        </div>
      </div>
    </footer>
  );
}