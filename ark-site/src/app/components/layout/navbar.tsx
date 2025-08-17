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
        <nav className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="#"
              data-active
              className="group relative text-base font-light px-3 py-2 rounded-md"
            >
              <span className="group-data-[active=true]:font-bold relative inline-block">Home
                <span aria-hidden className="absolute -bottom-1 left-0 w-[calc(50%-2px)] h-[2px] bg-blue-500 rounded-l-full transform scale-x-0 transition-transform duration-300 ease-out origin-left group-hover:scale-x-100"></span>
                <span aria-hidden className="absolute -bottom-1 right-0 w-[calc(50%-2px)] h-[2px] bg-red-500 rounded-r-full transform scale-x-0 transition-transform duration-300 ease-out origin-right group-hover:scale-x-100"></span>
              </span>
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
              <span className="group-data-[active=true]:font-bold relative inline-block">About
                <span aria-hidden className="absolute -bottom-1 left-0 w-[calc(50%-2px)] h-[2px] bg-blue-500 rounded-l-full transform scale-x-0 transition-transform duration-300 ease-out origin-left group-hover:scale-x-100"></span>
                <span aria-hidden className="absolute -bottom-1 right-0 w-[calc(50%-2px)] h-[2px] bg-red-500 rounded-r-full transform scale-x-0 transition-transform duration-300 ease-out origin-right group-hover:scale-x-100"></span>
              </span>
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
              <span className="group-data-[active=true]:font-bold relative inline-block">Courses
                <span aria-hidden className="absolute -bottom-1 left-0 w-[calc(50%-2px)] h-[2px] bg-blue-500 rounded-l-full transform scale-x-0 transition-transform duration-300 ease-out origin-left group-hover:scale-x-100"></span>
                <span aria-hidden className="absolute -bottom-1 right-0 w-[calc(50%-2px)] h-[2px] bg-red-500 rounded-r-full transform scale-x-0 transition-transform duration-300 ease-out origin-right group-hover:scale-x-100"></span>
              </span>
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
              <span className="group-data-[active=true]:font-bold relative inline-block">Contact
                <span aria-hidden className="absolute -bottom-1 left-0 w-[calc(50%-2px)] h-[2px] bg-blue-500 rounded-l-full transform scale-x-0 transition-transform duration-300 ease-out origin-left group-hover:scale-x-100"></span>
                <span aria-hidden className="absolute -bottom-1 right-0 w-[calc(50%-2px)] h-[2px] bg-red-500 rounded-r-full transform scale-x-0 transition-transform duration-300 ease-out origin-right group-hover:scale-x-100"></span>
              </span>
            </Link>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}
