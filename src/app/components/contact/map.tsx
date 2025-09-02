"use client";

import React from "react";
import { useScrollReveal } from "../animations/useScrollReveal";

export default function Map() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 md:px-16">
        <div className="mb-6 sm:mb-8">
          <h2
            data-reveal
            className="font-montserrat text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 text-shadow-md"
          >
            Find us on the map
          </h2>
          <p data-reveal className="mt-2 text-sm sm:text-base text-gray-600">
            We’re located at RGE Building, Victorina Heights.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <iframe
            title="Ark Institute location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.2168728232355!2d122.96566598190529!3d10.640253062427808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aed147c93fcd1f%3A0xcc19e5a8cefa19e!2sRGE%20Building!5e0!3m2!1sen!2sus!4v1756368320207!5m2!1sen!2sus" 
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block"
          />
        </div>
      </div>
    </section>
  );
}