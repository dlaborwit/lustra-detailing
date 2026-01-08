
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: 'Home', page: 'Home' },
  { name: 'About', page: 'About' },
  { name: 'Book Now', page: 'Booking' }
];

export default function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/Home';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::selection {
          background: #000;
          color: #fff;
        }
      `}</style>

      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled || !isHome
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100" 
          : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to={createPageUrl("Home")} 
              className={cn(
                "text-xl tracking-tight transition-colors",
                isScrolled || !isHome ? "text-black" : "text-white"
              )}
            >
              <span className="font-light">Lustra</span>
              <span className="font-medium ml-1">Detailing</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={cn(
                    "text-sm tracking-wide transition-colors relative group",
                    isScrolled || !isHome 
                      ? "text-gray-600 hover:text-black" 
                      : "text-white/80 hover:text-white",
                    link.page === 'Booking' && (isScrolled || !isHome)
                      && "bg-black text-white px-6 py-2.5 hover:bg-gray-800",
                    link.page === 'Booking' && !isScrolled && isHome
                      && "border border-white/30 px-6 py-2.5 hover:bg-white/10"
                  )}
                >
                  {link.name}
                  {link.page !== 'Booking' && (
                    <span className={cn(
                      "absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full",
                      isScrolled || !isHome ? "bg-black" : "bg-white"
                    )} />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "md:hidden p-2 transition-colors",
                isScrolled || !isHome ? "text-black" : "text-white"
              )}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.page}
                to={createPageUrl(link.page)}
                className={cn(
                  "block text-lg transition-colors",
                  link.page === 'Booking' 
                    ? "bg-black text-white text-center py-3 mt-4" 
                    : "text-gray-600 hover:text-black"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {children}

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-xl tracking-tight mb-4">
                <span className="font-light">Lustra</span>
                <span className="font-medium ml-1">Detailing</span>
              </h3>
              <p className="text-white/50 font-light text-sm leading-relaxed">
                Premium mobile car detailing, delivered to your location with eco-friendly, 
                professional-grade materials.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
                Quick Links
              </h4>
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    className="block text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
                Contact
              </h4>
              <div className="space-y-3 text-sm text-white/70">
                <p>hello@lustradetailing.com</p>
                <p>(555) 123-4567</p>
                <p>Baltimore, MD</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Lustra Detailing. All rights reserved.
            </p>
            <p className="text-xs text-white/40">
              Premium Car Care, Delivered.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
