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
              <div key={associate.id} className="bg-off-white p-8 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-primary-blue shadow-sm shrink-0">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark-navy mb-2">{associate.name}</h3>
                  <div className="inline-block px-3 py-1 bg-green-50 text-corporate-green text-xs font-bold uppercase tracking-wider rounded mb-4">
                    {associate.industry}
                  </div>
                  <p className="text-muted-gray leading-relaxed">
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
