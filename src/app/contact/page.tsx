import type { Metadata } from "next"
import EmailForm from "@/app/components/contact/email-form"
import Intro from "@/app/components/contact/intro"
import ContactMap from "@/app/components/contact/map"
import Socials from "@/app/components/contact/socials"
import Footer from "@/app/components/layout/footer"
import NavSpacer from "@/app/components/layout/nav-spacer"
import Navbar from "@/app/components/layout/navbar"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ark Institute — find our location, send us a message, and connect via social channels.",
  alternates: { canonical: "https://arkinstitutebc.com/contact" },
  openGraph: {
    title: "Contact | Ark Institute",
    description:
      "Get in touch with Ark Institute — find our location, send us a message, and connect via social channels.",
    url: "https://arkinstitutebc.com/contact",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <NavSpacer />
      <Intro />
      <EmailForm />
      <ContactMap />
      <Socials />
      <Footer />
    </div>
  )
}
