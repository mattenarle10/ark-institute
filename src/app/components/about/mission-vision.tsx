"use client";

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MissionVision() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const setCardRef = (el: HTMLDivElement | null, idx: number) => {
    if (el) cardRefs.current[idx] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 16, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.55,
            ease: 'power2.out',
            delay: i * 0.04,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-montserrat text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 text-shadow-md">
            Mission & Vision
          </h2>
          <div className="h-px w-20 bg-gradient-to-r from-primary to-primary/60 mt-3 mx-auto"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Mission */}
          <div ref={(el) => setCardRef(el, 0)} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-montserrat text-xl sm:text-2xl font-bold tracking-tight text-gray-900">Our Mission</h3>
            </div>
            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
              Ark Institute aims to equip students with the right values, practical skills, and knowledge through comprehensive
              <span className="font-semibold text-primary"> TESDA‑accredited courses</span>, fostering
              <span className="font-semibold text-gray-900"> career readiness</span> and
              <span className="font-semibold text-gray-900"> professional excellence</span> in order to thrive in a dynamic world.
            </p>
          </div>

          {/* Vision */}
          <div ref={(el) => setCardRef(el, 1)} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-montserrat text-xl sm:text-2xl font-bold tracking-tight text-gray-900">Our Vision</h3>
            </div>
            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
              Ark Institute envisions itself to become a leading institution in
              <span className="font-semibold text-gray-900"> technical‑vocational education</span>, recognized for producing
              <span className="font-semibold text-gray-900"> highly skilled professionals</span> who contribute to the workforce and the community.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
