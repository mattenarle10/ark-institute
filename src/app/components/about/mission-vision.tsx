"use client"

import { useScrollReveal } from "../animations/useScrollReveal"

export default function MissionVision() {
  const sectionRef = useScrollReveal<HTMLDivElement>({ delay: 0.05 })

  return (
    <section ref={sectionRef} className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-16">
        <div className="mb-12 text-left md:text-center">
          <h2
            data-reveal
            className="font-montserrat text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 text-shadow-md"
          >
            Mission & Vision
          </h2>
          <div
            data-reveal
            className="h-px w-20 bg-gradient-to-r from-primary to-primary/60 mt-3 ml-0 md:mx-auto"
          ></div>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {/* Mission */}
          <div
            data-reveal
            className="rounded-2xl bg-white p-5 md:p-6 shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:shadow-md hover:-translate-y-[1px]"
          >
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-primary/10 ring-1 ring-black/5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-label="Lightning bolt icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-montserrat text-lg sm:text-xl font-bold tracking-tight text-gray-900">
                Our Mission
              </h3>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-gray-700">
              Ark Institute aims to equip students with the right values,
              practical skills, and knowledge through comprehensive
              <span className="font-semibold text-primary">
                {" "}
                TESDA‑accredited courses
              </span>
              , fostering career readiness and professional excellence in order
              to thrive in a dynamic world.
            </p>
          </div>

          {/* Vision */}
          <div
            data-reveal
            className="rounded-2xl bg-white p-5 md:p-6 shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:shadow-md hover:-translate-y-[1px]"
          >
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-accent/10 ring-1 ring-black/5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-label="Eye icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="font-montserrat text-lg sm:text-xl font-bold tracking-tight text-gray-900">
                Our Vision
              </h3>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-gray-700">
              Ark Institute envisions itself to become a leading institution in
              technical‑vocational education, recognized for producing highly
              skilled professionals who contribute to the workforce and the
              community.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
