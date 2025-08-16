"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="bg-primary text-white rounded-b-2xl border border-primary/10 shadow-xl shadow-primary/30"
    >
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        {/* Left: Logo + Wordmark */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/ark-transpa.png"
              alt="Ark Institute"
              width={36}
              height={36}
              priority
            />
            <span 
              className="font-bold tracking-wide leading-snug" 
              style={{ 
                fontFamily: "'Times New Roman', serif",
                textShadow: "0px 0px 1px rgba(255,255,255,0.2)"
              }}
            >
              <span className="uppercase">ARK</span>
              <span className="font-normal normal-case"> Institute</span>
            </span>
          </Link>
        </motion.div>

        {/* Right: Links */}
        <nav className="flex items-center gap-2" style={{ fontFamily: "'Times New Roman', serif" }}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="#"
              data-active
              className="group relative text-base font-light px-3 py-2 rounded-md"
            >
              <span className="group-data-[active=true]:font-bold">Home</span>
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-[2px] w-10 rounded-full opacity-0 transition-all duration-300 ease-out origin-center group-hover:opacity-100 group-data-[active=true]:opacity-100 group-hover:scale-x-110"
                style={{
                  backgroundImage:
                    "radial-gradient(circle 6px at center, var(--background) 98%, transparent 100%), linear-gradient(to right, var(--accent) 0%, var(--accent) 50%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.95) 100%)",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="#about"
              className="group relative text-base font-light px-3 py-2 rounded-md"
            >
              <span className="group-data-[active=true]:font-bold">About</span>
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-[2px] w-10 rounded-full opacity-0 transition-all duration-300 ease-out origin-center group-hover:opacity-100 group-hover:scale-x-110"
                style={{
                  backgroundImage:
                    "radial-gradient(circle 6px at center, var(--background) 98%, transparent 100%), linear-gradient(to right, var(--accent) 0%, var(--accent) 50%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.95) 100%)",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="#courses"
              className="group relative text-base font-light px-3 py-2 rounded-md"
            >
              <span className="group-data-[active=true]:font-bold">Courses</span>
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-[2px] w-10 rounded-full opacity-0 transition-all duration-300 ease-out origin-center group-hover:opacity-100 group-hover:scale-x-110"
                style={{
                  backgroundImage:
                    "radial-gradient(circle 6px at center, var(--background) 98%, transparent 100%), linear-gradient(to right, var(--accent) 0%, var(--accent) 50%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.95) 100%)",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="#contact"
              className="group relative text-base font-light px-3 py-2 rounded-md"
            >
              <span className="group-data-[active=true]:font-bold">Contact</span>
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-[2px] w-10 rounded-full opacity-0 transition-all duration-300 ease-out origin-center group-hover:opacity-100 group-hover:scale-x-110"
                style={{
                  backgroundImage:
                    "radial-gradient(circle 6px at center, var(--background) 98%, transparent 100%), linear-gradient(to right, var(--accent) 0%, var(--accent) 50%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.95) 100%)",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </Link>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}
