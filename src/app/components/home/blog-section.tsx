"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { Post } from "@/lib/posts"

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

const getExcerpt = (content: string | null, length = 140) => {
  if (!content) return ""
  const withoutHtml = content.replace(/<[^>]+>/g, " ")
  const text = withoutHtml.replace(/\s+/g, " ").trim()
  if (text.length <= length) return text
  return `${text.slice(0, length).trimEnd()}…`
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({})

  const handleImageLoad = (postId: string) => {
    setImagesLoaded((prev) => ({ ...prev, [postId]: true }))
  }

  if (!posts.length) return null

  // Limit to max 3 posts
  const displayPosts = posts.slice(0, 3)
  const postCount = displayPosts.length

  return (
    <section className="relative w-full bg-white overflow-hidden py-12 sm:py-14 md:py-20">
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 md:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Latest Updates
          </h2>
        </motion.div>

        {/* Blog List - Reusing blog-list card style */}
        <div
          className={`flex flex-col gap-4 sm:gap-5 ${
            postCount === 1
              ? "max-w-2xl mx-auto"
              : postCount === 2
                ? "max-w-4xl mx-auto"
                : ""
          }`}
        >
          {displayPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.24, ease: "easeOut", delay: index * 0.03 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md md:hover:-translate-y-0.5 transition-all"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-6"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1.5">
                    {formatDate(post.published_at ?? post.created_at)}
                  </p>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-primary line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {getExcerpt(post.content)}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                    Read article
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>

                {post.cover_image_url && (
                  <div className="relative w-full sm:w-44 h-32 sm:h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    {!imagesLoaded[post.id] && (
                      <div className="absolute inset-0 animate-pulse bg-gray-200" />
                    )}
                    <Image
                      key={post.cover_image_url}
                      src={post.cover_image_url}
                      alt={post.title}
                      fill
                      sizes="(min-width: 768px) 11rem, 100vw"
                      className="object-contain p-2"
                      onLoad={() => handleImageLoad(post.id)}
                    />
                  </div>
                )}
              </Link>
            </motion.article>
          ))}
        </div>

        {/* See More Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-sm sm:text-base font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <span>See more posts</span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
