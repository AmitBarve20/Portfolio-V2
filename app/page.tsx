import Navbar from "@/components/Navbar";
import ScrollySection from "@/components/ScrollySection";
import SelectedWork from "@/components/SelectedWork";
import Expertise from "@/components/Expertise";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PreloaderController from "@/components/PreloaderController";
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <PreloaderController />
      <CustomCursor />
      <Navbar />
      <ScrollySection />
      <SelectedWork />
      <Expertise />
      <Testimonials />
      <About />
      <Footer />
      <Analytics />
    </main>
  );
}
