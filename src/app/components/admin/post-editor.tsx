"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import BlogRichEditor from "./blog-rich-editor"
import { Loader2, ArrowLeft, Image as ImageIcon } from "lucide-react"

type Post = {
  id?: string
  title: string
  slug: string
  content: string
  published: boolean
  coverImageUrl?: string
}

export default function PostEditor({ initialPost }: { initialPost?: Post }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState<Post>(
    initialPost || {
      title: "",
      slug: "",
      content: "",
      published: false,
    }
  )

  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Auto-generate slug from title if not manually edited
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    if (!initialPost) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
      setPost((prev) => ({ ...prev, title, slug }))
    } else {
      setPost((prev) => ({ ...prev, title }))
    }
  }

  const handleCoverButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!post.slug) {
      alert("Please add a title first so we can generate a link.")
      return
    }

    setUploadingImage(true)
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${post.slug}-${Date.now()}.${fileExt}`
      const filePath = `covers/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from("post-attachment")
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from("post-attachment").getPublicUrl(filePath)

      setPost((prev) => ({ ...prev, coverImageUrl: publicUrl }))
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred"
      alert(`Error uploading image: ${message}`)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSave = async (publishStatus: boolean) => {
    setLoading(true)
    try {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) throw new Error("Not authenticated")

      const postData = {
        title: post.title,
        slug: post.slug,
        content: post.content,
        published_at: publishStatus ? new Date().toISOString() : null,
        cover_image_url: post.coverImageUrl || null,
      }

      let error: unknown
      if (initialPost?.id) {
        // Update
        const { error: updateError } = await supabase
          .from("posts")
          .update(postData)
          .eq("id", initialPost.id)
        error = updateError
      } else {
        // Create
        const { error: insertError } = await supabase
          .from("posts")
          .insert([postData])
        error = insertError
      }

      if (error) throw error

      router.push("/admin")
      router.refresh()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred"
      alert(`Error saving post: ${message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 px-4 sm:px-0 pb-24 sm:pb-0">
      {/* Header - Back button only */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        {/* Desktop action buttons */}
        <div className="hidden sm:flex gap-3">
          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={loading}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {initialPost ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      {/* Mobile sticky action bar at bottom */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={loading}
            className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={loading}
            className="flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {initialPost ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Post Title"
            value={post.title}
            onChange={handleTitleChange}
            className="w-full text-2xl sm:text-3xl font-bold placeholder-gray-300 border-none focus:ring-0 p-0"
          />
          <div className="text-sm text-gray-500">
            {post.slug ? (
              <span>
                Link:{" "}
                <span className="font-mono text-xs text-gray-600">
                  /blog/{post.slug}
                </span>
              </span>
            ) : (
              <span className="italic text-gray-400">
                Link will be generated from the title
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="cover-image-input"
              className="block text-sm font-medium text-gray-700"
            >
              Cover image (optional)
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleCoverButtonClick}
                disabled={uploadingImage}
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                {uploadingImage ? (
                  <>
                    <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-3 h-3 mr-2" />
                    Upload image
                  </>
                )}
              </button>
              <input
                id="cover-image-input"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="hidden"
              />
            </div>
            {post.coverImageUrl && (
              <div className="mt-2">
                <img
                  src={post.coverImageUrl}
                  alt="Cover preview"
                  className="h-24 w-40 object-cover rounded border border-gray-200"
                />
              </div>
            )}
          </div>
        </div>
        <div className="h-[400px] sm:h-[500px] w-full overflow-hidden">
          <BlogRichEditor
            value={post.content}
            onChange={(html) => setPost((prev) => ({ ...prev, content: html }))}
          />
        </div>
      </div>
    </div>
  )
}
