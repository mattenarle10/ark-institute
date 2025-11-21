"use client"

import { gsap } from "gsap"
import { useRef } from "react"
import { useScrollReveal } from "../animations/useScrollReveal"

export default function CoreValues() {
  const values = [
    {
      title: "Resilience",
      description:
        "We cultivate the ability to adapt and thrive in the face of challenges, ensuring our students are prepared to overcome obstacles and succeed in their careers.",
    },
    {
      title: "Innovation",
      description:
        "We embrace creativity and forward-thinking approaches, continuously enhancing our programs and methods to stay at the forefront of industry advancements.",
    },
    {
      title: "Stewardship",
      description:
        "We are committed to responsible management of resources, promoting a culture of sustainability, accountability, and ethical practices within our institution and beyond.",
    },
    {
      title: "Excellence",
      description:
        "We strive for the highest standards in education and training, ensuring our students achieve outstanding results and are well-prepared for professional success.",
    },
  ]

  const sectionRef = useScrollReveal<HTMLElement>({ delay: 0.05 })
  const letterRefs = useRef<HTMLSpanElement[]>([])
  const setLetterRef = (el: HTMLSpanElement | null, idx: number) => {
    if (el) letterRefs.current[idx] = el
  }

  // Brand colors for interactive highlights
  const PRIMARY = "#193a7a" // tailwind primary
  const ACCENT = "#c80100" // tailwind accent
  const BASE = "#111827" // tailwind text-gray-900

  const highlightLetter = (idx: number) => {
    const el = letterRefs.current[idx]
    if (!el) return
    const color = idx % 2 === 0 ? PRIMARY : ACCENT
    const glow =
      idx % 2 === 0
        ? "0 2px 6px rgba(25, 58, 122, 0.35)"
        : "0 2px 6px rgba(200, 1, 0, 0.35)"
    gsap.to(el, {
      color,
      textShadow: glow,
      scale: 1.06,
      duration: 0.25,
      ease: "power2.out",
    })
  }

  const resetLetter = (idx: number) => {
    const el = letterRefs.current[idx]
    if (!el) return
    gsap.to(el, {
      color: BASE,
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.15)", // matches text-shadow-md
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    })
  }

  return (
    <section ref={sectionRef} className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-16">
        <div className="mb-8 text-left md:text-center">
          <h2
            data-reveal
            className="font-montserrat text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900"
          >
            Our Core Values
          </h2>
        </div>

        {/* RISE hero word */}
        <div className="mb-10 flex items-baseline justify-center gap-2 sm:gap-3 md:gap-4">
          {["R", "I", "S", "E"].map((letter, idx) => (
            <span
              key={letter}
              data-reveal
              ref={(el) => setLetterRef(el, idx)}
              className={
                "select-none font-montserrat font-extrabold tracking-tight text-gray-900 text-shadow-md text-5xl sm:text-6xl md:text-7xl"
              }
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {values.map((value, idx) => (
            <article
              key={value.title}
              data-reveal
              className="group rounded-xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-lg"
              onMouseEnter={() => highlightLetter(idx)}
              onMouseLeave={() => resetLetter(idx)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`${idx % 2 === 0 ? "bg-primary" : "bg-accent"} h-1 w-7 rounded-full`}
                ></div>
                <h3 className="font-montserrat text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                  {value.title}
                </h3>
              </div>
              <p className="mt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
