'use client'
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen bg-white overflow-hidden flex items-center justify-center">
      {/* Clean starting point - we'll build from here */}
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-600">
          Fresh hero section in progress...
        </p>
      </div>
    </section>
  );
}