import React from 'react';
import HeroSection from "@/components/home/HeroSection";
import ValuePropsSection from "@/components/home/ValuePropsSection";
import DetailSection from "@/components/home/DetailSection";
import ProcessSection from "@/components/home/ProcessSection";
import HighlightBanner from "@/components/home/HighlightBanner";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <ValuePropsSection />
      <DetailSection />
      <ProcessSection />
      <HighlightBanner />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}