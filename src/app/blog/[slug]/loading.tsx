import Footer from "@/app/components/layout/footer"
import NavSpacer from "@/app/components/layout/nav-spacer"
import Navbar from "@/app/components/layout/navbar"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <NavSpacer />
      <main className="container mx-auto px-4 py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl mx-auto animate-pulse space-y-6">
          <div className="h-6 w-32 rounded-full bg-gray-200" />
          <div className="h-60 sm:h-72 md:h-80 w-full rounded-xl bg-gray-200" />
          <div className="h-3 w-24 rounded-md bg-gray-200" />
          <div className="h-7 w-3/4 rounded-md bg-gray-200" />
          <div className="space-y-3 mt-2">
            <div className="h-3 w-full rounded-md bg-gray-200" />
            <div className="h-3 w-11/12 rounded-md bg-gray-200" />
            <div className="h-3 w-10/12 rounded-md bg-gray-200" />
            <div className="h-3 w-9/12 rounded-md bg-gray-200" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
