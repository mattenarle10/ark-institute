import React from 'react'

export default function MissionVision() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-montserrat text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
            Our Mission and Vision
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Mission */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-montserrat text-xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-base leading-relaxed text-gray-700">
              Ark Institute aims to equip students with the right values, practical skills, and knowledge through comprehensive 
              TESDA-accredited courses, fostering career readiness and professional excellence in order to thrive in a dynamic world.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-montserrat text-xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-base leading-relaxed text-gray-700">
              Ark Institute envisions itself to become a leading institution in technical-vocational education, recognized for 
              producing highly skilled professionals who contribute to the workforce and the community.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
