import type { Metadata } from "next";
import Navbar from "@/app/components/layout/navbar";
import NavSpacer from "@/app/components/layout/nav-spacer";
import Footer from "@/app/components/layout/footer";
import Intro from "@/app/components/about/intro";
import WhoWeAre from "@/app/components/about/who-we-are";
import CoreValues from "@/app/components/about/core-values";
import AccreditationCTA from "@/app/components/about/accreditation-cta";

export const metadata: Metadata = {
  title: "About Ark Institute",
  description:
    "TESDA-accredited institution focused on practical, hands-on training. Learn who we are and our core values.",
};

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
