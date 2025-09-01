import type { Metadata } from "next";
import Navbar from "@/app/components/layout/navbar";
import NavSpacer from "@/app/components/layout/nav-spacer";
import Footer from "@/app/components/layout/footer";
import Intro from "@/app/components/contact/intro";
import EmailForm from "@/app/components/contact/email-form";
import Map from "@/app/components/contact/map"
import Socials from "@/app/components/contact/socials";



export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ark Institute — find our location, send us a message, and connect via social channels.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Ark Institute",
    description:
      "Get in touch with Ark Institute — find our location, send us a message, and connect via social channels.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <NavSpacer />
      <Intro/>
      <EmailForm/>
      <Map/>  
      <Socials/>
      <Footer />
    </div>
  );
}
