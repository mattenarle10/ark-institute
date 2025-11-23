import type { Metadata } from "next"
import PostEditor from "@/app/components/admin/post-editor"

export const metadata: Metadata = {
  title: "Admin | Ark Institute",
}

export default function CreatePostPage() {
  return <PostEditor />
}
