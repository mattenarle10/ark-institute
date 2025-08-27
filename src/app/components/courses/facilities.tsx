"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Facility data - would typically come from a CMS
const facilities = [
  {
    id: 'bar-training',
    title: 'Bar Training Facility',
    description: 'Professional bar setup with industry-standard equipment for hands-on bartending practice.',
    image: '/images/bartend-1.png',
  },
  {
    id: 'kitchen',
    title: 'Culinary Kitchen',
    description: 'Modern kitchen equipped with commercial-grade appliances for baking and food preparation training.',
    image: '/images/bread-1.png',
  },
  {
    id: 'housekeeping',
    title: 'Housekeeping Laboratory',
    description: 'Simulated hotel rooms for practicing professional housekeeping and room management skills.',
    image: '/images/beds-2.png',
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
            className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900"
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
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">{facility.title}</h3>
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
