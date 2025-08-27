import type { Metadata } from "next";
import Navbar from "@/app/components/layout/navbar";
import NavSpacer from "@/app/components/layout/nav-spacer";
import Footer from "@/app/components/layout/footer";
import CourseIntro from "@/app/components/courses/intro";
import CoursesList from "@/app/components/courses/courses-list";
import Facilities from "@/app/components/courses/facilities";

export const metadata: Metadata = {
  title: "Courses | Ark Institute",
  description:
    "TESDA-accredited courses focused on practical, hands-on training for in-demand skills. Browse our available courses and facilities.",
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
