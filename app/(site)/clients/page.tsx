import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { clientsData } from "@/data/clients";
import { CheckCircle } from "lucide-react";

export default function ClientsPage() {
  return (
    <>
      <PageHero 
        title="Our Clients & Trust"
        description="Partnering with organizations across various industries to drive compliance and growth."
      />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Trusted By Leading Organizations" 
            subtitle="We are proud to serve a diverse portfolio of clients, ranging from corporate enterprises and SMEs to NGOs and educational institutions."
            centered={true}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {clientsData.map(client => (
              <div 
                key={client.id} 
                className="card-surface group flex min-h-24 items-center space-x-3 rounded-2xl p-6"
              >
                <CheckCircle className="w-5 h-5 text-corporate-green opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
                <span className="font-semibold text-charcoal transition-colors group-hover:text-deep-green">{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
