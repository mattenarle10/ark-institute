import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/layout/navbar";
import Footer from "@/app/components/layout/footer";
import Splash from "@/app/components/splash";
import Hero from "@/app/components/home/hero";
import VisionMission from "@/app/components/home/vismis";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Splash />
      <Navbar />
      <Hero />
      <VisionMission />
      <Footer />
    </div>
  );
}
