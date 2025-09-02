"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type RevealOptions = {
  selector?: string; // elements inside container to reveal
  stagger?: number; // seconds between items
  y?: number; // initial translateY
  duration?: number; // seconds
  ease?: string;
  start?: string; // ScrollTrigger start position
  once?: boolean; // whether to animate only once
};

// A simple, uniform fade-up on-scroll reveal for all marked children within a container
export function useScrollReveal<T extends HTMLElement = HTMLElement>(opts: RevealOptions = {}) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const container = containerRef.current as unknown as HTMLElement | null;
    if (!container) return;
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const {
      selector = "[data-reveal]",
      stagger = 0.08,
      y = 10,
      duration = 0.5,
      ease = "power2.out",
      start = "top 85%",
      once = true,
    } = opts;

    const items = Array.from(container.querySelectorAll<HTMLElement>(selector));

    // Initial state
    gsap.set(items, { opacity: 0, y });

    // Single trigger per section, staggers children in DOM order
    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration,
      ease,
      stagger,
      paused: true,
    });

    const st = ScrollTrigger.create({
      trigger: container,
      start,
      onEnter: () => tween.play(),
      onLeaveBack: () => {
        if (once) return;
        tween.pause(0);
        gsap.set(items, { opacity: 0, y });
      },
    });

    return () => {
      st.kill();
      tween.kill();
    };
    // We intentionally don't include objects/arrays directly to avoid effect re-runs on same values
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.selector, opts.stagger, opts.y, opts.duration, opts.ease, opts.start, opts.once]);

  return containerRef;
}
