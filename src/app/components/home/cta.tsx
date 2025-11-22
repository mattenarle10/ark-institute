"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const chipsRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const bgLinesRef = useRef<HTMLDivElement>(null)
  const tileRefs = useRef<HTMLAnchorElement[]>([])
  const setTileRef = (el: HTMLAnchorElement | null, idx: number) => {
    if (el) tileRefs.current[idx] = el
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    // Animate background lines (subtle, like vismis)
    const lines = bgLinesRef.current?.querySelectorAll(".geometric-line")
    if (lines?.length) {
      gsap.set(lines, { scaleX: 0, opacity: 0 })
      gsap.to(lines, {
        scaleX: 1,
        opacity: 0.35,
        duration: 1.0,
        stagger: 0.12,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill()
      })
    }
  }, [])

  // On-scroll blur-in for text, description, chips, and tiles; parallax on tile media
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches

      const animateIn = (el: Element | null) => {
        if (!el) return
        const from = reduce
          ? { opacity: 0 }
          : ({ opacity: 0, y: 16, filter: "blur(8px)" } as gsap.TweenVars)
        const to = reduce
          ? {
              opacity: 1,
              duration: 0.3,
              ease: "power1.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          : {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
        gsap.fromTo(el, from, to)
      }

      animateIn(textRef.current)
      animateIn(descRef.current)
      animateIn(chipsRef.current)

      tileRefs.current.forEach((tile) => {
        if (!tile) return
        animateIn(tile)
        if (!reduce) {
          const mediaImg = tile.querySelector(".tile-media img")
          if (mediaImg) {
            gsap.set(mediaImg, { y: 0 })
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-white to-gray-50 overflow-hidden py-20 md:py-24"
    >
      {/* Grainy texture overlay */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      {/* Subtle geometric background lines (toned down like vismis) */}
      <div
        ref={bgLinesRef}
        className="hidden md:block pointer-events-none absolute inset-0 z-10"
      >
        <div className="geometric-line absolute top-1/4 left-0 w-full h-px bg-gradient-to-l from-gray-200 via-gray-100/60 to-transparent" />
        <div className="geometric-line absolute top-2/4 left-0 w-full h-px bg-gradient-to-l from-gray-200 via-gray-100/60 to-transparent" />
        <div className="geometric-line absolute top-3/4 left-0 w-full h-px bg-gradient-to-l from-gray-200 via-gray-100/60 to-transparent" />
        <div className="geometric-line absolute top-0 left-2/5 w-px h-full bg-gradient-to-t from-gray-200 via-gray-100/60 to-transparent" />
        <div className="geometric-line absolute top-0 left-3/5 w-px h-full bg-gradient-to-t from-gray-200 via-gray-100/60 to-transparent" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6 sm:px-8 md:px-16">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left: Text content */}
          <div className="md:col-span-6 lg:col-span-7" ref={textRef}>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 text-shadow-md"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Build job‑ready skills with TESDA‑accredited training
            </h2>
            <p
              ref={descRef}
              className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl"
            >
              Hands‑on programs designed by experienced instructors to prepare
              you for work.
            </p>

            {/* Course categories: show only Registered */}
            <div
              ref={chipsRef}
              className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-lg"
            >
              <div className="flex items-center gap-3 rounded-lg px-2 py-1.5">
                <div className="w-7 h-7 rounded-full bg-primary/10 ring-1 ring-primary/10 flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-[13px] sm:text-sm font-medium text-gray-800 leading-tight tracking-tight">
                  Housekeeping NC II
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg px-2 py-1.5">
                <div className="w-7 h-7 rounded-full bg-accent/10 ring-1 ring-accent/10 flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-[13px] sm:text-sm font-medium text-gray-800 leading-tight tracking-tight">
                  Food and Beverage Services NC II
                </span>
              </div>
            </div>
          </div>

          {/* Right: CTA buttons with image-backed tiles */}
          <div
            className="md:col-span-6 lg:col-span-5 mt-10 md:mt-0"
            ref={buttonsRef}
          >
            <div className="flex flex-col gap-4 md:items-stretch">
              {/* Explore Courses tile */}
              <Link
                href="/courses"
                aria-label="Explore courses"
                ref={(el) => setTileRef(el, 0)}
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl ring-1 ring-black/5 bg-gradient-to-br from-white/60 to-white/30 md:from-white/50 md:to-white/25 backdrop-blur-md md:backdrop-blur-lg shadow-sm md:shadow transition transform hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <div
                  className="tile-media absolute inset-y-0 left-0 w-28 sm:w-32 overflow-hidden pointer-events-none"
                  style={{
                    backgroundImage: "url('/images/housekeep-1.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute -inset-2 sm:-inset-3">
                    <Image
                      src="/images/housekeep-1.png"
                      alt="Courses preview"
                      fill
                      sizes="(max-width: 640px) 7rem, 8rem"
                      className="block object-cover object-center transform-gpu will-change-transform transition-transform duration-500"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                </div>
                <div className="relative pl-32 sm:pl-36 pr-4 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-primary inline-flex h-2.5 w-2.5 rounded-full bg-primary/80" />
                    <span className="text-sm sm:text-lg font-semibold text-gray-800 whitespace-nowrap">
                      Explore Courses
                    </span>
                  </div>
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-primary/80 transition-transform duration-300 group-hover:translate-x-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>

              {/* Request Information tile */}
              <Link
                href="/contact"
                aria-label="Request information"
                ref={(el) => setTileRef(el, 1)}
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl ring-1 ring-black/5 bg-gradient-to-br from-white/60 to-white/30 md:from-white/50 md:to-white/25 backdrop-blur-md md:backdrop-blur-lg shadow-sm md:shadow transition transform hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <div
                  className="tile-media absolute inset-y-0 left-0 w-28 sm:w-32 overflow-hidden pointer-events-none"
                  style={{
                    backgroundImage: "url('/images/brainstorm.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute -inset-2 sm:-inset-3">
                    <Image
                      src="/images/brainstorm.png"
                      alt="Request information"
                      fill
                      sizes="(max-width: 640px) 7rem, 8rem"
                      className="block object-cover object-center transform-gpu will-change-transform transition-transform duration-500"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                </div>
                <div className="relative pl-32 sm:pl-36 pr-4 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent/80" />
                    <span className="text-sm sm:text-lg font-semibold text-gray-800 whitespace-nowrap">
                      Request Information
                    </span>
                  </div>
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-accent/80 transition-transform duration-300 group-hover:translate-x-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
