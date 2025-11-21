import type { Metadata } from "next"
import AccreditationCTA from "@/app/components/about/accreditation-cta"
import CoreValues from "@/app/components/about/core-values"
import Intro from "@/app/components/about/intro"
import WhoWeAre from "@/app/components/about/who-we-are"
import Footer from "@/app/components/layout/footer"
import NavSpacer from "@/app/components/layout/nav-spacer"
import Navbar from "@/app/components/layout/navbar"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Ark Institute — a TESDA-accredited institution focused on practical, hands-on training and strong core values.",
  alternates: { canonical: "https://arkinstitutebc.com/about" },
  openGraph: {
    title: "About Ark Institute",
    description:
      "Learn about Ark Institute — a TESDA-accredited institution focused on practical, hands-on training and strong core values.",
    url: "https://arkinstitutebc.com/about",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <NavSpacer />
      <Intro />
      <WhoWeAre />
      <CoreValues />
      <AccreditationCTA />
      <Footer />
    </div>
  )
}
