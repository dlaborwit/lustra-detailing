import React from 'react';
import { Leaf, Sparkles, Clock, MapPin } from "lucide-react";
import AnimatedSection from "../AnimatedSection";

const values = [
  {
    icon: Leaf,
    title: "Eco-Friendly Materials",
    description: "Professional-grade, environmentally conscious products"
  },
  {
    icon: Sparkles,
    title: "Complete Transformation",
    description: "Interior + exterior detailing excellence"
  },
  {
    icon: Clock,
    title: "Transparent Pricing",
    description: "Straightforward hourly rates, no surprises"
  },
  {
    icon: MapPin,
    title: "Mobile Service",
    description: "We come directly to your location"
  }
];

export default function ValuePropsSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-center text-xs tracking-[0.3em] uppercase text-gray-400 mb-16">
            Why Choose Lustra
          </h2>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {values.map((value, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <div className="text-center group">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 group-hover:bg-black transition-colors duration-500">
                  <value.icon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-medium text-black mb-3 tracking-tight">
                  {value.title}
                </h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}