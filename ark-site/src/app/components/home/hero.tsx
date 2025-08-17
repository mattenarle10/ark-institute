'use client'
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const controls = useAnimation();
  
  // Parallax scroll effects
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], [0, -200]);
  const imageY = useTransform(scrollY, [0, 800], [0, -100]);
  
  // Advanced GSAP animations
  useEffect(() => {
    if (!containerRef.current || !imageContainerRef.current) return;
    
    const container = containerRef.current;
    const imageContainer = imageContainerRef.current;
    const images = imageContainer.querySelectorAll('.hero-image');
    
    // Create master timeline
    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
    
    // 3D parallax layers for images
    images.forEach((img, i) => {
      const depth = (i % 3) + 1; // Different depths: 1, 2, 3
      const direction = i % 2 === 0 ? 1 : -1;
      
      // Initial reveal animation
      gsap.fromTo(img, 
        { 
          y: 120,
          opacity: 0,
          scale: 0.8,
          rotationX: 15
        },
        { 
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.4,
          delay: i * 0.1,
          ease: "power3.out"
        }
      );
      
      // Continuous parallax during scroll
      masterTL.to(img, {
        y: `${depth * direction * 20}%`,
        rotationY: direction * 5,
        ease: "none"
      }, 0);
      
      // Magnetic hover effect
      img.addEventListener('mouseenter', () => {
        gsap.to(img, {
          scale: 1.05,
          rotationY: direction * 8,
          z: 50,
          duration: 0.4,
          ease: "power2.out"
        });
      });
      
      img.addEventListener('mouseleave', () => {
        gsap.to(img, {
          scale: 1,
          rotationY: direction * 5,
          z: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });
    
    // Sophisticated background parallax
    const bgElements = container.querySelectorAll('.bg-layer');
    bgElements.forEach((bg, i) => {
      masterTL.to(bg, {
        y: `${(i + 1) * 15}%`,
        ease: "none"
      }, 0);
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Framer Motion text animations
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white to-gray-50/30 overflow-hidden pt-40">
      {/* Subtle geometric background layers */}
      <div className="bg-layer absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
      </div>
      <div className="bg-layer absolute inset-0 opacity-3">
        <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-accent blur-3xl"></div>
      </div>
      
      <motion.div 
        ref={containerRef} 
        className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-16"
        style={{ y: backgroundY }}
      >
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Text content - Clean and sophisticated */}
          <div className="lg:col-span-6 z-20 order-2 lg:order-1">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
              }}
            >
              {/* Minimal accent badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full mb-8 shadow-sm"
              >
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">TESDA-Accredited Excellence</span>
              </motion.div>
              
              {/* Hero headline - Typography as hero */}
              <motion.h1 
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.8 } }
                }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9] mb-6"
              >
                <motion.span 
                  className="block text-gray-900"
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.1 } }
                  }}
                >
                  Mastering
                </motion.span>
                <motion.span 
                  className="block text-gray-600"
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } }
                  }}
                >
                  Skills
                </motion.span>
                <motion.span 
                  className="block"
                  variants={{
                    hidden: { y: 40, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.3 } }
                  }}
                >
                  <span className="text-gray-900">Building</span>{' '}
                  <span className="relative">
                    <span className="text-gray-900">Careers</span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary"></div>
                  </span>
                </motion.span>
              </motion.h1>
              
              {/* Subtle description */}
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
                }}
                className="text-xl text-gray-600 max-w-lg leading-relaxed mb-10"
              >
                Progressive education for tomorrow's workforce. 
                <span className="text-gray-900 font-medium"> Real skills, real opportunities.</span>
              </motion.p>
              
              {/* Minimal CTA buttons */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5 } }
                }}
                className="flex flex-wrap gap-4"
              >
                <Link 
                  href="#courses" 
                  className="group px-8 py-4 bg-primary text-white font-medium rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="relative z-10">View Programs</span>
                </Link>
                <Link 
                  href="#contact" 
                  className="px-8 py-4 bg-white text-gray-900 border border-gray-200 font-medium rounded-xl hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Sophisticated image composition */}
          <motion.div 
            ref={imageContainerRef}
            className="lg:col-span-6 relative h-[600px] order-1 lg:order-2"
            style={{ y: imageY }}
          >
            {/* Main featured image - larger, central */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-96 z-30">
              <div className="hero-image relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image 
                  src="/images/brainstorm.png" 
                  alt="Students in modern learning environment" 
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
            
            {/* Supporting images - smaller, layered */}
            <div className="hero-image absolute top-20 left-0 w-60 h-80 z-20">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border-2 border-white/50">
                <Image 
                  src="/images/housekeep-1.png" 
                  alt="Professional housekeeping training" 
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            
            <div className="hero-image absolute top-32 right-0 w-56 h-72 z-20">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border-2 border-white/50">
                <Image 
                  src="/images/bartend-1.png" 
                  alt="Food and beverage service training" 
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            
            <div className="hero-image absolute bottom-0 left-16 w-52 h-64 z-10">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg border border-white/30">
                <Image 
                  src="/images/tables-1.png" 
                  alt="Professional table service training" 
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            
            <div className="hero-image absolute bottom-8 right-12 w-48 h-60 z-10">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg border border-white/30">
                <Image 
                  src="/images/beds-1.png" 
                  alt="Hospitality skills training" 
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            
            {/* Floating accents - minimal color usage */}
            <div className="absolute top-10 right-20 w-8 h-8 bg-primary rounded-full animate-pulse opacity-60"></div>
            <div className="absolute bottom-20 left-8 w-6 h-6 bg-accent rounded-full animate-pulse opacity-40 delay-1000"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}