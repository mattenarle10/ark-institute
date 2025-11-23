"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Post } from "@/lib/posts"

interface BlogPostProps {
  post: Post
}

const formatDate = (iso: string | null) => {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function BlogPost({ post }: BlogPostProps) {
  const [isImageOpen, setIsImageOpen] = useState(false)

  const openImage = () => {
    if (!post.cover_image_url) return
    setIsImageOpen(true)
  }

  const closeImage = () => {
    setIsImageOpen(false)
  }

  return (
    <>
      {isImageOpen && post.cover_image_url && (
        <button
          type="button"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
          aria-label="Close image viewer"
          onClick={closeImage}
        >
          <div
            className="relative w-full max-w-4xl h-[70vh] max-h-[640px]"
            role="dialog"
            aria-modal="true"
            aria-label={`${post.title} image viewer`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
            <button
              type="button"
              onClick={closeImage}
              className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white hover:bg-black/80"
            >
              Close
            </button>
          </div>
        </button>
      )}

      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span>Back to blog</span>
        </Link>

        {post.cover_image_url && (
          <div className="relative mt-2 mb-10 h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-contain p-4"
              priority
            />
            <button
              type="button"
              onClick={openImage}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-medium text-gray-800 shadow-sm ring-1 ring-black/5 hover:bg-white"
            >
              <span>View full image</span>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
          </div>
        )}

        <p className="text-xs sm:text-sm text-gray-500 mb-3">
          {formatDate(post.published_at ?? post.created_at)}
        </p>
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 tracking-tight text-gray-900 leading-tight"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {post.title}
        </h1>

        <div
          className="prose prose-base sm:prose-lg max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />
      </article>
    </>
  )
}
