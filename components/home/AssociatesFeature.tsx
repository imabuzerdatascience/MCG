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
              className="inline-flex items-center font-semibold text-deep-green transition-colors hover:text-dark-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-yellow group"
            >
              View All Associates <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {associatesData.map(associate => (
            <div key={associate.id} className="card-surface group flex h-full flex-col rounded-2xl p-6">
              <div className="card-icon mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="mb-2 min-h-[56px] text-lg font-bold text-deep-green line-clamp-2">{associate.name}</h4>
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-corporate-green">{associate.industry}</div>
              <p className="text-sm leading-relaxed text-muted-gray line-clamp-3">{associate.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
