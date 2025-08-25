"use client";

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CoreValues() {
  const values = [
    {
      title: 'Resilience',
      description: 'We cultivate the ability to adapt and thrive in the face of challenges, ensuring our students are prepared to overcome obstacles and succeed in their careers.',
    },
    {
      title: 'Innovation',
      description: 'We embrace creativity and forward-thinking approaches, continuously enhancing our programs and methods to stay at the forefront of industry advancements.',
    },
    {
      title: 'Stewardship',
      description: 'We are committed to responsible management of resources, promoting a culture of sustainability, accountability, and ethical practices within our institution and beyond.',
    },
    {
      title: 'Excellence',
      description: 'We strive for the highest standards in education and training, ensuring our students achieve outstanding results and are well-prepared for professional success.',
    },
  ]

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const setCardRef = (el: HTMLDivElement | null, idx: number) => {
    if (el) cardRefs.current[idx] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the RISE hero letters (scoped to this section)
      const q = gsap.utils.selector(sectionRef);
      const letters = q('[data-rise-letter]') as HTMLElement[];
      gsap.fromTo(
        letters,
        { opacity: 0, y: 24, filter: 'blur(3px)', scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%'
          }
        }
      );

      // Fade-up cards on scroll
      cardRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-montserrat text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
            Our Core Values
          </h2>
          <div className="h-px w-20 bg-gradient-to-r from-primary to-primary/60 mt-3 mx-auto"></div>
        </div>

        {/* RISE hero word */}
        <div className="mb-12 flex items-baseline justify-center gap-3 sm:gap-4 md:gap-5">
          {['R', 'I', 'S', 'E'].map((letter, idx) => (
            <span
              key={letter}
              data-rise-letter
              className={`${idx % 2 === 0 ? 'text-primary' : 'text-accent'} select-none font-montserrat font-extrabold tracking-tight text-6xl sm:text-7xl md:text-8xl`}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {values.map((value, idx) => (
            <div
              key={value.title}
              ref={(el) => setCardRef(el, idx)}
              className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`${idx % 2 === 0 ? 'bg-primary' : 'bg-accent'} h-2 w-8 rounded-full`}></div>
                <h3 className="font-montserrat text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                  {value.title}
                </h3>
              </div>
              <p className="mt-3 text-base sm:text-lg text-gray-700 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
