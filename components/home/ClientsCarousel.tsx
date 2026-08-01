import { clientsData } from "@/data/clients";
import { SectionHeader } from "@/components/shared/SectionHeader";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ClientsCarousel() {
  // Take a subset for the homepage
  const displayClients = clientsData.slice(0, 12);
  
  return (
    <section className="py-20 bg-off-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Trusted By Organizations Across Industries" 
          centered={true}
        />
        
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {displayClients.map(client => (
            <div 
              key={client.id}
              className="bg-white border border-gray-100 rounded-lg py-4 px-6 shadow-sm hover:shadow-md hover:border-primary-blue/30 transition-all flex items-center justify-center min-w-[200px]"
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
