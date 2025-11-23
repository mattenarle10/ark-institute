import { getAllPublishedPosts } from "@/lib/posts"
import BlogList from "@/app/components/blog/blog-list"
import Footer from "@/app/components/layout/footer"
import NavSpacer from "@/app/components/layout/nav-spacer"
import Navbar from "@/app/components/layout/navbar"

export default async function BlogPage() {
  const posts = await getAllPublishedPosts()

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <NavSpacer />
      <main className="container mx-auto px-4 py-16 sm:py-20 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Latest Updates
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-8 md:mb-10 max-w-2xl">
            Stories, announcements, and insights from ARK Institute.
          </p>

          {posts.length === 0 ? (
            <p className="text-gray-500">No posts published yet.</p>
          ) : (
            <BlogList posts={posts} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
