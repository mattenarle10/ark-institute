"use client"

import Image from "next/image"
import { useScrollReveal } from "../animations/useScrollReveal"

export default function Intro() {
  const ref = useScrollReveal()
  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 md:px-16 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div
            data-reveal
            className="mb-6 w-full flex items-center justify-center"
          >
            <Image
              src="/logo/ark-transpa.png"
              alt="Ark Institute logo"
              width={112}
              height={112}
              className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 object-contain"
              priority
            />
          </div>

          {/* Title */}
          <h1
            data-reveal
            className="font-montserrat text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 text-shadow-md"
          >
            Get in Touch With Us
          </h1>

          {/* Short subcopy */}
          <p
            data-reveal
            className="mt-2 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-gray-700"
          >
            Questions about our courses? We&apos;re here to help.
          </p>

          {/* Badge */}
          <div
            data-reveal
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mx-auto"
          >
            <span>TESDA Accredited</span>
            <span className="opacity-60">•</span>
            <span>Quick Response</span>
          </div>
        </div>
      </div>
    </section>
  )
}
