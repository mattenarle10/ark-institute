"use client";

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 16, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 10, scale: 0.98, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-montserrat text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 text-shadow-md">Who we are</h2>
          <div className="h-px w-16 bg-gradient-to-r from-primary to-primary/60 mt-3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div ref={textRef} className="md:col-span-7">
            <p className="text-base sm:text-lg leading-relaxed text-gray-700 text-justify md:text-left">
              We pride ourselves on offering <span className="font-semibold text-primary">TESDA‑accredited</span> courses tailored for
              students who aspire to excel in their chosen fields and become <span className="font-semibold text-gray-900">workforce‑ready</span>.
              Our comprehensive training programs are meticulously designed and evaluated by seasoned instructors,
              ensuring that each student receives <span className="font-semibold text-gray-900">extensive, hands‑on learning</span> experiences.
              Our commitment to <span className="font-semibold text-gray-900">quality education</span> and <span className="font-semibold text-gray-900">skill development</span> equips every student with the
              expertise, discipline, and confidence needed for a successful future.
            </p>
          </div>
          <div className="md:col-span-5">
            <div ref={imageRef} className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-2">
              <Image
                src="/images/tables-1.png"
                alt="Training at Ark Institute"
                width={800}
                height={534}
                className="w-full h-auto object-cover rounded-xl"
                sizes="(min-width: 768px) 420px, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
