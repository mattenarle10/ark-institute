import Footer from "@/app/components/layout/footer"
import NavSpacer from "@/app/components/layout/nav-spacer"
import Navbar from "@/app/components/layout/navbar"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <NavSpacer />
      <main className="container mx-auto px-4 py-16 sm:py-20 md:py-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-b-transparent animate-spin" />
          <p className="text-sm">Loading blog posts…</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
