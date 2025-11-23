"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { Post } from "@/lib/posts"

interface BlogListProps {
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

const getExcerpt = (content: string | null, length = 160) => {
  const text = (content ?? "").trim()
  if (text.length <= length) return text
  return `${text.slice(0, length).trimEnd()}…`
}

export default function BlogList({ posts }: BlogListProps) {
  if (!posts.length) return null

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.24, ease: "easeOut", delay: index * 0.03 }}
          className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md md:hover:-translate-y-0.5 transition-shadow transition-transform"
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
              <div className="relative w-full sm:w-44 h-40 sm:h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={post.cover_image_url}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 11rem, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </Link>
        </motion.article>
      ))}
    </div>
  )
}
