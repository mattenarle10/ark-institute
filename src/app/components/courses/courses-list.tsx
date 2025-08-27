"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Course data - this would typically come from a CMS or API
const courses = [
  {
    id: 'bartending',
    title: 'Bartending NC II',
    description: 'Master mixology, cocktail preparation, and bar service with our comprehensive training program.',
    duration: '3 months',
    image: '/images/bartend-1.png',
  },
  {
    id: 'bread-pastry',
    title: 'Bread & Pastry NC II',
    description: 'Learn to create professional quality breads, pastries, and desserts with our hands-on program.',
    duration: '3 months',
    image: '/images/bread-1.png',
  },
  {
    id: 'housekeeping',
    title: 'Housekeeping NC II',
    description: 'Develop professional housekeeping skills for the hospitality industry to international standards.',
    duration: '3 months',
    image: '/images/beds-1.png',
  },
  {
    id: 'food-beverage',
    title: 'Food & Beverage NC II',
    description: 'Train in restaurant service operations and customer service for the hospitality sector.',
    duration: '3 months',
    image: '/images/food-1.png',
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
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900"
          >
            TESDA-Accredited Courses
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-sm sm:text-base text-gray-600 max-w-3xl"
          >
            Our courses are designed with industry input to ensure you develop practical skills that employers value. Each program includes hands-on training and industry exposure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {courses.map((course) => (
            <div key={course.id} className="course-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
              <div className="aspect-w-16 aspect-h-9 w-full relative h-52">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                  <span className="px-2.5 py-0.5 bg-primary/5 text-primary text-xs font-medium rounded-full">
                    {course.duration}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-5">{course.description}</p>
                <Link 
                  href={`/courses/${course.id}`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark"
                >
                  View details
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-primary/20 hover:ring-primary/30 hover:shadow-md hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition"
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
