import Navbar, { NavbarClassic } from "@/app/components/layout/navbar";
import Footer from "@/app/components/layout/footer";
import SectionDivider from "@/app/components/layout/section-divider";
import Splash from "@/app/components/splash";
import Hero from "@/app/components/home/hero";
import VisMis from "@/app/components/home/vismis";
import CTA from "@/app/components/home/cta";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Splash />
      <NavbarClassic />
      <Hero />
      <VisMis />
      <CTA />
      <SectionDivider />
      <Footer />
    </div>
  );
}
