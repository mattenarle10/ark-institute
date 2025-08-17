export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-transparent mt-auto border-t border-black/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="py-6 text-xs sm:text-sm text-black/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-center sm:text-left">
            &copy; {year} ARK Institute — Bacolod City, Negros Occidental 6100
          </p>
          <a
            href="mailto:info@arkinstituteph.com"
            className="hover:text-black/80 transition-colors"
          >
            info@arkinstituteph.com
          </a>
        </div>
      </div>
    </footer>
  );
}