import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "../AnimatedSection";

const testimonials = [
  {
    quote: "Eli did an excellent job detailing my car today. I am thrilled with his work. He came to my house...with all of his equipment (pressure washer, shop vac, car interior shampoo) and set up his cleaning station in my driveway. My car looks amazing. He was punctual and super friendly…",
    author: "Jessica",
    location: "VT"
  },
  {
    quote: "Eli detailed my car and everyone keeps asking me if my 2011 Prius is a new car. Give them a try!",
    author: "Sandra",
    location: "MD"
  },
  {
    quote: "The car looks amazing.",
    author: "Claire",
    location: "VT"
  },
  {
    quote: "Thanks again, car looks so great!",
    author: "Amanda",
    location: "MD"
  }
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 md:py-32 bg-[#f8f8f8]">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-center text-xs tracking-[0.3em] uppercase text-gray-400 mb-16">
            Client Testimonials
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="relative">
            {/* Quote Icon */}
            <Quote className="w-12 h-12 text-gray-200 mx-auto mb-8" />
            
            {/* Testimonial Content */}
            <div className="text-center min-h-[200px] flex flex-col justify-center">
              <p className="text-2xl md:text-3xl font-light text-black leading-relaxed mb-8 transition-opacity duration-500">
                "{testimonials[current].quote}"
              </p>
              <div className="space-y-1">
                <p className="text-black font-medium tracking-wide">
                  {testimonials[current].author}
                </p>
                <p className="text-gray-400 text-sm">
                  {testimonials[current].location}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-12">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === current ? 'bg-black w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}