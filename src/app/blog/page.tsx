import Link from "next/link"
import { getAllPublishedPosts } from "@/lib/posts"

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

export default async function BlogPage() {
  const posts = await getAllPublishedPosts()

  if (!posts.length) {
    return (
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-6">Latest Updates</h1>
        <p className="text-gray-500">No posts published yet.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-12">Latest Updates</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group border border-gray-200 rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md hover:border-gray-300"
          >
            <p className="text-sm text-gray-500 mb-2">
              {formatDate(post.published_at ?? post.created_at)}
            </p>
            <h2 className="text-xl font-semibold mb-3 group-hover:text-primary">
              {post.title}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-3">
              {getExcerpt(post.content)}
            </p>
            <span className="mt-4 inline-flex text-sm font-medium text-primary group-hover:underline">
              Read more
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
