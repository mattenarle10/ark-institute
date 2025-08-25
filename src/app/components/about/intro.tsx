import React from 'react'
import Image from 'next/image'

export default function Intro() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* subtle background accents */}
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-[360px] w-[360px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-[-10%] h-[300px] w-[300px] rounded-full bg-accent/5 blur-3xl" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 md:py-16">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-5 flex items-center justify-center">
            <Image
              src="/logo/ark-transpa.png"
              alt="Ark Institute logo"
              width={72}
              height={72}
              className="h-16 w-16 object-contain"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="font-montserrat text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
            About Ark Institute
          </h1>

          {/* Short subcopy */}
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-gray-700">
            TESDA‑accredited training. Practical skills. Real career outcomes.
          </p>

          {/* Badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <span>TESDA Accredited</span>
            <span className="opacity-60">•</span>
            <span>Hands‑on Learning</span>
          </div>
        </div>
      </div>
    </section>
  )
}
