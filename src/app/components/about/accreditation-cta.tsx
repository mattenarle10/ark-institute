import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AccreditationCTA() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Accreditation */}
        <div className="mb-16 rounded-2xl bg-white p-8 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-montserrat text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                TESDA Accreditation
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-700">
                Ark Institute is proud to be accredited by the Technical Education and Skills Development Authority (TESDA), 
                the Philippine government agency tasked with managing and supervising technical education and skills development.
              </p>
              <p className="mt-3 text-base leading-relaxed text-gray-700">
                This accreditation ensures that our programs meet the highest standards of quality and relevance to industry needs,
                providing our students with nationally recognized qualifications that enhance their employability.
              </p>
              <div className="mt-6">
                <Link 
                  href="/courses" 
                  className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                  View our accredited courses
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/tesda.svg"
                alt="TESDA logo"
                width={392}
                height={490}
                className="h-48 w-auto sm:h-32 md:h-42 lg:h-62 xl:h-72 object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-primary p-8 text-white shadow-lg">
          <div className="text-center">
            <h2 className="font-montserrat text-2xl font-bold sm:text-3xl">Ready to start your journey?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/90">
              Join Ark Institute today and take the first step toward a successful career with our TESDA-accredited programs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link 
                href="/courses" 
                className="inline-flex items-center rounded-md bg-white px-5 py-3 text-sm font-medium text-primary hover:bg-gray-100"
              >
                Explore Courses
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center rounded-md border border-white/30 bg-transparent px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
