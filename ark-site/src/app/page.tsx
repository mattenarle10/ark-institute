import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Minimal Navbar */}
      <header className="border-b border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-6">
          <Image src="/logo/ark-transpa.png" alt="Ark Institute" width={32} height={32} />
          <nav className="flex items-center gap-6 text-sm">
            <Link href="#" className="border-b-2 border-transparent hover:border-black/20 data-[active=true]:border-primary" data-active>
              Home
            </Link>
            <Link href="#about" className="border-b-2 border-transparent hover:border-black/20">
              About
            </Link>
            <Link href="#courses" className="border-b-2 border-transparent hover:border-black/20">
              Courses
            </Link>
            <Link href="#contact" className="border-b-2 border-transparent hover:border-black/20">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-4">
        <section className="py-24 sm:py-28">
          <p className="text-xs uppercase tracking-wide text-black/50">TESDA-accredited</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold leading-tight">
            Welcome to Ark Institute
          </h1>
          <p className="mt-4 text-base sm:text-lg text-black/70 max-w-2xl">
            Mastering skills, building careers. Professional training designed for real-world readiness.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="#courses"
              className="inline-flex items-center px-4 py-2 text-sm border border-primary text-primary rounded-md hover:bg-primary/5 transition-colors"
            >
              Explore courses
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center px-4 py-2 text-sm border border-black/10 rounded-md hover:bg-black/5 transition-colors"
            >
              Contact us
            </Link>
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-black/50">
          © {new Date().getFullYear()} Ark Institute. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
