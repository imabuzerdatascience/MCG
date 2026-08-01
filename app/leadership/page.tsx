import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { leadershipData } from "@/data/team";
import { UserCircle2 } from "lucide-react";

export default function LeadershipPage() {
  return (
    <>
      <PageHero 
        title="Leadership Team"
        description="Meet the specialized corporate professionals and consultants driving MGC Associates."
      />
      
      <section className="py-20 bg-off-white">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Our Experts" 
            subtitle="A multi-disciplinary panel of lawyers, accountants, economists, and strategic consultants."
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
            {leadershipData.map(member => (
              <div key={member.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
                <div className="h-48 bg-gray-100 flex items-center justify-center p-6 border-b border-gray-50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full shadow-md object-cover relative z-10" />
                  ) : (
                    <div className="w-32 h-32 bg-primary-blue rounded-full flex items-center justify-center text-white shadow-md relative z-10">
                      <UserCircle2 className="w-20 h-20 opacity-80" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-navy mb-1">{member.name}</h3>
                  <div className="text-primary-blue font-semibold text-sm mb-3">{member.position}</div>
                  <div className="text-xs font-medium bg-gray-100 inline-block px-2 py-1 rounded text-muted-gray mb-4">
                    {member.qualification}
                  </div>
                  <p className="text-sm text-charcoal leading-relaxed">
                    {member.experience}
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
