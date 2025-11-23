"use client"

import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import type { Post } from "@/lib/posts"
import { ArrowUpRight } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface BlogSectionProps {
  posts: Post[]
}

const formatDate = (iso: string | null) => {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const getExcerpt = (content: string | null, length = 120) => {
  if (!content) return ""
  const withoutHtml = content.replace(/<[^>]+>/g, " ")
  const text = withoutHtml.replace(/\s+/g, " ").trim()
  if (text.length <= length) return text
  return `${text.slice(0, length).trimEnd()}…`
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const underlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current || !underlineRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )

      gsap.fromTo(
        underlineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: underlineRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!posts.length) return null

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden py-14 sm:py-16 md:py-24"
    >
      {/* Subtle geometric background lines matching VisMis */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="geometric-line absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-100/60 to-gray-200" />
        <div className="geometric-line absolute top-2/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-100/60 to-gray-200" />
        <div className="geometric-line absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-100/60 to-gray-200" />
        <div className="geometric-line absolute top-0 left-2/5 w-[1px] h-full bg-gradient-to-b from-transparent via-gray-100/60 to-gray-200" />
        <div className="geometric-line absolute top-0 left-3/5 w-[1px] h-full bg-gradient-to-b from-transparent via-gray-100/60 to-gray-200" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 md:px-16">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <div ref={titleRef}>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 text-shadow-md"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Latest Updates
            </h2>
            <div
              ref={underlineRef}
              className="h-px w-20 bg-gradient-to-r from-primary to-primary/60 mt-3"
            />
          </div>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl">
            Stay informed with our latest news, insights, and announcements.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-md ring-1 ring-black/5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {post.cover_image_url && (
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-gray-100">
                    <Image
                      src={post.cover_image_url}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-5 sm:p-6">
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">
                    {formatDate(post.published_at ?? post.created_at)}
                  </p>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-primary line-clamp-2 mb-3 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {getExcerpt(post.content)}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    Read more
                    <ArrowUpRight
                      className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Link */}
        {posts.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 sm:mt-12 text-center"
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 border-b border-gray-300 pb-1 hover:border-primary/70 transition-all duration-300"
            >
              <span className="text-base sm:text-lg font-medium text-gray-700 group-hover:text-primary/90 transition-colors duration-300">
                View all posts
              </span>
              <ArrowUpRight
                className="w-5 h-5 text-gray-500 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ease-out"
                strokeWidth={1.5}
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
