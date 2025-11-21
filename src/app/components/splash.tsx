"use client"

import gsap from "gsap"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

// Global splash state management
let globalSplashCompleted = false
const splashCompletionCallbacks: (() => void)[] = []

// Reset splash state when module is loaded (for dev mode hot reloading)
if (typeof window !== "undefined") {
  // Only reset if we're navigating directly to the page (not on hot reload)
  if (window.performance && window.performance.navigation.type !== 1) {
    // Store in sessionStorage to persist during the session
    const hasCompletedSplash =
      sessionStorage.getItem("splashCompleted") === "true"
    globalSplashCompleted = hasCompletedSplash
  }
}

export const useSplashCompletion = () => {
  const [splashCompleted, setSplashCompleted] = useState(globalSplashCompleted)

  useEffect(() => {
    // Always check sessionStorage first
    if (typeof window !== "undefined") {
      const hasCompletedSplash =
        sessionStorage.getItem("splashCompleted") === "true"
      if (hasCompletedSplash) {
        setSplashCompleted(true)
        globalSplashCompleted = true
        return
      }
    }

    // Fall back to global state
    if (globalSplashCompleted) {
      setSplashCompleted(true)
      return
    }

    const callback = () => setSplashCompleted(true)
    splashCompletionCallbacks.push(callback)

    return () => {
      const index = splashCompletionCallbacks.indexOf(callback)
      if (index > -1) {
        splashCompletionCallbacks.splice(index, 1)
      }
    }
  }, [])

  return splashCompleted
}

const notifySplashCompletion = () => {
  globalSplashCompleted = true

  // Store in sessionStorage to persist during navigation
  if (typeof window !== "undefined") {
    sessionStorage.setItem("splashCompleted", "true")
  }

  // Notify all listeners
  splashCompletionCallbacks.forEach((callback) => { callback() })
}

export default function Splash() {
  const [isVisible, setIsVisible] = useState(true)
  const splashRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    // Reset visibility state
    setIsVisible(true)

    // Prevent scroll while splash is visible
    document.body.style.overflow = "hidden"

    // Skip animation if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(false)
      document.body.style.overflow = ""
      notifySplashCompletion()
      return
    }

    // Kill any existing animation
    if (animationRef.current) {
      animationRef.current.kill()
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false)
        document.body.style.overflow = ""
        notifySplashCompletion()
      },
    })

    // Store reference for cleanup
    animationRef.current = tl

    // Initial state
    gsap.set(logoRef.current, { opacity: 0, scale: 0.9 })
    gsap.set(lineRef.current, { scaleX: 0, opacity: 0 })
    gsap.set(splashRef.current, { opacity: 1 }) // Ensure splash is visible

    // Animation sequence
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    })
      .to(
        lineRef.current,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.1"
      )
      .to(
        splashRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "+=0.5"
      )

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
      document.body.style.overflow = ""
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center">
        <div ref={logoRef} className="mb-4">
          <Image
            src="/logo/ark-transpa.png"
            alt="ARK Institute"
            width={120}
            height={120}
            priority
          />
        </div>
        <div
          ref={lineRef}
          className="h-[4px] w-40 rounded-full shadow-md"
          style={{
            backgroundImage:
              "radial-gradient(circle 8px at center, white 98%, transparent 100%), linear-gradient(to right, #e63946 0%, #e63946 50%, #1d3557 50%, #1d3557 100%)",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  )
}
