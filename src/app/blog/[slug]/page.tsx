import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostBySlug } from "@/lib/posts"
import Footer from "@/app/components/layout/footer"
import NavSpacer from "@/app/components/layout/nav-spacer"
import Navbar from "@/app/components/layout/navbar"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

const formatDate = (iso: string | null) => {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <NavSpacer />
      <main className="container mx-auto px-4 py-16 sm:py-20 md:py-24">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
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
            <div className="relative mt-2 mb-8 h-60 sm:h-72 md:h-80 w-full overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
                priority
              />
              <a
                href={post.cover_image_url}
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
            </div>
          )}

          <p className="text-xs sm:text-sm text-gray-500 mb-1.5">
            {formatDate(post.published_at ?? post.created_at)}
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-900"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {post.title}
          </h1>

          <div className="mt-4 rounded-2xl border border-gray-100 bg-white/80 px-5 py-4 sm:px-6 sm:py-5 shadow-sm">
            <div
              className="prose prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
