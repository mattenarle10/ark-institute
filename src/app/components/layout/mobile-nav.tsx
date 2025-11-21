"use client"

import { AnimatePresence, motion } from "framer-motion"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

type NavItem = { href: string; label: string }

interface MobileNavProps {
  navItems: NavItem[]
  onOpenChange?: (open: boolean) => void
}

export default function MobileNav({ navItems, onOpenChange }: MobileNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [])

  // Prevent body scroll when menu is open and notify parent about open state
  useEffect(() => {
    onOpenChange?.(isMenuOpen)
    if (!isMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isMenuOpen, onOpenChange])

  function closeMenu() {
    if (tlRef.current) {
      const tl = tlRef.current
      tl.eventCallback("onReverseComplete", () => setIsMenuOpen(false))
      tl.time(tl.duration())
      tl.reverse()
      return
    }
    setIsMenuOpen(false)
  }

  // Close menu on Escape and outside click
  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu()
    }
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target)
      ) {
        closeMenu()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("mousedown", onClickOutside)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("mousedown", onClickOutside)
    }
  }, [isMenuOpen, closeMenu])

  // GSAP full-screen overlay enter animation
  useEffect(() => {
    if (!isMenuOpen || !overlayRef.current) return
    const overlay = overlayRef.current
    const items = overlay.querySelectorAll(".menu-item, .menu-num")

    // Set initial state - no yPercent to avoid scroll position issues
    gsap.set(overlay, { opacity: 0, scale: 0.95 })
    gsap.set(items, { y: 30, opacity: 0 })

    const tl = gsap.timeline()
    tl.to(overlay, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" })
    tl.to(
      items,
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" },
      "-=0.1"
    )

    tlRef.current = tl
    return () => {
      tl.kill()
      tlRef.current = null
    }
  }, [isMenuOpen])

  return (
    <div className="md:hidden ml-auto flex flex-col items-end">
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
        className="relative z-[60] inline-flex md:hidden items-center justify-center w-10 h-10 bg-transparent mr-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {isMenuOpen ? (
          <X className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
        ) : (
          <Menu className="w-6 h-6 text-gray-800" strokeWidth={1.5} />
        )}
      </motion.button>

      {/* Full-screen menu overlay - just glassy background + menu items */}
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-50 bg-white/70 backdrop-blur-md"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          >
            <div ref={overlayRef} className="relative h-full w-full">
              {/* Menu content - centered */}
              <div className="h-full w-full grid place-items-center px-6">
                <div
                  ref={menuRef}
                  className="w-[86%] max-w-sm mx-auto flex flex-col items-start gap-6"
                >
                  {navItems.map((item, index) => (
                    <div
                      key={item.href}
                      className="menu-row flex items-baseline gap-3"
                    >
                      <span className="menu-num text-[10px] font-semibold tracking-wider text-gray-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Link
                        href={item.href}
                        aria-current={
                          item.href === "/"
                            ? pathname === "/"
                              ? "page"
                              : undefined
                            : pathname.startsWith(item.href)
                              ? "page"
                              : undefined
                        }
                        onClick={closeMenu}
                        className="menu-item block text-4xl md:text-5xl font-light tracking-tighter text-gray-900"
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
  )
}
