"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import MobileNav from "./mobile-nav";
import { useSplashCompletion } from "@/app/components/splash";
import { usePathname } from "next/navigation";


function AnimatedNavLink({ href, children, onClick, isActive = false }: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}) {
  return (
    <motion.div
      initial="rest"
      animate={isActive ? "active" : "rest"}
      whileHover="hover"
      whileFocus="hover"
      className="relative"
    >
      <Link
        href={href}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        className="group relative block px-4 py-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span className={`relative z-10 text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-700'} group-hover:text-gray-900 transition-colors duration-150`}>
          {children}
        </span>
      </Link>

      {/* Underline - split into two halves that meet at center */}
      <motion.span
        className="pointer-events-none absolute left-4 right-1/2 bottom-[6px] h-[2px] bg-accent"
        variants={{
          rest: { scaleX: 0, opacity: 0.15, y: 2 },
          hover: { scaleX: 1, opacity: 0.7, y: 0 },
          active: { scaleX: 1, opacity: 0.7, y: 0 },
        }}
        transition={{ type: 'tween', duration: 0.42, ease: 'easeOut' }}
        style={{ transformOrigin: 'left' }}
      />
      <motion.span
        className="pointer-events-none absolute left-1/2 right-4 bottom-[6px] h-[2px] bg-accent"
        variants={{
          rest: { scaleX: 0, opacity: 0.15, y: 2 },
          hover: { scaleX: 1, opacity: 0.7, y: 0 },
          active: { scaleX: 1, opacity: 0.7, y: 0 },
        }}
        transition={{ type: 'tween', duration: 0.42, ease: 'easeOut' }}
        style={{ transformOrigin: 'right' }}
      />
    </motion.div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const isScrolledRef = useRef(false);
  const splashCompleted = useSplashCompletion();
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const ENTER_SCROLL_PX = 24;
    const EXIT_SCROLL_PX = 8;

    const update = () => {
      const currentScrollY = scrollY.get();
      const nowScrolled = isScrolledRef.current ? (currentScrollY > EXIT_SCROLL_PX) : (currentScrollY >= ENTER_SCROLL_PX);

      if (nowScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nowScrolled;
        setIsScrolled(nowScrolled);
      }
    };

    const unsubscribe = scrollY.on("change", update);
    update();
    return () => {
      unsubscribe();
    };
  }, [scrollY]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/contact", label: "Contact" }
  ];

  // Only apply splash screen logic on the home page
  if (!splashCompleted && pathname === '/') return null;

  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: splashCompleted ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 pt-4 sm:pt-3 bg-transparent"
      style={{ pointerEvents: "auto" }}
    >
      {/* Mobile-only glass background when scrolled */}
      <div
        className={`${isScrolled && !isMobileMenuOpen ? 'bg-white/70 backdrop-blur-md' : ''} md:hidden absolute inset-0`}
        aria-hidden
      />
      <div className="w-full">
        <div className="h-14 md:h-20 flex items-center px-6 sm:px-8 md:px-16">

          <div className={`relative z-[60] transition-all duration-300 ${isScrolled ? "md:opacity-0 md:scale-95 opacity-100 scale-100" : "opacity-100 scale-100"}`}>
            <Link href="/" className="flex items-center gap-2 sm:gap-4 group ml-0" aria-label="Ark Institute home">
              <Image
                src="/logo/ark-transpa.png"
                alt="Ark Institute"
                width={52}
                height={52}
                priority
                className="h-9 w-9 sm:h-12 sm:w-12 md:h-14 md:w-14"
              />
              <span
                className="text-base sm:text-lg md:text-xl font-bold tracking-wide text-gray-900"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="uppercase">ARK</span>{" "}
                <span className="font-medium normal-case">Institute</span>
              </span>
            </Link>
          </div>

          {/* Right: Desktop navigation */}
          <div className="ml-auto flex items-center gap-2 pr-0 relative">
            {/* Mobile Navigation */}
            <MobileNav navItems={navItems} onOpenChange={setIsMobileMenuOpen} />
            
            <motion.nav
              role="navigation"
              aria-label="Primary navigation"
              initial={false}
              animate={{ opacity: (!isScrolled) ? 1 : 0 }}
              transition={{ duration: 0.2, ease: "linear" }}
              className="hidden md:flex items-center gap-3 md:gap-4"
              style={{
                pointerEvents: (!isScrolled) ? 'auto' : 'none'
              }}
            >
              {navItems.map((item) => (
                <div key={item.href} style={{ opacity: (!isScrolled) ? 1 : 0, transition: 'opacity 120ms linear' }}>
                  <AnimatedNavLink href={item.href} isActive={item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)}>
                    {item.label}
                  </AnimatedNavLink>
                </div>
              ))}
            </motion.nav>

            {/* Desktop-only hover menu (appears when scrolled) */}
            <div
              className="hidden md:block absolute right-0 top-0 mt-0"
              onMouseEnter={() => {
                if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
                setIsDesktopMenuOpen(true);
              }}
              onMouseLeave={() => {
                if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
                hoverTimerRef.current = setTimeout(() => setIsDesktopMenuOpen(false), 120);
              }}
              style={{ pointerEvents: isScrolled ? 'auto' : 'none' }}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: isScrolled ? 1 : 0, scale: isScrolled ? 1 : 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                aria-label="Open menu"
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={{ pointerEvents: isScrolled ? 'auto' : 'none' }}
              >
                <Menu className="w-5 h-5 text-gray-700" strokeWidth={2} />
              </motion.button>

              <AnimatePresence initial={false}>
                {isScrolled && isDesktopMenuOpen && (
                  <motion.nav
                    initial={{ opacity: 0, y: -6, scale: 0.995 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.995 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-4 z-50 w-64 max-w-[90vw] flex flex-col gap-1 pt-2 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-4"
                    style={{ transformOrigin: 'top right' }}
                    role="menu"
                    aria-label="Desktop menu"
                  >
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.16, delay: index * 0.03, ease: "easeOut" }}
                      >
                        <AnimatedNavLink
                          href={item.href}
                          isActive={item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)}
                          onClick={() => setIsDesktopMenuOpen(false)}
                        >
                          {item.label}
                        </AnimatedNavLink>
                      </motion.div>
                    ))}
                  </motion.nav>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}