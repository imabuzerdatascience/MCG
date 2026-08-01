"use client";

import { clientsData } from "@/data/clients";
import { SectionHeader } from "@/components/shared/SectionHeader";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

export function ClientsCarousel() {
  // Take a subset for the homepage
  const displayClients = clientsData.slice(0, 12);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollAmount = 4;
    const intervalId = window.setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 50);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="py-20 bg-off-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Trusted By Organizations Across Industries" 
          centered={true}
        />
        
        <div ref={carouselRef} className="mt-12 overflow-x-auto overflow-y-hidden flex gap-4 pb-4 hide-scrollbar">
          {displayClients.map(client => (
            <div 
              key={client.id}
              className="bg-white border border-gray-100 rounded-lg py-4 px-6 shadow-sm hover:shadow-md hover:border-primary-blue/30 transition-all flex items-center justify-center min-w-[220px]"
            >
              <span className="font-semibold text-charcoal text-center">{client.name}</span>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/clients"
            className="inline-flex items-center text-primary-blue font-semibold hover:text-dark-navy transition-colors group"
          >
            See all our clients <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
