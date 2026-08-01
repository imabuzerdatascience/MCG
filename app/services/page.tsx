import { PageHero } from "@/components/shared/PageHero";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { servicesData } from "@/data/services";

export default function ServicesPage() {
  return (
    <>
      <PageHero 
        title="Our Services"
        description="Comprehensive, integrated business solutions tailored to meet the legal, financial, and strategic needs of modern organizations."
      />
      
      <section className="py-24 bg-off-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
