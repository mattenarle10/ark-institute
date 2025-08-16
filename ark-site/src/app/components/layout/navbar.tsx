import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-primary text-white rounded-b-2xl border border-primary/10 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Left: Logo + Wordmark */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo/ark-transpa.png"
            alt="Ark Institute"
            width={32}
            height={32}
            priority
          />
          <span className="font-bold uppercase tracking-wide">
            ARK INSTITUTE
          </span>
        </Link>

        {/* Right: Links */}
        <nav className="flex items-center gap-2">
          <Link
            href="#"
            data-active
            className="text-sm font-light px-3 py-1 rounded-md transition-colors hover:bg-white/15 data-[active=true]:bg-white/20"
          >
            Home
          </Link>
          <Link
            href="#about"
            className="text-sm font-light px-3 py-1 rounded-md transition-colors hover:bg-white/15"
          >
            About
          </Link>
          <Link
            href="#courses"
            className="text-sm font-light px-3 py-1 rounded-md transition-colors hover:bg-white/15"
          >
            Courses
          </Link>
          <Link
            href="#contact"
            className="text-sm font-light px-3 py-1 rounded-md transition-colors hover:bg-white/15"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
