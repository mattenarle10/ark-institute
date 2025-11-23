import { supabase } from "@/lib/supabase"

export type Post = {
  id: string
  title: string
  slug: string
  content: string | null
  published_at: string | null
  created_at: string
  cover_image_url: string | null
}

const baseSelect =
  "id, title, slug, content, published_at, created_at, cover_image_url"

export async function getAllPublishedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(baseSelect)
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts", error.message)
    return []
  }

  return (data as Post[]) ?? []
}

export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(baseSelect)
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching featured posts", error.message)
    return []
  }

  return (data as Post[]) ?? []
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select(baseSelect)
    .eq("slug", slug)
    .not("published_at", "is", null)
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      // No rows returned
      return null
    }

    console.error("Error fetching post by slug", error.message)
    return null
  }

  return data as Post
}
