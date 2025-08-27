"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Course data - featured (more coming soon)
const courses = [
  {
    id: 'food-beverage',
    title: 'Food & Beverage NC II',
    description:
      'Train in restaurant service operations, customer experience, and service standards for hospitality.',
    image: '/images/bartend-1.png', // provided image
  },
  {
    id: 'housekeeping',
    title: 'Housekeeping NC II',
    description:
      'Develop professional housekeeping skills aligned to industry standards for hotels and resorts.',
    image: '/images/housekeep-1.png', // provided image
  },
];

export default function CoursesList() {
  const containerRef = useRef(null);

  // No GSAP animations for now to avoid opacity issues

  return (
    <section ref={containerRef} className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-16">
        <div className="mb-8 sm:mb-12">
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
            Select TESDA-accredited programs to get you job-ready.
          </motion.p>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {courses.map((course, idx) => (
            <div
              key={course.id}
              className="course-card group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:shadow-md"
              style={{ opacity: 1, transform: 'none' }}
            >
              <div className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch`} style={{ opacity: 1 }}>
                {/* Image */}
                <div className="relative w-full md:w-1/2 h-56 sm:h-64 md:h-[320px]">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    quality={100}
                    className="object-cover object-center"
                    style={{ opacity: 1, filter: 'none' }}
                    priority
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs text-primary font-semibold">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-2 py-0.5 ring-1 ring-primary/10">TESDA Accredited</span>
                  </div>
                  <h3 className="mt-3 text-2xl sm:text-[28px] md:text-[30px] font-semibold tracking-tight text-gray-900">{course.title}</h3>
                  <p className="mt-3 text-[13.5px] sm:text-base leading-relaxed text-gray-600">{course.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
