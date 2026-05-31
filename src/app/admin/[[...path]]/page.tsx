import { redirect } from "next/navigation"

export default function AdminRedirectPage() {
  redirect("https://portal.arkinstitutebc.com/admin/posts")
}
