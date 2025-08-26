"use client";

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AccreditationCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const accreditationRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the accreditation card
      gsap.fromTo(
        accreditationRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: accreditationRef.current,
            start: 'top 85%'
          }
        }
      );
      
      // Animate content and logo separately with slight delay
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: accreditationRef.current,
            start: 'top 80%'
          }
        }
      );
      
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.9, x: 20 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: accreditationRef.current,
            start: 'top 80%'
          }
        }
      );
      
      // Animate the CTA section
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%'
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-16">
        {/* Accreditation */}
        <div ref={accreditationRef} className="mb-16 rounded-2xl bg-white p-6 md:p-8 shadow-sm md:shadow-md ring-1 ring-gray-100">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 md:items-center">
            <div ref={contentRef}>
              <h2 className="font-montserrat text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 text-shadow-md">
                TESDA Accreditation
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-700">
                Ark Institute is proud to be accredited by the Technical Education and Skills Development Authority (TESDA), 
                the Philippine government agency tasked with managing and supervising technical education and skills development.
              </p>
              <p className="mt-3 text-base leading-relaxed text-gray-700">
                This accreditation ensures that our programs meet the highest standards of quality and relevance to industry needs,
                providing our students with nationally recognized qualifications that enhance their employability.
              </p>
              <div className="mt-6 flex justify-center md:justify-start">
                <Link 
                  href="/courses" 
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-primary/20 hover:ring-primary/30 hover:shadow-md hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition"
                >
                  View our accredited courses
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div ref={logoRef} className="flex items-center justify-center">
              <Image
                src="/images/tesda.svg"
                alt="TESDA logo"
                width={392}
                height={490}
                className="h-28 w-auto sm:h-36 md:h-48 lg:h-56 xl:h-64 object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/90 p-6 md:p-8 text-white shadow-lg ring-1 ring-white/10">
          <div className="text-left md:text-center">
            <h2 className="font-montserrat text-2xl font-bold sm:text-3xl">Ready to start your journey?</h2>
            <p className="mt-4 max-w-2xl text-base text-white/90 md:mx-auto">
              Join Ark Institute today and take the first step toward a successful career with our TESDA-accredited programs.
            </p>
            <div className="mt-8 flex flex-wrap justify-start md:justify-center gap-4">
              <Link 
                href="/courses" 
                className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/10 hover:ring-primary/20 hover:shadow-md hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
              >
                Explore Courses
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm shadow-sm ring-1 ring-white/10 hover:ring-white/20 hover:bg-white/20 hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
