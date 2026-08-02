"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Leadership", href: "/leadership" },
  { name: "Associates", href: "/associates" },
  { name: "Clients", href: "/clients" },
  { name: "News & Insights", href: "/news" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 bg-white border-b",
        isScrolled ? "py-2 shadow-md border-transparent" : "py-4 border-gray-100"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 group">
          <img src="/logo.jpeg" alt="MGC Associates" className="w-10 h-10 object-contain rounded" />
          <div className="flex flex-col">
            <span className="font-bold text-deep-green text-lg leading-tight group-hover:text-charcoal transition-colors">MGC ASSOCIATES</span>
            <span className="text-[10px] text-muted-gray uppercase tracking-wider">Corporate Business Partner</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.name} 
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-deep-green",
                pathname === link.href ? "text-deep-green font-semibold" : "text-charcoal"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/contact" 
            className="bg-corporate-green hover:bg-dark-green text-white px-5 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
          >
            Book a Consultation
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-charcoal p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 py-4 flex flex-col px-4">
          {NAV_LINKS.map(link => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "py-3 border-b border-gray-50 text-sm font-medium transition-colors",
                pathname === link.href ? "text-deep-green" : "text-charcoal"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 bg-primary-yellow hover:bg-yellow-400 text-charcoal px-5 py-3 rounded-md text-sm font-bold text-center shadow-sm"
          >
            Book a Consultation
          </Link>
        </div>
      )}
    </header>
  );
}
