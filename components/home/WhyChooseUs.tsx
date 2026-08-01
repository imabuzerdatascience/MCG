import { ShieldCheck, Briefcase, Users, Scale, Clock, Settings, Handshake, Target } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const features = [
  { icon: Users, title: "Multi-Disciplinary Expertise", desc: "Access a diverse team of professionals under one roof." },
  { icon: Briefcase, title: "One-Stop Business Solutions", desc: "Comprehensive services from registration to financial management." },
  { icon: Handshake, title: "Client-Focused Approach", desc: "Tailored strategies designed specifically for your business goals." },
  { icon: Scale, title: "Legal & Regulatory Expertise", desc: "Stay compliant with our specialized corporate law team." },
  { icon: Clock, title: "Experienced Professionals", desc: "Over 15 years of industry experience you can rely on." },
  { icon: Settings, title: "Customized Business Strategies", desc: "Adaptive planning for sustainable growth." },
  { icon: ShieldCheck, title: "Ethical & Professional Service", desc: "Maintaining the highest standards of integrity and confidentiality." },
  { icon: Target, title: "Long-Term Partnership", desc: "Committed to supporting your success at every stage." },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-off-white relative">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Why Businesses Choose MGC Associates" 
          centered={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary-blue mb-4 group-hover:bg-primary-blue group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-dark-navy mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-gray">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
