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
            className="mb-6 inline-flex text-sm font-medium text-primary hover:underline"
          >
            ← Back to blog
          </Link>

          <p className="text-sm text-gray-500 mb-2">
            {formatDate(post.published_at ?? post.created_at)}
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-gray-900"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {post.title}
          </h1>

          {post.cover_image_url && (
            <div className="relative mt-2 mb-10 h-64 w-full overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-wrap">
            {post.content}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
