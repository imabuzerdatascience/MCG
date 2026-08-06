import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { associatesData } from "@/data/associates";
import { Building2 } from "lucide-react";

export default function AssociatesPage() {
  return (
    <>
      <PageHero 
        title="Our Associates"
        description="A specialized network of businesses working together to deliver excellence."
      />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Strategic Partnerships" 
            subtitle="MGC Associates works closely with our associate companies to provide an extended range of services, from supply chain logistics to philanthropic initiatives."
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {associatesData.map(associate => (
              <div key={associate.id} className="card-surface group flex flex-col gap-6 rounded-2xl p-8 md:flex-row">
                <div className="card-icon flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-deep-green">{associate.name}</h3>
                  <div className="mb-4 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-corporate-green">
                    {associate.industry}
                  </div>
                  <p className="leading-relaxed text-muted-gray">
                    {associate.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
