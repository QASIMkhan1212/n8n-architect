import { lazy, Suspense } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const Marquee = lazy(() => import("@/components/Marquee"));
const BentoGrid = lazy(() => import("@/components/BentoGrid"));
const Timeline = lazy(() => import("@/components/Timeline"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const CaseStudies = lazy(() => import("@/components/CaseStudies"));
const Pricing = lazy(() => import("@/components/Pricing"));
const Footer = lazy(() => import("@/components/Footer"));
const ChatWidget = lazy(() => import("@/components/ChatWidget"));

const Index = () => {
  return (
    <SmoothScroll>
      <ParticleBackground />
      <CustomCursor />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={null}>
            <Marquee />
            <BentoGrid />
            <Timeline />
            <Testimonials />
            <CaseStudies />
            <Pricing />
          </Suspense>
        </main>
      </div>
      <div className="relative z-[51]">
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </SmoothScroll>
  );
};

export default Index;
