import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostBySlug } from "@/lib/posts"

interface BlogPostPageProps {
  params: { slug: string }
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
  const { slug } = params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-24 max-w-3xl">
      <Link
        href="/blog"
        className="mb-6 inline-flex text-sm font-medium text-primary hover:underline"
      >
        ← Back to blog
      </Link>

      <p className="text-sm text-gray-500 mb-2">
        {formatDate(post.published_at ?? post.created_at)}
      </p>
      <h1 className="text-5xl font-bold mb-6">{post.title}</h1>

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
  )
}
