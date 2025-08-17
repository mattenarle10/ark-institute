'use client'
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!heroRef.current || !linesRef.current) return;
    
    // GSAP Line Animations
    const lines = linesRef.current.querySelectorAll('.geometric-line');
    
    // Initial setup
    gsap.set(lines, { scaleX: 0, opacity: 0 });
    
    // Animated line reveals
    gsap.to(lines, {
      scaleX: 1,
      opacity: 0.3,
      duration: 1.5,
      stagger: 0.2,
      ease: "power2.inOut",
      delay: 0.5
    });
    
    // Dynamic floating line animations
    gsap.to(".floating-line", {
      x: "+=40",
      y: "+=20",
      rotation: "+=10", 
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3
    });
    
    // Parallax effect on scroll for texture elements
    gsap.to(".texture-element", {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      },
      y: -100,
      ease: "none"
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section ref={heroRef} className="relative h-screen w-full bg-white overflow-hidden flex items-center">
      {/* Sophisticated Geometric Texture Layer */}
      <div ref={linesRef} className="absolute inset-0 z-10">
        {/* Main architectural grid */}
        <div className="geometric-line absolute top-1/5 left-0 w-full h-px bg-gray-100"></div>
        <div className="geometric-line absolute top-2/5 left-0 w-full h-px bg-gray-100"></div>
        <div className="geometric-line absolute top-3/5 left-0 w-full h-px bg-gray-100"></div>
        <div className="geometric-line absolute top-4/5 left-0 w-full h-px bg-gray-100"></div>
        
        <div className="geometric-line absolute top-0 left-1/5 w-px h-full bg-gray-100"></div>
        <div className="geometric-line absolute top-0 left-2/5 w-px h-full bg-gray-100"></div>
        <div className="geometric-line absolute top-0 left-3/5 w-px h-full bg-gray-100"></div>
        <div className="geometric-line absolute top-0 left-4/5 w-px h-full bg-gray-100"></div>
        
        {/* Enhanced dynamic floating lines */}
        <div className="floating-line absolute top-1/6 left-1/6 w-32 h-px bg-primary/20 transform rotate-45"></div>
        <div className="floating-line absolute bottom-1/4 right-1/4 w-24 h-px bg-accent/15 transform -rotate-45"></div>
        <div className="floating-line absolute top-3/4 left-3/4 w-20 h-px bg-gray-200 transform rotate-12"></div>
        <div className="floating-line absolute top-1/2 left-1/3 w-16 h-px bg-primary/10 transform rotate-75"></div>
        <div className="floating-line absolute bottom-1/3 right-1/6 w-28 h-px bg-gray-150 transform -rotate-30"></div>
        
        {/* Sophisticated texture elements with GSAP animation */}
        <div className="texture-element absolute top-16 right-20 w-32 h-32 opacity-4">
          <Image 
            src="/images/housekeep-1.png" 
            alt=""
            fill
            className="object-cover rounded-full grayscale blur-sm"
          />
        </div>
        <div className="texture-element absolute bottom-24 left-16 w-28 h-28 opacity-4">
          <Image 
            src="/images/bartend-1.png" 
            alt=""
            fill
            className="object-cover rounded-full grayscale blur-sm"
          />
        </div>
        <div className="texture-element absolute top-1/3 left-1/5 w-20 h-20 opacity-3">
          <Image 
            src="/images/tables-1.png" 
            alt=""
            fill
            className="object-cover rounded-full grayscale blur-sm"
          />
        </div>
        <div className="texture-element absolute bottom-1/2 right-1/3 w-24 h-24 opacity-2">
          <Image 
            src="/images/brainstorm.png" 
            alt=""
            fill
            className="object-cover rounded-full grayscale blur-md"
          />
        </div>
        
        {/* Additional geometric texture shapes */}
        <div className="floating-line absolute top-10 left-1/2 w-2 h-2 bg-primary/30 rounded-full"></div>
        <div className="floating-line absolute bottom-20 left-2/3 w-1 h-1 bg-accent/40 rounded-full"></div>
        <div className="floating-line absolute top-2/3 right-1/4 w-3 h-3 bg-gray-300/50 rounded-full"></div>
      </div>
      
      {/* Main Split Layout - RESTORED */}
      <div className="relative z-20 w-full h-full grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
        {/* Left Side - Typography Space */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center justify-start px-6 sm:px-8 md:px-16 pt-20 md:pt-0"
        >
          <div className="max-w-lg">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-none tracking-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                  className="block"
                >
                  MASTERING
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                  className="block text-primary"
                >
                  SKILLS
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                  className="block"
                >
                  BUILDING
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
                  className="block text-accent"
                >
                  CAREERS
                </motion.span>
              </div>
            </motion.h1>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 1.2, delay: 1.6, ease: "easeOut" }}
              className="h-0.5 bg-gradient-to-r from-primary to-accent mt-6"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="text-lg sm:text-xl text-gray-600 mt-6 md:mt-8 leading-relaxed"
            >
              Progressive education for tomorrow's workforce. <br />
              <span className="font-semibold text-gray-900">Real skills, real opportunities.</span>
            </motion.p>
          </div>
        </motion.div>
        
        {/* Right Side - Diagonal Image Gallery */}
        <div className="relative h-full w-full flex items-center justify-center transform rotate-6 py-10 md:py-0">
          <div className="grid grid-cols-2 gap-2 md:gap-3 w-64 sm:w-72 md:w-80 lg:w-96 h-64 sm:h-72 md:h-80 lg:h-96 mx-auto md:mx-0">
            {/* Top Row */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[3/4] overflow-hidden rounded-lg"
              style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 15% 100%)' }}
            >
              <Image 
                src="/images/housekeep-1.png"
                alt="Professional housekeeping training"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative aspect-[3/4] overflow-hidden rounded-lg"
              style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}
            >
              <Image 
                src="/images/bartend-1.png"
                alt="Food and beverage service training"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/30"></div>
            </motion.div>
            
            {/* Bottom Row */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative aspect-[3/4] overflow-hidden rounded-lg"
              style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)' }}
            >
              <Image 
                src="/images/tables-1.png"
                alt="Professional table service training"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-black/30"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative aspect-[3/4] overflow-hidden rounded-lg"
              style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)' }}
            >
              <Image 
                src="/images/brainstorm.png"
                alt="Modern learning environment"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-black/30"></div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>
    </section>
  );
}