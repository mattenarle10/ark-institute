import type { Metadata } from "next";
import Navbar from "@/app/components/layout/navbar";
import NavSpacer from "@/app/components/layout/nav-spacer";
import Footer from "@/app/components/layout/footer";
import CourseIntro from "@/app/components/courses/intro";
import CoursesList from "@/app/components/courses/courses-list";
import Facilities from "@/app/components/courses/facilities";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Explore TESDA-accredited courses at Ark Institute. Hands-on training, expert instructors, and industry-aligned facilities.",
  alternates: { canonical: "https://arkinstitutebc.com/courses" },
  openGraph: {
    title: "Courses | Ark Institute",
    description:
      "Explore TESDA-accredited courses at Ark Institute. Hands-on training, expert instructors, and industry-aligned facilities.",
    url: "https://arkinstitutebc.com/courses",
    type: "website",
  },
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <NavSpacer />
      <CourseIntro />
      <CoursesList />
      <Facilities />
      <Footer />
    </div>
  );
}
