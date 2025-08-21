"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

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
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = scrollY.get();
      setVisible(currentScrollY < 100 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    const unsubscribe = scrollY.on("change", updateScrollDirection);
    return () => {
      unsubscribe();
    };
  }, [scrollY, lastScrollY]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Programmes" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <motion.header 
      initial={{ opacity: 1, y: 0 }}
      animate={{ 
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -100,
        pointerEvents: visible ? "auto" : "none"
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent pt-4"
    >
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
          <nav className="hidden md:flex items-center gap-2 pr-4">
            {navItems.map((item) => (
              <AnimatedNavLink
                key={item.href}
                href={item.href}
              >
                {item.label}
              </AnimatedNavLink>
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
          <nav className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <AnimatedNavLink
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </AnimatedNavLink>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}