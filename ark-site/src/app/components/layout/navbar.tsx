"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const { scrollY } = useScroll();
  
  // Scroll listener used only to toggle scrolled state
  
  useEffect(() => {
    // Hide navbar initially, show after splash completes
    const timer = setTimeout(() => {
      setShowNavbar(true);
    }, 2000); // Match splash duration
    
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [scrollY]);

  if (!showNavbar) return null;

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* No background - completely transparent */}
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-center relative transition-all duration-500 ${isScrolled ? 'py-2' : 'py-6'}`}>
          {/* Centered Logo & Title - Smooth disappear on scroll */}
          <motion.div 
            initial={{ opacity: 1, scale: 1 }}
            animate={{ 
              opacity: isScrolled ? 0 : 1, 
              scale: isScrolled ? 0.95 : 1,
              y: isScrolled ? -10 : 0
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            whileHover={{ scale: isScrolled ? 0.95 : 1.05 }}
            style={{ pointerEvents: isScrolled ? 'none' : 'auto' }}
          >
            <Link href="/" className="group flex flex-col items-center">
              <div className="relative mb-2">
                <Image
                  src="/logo/ark-transpa.png"
                  alt="Ark Institute"
                  width={70}
                  height={70}
                  priority
                  className="filter drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Title below logo */}
              <div className="text-center">
                <div 
                  className="text-2xl font-bold tracking-wider text-gray-900"
                  style={{ fontFamily: "'Times New Roman', serif" }}
                >
                  <span className="uppercase tracking-[0.3em]">ARK</span>
                </div>
                <div className="text-sm font-light text-gray-600 tracking-[0.4em] uppercase mt-1">
                  Institute
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Sophisticated Educational Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 right-6 z-50"
          >
            <div
              className="relative"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
              onFocus={() => setIsMenuOpen(true)}
              onBlur={() => setIsMenuOpen(false)}
            >
            <motion.button
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
              aria-controls="main-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group relative w-10 h-10 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Sophisticated background with educational feel */}
              <div className="absolute inset-0 bg-white border border-gray-200 rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-300"></div>
              
              {/* Menu/X icon using lucide-react */}
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={isMenuOpen ? 'icon-x' : 'icon-menu'}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.12 }}
                  className="relative"
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5 text-gray-700" strokeWidth={2} />
                  ) : (
                    <Menu className="w-5 h-5 text-gray-700" strokeWidth={2} />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Clean Simple Dropdown */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  id="main-menu"
                  className="absolute right-0 top-full mt-3 w-48 bg-white rounded-2xl shadow-md border border-gray-200 ring-1 ring-black/5 py-2 z-50"
                >
                  {[
                    { href: "/", label: "Home", active: true },
                    { href: "/about", label: "About" },
                    { href: "/courses", label: "Programmes" },
                    { href: "/contact", label: "Contact" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`group relative block px-4 py-3 text-sm rounded-lg mx-2 font-medium transition-colors duration-200 
                          after:content-[''] after:absolute after:left-4 after:right-4 after:bottom-2 after:h-[2px] after:rounded-full
                          after:bg-gradient-to-r after:from-[#c80100] after:to-white after:origin-left after:transition-transform after:duration-200
                          after:scale-x-0 group-hover:after:scale-x-100`
                        }
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

export function NavbarClassic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Programmes" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white pt-4">
      <div className="w-full">
        <div className="h-20 flex items-center justify-between px-6 sm:px-8 md:px-16">
          {/* Left: Logo + Wordmark */}
          <Link href="/" className="flex items-center gap-4 group ml-0">
            <Image
              src="/logo/ark-transpa.png"
              alt="Ark Institute"
              width={52}
              height={52}
              priority
              className="h-14 w-14"
            />
            <span
              className="text-xl font-bold tracking-wide text-gray-900"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span className="uppercase">ARK</span>{" "}
              <span className="font-medium normal-case">Institute</span>
            </span>
          </Link>

          {/* Right: Horizontal menu (md+) */}
          <nav className="hidden md:flex items-center gap-8 pr-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative px-2 py-2 text-sm font-medium text-gray-700 hover:text-[#193a7a] transition-colors
                           after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:rounded-full
                           after:bg-gradient-to-r after:from-[#c80100] after:to-white after:origin-left after:transition-transform after:duration-200
                           after:scale-x-0 group-hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-12 h-12 rounded-xl border border-gray-200 bg-white shadow-sm mr-2"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" strokeWidth={2} />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" strokeWidth={2} />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden pb-4 px-6 sm:px-8 md:px-16`}>
          <nav className="flex flex-col gap-2 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="group relative px-3 py-3 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors
                           after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-1 after:h-[2px] after:rounded-full
                           after:bg-gradient-to-r after:from-[#c80100] after:to-white after:origin-left after:transition-transform after:duration-200
                           after:scale-x-0 group-hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}