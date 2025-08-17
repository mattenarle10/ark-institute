"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "framer-motion";

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
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group relative w-11 h-11 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Sophisticated background with educational feel */}
              <div className="absolute inset-0 bg-white border border-gray-200 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300"></div>
              
              {/* Clean menu lines - inspired by academic layouts */}
              <div className="relative flex flex-col gap-1.5 w-5">
                <motion.div 
                  className="h-0.5 bg-gray-700 rounded-full"
                  animate={{ 
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 6 : 0 
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div 
                  className="h-0.5 bg-gray-700 rounded-full"
                  animate={{ 
                    opacity: isMenuOpen ? 0 : 1,
                    scale: isMenuOpen ? 0.8 : 1
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div 
                  className="h-0.5 bg-gray-700 rounded-full"
                  animate={{ 
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -6 : 0 
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.button>

            {/* Clean Simple Dropdown */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-40"
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
                        className={`block px-4 py-3 text-sm transition-colors duration-200 rounded-lg mx-2 ${
                          item.active 
                            ? 'text-primary bg-primary/8 font-medium' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
  