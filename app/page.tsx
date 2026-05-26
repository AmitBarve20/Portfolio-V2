import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollySection from "@/components/ScrollySection";
import CustomCursor from "@/components/CustomCursor";
import PreloaderController from "@/components/PreloaderController";
import { Analytics } from "@vercel/analytics/next";

// Below-fold sections: code-split so they don't inflate the initial JS bundle.
// SSR is still on (default) so HTML is pre-rendered; only the JS chunk is deferred.
const SelectedWork = dynamic(() => import("@/components/SelectedWork"));
const Expertise = dynamic(() => import("@/components/Expertise"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const About = dynamic(() => import("@/components/About"));
const Footer = dynamic(() => import("@/components/Footer"));

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
