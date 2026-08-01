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
              <article key={member.id} className="card-surface group flex h-full flex-col rounded-2xl">
                <div className="relative flex h-52 items-center justify-center overflow-hidden border-b border-yellow-100 bg-yellow-50 p-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-yellow/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full shadow-md object-cover relative z-10" />
                  ) : (
                    <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-deep-green text-white shadow-md">
                      <UserCircle2 className="w-20 h-20 opacity-80" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="mb-1 text-xl font-bold text-deep-green">{member.name}</h3>
                  <div className="mb-3 text-sm font-semibold text-corporate-green">{member.position}</div>
                  <div className="mb-4 inline-block self-start rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-muted-gray">
                    {member.qualification}
                  </div>
                  <p className="text-sm leading-relaxed text-charcoal">
                    {member.experience}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
