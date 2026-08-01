import Link from "next/link";
import { ArrowRight, UserCircle2 } from "lucide-react";
import { leadershipData } from "@/data/team";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function LeadershipFeature() {
  const ceo = leadershipData.find(m => m.id === "seraj-mikrani");

  if (!ceo) return null;

  return (
    <section className="py-20 bg-off-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Guided By Experience" 
          subtitle="Meet the visionaries driving MGC Associates towards excellence."
        />
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-12 flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-12">
            {ceo.imageUrl ? (
              <img src={ceo.imageUrl} alt={ceo.name} className="w-full max-w-[240px] rounded-full shadow-md" />
            ) : (
              <div className="w-48 h-48 bg-primary-blue rounded-full flex items-center justify-center text-white shadow-md">
                <UserCircle2 className="w-32 h-32 opacity-80" />
              </div>
            )}
          </div>
          
          <div className="md:w-2/3 p-10 md:p-12 flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-dark-navy mb-2">{ceo.name}</h3>
            <div className="text-primary-blue font-semibold mb-1">{ceo.position}</div>
            <div className="text-sm text-muted-gray mb-6">{ceo.qualification}</div>
            
            <p className="text-lg text-charcoal leading-relaxed mb-8">
              "{ceo.experience}"
            </p>
            
            <div>
              <Link 
                href="/leadership"
                className="inline-flex items-center text-corporate-green hover:text-dark-green font-semibold transition-colors group"
              >
                Meet Our Leadership Team <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
