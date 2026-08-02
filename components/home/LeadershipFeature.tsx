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
        
        <div className="card-surface group mt-12 flex flex-col rounded-2xl md:flex-row">
          <div className="flex items-center justify-center bg-yellow-50 p-10 md:w-1/3 md:p-12">
            {ceo.imageUrl ? (
              <img src={ceo.imageUrl} alt={ceo.name} className="w-full max-w-[240px] rounded-full border-4 border-white shadow-lg" />
            ) : (
              <div className="flex h-48 w-48 items-center justify-center rounded-full bg-deep-green text-white shadow-lg">
                <UserCircle2 className="w-32 h-32 opacity-80" />
              </div>
            )}
          </div>
          
          <div className="flex flex-col justify-center p-8 md:w-2/3 md:p-12">
            <h3 className="mb-2 text-3xl font-bold text-deep-green">{ceo.name}</h3>
            <div className="mb-2 font-semibold text-corporate-green">{ceo.position}</div>
            <div className="mb-6 text-sm text-muted-gray">{ceo.qualification}</div>
            
            <p className="mb-8 border-l-4 border-primary-yellow pl-5 text-lg leading-relaxed text-charcoal">
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
