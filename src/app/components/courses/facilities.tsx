"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import FacilityCarousel from './facility-carousel';

// Facility data - would typically come from a CMS
const facilities = [
  {
    id: 'bar-training',
    title: 'Food & Beverage Facility',
    description: 'Professional bar setup with industry-standard equipment for hands-on bartending practice.',
    images: [

      { src: '/images/tables-1.png', alt: 'Restaurant Tables Setup' },
      { src: '/images/tables-2.png', alt: 'Dining Area' },
      { src: '/images/tables-3.png', alt: 'Restaurant Service Area' },
    ],
  },
  {
    id: 'housekeeping',
    title: 'Housekeeping Facility',
    description: 'Hotel, BnB rooms for practicing professional housekeeping and room management skills.',
    images: [

      { src: '/images/beds-1.png', alt: 'Hotel Bed Setup' },
      { src: '/images/beds-2.png', alt: 'Bedroom Arrangement' },
      { src: '/images/bedsroom-1.png', alt: 'Hotel Room' },
      { src: '/images/bedsroom-2.png', alt: 'Bedroom Cleaning' },
    ],
  },
];

export default function Facilities() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from(".facility-item", {
        x: -30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-16">
        <div className="mb-8 sm:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 text-shadow-md"
          >
            Our Training Facilities
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-sm sm:text-base text-gray-600 max-w-3xl"
          >
            Designed to simulate real workplace environments, our facilities provide the ideal setting for practical, hands-on learning.
          </motion.p>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {facilities.map((facility, index) => (
            <div key={facility.id} className={`facility-item flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 md:gap-10 items-center`}>
              <div className="w-full md:w-1/2 relative h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden">
                <FacilityCarousel 
                  images={facility.images} 
                  facilityId={facility.id} 
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 text-shadow-sm">{facility.title}</h3>
                <p className="text-gray-600">{facility.description}</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary flex-shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Industry-standard equipment and tools</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary flex-shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Small class sizes for personalized instruction</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-primary flex-shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Realistic workplace simulation</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
