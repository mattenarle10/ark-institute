"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Sophisticated scroll-based transformations
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
  const logoScale = useTransform(scrollY, [0, 150], [1, 0.7]);
  const logoOpacity = useTransform(scrollY, [100, 200], [1, 0]);
  const menuY = useTransform(scrollY, [0, 150], [0, -20]);
  const menuScale = useTransform(scrollY, [0, 150], [1, 0.9]);
  const containerPadding = useTransform(scrollY, [0, 150], [8, 4]);
  
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Sophisticated background that appears on scroll */}
      <motion.div 
        className="absolute inset-0 bg-white border-b border-gray-100"
        style={{ 
          opacity: backgroundOpacity,
          backdropFilter: isScrolled ? "blur(20px)" : "none"
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Centered Logo - Premium positioning with sophisticated collapse */}
        <motion.div 
          className="flex justify-center transition-all duration-500"
          style={{ 
            scale: logoScale,
            opacity: logoOpacity,
            paddingTop: containerPadding,
            paddingBottom: isScrolled ? 2 : 24
          }}
        >
          <motion.div
            whileHover={{ scale: isScrolled ? 1.02 : 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link href="/" className="group flex flex-col items-center">
              {/* Logo */}
              <div className="relative">
                <Image
                  src="/logo/ark-transpa.png"
                  alt="Ark Institute"
                  width={isScrolled ? 60 : 80}
                  height={isScrolled ? 60 : 80}
                  priority
                  className="filter drop-shadow-lg transition-all duration-500"
                />
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Wordmark - Elegant typography with scroll adaptation */}
              <motion.div 
                className={`mt-3 text-center transition-all duration-500 ${isScrolled ? 'scale-75 opacity-60' : ''}`}
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                <div 
                  className={`font-bold tracking-wider text-gray-900 transition-all duration-500 ${isScrolled ? 'text-lg' : 'text-2xl'}`}
                  style={{ 
                    fontFamily: "'Times New Roman', serif",
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                >
                  <span className="uppercase tracking-[0.2em]">ARK</span>
                </div>
                <div className={`font-light text-gray-600 tracking-[0.3em] uppercase mt-1 transition-all duration-500 ${isScrolled ? 'text-xs' : 'text-sm'}`}>
                  Institute
                </div>
                {/* Elegant underline */}
                <div className={`mt-2 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto opacity-60 transition-all duration-500 ${isScrolled ? 'w-8' : 'w-12'}`}></div>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Navigation Menu with sophisticated collapse */}
        <motion.nav 
          className={`flex justify-center transition-all duration-500 ${isScrolled ? 'pb-4' : 'pb-8'}`}
          style={{ y: menuY, scale: menuScale }}
        >
          <motion.div 
            className={`flex items-center gap-1 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100 transition-all duration-500 ${
              isScrolled ? 'px-6 py-3' : 'px-8 py-4'
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            {/* Navigation Links */}
            {[
              { href: "/", label: "Home", active: true },
              { href: "/about", label: "About" },
              { href: "/courses", label: "Programmes" },
              { href: "/contact", label: "Contact" }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.5 + (index * 0.1), 
                  duration: 0.6,
                  ease: "easeOut" 
                }}
              >
                <Link
                  href={item.href}
                  className={`
                    group relative rounded-full font-medium transition-all duration-300
                    ${isScrolled ? 'px-4 py-1.5 text-xs' : 'px-6 py-2 text-sm'}
                    ${item.active 
                      ? 'text-primary bg-primary/5' 
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
                  
                  {/* Active indicator */}
                  {item.active && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full"
                      initial={{ scale: 0, x: "-50%" }}
                      animate={{ scale: 1, x: "-50%" }}
                      transition={{ delay: 0.8, type: "spring", stiffness: 500 }}
                    />
                  )}
                  
                  {/* Elegant hover underline */}
                  <div className="absolute bottom-1 left-1/2 w-0 h-px bg-primary transition-all duration-300 group-hover:w-8 transform -translate-x-1/2"></div>
                </Link>
              </motion.div>
            ))}
            
            {/* Floating accent dots */}
            <div className="absolute -top-2 right-4 w-2 h-2 bg-accent/30 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 left-6 w-1.5 h-1.5 bg-primary/20 rounded-full animate-pulse delay-1000"></div>
          </motion.div>
        </motion.nav>
      </div>
    </motion.header>
  );
}
  