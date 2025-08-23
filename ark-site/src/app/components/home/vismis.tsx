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
  const logoRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

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

  // Subtle GSAP effects: logo parallax on scroll, divider grow-in
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current && logoRef.current) {
        gsap.to(logoRef.current, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      if (dividerRef.current) {
        gsap.set(dividerRef.current, { scaleY: 0, transformOrigin: 'top' });
        gsap.to(dividerRef.current, {
          scaleY: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Geometric background line reveals (aligned with hero.tsx vibe)
      if (linesRef.current) {
        const lines = linesRef.current.querySelectorAll('.geometric-line');
        gsap.set(lines, { scaleX: 0, opacity: 0 });
        gsap.to(lines, {
          scaleX: 1,
          opacity: 0.35,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power2.inOut',
          delay: 0.2,
        });
      }
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
    <section ref={sectionRef} className="relative w-full bg-white overflow-hidden">
      {/* Grainy texture overlay */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px'
          }}
        />
      </div>
      
      {/* Subtle geometric background lines */}
      <div ref={linesRef} className="pointer-events-none absolute inset-0 z-10">
        <div className="geometric-line absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-l from-gray-200 via-gray-100/60 to-transparent" />
        <div className="geometric-line absolute top-2/4 left-0 w-full h-[1px] bg-gradient-to-l from-gray-200 via-gray-100/60 to-transparent" />
        <div className="geometric-line absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-l from-gray-200 via-gray-100/60 to-transparent" />
        <div className="geometric-line absolute top-0 left-2/5 w-[1px] h-full bg-gradient-to-t from-gray-200 via-gray-100/60 to-transparent" />
        <div className="geometric-line absolute top-0 left-3/5 w-[1px] h-full bg-gradient-to-t from-gray-200 via-gray-100/60 to-transparent" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6 sm:px-8 md:px-16 py-20 md:py-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
        >
          {/* Left: Logo + effects */}
          <motion.div variants={fadeUp} className="md:col-span-6 lg:col-span-5 flex items-center justify-center h-full relative">
            <div className="relative flex flex-col items-center justify-center h-full py-4 md:py-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative group"
                ref={logoRef}
              >
                {/* Radial logo effect with red grainy texture */}
                <div 
                  className="absolute -inset-16 opacity-30 transition duration-700"
                  style={{
                    background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.06) 40%, rgba(255,255,255,0) 85%)',
                    filter: 'blur(8px)'
                  }}
                ></div>
                <div 
                  className="absolute -inset-20 opacity-20 mix-blend-overlay overflow-hidden"
                  style={{
                    maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 85%)',
                    WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 85%)'
                  }}
                >
                  <div 
                    className="absolute inset-0" 
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23ef4444' opacity='0.35'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'repeat',
                      backgroundSize: '150px 150px'
                    }}
                  />
                </div>
                <div className="relative">
                  <Image
                    src="/logo/ark-transpa.png"
                    alt="Ark Institute"
                    width={260}
                    height={260}
                    priority
                    className="h-40 w-40 sm:h-44 sm:w-44 md:h-56 md:w-56 lg:h-64 lg:w-64 object-contain drop-shadow-xl"
                  />
                </div>
              </motion.div>
              {/* No vertical divider - cleaner design */}
            </div>
          </motion.div>

          {/* Right: Vision then Mission */}
          <div className="md:col-span-6 lg:col-span-7 mt-12 md:mt-0">
            <motion.div variants={fadeUp} className="max-w-2xl">
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 text-shadow-md"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Vision
              </h2>
              <div className="h-px w-16 bg-gradient-to-r from-primary to-primary/60 mt-3"></div>
              <p className="mt-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                Ark Institute envisions itself to become a leading institution in technical-vocational education,
                recognized for producing highly skilled professionals who contribute to the workforce and the community.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 max-w-2xl">
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 text-shadow-md"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Mission
              </h2>
              <div className="h-px w-16 bg-gradient-to-r from-accent to-accent/60 mt-3"></div>
              <p className="mt-4 text-gray-700 text-base sm:text-lg leading-relaxed">
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