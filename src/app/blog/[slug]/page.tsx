import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { getPostBySlug, getAllPublishedPosts } from "@/lib/posts"
import Footer from "@/app/components/layout/footer"
import NavSpacer from "@/app/components/layout/nav-spacer"
import Navbar from "@/app/components/layout/navbar"
import BlogPost from "@/app/components/blog/blog-post"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const posts = await getAllPublishedPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arkinstitutebc.com"
  const postUrl = `${siteUrl}/blog/${post.slug}`
  const publishedDate = post.published_at || post.created_at
  const descriptionText = post.content ? stripHtml(post.content).slice(0, 160) : ""

  // Article structured data for SEO
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: descriptionText,
    image: post.cover_image_url || `${siteUrl}/logo/ark-transpa.png`,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      "@type": "Organization",
      name: "Ark Institute",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Ark Institute",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo/ark-transpa.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  }

  return (
    <>
      <Script
        id="article-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(articleJsonLd)}
      </Script>
      <div className="min-h-screen bg-white overflow-x-hidden">
        <Navbar />
        <NavSpacer />
        <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <BlogPost post={post} />
        </main>
        <Footer />
      </div>
    </>
  )
}
