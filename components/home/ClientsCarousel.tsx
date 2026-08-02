"use client";

import { clientsData } from "@/data/clients";
import { SectionHeader } from "@/components/shared/SectionHeader";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ClientsCarousel() {
  const displayClients = clientsData.slice(0, 12);

  return (
    <section className="py-20 bg-off-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Trusted By Organizations Across Industries" 
          centered={true}
        />
        
        <div className="client-marquee-shell mt-12" role="region" aria-label="Our clients">
          <div className="client-marquee">
            {[...displayClients, ...displayClients].map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                aria-hidden={index >= displayClients.length}
                className="card-surface flex min-w-[220px] items-center justify-center rounded-xl px-6 py-5 text-center"
              >
                <span className="text-center font-semibold text-charcoal">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/clients"
            className="inline-flex items-center font-semibold text-deep-green transition-colors hover:text-dark-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-yellow group"
          >
            See all our clients <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
