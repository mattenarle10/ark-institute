import Navbar, { NavbarClassic } from "@/app/components/layout/navbar";
import Footer from "@/app/components/layout/footer";
import Splash from "@/app/components/splash";
import Hero from "@/app/components/home/hero";
import VisMis from "@/app/components/home/vismis";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Splash />
      <NavbarClassic />
      <Hero />
      <VisMis />
      <Footer />
    </div>
  );
}
