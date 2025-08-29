"use client";

import React, { type ReactElement } from "react";
import type { LucideIcon } from "lucide-react";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

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
    icon: Phone,
    color: "#10B981",
    name: "Call us",
    url: "tel:+639000000000",
  },
  {
    icon: Mail,
    color: "#0EA5E9",
    name: "Email",
    url: "mailto:info@arkinstitutebc.com",
  },
];
export default function Socials(): ReactElement {
  return (
    <section className="py-12 sm:py-16 md:py-20 relative">
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(closest-side,rgba(16,119,255,0.08),transparent_70%)]" />
      <div className="mx-auto max-w-5xl px-6 sm:px-8 md:px-16">
        <div className="mb-8 sm:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="font-montserrat text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 text-shadow-md"
          >
            Connect with us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-2 text-sm sm:text-base text-gray-600"
          >
            Follow us for updates, events, and student work.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              aria-label={s.name}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl border border-gray-100 bg-white p-4 sm:p-5 md:p-6 shadow-sm transition duration-200 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className="flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/90 ring-1 ring-white/60"
                  style={{ boxShadow: `0 6px 18px 0 ${s.color}26` }}
                >
                  <s.icon size={22} color={s.color} />
                </div>
                <span className="text-sm sm:text-base font-semibold text-gray-800">{s.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}