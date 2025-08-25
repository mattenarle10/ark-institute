import type { Metadata } from 'next'
import Intro from "@/app/components/about/intro";
import  Navbar  from "@/app/components/layout/navbar";
import Footer from "@/app/components/layout/footer";


export const metadata: Metadata = {
  title: 'About Ark Institute',
  description:
    'TESDA-accredited institution focused on practical, hands-on training. Learn about our mission, vision, and core values.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Intro />
      {/* Upcoming sections (to be added, one per commit):
        - WhoWeAre
        - MissionVision
        - CoreValues
        - Accreditation
        - CTA
      */}
    </main>
  )
}
