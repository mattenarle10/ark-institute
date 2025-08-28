import type { Metadata } from "next";
import Navbar from "@/app/components/layout/navbar";
import NavSpacer from "@/app/components/layout/nav-spacer";
import Footer from "@/app/components/layout/footer";
import Intro from "@/app/components/contact/intro";
import EmailForm from "@/app/components/contact/email-form";
import Map from "@/app/components/contact/map"
import Socials from "@/app/components/contact/socials";



export const metadata: Metadata = {
  title: "Contact | Ark Institute",
  description:
    "TESDA-accredited courses focused on practical, hands-on training for in-demand skills. Browse our available courses and facilities.",
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
