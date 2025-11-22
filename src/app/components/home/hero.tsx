"use client"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, ShieldCheck } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useRef } from "react"

const HeroNodes = dynamic(() => import("./hero-nodes/nodes"), { ssr: false })

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)
  const circlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current || !linesRef.current) return

    // GSAP Line Animations
    const lines = linesRef.current.querySelectorAll(".geometric-line")

    // Initial setup
    gsap.set(lines, { scaleX: 0, opacity: 0 })

    // Animated line reveals with staggered timing
    gsap.to(lines, {
      scaleX: 1,
      opacity: 0.8,
      duration: 1.5,
      stagger: 0.15,
      ease: "power2.inOut",
      delay: 0.5,
    })

    // Parallax effect on scroll for texture elements
    gsap.to(".texture-element", {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: -100,
      ease: "none",
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill()
      })
    }
  }, [])

  // Circle animations - simple fade in only, no breathing or tilting
  useEffect(() => {
    if (!circlesRef.current) return

    const circles = circlesRef.current.querySelectorAll(".circle")
    const cards = circlesRef.current.querySelectorAll(".node-card")

    // Initialize with opacity only, no scale to avoid any tilting effect
    gsap.set(circles, { opacity: 0 })

    // Simple fade in animation, no scaling or tilting
    gsap.to(circles, {
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power1.out",
      delay: 0.5,
    })

    // Subtle perpetual float (no tilt, very small movement)
    const circleArray = Array.from(circles)
    circleArray.forEach((el, idx) => {
      const amplitude = 4 + Math.random() * 4 // 4px to 8px
      gsap.to(el, {
        y: (idx % 2 === 0 ? 1 : -1) * amplitude,
        duration: 6 + Math.random() * 3, // 6s to 9s
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.2 + idx * 0.05,
      })
    })

    // Subtle shadow breathing on cards
    gsap.to(cards, {
      boxShadow: "0 15px 30px -10px rgba(0,0,0,0.22)",
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 0.6,
      stagger: 0.1,
    })

    return () => {
      // Cleanup if needed
      gsap.killTweensOf(circles)
      gsap.killTweensOf(cards)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full bg-white overflow-hidden flex items-start md:items-center pt-20 md:pt-0"
    >
      {/* Shadow projecting downward from the hero section - intensified */}
      <div className="absolute -bottom-16 left-0 right-0 z-40 pointer-events-none">
        <div className="relative h-16 overflow-visible">
          <div className="absolute top-0 left-0 right-0 h-16 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.25)]">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Sophisticated Geometric Texture Layer */}
      <div ref={linesRef} className="absolute inset-0 z-10">
        {/* Main architectural grid - more prominent on right, subtle on left */}
        <div className="geometric-line absolute top-1/5 left-0 w-full h-[2px] bg-gradient-to-l from-gray-300 via-gray-200/50 to-transparent"></div>
        <div className="geometric-line absolute top-2/5 left-0 w-full h-[2px] bg-gradient-to-l from-gray-300 via-gray-200/50 to-transparent"></div>
        <div className="geometric-line absolute top-3/5 left-0 w-full h-[2px] bg-gradient-to-l from-gray-300 via-gray-200/50 to-transparent"></div>
        <div className="geometric-line absolute top-4/5 left-0 w-full h-[2px] bg-gradient-to-l from-gray-300 via-gray-200/50 to-transparent"></div>

        <div className="geometric-line absolute top-0 left-1/5 w-[1px] h-full bg-gradient-to-t from-gray-300 via-gray-200/50 to-transparent"></div>
        <div className="geometric-line absolute top-0 left-2/5 w-[1px] h-full bg-gradient-to-t from-gray-300 via-gray-200/50 to-transparent"></div>
        <div className="geometric-line absolute top-0 left-3/5 w-[2px] h-full bg-gradient-to-t from-gray-300 via-gray-200/70 to-transparent"></div>
        <div className="geometric-line absolute top-0 left-4/5 w-[2px] h-full bg-gradient-to-t from-gray-300 via-gray-200/70 to-transparent"></div>
      </div>

      {/* Main Split Layout - RESTORED */}
      <div className="relative z-20 w-full h-full grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
        {/* Left Side - Typography Space */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center justify-start px-6 sm:px-8 md:px-16 z-40"
        >
          <div className="max-w-lg md:max-w-xl lg:max-w-2xl -mr-8 md:-mr-16 lg:-mr-20">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium text-gray-700 shadow-sm mb-5"
            >
              <ShieldCheck
                aria-hidden="true"
                className="w-4 h-4 text-[#193a7a]"
              />
              <span className="tracking-wide">TESDA-accredited</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-wide"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <div className="overflow-hidden mb-1 sm:mb-3">
                <motion.div className="flex items-center justify-start">
                  <motion.span
                    initial={{ y: 120 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 mr-3"
                  >
                    Mastering
                  </motion.span>
                  <motion.span
                    initial={{ y: 120 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-primary/80"
                  >
                    Skills
                  </motion.span>
                </motion.div>
              </div>
              <div className="overflow-hidden mb-3">
                <motion.div className="flex items-center justify-start">
                  <motion.span
                    initial={{ y: 120 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 mr-3"
                  >
                    Building
                  </motion.span>
                  <motion.span
                    initial={{ y: 120 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent/90 to-accent/80 tracking-wider"
                  >
                    Careers
                  </motion.span>
                </motion.div>
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="text-lg sm:text-xl text-gray-600 mt-6 md:mt-10 leading-relaxed tracking-normal text-shadow-sm max-w-[95%] sm:max-w-[90%] md:max-w-full"
            >
              Progressive education for <br />
              tomorrow&apos;s workforce. <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">
                Real skills, real opportunities.
              </span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.0 }}
              className="mt-6 md:mt-8"
            >
              <Link
                href="/courses"
                className="group inline-flex items-center gap-2 border-b border-gray-300 pb-1 hover:border-primary/70 transition-all duration-300 ml-1 sm:ml-1.5"
              >
                <span className="text-base sm:text-lg font-medium text-gray-700 group-hover:text-primary/90 transition-colors duration-300">
                  Enroll Now
                </span>
                <motion.span
                  initial={{ y: 0 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 2.4,
                    ease: "easeInOut",
                  }}
                  className="inline-flex"
                  aria-hidden
                >
                  <ArrowUpRight
                    className="w-6 h-6 text-gray-500 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-out"
                    strokeWidth={1.5}
                  />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Minimap-style image nodes */}
        <div className="relative h-full w-full flex items-end justify-end -mt-6 py-0 md:mt-0 md:py-0">
          <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto md:mr-8 md:mb-8">
            {/* Minimap container (no phone shell) */}
            <div
              ref={circlesRef}
              className="relative w-full h-[20rem] sm:h-[24rem] md:h-[34rem] lg:h-[38rem] p-1 md:p-4 lg:p-6 -translate-y-8 sm:-translate-y-6 md:-translate-y-8 lg:-translate-y-10 transition-transform duration-700 ease-in-out group/minimap"
            >
              <HeroNodes />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>
    </section>
  )
}
