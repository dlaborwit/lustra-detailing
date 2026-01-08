import React from 'react';
import AnimatedSection from "../AnimatedSection";

const steps = [
  {
    number: "01",
    title: "Waste Removal & Precision Vacuuming",
    description: "Complete waste removal, precision vacuuming, and deep cleaning of hidden crevices and under-seat areas. Specialized tools available for removing embedded pet hair.",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&q=80"
  },
  {
    number: "02",
    title: "Carpet & Mat Restoration",
    description: "Carpets and mats are scrubbed with professional upholstery cleaner, pressure washed, extracted, and dried. Waterproof mats get a non-slip restorative coat.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6926733f684a8f99b361baaa/c84511c38_6e595e0b172add5a936011ac9e9c3fd5.jpg"
  },
  {
    number: "03",
    title: "Interior Sanitization & Conditioning",
    description: "Steam and surface cleaners sanitize cup holders, seats, and dashboards. Leather, vinyl, and waterproof surfaces receive a restorative conditioner.",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6926733f684a8f99b361baaa/0ea1b8b97_adrian-dascal-Ce_gQ7Z0eAc-unsplash.jpg"
  },
  {
    number: "04",
    title: "Exterior Wash & Shine",
    description: "We hand-wash the exterior and finish with premium carnauba wax for a deep shine. Tires are cleaned and dressed.",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80"
  }
];

export default function ProcessSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-center text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
            Our Process
          </h2>
          <p className="text-center text-3xl md:text-4xl font-light text-black mb-20 tracking-tight">
            Four Steps to Perfection
          </p>
        </AnimatedSection>

        <div className="space-y-24 md:space-y-32">
          {steps.map((step, index) => (
            <AnimatedSection 
              key={index} 
              delay={100}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img 
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <span className="text-6xl md:text-7xl font-extralight text-gray-200">
                    {step.number}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-light text-black tracking-tight -mt-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}