"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import PostEditor from "@/app/components/admin/post-editor"

type Post = {
  id: string
  title: string
  slug: string
  content: string
  published: boolean
  coverImageUrl?: string
}

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params?.id
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "Admin | Ark Institute"
  }, [])

  useEffect(() => {
    if (!id) return

    async function fetchPost() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single()

      if (error || !data) {
        alert("Post not found")
        router.push("/admin")
        return
      }

      setPost({
        id: data.id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        published: !!data.published_at,
        coverImageUrl: data.cover_image_url || undefined,
      })
      setLoading(false)
    }

    fetchPost()
  }, [id, router])

  if (loading || !post) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <PostEditor initialPost={post} />
}
