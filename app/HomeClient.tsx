"use client";
import { useState } from "react";
import IntroLoader from "@/components/sections/IntroLoader";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import TeamSection from "@/components/sections/TeamSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WorkShowcase from "@/components/sections/WorkShowcase";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import AboutPreview from "@/components/sections/AboutPreview";
import PricingSection from "@/components/sections/PricingSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

export interface SiteData {
  hero: Record<string, string> | null;
  team: Record<string, string>[];
  services: Record<string, string>[];
  testimonials: Record<string, string>[];
  faqs: Record<string, string>[];
  portfolio: Record<string, unknown>[];
  stats: Record<string, string | number> | null;
  settings: Record<string, string>;
}

export default function HomeClient({ data }: { data: SiteData }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <IntroLoader onComplete={() => setLoaded(true)} />
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <Navbar ready={loaded} />
        <main>
          <HeroSection ready={loaded} />
          <div className="section-divider" />
          <StatsSection statsData={data.stats} />
          <div className="section-divider" />
          <TeamSection teamData={data.team} />
          <div className="section-divider" />
          <ServicesSection servicesData={data.services} />
          <div className="section-divider" />
          <PricingSection />
          <div className="section-divider" />
          <WorkShowcase portfolioData={data.portfolio} />
          <div className="section-divider" />
          <TestimonialsSection testimonialsData={data.testimonials} />
          <div className="section-divider" />
          <ProcessSection />
          <div className="section-divider" />
          <AboutPreview />
          <div className="section-divider" />
          <FAQSection faqData={data.faqs} />
          <FinalCTA settings={data.settings} />
        </main>
        <Footer settings={data.settings} />
        <FloatingWhatsApp
          phone={data.settings?.whatsappNumber || "919203626559"}
          message={data.settings?.whatsappMessage || "Hi Kyron Productions, I'm interested in working with you."}
        />
      </div>
    </>
  );
}
