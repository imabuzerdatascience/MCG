import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { associatesData } from "@/data/associates";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function AssociatesFeature() {
  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="md:w-2/3">
            <SectionHeader 
              title="Our Associates" 
              subtitle="A diverse portfolio of specialized businesses working together to deliver excellence."
            />
          </div>
          <div className="md:w-1/3 text-left md:text-right mb-12 md:mb-12">
            <Link 
              href="/associates"
              className="inline-flex items-center text-primary-blue font-semibold hover:text-dark-navy transition-colors group"
            >
              View All Associates <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {associatesData.map(associate => (
            <div key={associate.id} className="bg-off-white p-6 rounded-xl border border-gray-100 hover:border-primary-blue/30 hover:shadow-md transition-all group flex flex-col">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-primary-blue mb-4 shadow-sm group-hover:bg-primary-blue group-hover:text-white transition-colors shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-dark-navy mb-2 line-clamp-2 min-h-[56px]">{associate.name}</h4>
              <div className="text-xs font-semibold text-corporate-green mb-3 uppercase tracking-wider">{associate.industry}</div>
              <p className="text-sm text-muted-gray line-clamp-3">{associate.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
