import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";
import { Loader2, CheckCircle, Phone, CreditCard, ArrowLeft, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/AnimatedSection";
import BookingCalendar from "@/components/booking/BookingCalendar";
import TimeSelector from "@/components/booking/TimeSelector";
import VehicleSelector from "@/components/booking/VehicleSelector";

export default function Booking() {
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: null,
    time_window: '',
    address: '',
    vehicle_type: '',
    notes: ''
  });

  // Fetch existing bookings to block off booked slots
  useEffect(() => {
    // Backend functionality disabled - demo mode
    setBookedSlots([]);
  }, []);

  const handleSubmit = async (type) => {
    if (type === 'book_and_pay') {
      setShowComingSoon(true);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate processing time (demo mode - not actually saving)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsComplete(true);
  };

  if (showComingSoon) {
    return (
      <main className="bg-white min-h-screen pt-20">
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <AnimatedSection>
            <Clock className="w-20 h-20 text-gray-400 mx-auto mb-8" />
            <h1 className="text-3xl md:text-4xl font-light text-black mb-4 tracking-tight">
              Coming Soon
            </h1>
            <p className="text-gray-500 font-light mb-12 text-lg">
              Online payments are coming soon! For now, please use the "Request Contact" option and we'll reach out to confirm your booking.
            </p>
            <Button 
              variant="outline"
              onClick={() => setShowComingSoon(false)}
              className="border-black text-black hover:bg-black hover:text-white rounded-none px-10 py-6 text-sm tracking-widest uppercase"
            >
              Go Back
            </Button>
          </AnimatedSection>
        </div>
      </main>
    );
  }

  if (isComplete) {
    return (
      <main className="bg-white min-h-screen pt-20">
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <AnimatedSection>
            <CheckCircle className="w-20 h-20 text-black mx-auto mb-8" />
            <h1 className="text-3xl md:text-4xl font-light text-black mb-4 tracking-tight">
              Request Received
            </h1>
            <p className="text-gray-500 font-light mb-12 text-lg">
              Thank you for your interest! We've received your booking request and 
              a confirmation email has been sent. Our team will be in touch with you soon.
            </p>
            <Link to={createPageUrl("Home")}>
              <Button 
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white rounded-none px-10 py-6 text-sm tracking-widest uppercase"
              >
                Return Home
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 md:py-24 bg-[#f8f8f8]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">
              Book Your Detail
            </h1>
            <p className="text-gray-500 font-light text-lg">
              Select your preferred date, time, and tell us about your vehicle.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Progress Steps */}
          <div className="flex justify-center mb-16">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <button
                    onClick={() => s < step && setStep(s)}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                      step >= s 
                        ? "bg-black text-white" 
                        : "bg-gray-100 text-gray-400"
                    )}
                  >
                    {s}
                  </button>
                  {s < 3 && (
                    <div className={cn(
                      "w-12 h-px transition-colors",
                      step > s ? "bg-black" : "bg-gray-200"
                    )} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step 1: Date & Time */}
          {step === 1 && (
            <AnimatedSection>
              <div className="space-y-12">
                <div>
                  <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6 text-center">
                    Select a Date
                  </h2>
                  <BookingCalendar 
                                            selected={formData.date}
                                            onSelect={(date) => setFormData({ ...formData, date, time_window: '' })}
                                            bookedSlots={bookedSlots}
                                          />
                </div>

                <div>
                  <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6 text-center">
                    Preferred Time Window
                  </h2>
                  <TimeSelector 
                                            selected={formData.time_window}
                                            onSelect={(time) => setFormData({ ...formData, time_window: time })}
                                            bookedSlots={bookedSlots}
                                            selectedDate={formData.date}
                                          />
                </div>

                <Button
                  onClick={() => setStep(2)}
                  disabled={!formData.date || !formData.time_window}
                  className="w-full bg-black text-white hover:bg-gray-800 rounded-none py-6 text-sm tracking-widest uppercase disabled:opacity-30"
                >
                  Continue
                </Button>
              </div>
            </AnimatedSection>
          )}

          {/* Step 2: Vehicle & Location */}
          {step === 2 && (
            <AnimatedSection>
              <div className="space-y-12">
                <div>
                  <h2 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">
                    Vehicle Type
                  </h2>
                  <VehicleSelector 
                    selected={formData.vehicle_type}
                    onSelect={(type) => setFormData({ ...formData, vehicle_type: type })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-gray-400">
                    Service Address
                  </label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="border-gray-200 focus:border-black focus:ring-0 rounded-none py-6 bg-transparent"
                    placeholder="Where should we come to you?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-gray-400">
                    Additional Notes (Optional)
                  </label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="border-gray-200 focus:border-black focus:ring-0 rounded-none min-h-[120px] bg-transparent resize-none"
                    placeholder="Tell us more about your vehicle or any specific concerns..."
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-gray-200 text-gray-600 hover:border-black hover:text-black rounded-none py-6 px-8"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!formData.vehicle_type || !formData.address}
                    className="flex-1 bg-black text-white hover:bg-gray-800 rounded-none py-6 text-sm tracking-widest uppercase disabled:opacity-30"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Step 3: Contact Info & Booking Type */}
          {step === 3 && (
            <AnimatedSection>
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest uppercase text-gray-400">
                      Full Name
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

                {/* Summary */}
                <div className="p-6 bg-[#f8f8f8] space-y-3">
                  <h3 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
                    Booking Summary
                  </h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium">{formData.date ? format(formData.date, 'MMMM d, yyyy') : '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Time</span>
                    <span className="font-medium capitalize">{formData.time_window || '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Vehicle</span>
                    <span className="font-medium capitalize">{formData.vehicle_type || '-'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Location</span>
                    <span className="font-medium">{formData.address || '-'}</span>
                  </div>
                </div>

                {/* Booking Options */}
                <div className="space-y-4">
                  <h3 className="text-xs tracking-[0.3em] uppercase text-gray-400 text-center">
                    How Would You Like to Proceed?
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setBookingType('contact_request');
                        handleSubmit('contact_request');
                      }}
                      disabled={isSubmitting || !formData.name || !formData.email}
                      className={cn(
                        "p-6 border transition-all duration-300 text-left group",
                        "border-gray-200 hover:border-black",
                        (isSubmitting || !formData.name || !formData.email) && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <Phone className="w-6 h-6 mb-4 text-gray-400 group-hover:text-black transition-colors" />
                      <h4 className="font-medium tracking-wide mb-2">Request Contact</h4>
                      <p className="text-sm text-gray-500">
                        We'll reach out to confirm pricing and scheduling based on your vehicle.
                      </p>
                      {isSubmitting && bookingType === 'contact_request' && (
                        <Loader2 className="w-5 h-5 animate-spin mt-4" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setBookingType('book_and_pay');
                        handleSubmit('book_and_pay');
                      }}
                      disabled={isSubmitting || !formData.name || !formData.email}
                      className={cn(
                        "p-6 border transition-all duration-300 text-left group",
                        "border-black bg-black text-white hover:bg-gray-900",
                        (isSubmitting || !formData.name || !formData.email) && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <CreditCard className="w-6 h-6 mb-4 text-white/70" />
                      <h4 className="font-medium tracking-wide mb-2">Book & Pay Now</h4>
                      <p className="text-sm text-white/70">
                        Secure your spot with a deposit. We'll send payment instructions.
                      </p>
                      {isSubmitting && bookingType === 'book_and_pay' && (
                        <Loader2 className="w-5 h-5 animate-spin mt-4 text-white" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="border-gray-200 text-gray-600 hover:border-black hover:text-black rounded-none py-6 px-8"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </main>
  );
}