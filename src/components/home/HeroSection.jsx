import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ChevronDown } from "lucide-react";
import AnimatedSection from "../AnimatedSection";

export default function HeroSection() {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
      <div className="absolute inset-0 bg-[url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6926733f684a8f99b361baaa/a0cddf681_bradley-dunn-qijkjkJm63c-unsplash.jpg')] bg-cover bg-center opacity-60" />
      
      {/* Hero Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <AnimatedSection delay={200}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6">
            Lustra <span className="font-medium">Detailing</span>
          </h1>
        </AnimatedSection>
        
        <AnimatedSection delay={400}>
          <p className="text-lg md:text-xl text-white/80 font-light tracking-wide mb-12 max-w-2xl mx-auto">
            Premium Mobile Car Detailing, Delivered to You.
          </p>
        </AnimatedSection>
        
        <AnimatedSection delay={600}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Booking")}>
              <Button 
                size="lg"
                className="bg-white text-black hover:bg-white/90 px-10 py-6 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:scale-105"
              >
                Book Now
              </Button>
            </Link>
            <Button 
              variant="outline"
              size="lg"
              onClick={scrollToServices}
              className="border-white/30 text-white hover:bg-white/10 px-10 py-6 text-sm tracking-widest uppercase font-light bg-transparent"
            >
              View Services
            </Button>
          </div>
        </AnimatedSection>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </div>
    </section>
  );
}