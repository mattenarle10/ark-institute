"use client"

import { useEffect, useState } from "react"
import CTA from "@/app/components/home/cta"
import Hero from "@/app/components/home/hero"
import VisMis from "@/app/components/home/vismis"
import Divider from "@/app/components/layout/divider"
import Footer from "@/app/components/layout/footer"
import Navbar from "@/app/components/layout/navbar"
import Splash from "@/app/components/splash"

// Track if this is the first load of the page
let isFirstLoad = true

export default function Home() {
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    // Only show splash on first load/reload, not on navigation
    if (isFirstLoad) {
      setShowSplash(true)
      isFirstLoad = false
    }

    // Cleanup function will run when component unmounts
    return () => {
      setShowSplash(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {showSplash && <Splash />}
      <Navbar />
      <Hero />
      <VisMis />
      <CTA />
      <Divider height="lg" />
      <Footer />
    </div>
  )
}
