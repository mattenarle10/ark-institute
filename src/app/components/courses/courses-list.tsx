"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Course data - featured (more coming soon)
const courses = [
  {
    id: 'food-beverage',
    title: 'Food & Beverage NC II',
    description:
      'Train in restaurant service operations, customer experience, and service standards for hospitality.',
    duration: '3 months',
    image: '/images/bartend-1.png', // provided image
  },
  {
    id: 'housekeeping',
    title: 'Housekeeping NC II',
    description:
      'Develop professional housekeeping skills aligned to industry standards for hotels and resorts.',
    duration: '3 months',
    image: '/images/housekeep-1.png', // provided image
  },
];

export default function CoursesList() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from(".course-card", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-16">
        <div className="mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary"
          >
            <span>Programs</span>
            <span className="opacity-60">•</span>
            <span>TESDA Accredited</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900"
          >
            Featured Courses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-sm sm:text-base text-gray-600 max-w-3xl"
          >
            Select TESDA-accredited programs to get you job-ready. More courses coming soon.
          </motion.p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {courses.map((course, idx) => (
            <div
              key={course.id}
              className="course-card group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:shadow-md"
            >
              <div className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch`}>
                {/* Image */}
                <div className="relative w-full md:w-1/2 h-56 sm:h-64 md:h-auto">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    priority={idx === 0}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-2 py-0.5 ring-1 ring-primary/10">TESDA</span>
                    <span className="opacity-40">•</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-2 py-0.5 ring-1 ring-primary/10">{course.duration}</span>
                  </div>
                  <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-gray-900">{course.title}</h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">{course.description}</p>

                  <div className="mt-5 flex items-center gap-4">
                    <Link
                      href={`/courses/${course.id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm ring-1 ring-primary/20 hover:ring-primary/30 hover:shadow-md hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition"
                    >
                      View details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <span className="text-xs sm:text-sm text-gray-500">More courses coming soon</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 flex justify-start">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition"
          >
            Inquire about enrollment
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
