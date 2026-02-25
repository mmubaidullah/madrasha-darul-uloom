import AboutSection from "@/components/Home/AboutSection";
import Departments from "@/components/Home/Departments";
import HeroSection from "@/components/Home/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <Departments />
      <AboutSection/>
    </main>
  );
}