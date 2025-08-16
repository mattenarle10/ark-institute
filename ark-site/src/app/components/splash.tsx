"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Splash() {
  const [isVisible, setIsVisible] = useState(true);
  const splashRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scroll while splash is visible
    document.body.style.overflow = "hidden";

    // Skip animation if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(false);
      document.body.style.overflow = "";
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        document.body.style.overflow = "";
      },
    });

    // Initial state
    gsap.set(logoRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });

    // Animation sequence
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    })
      .to(
        lineRef.current,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.1"
      )
      .to(
        splashRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "+=0.5"
      );

    // Cleanup
    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center">
        <div ref={logoRef} className="mb-4">
          <Image
            src="/logo/ark-transpa.png"
            alt="ARK Institute"
            width={120}
            height={120}
            priority
          />
        </div>
        <div
          ref={lineRef}
          className="h-[3px] w-32 rounded-full"
          style={{
            backgroundImage:
              "radial-gradient(circle 6px at center, white 98%, transparent 100%), linear-gradient(to right, var(--accent) 0%, var(--accent) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1) 100%)",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
}
