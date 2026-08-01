import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicesData } from "@/data/services";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function ServicesGrid() {
  // Show only top 6 services on homepage
  const featuredServices = servicesData.slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Comprehensive Business Solutions Under One Roof" 
          subtitle="MGC combines specialized professionals from legal, financial, management, research and technology backgrounds to deliver integrated solutions."
          centered={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 mb-12">
          {featuredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            href="/services"
            className="inline-flex items-center bg-dark-navy hover:bg-primary-blue text-white px-8 py-4 rounded-md font-semibold transition-colors duration-300 shadow-md group"
          >
            View All Services
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
