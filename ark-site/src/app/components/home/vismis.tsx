'use client'
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VisionMission() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const controls = useAnimation();
  
  // GSAP animations for the section
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Animate the logo
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, 
        { 
          scale: 0.8,
          opacity: 0,
          rotation: -5
        },
        { 
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top bottom-=100px",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    // Animate the content blocks
    const contentBlocks = containerRef.current.querySelectorAll('.content-block');
    gsap.fromTo(contentBlocks, 
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=150px",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Create a subtle parallax effect for the background
    gsap.to(".bg-gradient", {
      backgroundPosition: "0% 50%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
    
  }, []);
  
  // Framer Motion animations
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <section 
      ref={containerRef} 
      className="relative py-20 overflow-hidden bg-white"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient bg-gradient-to-br from-primary/5 to-white bg-[length:200%_200%] bg-[position:0%_0%] -z-10"></div>
      
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - Logo */}
          <div ref={logoRef} className="flex justify-center items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 drop-shadow-xl">
              <Image
                src="/logo/ark-transpa.png"
                alt="ARK Institute Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Right column - Vision & Mission */}
          <div>
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
            >
              <motion.h2 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className="text-3xl md:text-4xl font-bold mb-8 text-primary relative inline-block"
              >
                Our Mission & Vision
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accent"></span>
              </motion.h2>
              
              <div className="space-y-8">
                {/* Mission */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="content-block bg-white p-6 rounded-2xl shadow-md border-l-4 border-primary"
                >
                  <h3 className="text-xl font-bold text-primary mb-3">Our Mission</h3>
                  <p className="text-gray-700">
                    Ark Institute aims to equip students with the right values, practical skills, and knowledge through comprehensive TESDA-accredited courses, fostering career readiness and professional excellence in order to thrive in a dynamic world.
                  </p>
                </motion.div>
                
                {/* Vision */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
                  }}
                  className="content-block bg-white p-6 rounded-2xl shadow-md border-l-4 border-accent"
                >
                  <h3 className="text-xl font-bold text-accent mb-3">Our Vision</h3>
                  <p className="text-gray-700">
                    Ark Institute envisions itself to become a leading institution in technical-vocational education, recognized for producing highly skilled professionals who contribute to the workforce and the community.
                  </p>
                </motion.div>
                
                {/* Core Values Teaser */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                  }}
                  className="mt-6"
                >
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">Resilience</span>
                    <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">Innovation</span>
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">Stewardship</span>
                    <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">Excellence</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}