"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

interface DividerProps {
  height?: "sm" | "md" | "lg"
  animated?: boolean
}

export default function Divider({
  height = "md",
  animated = true,
}: DividerProps) {
  const dividerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animated || typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger)

    if (dividerRef.current) {
      const container = dividerRef.current
      const dots = container.querySelectorAll(".w-1, .w-1\\.5, .w-2")
      const centerElement = container.querySelector(".w-3.h-3")
      const decorativeElements = container.querySelectorAll(".absolute.w-0\\.5")

      // Create refined timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })

      // Set initial states - more subtle
      gsap.set(dots, { scale: 0, opacity: 0 })
      gsap.set(centerElement, { scale: 0, opacity: 0 })
      gsap.set(decorativeElements, { scaleY: 0, opacity: 0 })

      // Elegant animation sequence
      tl.to(centerElement, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      })
        .to(
          dots,
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.4)",
            stagger: {
              amount: 0.6,
              from: "center",
            },
          },
          "-=0.5"
        )
        .to(
          decorativeElements,
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.2"
        )

      // Gentle hover effects on center
      const centerDiv = centerElement as HTMLElement
      if (centerDiv) {
        centerDiv.addEventListener("mouseenter", () => {
          gsap.to(centerElement, {
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        centerDiv.addEventListener("mouseleave", () => {
          gsap.to(centerElement, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill()
      })
    }
  }, [animated])

  const heightClasses = {
    sm: "h-20",
    md: "h-32",
    lg: "h-40",
  }

  return (
    <div
      ref={dividerRef}
      className={`relative w-full ${heightClasses[height]} overflow-hidden`}
    >
      {/* Seamless gradient background that flows into footer */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-slate-100 to-slate-200" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/15" />
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-b from-transparent to-primary/20" />

      {/* Main divider content - More spacious and subtle */}
      <div className="relative z-10 h-full flex items-center justify-center py-8">
        <div className="w-full max-w-5xl mx-auto px-8">
          {/* Refined central ornamental design */}
          <div className="flex items-center justify-center">
            {/* Left subtle accent */}
            <div className="flex-1 flex items-center justify-end pr-12">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-1 bg-primary/20 rounded-full" />
                <div className="w-1.5 h-1.5 bg-primary/35 rounded-full" />
                <div className="w-2 h-2 bg-primary/50 rounded-full" />
              </div>
            </div>

            {/* Simple elegant center element */}
            <div className="relative mx-8">
              <div className="w-3 h-3 bg-gradient-to-br from-primary/70 to-[#122a4e]/60 rounded-full shadow-sm" />
            </div>

            {/* Right subtle accent */}
            <div className="flex-1 flex items-center justify-start pl-12">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary/50 rounded-full" />
                <div className="w-1.5 h-1.5 bg-primary/35 rounded-full" />
                <div className="w-1 h-1 bg-primary/20 rounded-full" />
              </div>
            </div>
          </div>

          {/* Very subtle corner accents - professional touch */}
          <div className="absolute top-8 left-1/3 w-0.5 h-2 bg-gradient-to-b from-primary/10 to-transparent rounded-full" />
          <div className="absolute bottom-8 right-1/3 w-0.5 h-2 bg-gradient-to-t from-primary/10 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  )
}
