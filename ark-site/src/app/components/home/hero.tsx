'use client'
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { gsap } from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const controls = useAnimation();
  
  // GSAP animation for image columns
  useEffect(() => {
    if (!containerRef.current) return;
    
    const images = containerRef.current.querySelectorAll('.image-column img');
    
    gsap.fromTo(images, 
      { 
        y: 100, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out"
      }
    );
    
    // Subtle floating animation
    images.forEach((img, i) => {
      gsap.to(img, {
        y: i % 2 === 0 ? 15 : -15,
        duration: 2.5 + i * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2
      });
    });
    
  }, []);
  
  // Framer Motion animation for text content
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <section className="relative bg-white py-16 sm:py-24 overflow-hidden">
      <div ref={containerRef} className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left column - Text content */}
          <div className="z-10 order-2 md:order-1">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
            >
              <motion.span 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
                className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4"
              >
                TESDA-Accredited Training Center
              </motion.span>
              
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
                }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                <span className="text-primary">Mastering</span> Skills,<br />
                <span className="text-accent">Building</span> Careers
              </motion.h1>
              
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
                }}
                className="mt-6 text-lg text-gray-600 max-w-lg"
              >
                Professional training designed for real-world readiness. Develop industry-relevant skills with our TESDA-accredited courses.
              </motion.p>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
                }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link 
                  href="#courses" 
                  className="px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  Explore Courses
                </Link>
                <Link 
                  href="#contact" 
                  className="px-6 py-3 bg-white text-primary border border-primary/20 font-medium rounded-lg hover:bg-primary/5 transition-all"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right column - Image columns */}
          <div className="relative h-[500px] order-1 md:order-2">
            <div className="absolute inset-0 grid grid-cols-3 gap-3">
              {/* Column 1 */}
              <div className="flex flex-col gap-3 pt-16">
                <div className="image-column relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="/images/housekeep-1.png" 
                    alt="Housekeeping training" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="image-column relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="/images/beds-1.png" 
                    alt="Bed making training" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Column 2 */}
              <div className="flex flex-col gap-3">
                <div className="image-column relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="/images/bartend-1.png" 
                    alt="Bartending training" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="image-column relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="/images/tables-1.png" 
                    alt="Table setting training" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Column 3 */}
              <div className="flex flex-col gap-3 pt-8">
                <div className="image-column relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="/images/bedsroom-1.png" 
                    alt="Bedroom setup training" 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="image-column relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="/images/brainstorm.png" 
                    alt="Classroom training" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}