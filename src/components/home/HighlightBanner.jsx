import React from 'react';
import AnimatedSection from "../AnimatedSection";

export default function HighlightBanner() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80"
          alt="Luxury car"
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection>
          <p className="text-2xl md:text-4xl lg:text-5xl font-light text-white leading-relaxed tracking-tight">
            A luxury-level detail without the dealership markup
            <span className="block mt-2 text-white/60">— wherever you are.</span>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}