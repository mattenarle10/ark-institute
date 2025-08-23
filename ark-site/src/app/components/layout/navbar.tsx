"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSplashCompletion } from "@/app/components/splash";

// Global hover state manager - ensures only one link is hovered at a time
class HoverManager {
  private static instance: HoverManager;
  private currentHoveredId: string | null = null;
  private links = new Map<string, {
    bg: HTMLDivElement;
    text: HTMLSpanElement;
    reset: () => void;
  }>();

  static getInstance(): HoverManager {
    if (!HoverManager.instance) {
      HoverManager.instance = new HoverManager();
    }
    return HoverManager.instance;
  }

  register(id: string, bg: HTMLDivElement, text: HTMLSpanElement, reset: () => void) {
    this.links.set(id, { bg, text, reset });
  }

  unregister(id: string) {
    this.links.delete(id);
    if (this.currentHoveredId === id) {
      this.currentHoveredId = null;
    }
  }

  setHovered(id: string) {
    // Reset previously hovered link
    if (this.currentHoveredId && this.currentHoveredId !== id) {
      const prevLink = this.links.get(this.currentHoveredId);
      if (prevLink) {
        prevLink.reset();
      }
    }
    this.currentHoveredId = id;
  }

  clearHovered(id: string) {
    if (this.currentHoveredId === id) {
      this.currentHoveredId = null;
    }
  }

  forceResetAll() {
    this.links.forEach(link => link.reset());
    this.currentHoveredId = null;
  }
}

// Clean Professional Animated Link Component
function AnimatedNavLink({ href, children, onClick }: { 
  href: string; 
  children: React.ReactNode; 
  onClick?: () => void;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const linkId = useRef(`link-${Math.random().toString(36).substr(2, 9)}`);
  const hoverManager = useRef(HoverManager.getInstance());

  useEffect(() => {
    const link = linkRef.current;
    const bg = bgRef.current;
    const text = textRef.current;

    if (!link || !bg || !text) return;

    // Set initial states
    gsap.set(bg, { 
      scaleX: 0, 
      scaleY: 0,
      borderRadius: "12px"
    });

    // Reset function for this link
    const resetLink = () => {
      gsap.killTweensOf([bg, text]);
      gsap.to(bg, {
        scaleX: 0,
        scaleY: 0,
        duration: 0.4,
        ease: "power2.inOut"
      });
      gsap.to(text, {
        color: "#374151",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Register this link with the hover manager
    hoverManager.current.register(linkId.current, bg, text, resetLink);

    const handleMouseEnter = () => {
      // Tell hover manager this link is now hovered
      hoverManager.current.setHovered(linkId.current);
      
      // Kill any existing animations
      gsap.killTweensOf([bg, text]);
      
      // Background morphing entrance - playful bounce
      gsap.to(bg, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.5,
        ease: "back.out(1.4)"
      });

      // Text color change
      gsap.to(text, {
        color: "#ffffff",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      // Clear hover state in manager
      hoverManager.current.clearHovered(linkId.current);
      
      // Reset this link
      resetLink();
    };

    const handleClick = () => {
      // Force reset all links on any click
      hoverManager.current.forceResetAll();
    };

    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);
    link.addEventListener('click', handleClick);

    return () => {
      link.removeEventListener('mouseenter', handleMouseEnter);
      link.removeEventListener('mouseleave', handleMouseLeave);
      link.removeEventListener('click', handleClick);
      
      // Unregister from hover manager
      hoverManager.current.unregister(linkId.current);
      
      // Force reset on cleanup
      gsap.killTweensOf([bg, text]);
      if (bg && text) {
        gsap.set(bg, { scaleX: 0, scaleY: 0 });
        gsap.set(text, { color: "#374151" });
      }
    };
  }, []);

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={onClick}
      className="relative block px-4 py-2.5 transition-all duration-200"
    >
      {/* Clean background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-primary rounded-xl"
        style={{ transformOrigin: 'center' }}
      />
      
      {/* Text */}
      <span 
        ref={textRef}
        className="relative z-10 text-sm font-medium text-gray-600"
      >
        {children}
      </span>
    </Link>
  );
}



export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const splashCompleted = useSplashCompletion();

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = scrollY.get();
      const wasScrolled = isScrolled;
      const ENTER_SCROLL_PX = 24;
      const EXIT_SCROLL_PX = 8;
      const nowScrolled = wasScrolled ? (currentScrollY > EXIT_SCROLL_PX) : (currentScrollY >= ENTER_SCROLL_PX);

      // Keep navbar always visible to avoid flicker at threshold
      if (!visible) setVisible(true);

      setIsScrolled(nowScrolled);

      // Auto-close menu when transitioning from scrolled to not-scrolled
      if (wasScrolled && !nowScrolled && isMenuOpen) {
        setIsMenuOpen(false);
      }

      setLastScrollY(currentScrollY);
    };

    const unsubscribe = scrollY.on("change", updateScrollDirection);
    return () => {
      unsubscribe();
    };
  }, [scrollY, lastScrollY, isScrolled, isMenuOpen, visible]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Programmes" },
    { href: "/contact", label: "Contact" }
  ];

  // Don't show navbar until splash is completed
  if (!splashCompleted) return null;

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: splashCompleted ? 1 : 0, y: splashCompleted ? 0 : -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent pt-4"
      style={{ pointerEvents: "auto" }}
    >
      <div className="w-full will-change-transform">
        <div className="h-20 flex items-center justify-between px-6 sm:px-8 md:px-16">
          {/* Left: Logo + Wordmark - keep space to avoid flicker; hide visually when scrolled/menu open */}
          <div className={`${(isMenuOpen || isScrolled) ? "invisible" : "visible"}`}>
            <Link href="/" className="flex items-center gap-4 group ml-0" aria-hidden={isMenuOpen || isScrolled}>
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
          </div>

          {/* Right: Horizontal menu (md+) - always mounted to avoid flicker; hidden when scrolled/menu open */}
          <motion.nav
            initial={false}
            animate={{ opacity: (!isScrolled && !isMenuOpen) ? 1 : 0 }}
            transition={{ duration: 0.14, ease: "linear" }}
            className="hidden md:flex items-center gap-2 pr-4"
            style={{
              pointerEvents: (!isScrolled && !isMenuOpen) ? 'auto' : 'none',
              visibility: (!isScrolled && !isMenuOpen) ? 'visible' : 'hidden'
            }}
          >
            {navItems.map((item) => (
              <div key={item.href} style={{ opacity: (!isScrolled && !isMenuOpen) ? 1 : 0, transition: 'opacity 120ms linear' }}>
                <AnimatedNavLink href={item.href}>
                  {item.label}
                </AnimatedNavLink>
              </div>
            ))}
          </motion.nav>

          {/* Menu toggle - Mobile always, Desktop when scrolled */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeOut"
            }}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
            className={`${
              isScrolled ? 'inline-flex' : 'md:hidden inline-flex'
            } ml-auto items-center justify-center w-12 h-12 rounded-xl border border-gray-200 bg-white shadow-sm mr-2`}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" strokeWidth={2} />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" strokeWidth={2} />
            )}
          </motion.button>
        </div>

        {/* Dropdown menu - Mobile always, Desktop when scrolled */}
        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -6, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.995 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={`${isScrolled ? 'block' : 'md:hidden'} pb-4 px-6 sm:px-8 md:px-16 flex justify-end`}
            >
              <motion.nav 
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
    </motion.header>
  );
}