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
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Left: Logo + Wordmark */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/ark-transpa.png"
              alt="Ark Institute"
              width={32}
              height={32}
              priority
            />
            <span 
              className="font-bold uppercase tracking-wide" 
              style={{ 
                fontFamily: "'Times New Roman', serif",
                textShadow: "0px 0px 1px rgba(255,255,255,0.2)"
              }}
            >
              ARK INSTITUTE
            </span>
          </Link>
        </motion.div>

        {/* Right: Links */}
        <nav className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="#"
              data-active
              className="text-sm font-light px-3 py-1 rounded-md transition-colors hover:bg-white/10 data-[active=true]:bg-white/25 block"
            >
              Home
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="#about"
              className="text-sm font-light px-3 py-1 rounded-md transition-colors hover:bg-white/10 block"
            >
              About
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="#courses"
              className="text-sm font-light px-3 py-1 rounded-md transition-colors hover:bg-white/10 block"
            >
              Courses
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="#contact"
              className="text-sm font-light px-3 py-1 rounded-md transition-colors hover:bg-white/10 block"
            >
              Contact
            </Link>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}
