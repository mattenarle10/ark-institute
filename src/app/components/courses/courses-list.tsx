"use client";

import React from 'react';
import { useScrollReveal } from '../animations/useScrollReveal';
import Image from 'next/image';

// Course data
const registeredCourses = [
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

const comingSoonCourses = [
  { id: 'events-management', title: 'Events Management Services NC II' },
  { id: 'tourism-promotion', title: 'Tourism Promotion Services NC II' },
  { id: 'customer-services', title: 'Customer Services NC II' },
  { id: 'barista', title: 'Barista NC II' },
  { id: 'bread-pastry', title: 'Bread and Pastry Production NC II' },
];

export default function CoursesList() {
  const headerRef = useScrollReveal<HTMLDivElement>({ delay: 0 });
  const regHeaderRef = useScrollReveal<HTMLDivElement>({ delay: 0.05 });
  const regListRef = useScrollReveal<HTMLDivElement>({ delay: 0.1 });
  const csHeaderRef = useScrollReveal<HTMLDivElement>({ delay: 0.15 });
  const csGridRef = useScrollReveal<HTMLDivElement>({ delay: 0.2 });

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-16">
        <div ref={headerRef} className="mb-8 sm:mb-12">
          <h2
            data-reveal
            className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900"
          >
            Courses
          </h2>
          <p
            data-reveal
            className="mt-2 text-sm sm:text-base text-gray-600 max-w-3xl"
          >
            Select TESDA-accredited programs to get you job-ready.
          </p>
        </div>

        {/* Registered */}
        <div ref={regHeaderRef} className="mb-6 sm:mb-8">
          <h3 data-reveal className="text-base sm:text-lg font-semibold text-gray-900">Registered</h3>
          <p data-reveal className="mt-1 text-sm text-gray-600">These programs are accredited by TESDA.</p>

        </div>
        <div ref={regListRef} className="space-y-8 sm:space-y-10">
          {registeredCourses.map((course, idx) => (
            <div
              key={course.id}
              data-reveal
              className="course-card group relative overflow-hidden rounded-2xl border border-gray-100 bg-white/95 shadow-sm transition duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20 ring-1 ring-transparent hover:ring-primary/10"
              style={{ opacity: 1, transform: 'none' }}
            >
              {/* Subtle bottom accent */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
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
                  {/* Very light theme overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-semibold">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-2 py-0.5 ring-1 ring-primary/10 text-primary">TESDA Accredited</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 ring-1 ring-emerald-200 text-emerald-700">Registered</span>
                  </div>
                  <h3 className="mt-3 text-2xl sm:text-[28px] md:text-[30px] font-semibold tracking-tight text-gray-900">{course.title}</h3>
                  <p className="mt-3 text-[13.5px] sm:text-base leading-relaxed text-gray-600">{course.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-10 sm:my-12 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* Coming Soon / On process */}
        <div className="mt-12 sm:mt-14">
          <div ref={csHeaderRef}>
            <h3 data-reveal className="text-base sm:text-lg font-semibold text-gray-900">Coming Soon</h3>

            <p data-reveal className="mt-1 text-sm text-gray-600">These programs are currently on process.</p>
          </div>
          <div ref={csGridRef} className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {comingSoonCourses.map((course) => (
              <div
                key={course.id}
                data-reveal
                className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white/95 p-5 sm:p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/20 ring-1 ring-transparent hover:ring-primary/10"
              >
                {/* Subtle bottom accent */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-accent/20 via-transparent to-primary/20" />
                <div className="relative flex items-start justify-between gap-3">
                  <h4 className="text-[15px] sm:text-base md:text-lg font-semibold text-gray-900">{course.title}</h4>
                  <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-accent/5 px-2 py-0.5 text-[11px] sm:text-xs font-semibold ring-1 ring-accent/20 text-accent">On process</span>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
