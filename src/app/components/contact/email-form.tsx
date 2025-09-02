"use client";

import React, { useState } from "react";
import { useScrollReveal } from "../animations/useScrollReveal";

export default function EmailForm() {
  const ref = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: Hook up to an API route or service (e.g. email, Airtable, etc.)
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 800);
  }

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 md:px-16">
        <div className="mb-8 sm:mb-10">
          <h2
            data-reveal
            className="font-montserrat text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 text-shadow-md"
          >
            Send us a message
          </h2>
          <p
            data-reveal
            className="mt-2 text-sm sm:text-base text-gray-600"
          >
            Fill out the form and our team will get back to you shortly.
          </p>
        </div>

        <div data-reveal className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <form onSubmit={onSubmit} className="p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-800 mb-1.5">
                  Full name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full rounded-lg border border-gray-200 bg-white pl-10 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Juan Dela Cruz"
                    aria-label="Full name"
                  />
                  <span className="pointer-events-none absolute left-3 top-2.5 text-primary/70" aria-hidden>
                    {/* User icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" className="mr-1">
                      <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5m0 2c-4.42 0-8 2.239-8 5v1h16v-1c0-2.761-3.58-5-8-5" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-800 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-gray-200 bg-white pl-10 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="you@example.com"
                    aria-label="Email"
                  />
                  <span className="pointer-events-none absolute left-3 top-2.5 text-primary/70" aria-hidden>
                    {/* Mail icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="currentColor" d="m12 13l-8-5V6l8 5l8-5v2zM4 18q-.825 0-1.412-.587T2 16V8l10 6l10-6v8q0 .825-.587 1.413T20 18z" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-800 mb-1.5">
                  Phone (optional)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    className="w-full rounded-lg border border-gray-200 bg-white pl-10 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="+63 9XX XXX XXXX"
                    aria-label="Phone"
                  />
                  <span className="pointer-events-none absolute left-3 top-2.5 text-primary/70" aria-hidden>
                    {/* Phone icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.4 22 2 13.6 2 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01z" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-800 mb-1.5">
                  Subject
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    required
                    className="w-full rounded-lg border border-gray-200 bg-white pl-10 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Inquiry about Courses"
                    aria-label="Subject"
                  />
                  <span className="pointer-events-none absolute left-3 top-2.5 text-primary/70" aria-hidden>
                    {/* Tag icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="currentColor" d="m10.59 13.41l-7-7A2 2 0 0 1 4 2h6.59a2 2 0 0 1 1.41.59l7 7a2 2 0 0 1 0 2.82l-4.59 4.59a2 2 0 0 1-2.82 0zM7.5 6A1.5 1.5 0 1 0 9 7.5A1.5 1.5 0 0 0 7.5 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-5">
              <label className="text-sm font-semibold text-gray-800 mb-1.5 block">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Tell us how we can help you..."
                aria-label="Message"
              />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {/* Send icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90" aria-hidden>
                  <path fill="currentColor" d="m3.4 20.4l18.3-7.8a1 1 0 0 0 0-1.8L3.4 3A1 1 0 0 0 2 4v5a1 1 0 0 0 1 1h9l-8 4v.01L3 14.5v5.5a1 1 0 0 0 1.4.9" />
                </svg>
                {loading ? "Sending..." : "Send message"}
              </button>

              {submitted && (
                <span className="text-sm font-medium text-green-700">
                  Thank you! We’ll get back to you soon.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}