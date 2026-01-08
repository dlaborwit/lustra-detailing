import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Phone } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function About() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-[#f8f8f8]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black mb-6 tracking-tight leading-tight">
              A clean environment is your fresh start.
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image */}
            <AnimatedSection direction="left">
              <div className="relative">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6926733f684a8f99b361baaa/555eb3103_Screenshot2025-11-25at110554PM.png"
                  alt="Eli - Founder of Lustra Detailing"
                  className="w-full max-w-md mx-auto lg:mx-0 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </AnimatedSection>

            {/* Text Content */}
            <AnimatedSection direction="right" delay={200}>
              <div className="space-y-6 text-gray-600 font-light leading-relaxed text-lg">
                <p>
                  Lustra Consulting began with a personal observation: too many of my college buddies drove cars filled with fast-food bags and half-empty coffee cups. Vermont winters coated their floor mats with corrosive road salt, and mud season only added insult to injury.
                </p>
                <p>
                  I couldn't help but notice the connection between their cluttered cars and their chronic stress. Chances are, if your car isn't clean, neither is your house — or your headspace.
                </p>
                <p>
                  For me, environmental hygiene has always been essential to mental health. Throughout my academic years, doing my laundry, making my bed, taking out the trash, and washing my car weren't just chores — they were cornerstones of my routine, giving me structure, pride, and a sense of control. Without them, I doubt I would have enjoyed my college years as much as I did.
                </p>
                <p>
                  At Lustra Consulting, we believe that a clean environment — especially a clean car and home — can restore confidence and bring a sense of freedom back to your everyday life. If you agree, please do not hesitate to reach out using the contact form below or by giving us a call at <a href="tel:+13072933540" className="text-black font-medium hover:underline">+1 (307) 293-3540</a>.
                </p>
                <p className="text-black font-medium text-xl pt-4">
                  - Eli
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
              Ready for a Fresh Start?
            </h2>
            <p className="text-white/60 font-light mb-10 max-w-xl mx-auto">
              Book your detail today and experience the difference a clean environment can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Booking")}>
                <Button 
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 px-10 py-6 text-sm tracking-widest uppercase font-medium"
                >
                  Book a Detail
                </Button>
              </Link>
              <a href="tel:+13072933540">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-10 py-6 text-sm tracking-widest uppercase font-light bg-transparent"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}