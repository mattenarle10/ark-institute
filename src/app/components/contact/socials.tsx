"use client";

import React, { useCallback, useLayoutEffect, useMemo, useRef, type ReactElement } from "react";
import { gsap } from "gsap";
import type { LucideIcon } from "lucide-react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

// Define socials (replace URLs with your actual profiles)
interface Social {
  icon: LucideIcon;
  color: string;
  name: string;
  url: string;
}

const socials: Social[] = [
  {
    icon: Facebook,
    color: "#1877F2",
    name: "Facebook",
    url: "https://facebook.com/ArkInstitutePH",
  },
  {
    icon: Instagram,
    color: "#E4405F",
    name: "Instagram",
    url: "https://instagram.com/ArkInstitutePH",
  },

  {
    icon: Linkedin,
    color: "#0A66C2",
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/ark-institute",
  },
  {
    icon: Youtube,
    color: "#FF0000",
    name: "YouTube",
    url: "https://www.youtube.com/@ArkInstitute",
  },
];

export default function Socials(): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([]);
  const popupsRef = useRef<(HTMLDivElement | null)[]>([]);
  const popupIdsRef = useRef<string[]>([]);
  const activeTweensCleanupRef = useRef<(() => void) | null>(null);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);

  const ringConfigs = useMemo(
    () => [
      { sizeClass: "w-[26rem] h-[26rem]", borderClass: "border-gray-200/40", duration: 28, direction: 1 },
      { sizeClass: "w-[36rem] h-[36rem]", borderClass: "border-gray-200/30", duration: 36, direction: -1 },
      { sizeClass: "w-[48rem] h-[48rem]", borderClass: "border-gray-200/20", duration: 48, direction: 1 },
    ],
    []
  );

  const socialsByRing = useMemo(() => {
    return ringConfigs.map((_, ringIndex) =>
      socials
        .map((s, i) => ({ s, i }))
        .filter((_, idx) => idx % ringConfigs.length === ringIndex)
    );
  }, [ringConfigs]);

  const initAnimations = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // kill previous tweens if any
    if (activeTweensCleanupRef.current) activeTweensCleanupRef.current();

    const ctx = gsap.context(() => {
      // Initialize popovers hidden
      popupsRef.current.forEach((popup) => {
        if (!popup) return;
        gsap.set(popup, { autoAlpha: 0, y: 0, scale: 0.92 });
      });

      const tweens: gsap.core.Tween[] = [];

      // Position bubbles along their ring circumference
      ringRefs.current.forEach((ring, ringIndex) => {
        if (!ring) return;
        const ringRect = ring.getBoundingClientRect();
        const radius = Math.min(ringRect.width, ringRect.height) / 2 - 28; // subtract half bubble size + margin

        const items = socialsByRing[ringIndex];
        const count = items.length || 1;

        items.forEach((item, idx) => {
          const bubble = bubblesRef.current[item.i];
          if (!bubble) return;
          const angle = (idx / count) * Math.PI * 2; // radians
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          gsap.set(bubble, { x, y, zIndex: 1, rotate: 0 });
        });

        if (!reduceMotion) {
          const cfg = ringConfigs[ringIndex];
          tweens.push(
            gsap.to(ring, {
              rotate: cfg.direction * 360,
              duration: cfg.duration,
              ease: "none",
              repeat: -1,
              transformOrigin: "50% 50%",
            })
          );
        }
      });

      activeTweensCleanupRef.current = () => {
        tweens.forEach((t) => t.kill());
      };
    }, container);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const revert = initAnimations();

    // Resize handler (debounced) to re-layout bubbles on size changes
    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        initAnimations();
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (revert) revert();
      if (activeTweensCleanupRef.current) activeTweensCleanupRef.current();
    };
  }, [initAnimations]);

  const handleEnter = (i: number) => {
    const bubble = bubblesRef.current[i];
    const popup = popupsRef.current[i];
    if (bubble) {
      gsap.to(bubble, { scale: 1.08, duration: 0.22, ease: "power2.out", zIndex: 10 });
    }
    if (popup) {
      gsap.to(popup, {
        autoAlpha: 1,
        y: -10,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const handleLeave = (i: number) => {
    const bubble = bubblesRef.current[i];
    const popup = popupsRef.current[i];
    if (bubble) gsap.to(bubble, { scale: 1, duration: 0.18, ease: "power2.in", zIndex: 1 });
    if (popup) gsap.to(popup, { autoAlpha: 0, y: 0, scale: 0.92, duration: 0.18, ease: "power2.in" });
  };

  // generate stable ids for aria-describedby
  if (popupIdsRef.current.length !== socials.length) {
    popupIdsRef.current = socials.map((s) => `social-popover-${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`);
  }

  return (
    <section className="relative min-h-[460px] sm:min-h-[560px] md:min-h-[680px] overflow-hidden">
      {/* Full-area floating field (no inner card/container) */}
      <div ref={containerRef} className="absolute inset-0">
        {/* Orbits as rotating containers with bubbles */}
        {ringConfigs.map((ring, r) => (
          <div
            key={`ring-${r}`}
            ref={(el) => {
              ringRefs.current[r] = el;
            }}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${ring.borderClass} ${ring.sizeClass}`}
          >
            {socialsByRing[r].map(({ s, i }, idx) => (
              <div key={`${s.name}-${idx}`} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  ref={(el) => {
                    bubblesRef.current[i] = el;
                  }}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                  onFocus={() => handleEnter(i)}
                  onBlur={() => handleLeave(i)}
                  className="relative"
                >
                  <a
                    href={s.url}
                    aria-label={s.name}
                    aria-describedby={popupIdsRef.current[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-white/60 transition-shadow duration-300 hover:shadow-[0_10px_32px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
                    style={{ boxShadow: `0 6px 18px 0 ${s.color}26` }}
                  >
                    <s.icon size={22} color={s.color} />
                  </a>

                  {/* Hover popover */}
                  <div
                    ref={(el) => {
                      popupsRef.current[i] = el;
                    }}
                    id={popupIdsRef.current[i]}
                    role="tooltip"
                    className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 mt-2 px-2.5 py-1.5 rounded-md bg-white shadow-lg ring-1 ring-gray-200 text-xs font-medium text-gray-800 whitespace-nowrap z-20"
                  >
                    {s.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Center nucleus */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center justify-center w-16 h-16 r">
            <Image src="/logo/ark-transpa.png" alt="Ark Institute" width={100} height={100} priority />
          </div>
        </div>

      </div>
    </section>
  );
}