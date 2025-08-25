import React from 'react'
import Image from 'next/image'

export default function Intro() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* background accent */}
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-[-10%] h-[360px] w-[360px] rounded-full bg-accent/5 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <h1 className="font-montserrat text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">About Ark Institute</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-700">
              We are a progressive educational institution committed to fostering a learning environment that inspires
              students to realize their full potential. By embracing a holistic approach to education, we are devoted to
              shaping the next generation of leaders, innovators, and responsible global citizens.
            </p>
            <p className="mt-6 text-lg font-semibold text-gray-900">
              Welcome to Ark Institute, where your future begins.
              <span className="ml-2 text-accent">— Mastering Skills, Building Careers</span>
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="relative mx-auto max-w-sm overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14">
                  <Image src="/logo/ark-transpa.png" alt="Ark Institute logo" fill sizes="56px" className="object-contain" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-gray-500">TESDA-accredited</p>
                  <p className="font-semibold text-gray-900">Hands-on training for real careers</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm">
                <div className="rounded-lg bg-primary/5 px-3 py-2 text-primary">
                  <span className="block font-semibold">Holistic</span>
                  <span className="text-[12px] text-primary/80">Approach</span>
                </div>
                <div className="rounded-lg bg-accent/5 px-3 py-2 text-accent">
                  <span className="block font-semibold">Career</span>
                  <span className="text-[12px] text-accent/80">Readiness</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
