"use client";

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Intro() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 md:px-16 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col items-start text-left md:items-center md:text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
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
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: 'easeOut', delay: 0.05 }}
            className="font-montserrat text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 text-shadow-md"
          >
            Contact Us
          </motion.h1>

          {/* Short subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: 'easeOut', delay: 0.12 }}
            className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-700"
          >
            Inquire, Contact, and Find us on the Maps.
          </motion.p>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, ease: 'easeOut', delay: 0.18 }}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary"
          >
            <span>TESDA Accredited</span>
            <span className="opacity-60">•</span>
            <span>Hands‑on Learning</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
