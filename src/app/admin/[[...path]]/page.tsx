import type { Metadata } from "next"
import Footer from "@/app/components/layout/footer"
import NavSpacer from "@/app/components/layout/nav-spacer"
import Navbar from "@/app/components/layout/navbar"

const blogManagerUrl = "https://portal.arkinstitutebc.com/admin/posts"

export const metadata: Metadata = {
  title: "Blog Management",
  description: "Ark Institute blog management has moved to the ARK Portal.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminRedirectPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <NavSpacer />
      <main className="mx-auto flex min-h-[calc(100vh-260px)] max-w-4xl items-center px-6 py-16 sm:px-8">
        <section className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Admin moved
              </p>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Blog management now lives in ARK Portal
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                The old public-site editor has been retired. Create, edit, and publish Ark
                Institute posts from the ERP admin workspace.
              </p>
              <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  New path
                </p>
                <p className="mt-1 break-all font-mono text-sm text-gray-900">
                  portal.arkinstitutebc.com/admin/posts
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:min-w-48">
              <a
                href={blogManagerUrl}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Open blog manager
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Back to site
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
