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
          { opacity: 0, y: 10, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.5,
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
          { opacity: 0, y: 8, scale: 0.99, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.5,
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
      <div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-16">
        <div className="mb-6 text-left md:text-center">
          <h2 className="font-montserrat text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 text-shadow-md">Who we are</h2>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
          <div ref={textRef} className="md:col-span-7 md:pr-6">
            <p className="text-sm sm:text-base leading-relaxed text-gray-700 text-left max-w-prose">
              We pride ourselves on offering <span className="font-semibold text-primary">TESDA‑accredited</span> courses tailored for
              students who aspire to excel in their chosen fields and become workforce‑ready. Our comprehensive training programs are
              meticulously designed and evaluated by seasoned instructors, ensuring that each student receives extensive, hands‑on learning
              experiences. Our commitment to quality education and skill development equips every student with the expertise, discipline,
              and confidence needed for a successful future.
            </p>
          </div>
          <div className="md:col-span-5">
            <div ref={imageRef} className="relative w-full overflow-hidden rounded-2xl bg-white p-1.5 md:p-2 ring-1 ring-black/5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-[1px]">
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
