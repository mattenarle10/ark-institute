import Footer from "@/app/components/layout/footer"
import NavSpacer from "@/app/components/layout/nav-spacer"
import Navbar from "@/app/components/layout/navbar"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <NavSpacer />
      <main className="container mx-auto px-4 py-16 sm:py-20 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-40 sm:w-64 rounded-md bg-gray-200" />
            <div className="h-4 w-64 sm:w-80 rounded-md bg-gray-200" />

            <div className="mt-6 space-y-4">
              {[0, 1, 2].map((key) => (
                <div
                  key={key}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-2xl border border-gray-100 bg-white/80 px-5 py-4 sm:px-6 sm:py-5 shadow-sm"
                >
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-24 rounded-md bg-gray-200" />
                    <div className="h-5 w-3/4 rounded-md bg-gray-200" />
                    <div className="h-3 w-full rounded-md bg-gray-200" />
                    <div className="h-3 w-5/6 rounded-md bg-gray-200" />
                  </div>
                  <div className="w-full sm:w-40 h-24 sm:h-20 rounded-xl bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
