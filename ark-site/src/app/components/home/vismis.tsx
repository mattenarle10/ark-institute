'use client'
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VisionMission() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Main animation setup
    const setupAnimations = () => {
      if (!sectionRef.current) return;
      
      // Create a timeline for the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Subtle reveal for the section background
      tl.fromTo(".section-bg", 
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" },
        0
      );
      
      // Logo animation - subtle and professional
      if (logoRef.current) {
        tl.fromTo(logoRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          0.2
        );
      }
      
      // Heading animation
      tl.fromTo(".section-heading",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0.3
      );
      
      // Line animation
      tl.fromTo(".heading-line",
        { width: 0 },
        { width: "100%", duration: 1, ease: "power2.inOut" },
        0.5
      );
      
      // Mission content animation
      if (missionRef.current) {
        tl.fromTo(missionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          0.7
        );
      }
      
      // Vision content animation
      if (visionRef.current) {
        tl.fromTo(visionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          0.9
        );
      }
      
      // Values animation
      if (valuesRef.current) {
        tl.fromTo(valuesRef.current.querySelectorAll('.value-pill'),
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" },
          1.1
        );
      }
      
      // Parallax effect for the background
      gsap.to(".parallax-bg", {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5
        }
      });
      
      // Subtle parallax for the logo
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          y: "-10%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        });
      }
    };
    
    // Initialize animations with a slight delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setupAnimations();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50/30 to-white"
    >
      {/* Sophisticated background layers */}
      <div className="parallax-bg absolute inset-0 -z-10">
        <div className="absolute top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-primary/3 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/2 blur-3xl"></div>
      </div>
      
      {/* Floating geometric elements */}
      <div className="absolute top-20 right-10 w-4 h-4 bg-primary/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 left-10 w-3 h-3 bg-accent/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse delay-500"></div>
      
      <div className="container mx-auto max-w-7xl px-4">
        {/* Minimal section heading */}
        <div className="text-center mb-20">
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-gray-900 inline-block relative">
            Our Foundation
            <span className="heading-line absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary"></span>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Logo column - sophisticated presentation */}
          <div ref={logoRef} className="relative flex justify-center lg:justify-end">
            {/* Floating logo with subtle animations */}
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-60"></div>
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                <Image
                  src="/logo/ark-transpa.png"
                  alt="ARK Institute Logo"
                  fill
                  className="object-contain filter drop-shadow-2xl"
                  priority
                />
              </div>
              {/* Subtle rotating accent */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/10 rounded-full animate-spin" style={{animationDuration: '8s'}}></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/10 rounded-full animate-spin" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
            </div>
          </div>
          
          {/* Content column - clean and spacious */}
          <div className="space-y-12">
            {/* Mission - elevated design */}
            <div ref={missionRef} className="group">
              <div className="relative bg-white rounded-3xl p-10 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary to-primary/50 rounded-l-3xl"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  Mission
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Ark Institute aims to equip students with the right values, practical skills, and knowledge through comprehensive TESDA-accredited courses, fostering career readiness and professional excellence in order to thrive in a dynamic world.
                </p>
              </div>
            </div>
            
            {/* Vision - complementary design */}
            <div ref={visionRef} className="group">
              <div className="relative bg-white rounded-3xl p-10 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-accent to-accent/50 rounded-l-3xl"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  Vision
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Ark Institute envisions itself to become a leading institution in technical-vocational education, recognized for producing highly skilled professionals who contribute to the workforce and the community.
                </p>
              </div>
            </div>
            
            {/* Core Values - sophisticated grid */}
            <div ref={valuesRef} className="pt-8">
              <h4 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                Core Values
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="value-pill group cursor-pointer">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <div className="w-4 h-4 bg-primary rounded-full"></div>
                    </div>
                    <h5 className="font-bold text-gray-900 mb-2">Resilience</h5>
                    <p className="text-sm text-gray-600">Adapting and thriving through challenges</p>
                  </div>
                </div>
                <div className="value-pill group cursor-pointer">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-accent/20 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <div className="w-4 h-4 bg-accent rounded-full"></div>
                    </div>
                    <h5 className="font-bold text-gray-900 mb-2">Innovation</h5>
                    <p className="text-sm text-gray-600">Embracing creative solutions</p>
                  </div>
                </div>
                <div className="value-pill group cursor-pointer">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <div className="w-4 h-4 bg-primary rounded-full"></div>
                    </div>
                    <h5 className="font-bold text-gray-900 mb-2">Stewardship</h5>
                    <p className="text-sm text-gray-600">Responsible resource management</p>
                  </div>
                </div>
                <div className="value-pill group cursor-pointer">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-accent/20 hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <div className="w-4 h-4 bg-accent rounded-full"></div>
                    </div>
                    <h5 className="font-bold text-gray-900 mb-2">Excellence</h5>
                    <p className="text-sm text-gray-600">Striving for highest standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}