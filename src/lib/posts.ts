export type Post = {
  id: string
  title: string
  slug: string
  content: string | null
  published_at: string | null
  created_at: string
  cover_image_url: string | null
  attachments: PostAttachment[] | null
}

export type PostAttachment = {
  name: string
  url: string
  type?: string
  size?: number
  uploadedAt?: string
}

type ApiPost = {
  id: string
  title: string
  slug: string
  content: string | null
  publishedAt: string | null
  createdAt: string
  coverImageUrl: string | null
  attachments: PostAttachment[] | null
}

const API_URL =
  process.env.ARK_API_URL ||
  process.env.NEXT_PUBLIC_ARK_API_URL ||
  "https://api.arkinstitutebc.com"

function toPost(post: ApiPost): Post {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    published_at: post.publishedAt,
    created_at: post.createdAt,
    cover_image_url: post.coverImageUrl,
    attachments: post.attachments ?? null,
  }
}

async function fetchApi<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch (err) {
    console.error("Error fetching Ark API posts", err)
    return null
  }
}

export async function getAllPublishedPosts(): Promise<Post[]> {
  const apiPosts = await fetchApi<ApiPost[]>("/api/content/posts")
  return apiPosts?.map(toPost) ?? []
}

export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const apiPosts = await fetchApi<ApiPost[]>("/api/content/posts")
  return apiPosts?.slice(0, limit).map(toPost) ?? []
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const apiPost = await fetchApi<ApiPost>(`/api/content/posts/${slug}`)
  return apiPost ? toPost(apiPost) : null
}
