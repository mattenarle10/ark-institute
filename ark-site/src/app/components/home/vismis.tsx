'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VisMis() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const underlineRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      underlineRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
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

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const setUnderlineRef = (el: HTMLDivElement | null, idx: number) => {
    if (el) underlineRefs.current[idx] = el;
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-white">
      <div className="mx-auto px-6 sm:px-8 md:px-16 pt-16 md:pt-24 pb-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start"
        >
          {/* Left: Logo + effects */}
          <motion.div variants={fadeUp} className="md:col-span-3 flex md:flex items-center justify-center h-full">
            <div className="relative flex flex-col items-center justify-center h-full py-4 md:py-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative">
                  <Image
                    src="/logo/ark-transpa.png"
                    alt="Ark Institute"
                    width={120}
                    height={120}
                    priority
                    className="h-28 w-28 md:h-32 md:w-32 object-contain filter drop-shadow-md"
                  />
                </div>
              </motion.div>
              <div className="mt-8 h-32 w-px bg-gradient-to-b from-gray-300 via-gray-200 to-transparent hidden md:block" />
            </div>
          </motion.div>

          {/* Right: Vision then Mission */}
          <div className="md:col-span-9">
            <motion.div variants={fadeUp}>
              <h2
                className="text-xl sm:text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Vision
              </h2>
              <div ref={(el) => setUnderlineRef(el, 0)} className="mt-2 h-px w-16 bg-gray-300 rounded-full" />
              <p className="mt-5 text-gray-700 leading-relaxed">
                Ark Institute envisions itself to become a leading institution in technical-vocational education,
                recognized for producing highly skilled professionals who contribute to the workforce and the community.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10">
              <h2
                className="text-xl sm:text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Mission
              </h2>
              <div ref={(el) => setUnderlineRef(el, 1)} className="mt-2 h-px w-16 bg-gray-300 rounded-full" />
              <p className="mt-5 text-gray-700 leading-relaxed">
                Ark Institute aims to equip students with the right values, practical skills, and knowledge through
                comprehensive TESDA-accredited courses, fostering career readiness and professional excellence in order
                to thrive in a dynamic world.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}