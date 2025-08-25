import  Navbar  from "@/app/components/layout/navbar";
import Footer from "@/app/components/layout/footer";

import Splash from "@/app/components/splash";
import Hero from "@/app/components/home/hero";
import VisMis from "@/app/components/home/vismis";
import CTA from "@/app/components/home/cta";
import Divider from "@/app/components/layout/divider";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Splash />
      <Navbar />
      <Hero />
      <VisMis />
      <CTA />
      <Divider height="lg" />
      <Footer />
    </div>
  );
}
