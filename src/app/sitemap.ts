import type { MetadataRoute } from "next"
import { getAllPublishedPosts } from "@/lib/posts"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://arkinstitutebc.com"
  const now = new Date()

  // Static pages
  const staticPages = [
    {
      url: new URL("/", siteUrl).toString(),
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: new URL("/about", siteUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: new URL("/courses", siteUrl).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: new URL("/contact", siteUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: new URL("/blog", siteUrl).toString(),
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ]

  // Dynamic blog posts
  const posts = await getAllPublishedPosts()
  const blogPosts = posts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
    lastModified: post.published_at
      ? new Date(post.published_at)
      : new Date(post.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPosts]
}
