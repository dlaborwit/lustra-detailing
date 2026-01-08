import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Loader2, CheckCircle } from "lucide-react";
import AnimatedSection from "../AnimatedSection";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await base44.entities.ContactMessage.create(formData);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-center text-3xl md:text-4xl font-light text-black mb-4 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-center text-gray-500 font-light mb-12">
            Have questions or want a quote? Reach out anytime.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          {isSubmitted ? (
            <div className="text-center py-16">
              <CheckCircle className="w-16 h-16 text-black mx-auto mb-6" />
              <h3 className="text-2xl font-light text-black mb-4">Message Sent</h3>
              <p className="text-gray-500 mb-8">We'll get back to you shortly.</p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-gray-400">
                    Name
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-gray-200 focus:border-black focus:ring-0 rounded-none py-6 bg-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-gray-400">
                    Email
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-gray-200 focus:border-black focus:ring-0 rounded-none py-6 bg-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs tracking-widest uppercase text-gray-400">
                  Phone
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="border-gray-200 focus:border-black focus:ring-0 rounded-none py-6 bg-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs tracking-widest uppercase text-gray-400">
                  Message
                </label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="border-gray-200 focus:border-black focus:ring-0 rounded-none min-h-[150px] bg-transparent resize-none"
                  placeholder="Tell us about your vehicle and what you're looking for..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white hover:bg-gray-800 rounded-none py-6 px-10 text-sm tracking-widest uppercase flex-1"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Send Message"
                  )}
                </Button>
                
                <Link to={createPageUrl("Booking")} className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-black text-black hover:bg-black hover:text-white rounded-none py-6 px-10 text-sm tracking-widest uppercase"
                  >
                    Book a Detail
                  </Button>
                </Link>
              </div>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}