"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
      className="group relative block px-4 py-2.5 transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
        className={`relative z-10 text-sm font-medium ${isActive ? 'text-gray-800' : 'text-gray-600'}`}
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

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape and outside click
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current && !menuRef.current.contains(target) &&
        menuButtonRef.current && !menuButtonRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
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
        onClick={() => setIsMenuOpen((v) => !v)}
        className={`${
          isScrolled ? 'inline-flex' : 'md:hidden inline-flex'
        } items-center justify-center w-12 h-12 rounded-xl border border-gray-200 bg-white shadow-sm mr-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
      >
        {isMenuOpen ? (
          <X className="w-5 h-5 text-gray-700" strokeWidth={2} />
        ) : (
          <Menu className="w-5 h-5 text-gray-700" strokeWidth={2} />
        )}
      </motion.button>

      {/* Dropdown menu */}
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -6, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.995 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mt-2 pr-0"
          >
            <motion.nav 
              ref={menuRef}
              id="mobile-nav"
              role="navigation"
              aria-label="Mobile navigation"
              className="w-64 max-w-[90vw] flex flex-col gap-1 pt-2 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg p-4"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.03, ease: "easeOut" }}
                >
                  <AnimatedNavLink
                    href={item.href}
                    isActive={item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </AnimatedNavLink>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}