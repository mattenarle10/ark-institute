import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPostBySlug } from "@/lib/posts"
import Footer from "@/app/components/layout/footer"
import NavSpacer from "@/app/components/layout/nav-spacer"
import Navbar from "@/app/components/layout/navbar"
import BlogPost from "@/app/components/blog/blog-post"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

const stripHtml = (html: string): string => {
  const withoutTags = html.replace(/<[^>]+>/g, " ")
  return withoutTags.replace(/\s+/g, " ").trim()
}

export async function generateMetadata(
  { params }: BlogPostPageProps,
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Blog | Ark Institute",
    }
  }

  const baseTitle = post.title || "Blog"
  const title = `${baseTitle} | Ark Institute`
  const descriptionSource = post.content ? stripHtml(post.content) : ""
  const description =
    descriptionSource.slice(0, 160) ||
    "Read this article from Ark Institute."

  return {
    title,
    description,
    alternates: {
      canonical: `https://arkinstitutebc.com/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://arkinstitutebc.com/blog/${post.slug}`,
      type: "article",
      images: post.cover_image_url
        ? [{ url: post.cover_image_url, alt: post.title }]
        : undefined,
    },
  }
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
      <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <BlogPost post={post} />
      </main>
      <Footer />
    </div>
  )
}
