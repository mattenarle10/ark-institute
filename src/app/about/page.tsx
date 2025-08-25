import type { Metadata } from "next";
import Navbar from "@/app/components/layout/navbar";
import Footer from "@/app/components/layout/footer";
import Intro from "@/app/components/about/intro";
import WhoWeAre from "@/app/components/about/who-we-are";
import MissionVision from "@/app/components/about/mission-vision";
import CoreValues from "@/app/components/about/core-values";
import AccreditationCTA from "@/app/components/about/accreditation-cta";

export const metadata: Metadata = {
  title: "About Ark Institute",
  description:
    "TESDA-accredited institution focused on practical, hands-on training. Learn about our mission, vision, and core values.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Intro />
      <WhoWeAre />
      <MissionVision />
      <CoreValues />
      <AccreditationCTA />
      <Footer />
    </div>
  )
}
