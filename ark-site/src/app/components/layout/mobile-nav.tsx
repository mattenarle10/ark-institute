"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

// Clean Professional Animated Link Component (Framer Motion only)
function AnimatedNavLink({ href, children, onClick, isActive = false }: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}) {
  const bgClass = isActive ? "bg-gray-200" : "bg-primary";
  const hoverTextColor = isActive ? "#1F2937" : "#ffffff"; // gray-800 or white

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className="group relative block px-4 py-3 transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {/* Animated background */}
      <motion.div
        className={`absolute inset-0 ${bgClass} rounded-xl`}
        initial={{ scaleX: 0, scaleY: 0 }}
        whileHover={{ scaleX: 1, scaleY: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformOrigin: 'center' }}
      />

      {/* Text */}
      <motion.span 
        className={`relative z-10 text-base font-medium ${isActive ? 'text-gray-800' : 'text-gray-600'}`}
        whileHover={{ color: hoverTextColor }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

interface MobileNavProps {
  navItems: NavItem[];
  isScrolled: boolean;
}

export default function MobileNav({ navItems, isScrolled }: MobileNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);


  const subtitles: Record<string, string> = {
    "/": "Back to landing",
    "/about": "Who we are",
    "/courses": "Programs & training",
    "/contact": "Get in touch",
  };
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  function closeMenu() {
    if (tlRef.current) {
      const tl = tlRef.current;
      tl.eventCallback('onReverseComplete', () => setIsMenuOpen(false));
      tl.time(tl.duration());
      tl.reverse();
      return;
    }
    setIsMenuOpen(false);
  }

  // Close menu on Escape and outside click
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current && !menuRef.current.contains(target) &&
        menuButtonRef.current && !menuButtonRef.current.contains(target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isMenuOpen]);

  // GSAP full-screen overlay enter animation
  useEffect(() => {
    if (!isMenuOpen || !overlayRef.current) return;
    const overlay = overlayRef.current;
    const items = overlay.querySelectorAll('.menu-item, .menu-item-title, .menu-subtitle, .menu-num');
    gsap.set(overlay, { yPercent: -100, opacity: 0 });
    const tl = gsap.timeline();
    tl.to(overlay, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
    tl.from(items, { y: 12, opacity: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }, '-=0.1');
    tlRef.current = tl;
    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, [isMenuOpen]);

  

  return (
    <div className={`ml-auto flex flex-col items-end ${isScrolled ? 'md:flex' : 'md:hidden'}`}>
      {/* Menu toggle - Mobile always, Desktop when scrolled */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav"
        aria-haspopup="true"
        ref={menuButtonRef}
        onClick={() => (isMenuOpen ? closeMenu() : setIsMenuOpen(true))}
        className={`${
          isScrolled ? 'inline-flex' : 'md:hidden inline-flex'
        } items-center justify-center w-10 h-10 bg-transparent mr-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
      >
        {isMenuOpen ? (
          <X className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
        ) : (
          <Menu className="w-6 h-6 text-gray-800" strokeWidth={1.5} />
        )}
      </motion.button>

      {/* Full-screen menu */}
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div className="fixed inset-0 z-[60]" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
            <div ref={overlayRef} className="relative h-full w-full bg-neutral-950/95 text-white">
              {/* Close (plain lines, no container) */}
              <button
                onClick={closeMenu}
                aria-label="Close menu"
                className="absolute right-5 top-5 h-8 w-8 grid place-items-center text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span aria-hidden className="relative block h-5 w-5">
                  <span className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rotate-45 transform bg-white rounded-full"></span>
                  <span className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 -rotate-45 transform bg-white rounded-full"></span>
                </span>
              </button>
              {/* Content */}
              <div ref={menuRef as any} className="h-full w-full grid place-items-center px-6">
                <div className="w-[86%] max-w-sm mx-auto flex flex-col items-start gap-6">
                  {navItems.map((item, index) => (
                    <div key={item.href} className="menu-row flex items-baseline gap-3">
                      <span className="menu-num text-[10px] font-semibold tracking-wider text-white/60">{String(index + 1).padStart(2, '0')}</span>
                      <Link
                        href={item.href}
                        aria-current={item.href === '/' ? (pathname === '/' ? 'page' : undefined) : (pathname.startsWith(item.href) ? 'page' : undefined)}
                        onClick={closeMenu}
                        className="menu-item block text-4xl md:text-5xl font-light tracking-tighter"
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}