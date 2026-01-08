import React from 'react';
import AnimatedSection from "../AnimatedSection";

export default function DetailSection() {
  return (
    <section className="py-24 md:py-32 bg-[#f8f8f8]">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-light text-black mb-12 tracking-tight text-center">
            The Car Detail
          </h2>
        </AnimatedSection>
        
        <AnimatedSection delay={200}>
          <div className="space-y-8 text-center">
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              We will work on your vehicle until you are fully satisfied. Our pricing is 
              <span className="text-black font-medium"> $75 per hour</span> due to the 
              environmentally-friendly and professional-grade materials we use, as well as 
              the physical intensity of the labor.
            </p>
            
            <p className="text-gray-500 font-light leading-relaxed">
              Additional fees may apply for travel outside our service area and will be 
              discussed beforehand.
            </p>
            
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-400 tracking-wide">
                Most full details take <span className="text-black">4–6 hours</span>. 
                Contact us anytime for a more precise estimate based on your vehicle and needs.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}