import CTA from "@/app/components/home/cta"
import Hero from "@/app/components/home/hero"
import VisMis from "@/app/components/home/vismis"
import BlogSection from "@/app/components/home/blog-section"
import Divider from "@/app/components/layout/divider"
import Footer from "@/app/components/layout/footer"
import Navbar from "@/app/components/layout/navbar"
import { getFeaturedPosts } from "@/lib/posts"

export default async function Home() {
  const featuredPosts = await getFeaturedPosts(3)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <VisMis />
      <BlogSection posts={featuredPosts} />
      <CTA />
      <Divider height="lg" />
      <Footer />
    </div>
  )
}
