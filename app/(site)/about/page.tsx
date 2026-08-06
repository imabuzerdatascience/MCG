import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <PageHero 
        title="About MGC Associates"
        description="A group of specialized corporate professionals dedicated to providing complete business solutions under one integrated platform."
      />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <SectionHeader title="Our Story" />
            <p className="text-lg text-muted-gray mb-6 leading-relaxed">
              MGC Associates Pvt. Ltd. was established with a singular vision: to create a trusted, multi-disciplinary platform where businesses can find every corporate solution they need to thrive.
            </p>
            <p className="text-lg text-muted-gray mb-6 leading-relaxed">
              Based in Kathmandu, Nepal, our organization brings together a diverse panel of highly qualified professionals, including lawyers, advocates, chartered accountants, economists, financial analysts, and technical specialists.
            </p>
            <p className="text-lg text-muted-gray mb-8 leading-relaxed">
              By breaking down the silos between legal, financial, and strategic disciplines, we deliver holistic solutions that mitigate risk, ensure compliance, and drive sustainable growth for our clients.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[
                "15+ Years Combined Experience",
                "Dedicated Multi-Disciplinary Team",
                "Proven Track Record",
                "100% Compliance Focused"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 rounded-xl border border-yellow-100 bg-off-white p-4 transition-colors hover:border-primary-yellow hover:bg-yellow-50">
                  <CheckCircle2 className="w-5 h-5 text-corporate-green shrink-0" />
                  <span className="font-semibold text-deep-green text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="bg-deep-green rounded-2xl p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-yellow rounded-bl-full opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-corporate-green rounded-tr-full opacity-20"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-12 h-1 bg-corporate-green mr-4 block"></span>
                  Why MGC?
                </h3>
                <blockquote className="text-xl font-light italic leading-relaxed mb-8">
                  "In today's complex regulatory environment, businesses need more than just isolated advice. They need integrated strategies where legal, financial, and operational considerations are aligned. That is the MGC advantage."
                </blockquote>
                <div className="font-bold text-lg">Seraj Mikrani</div>
                <div className="text-yellow-200 text-sm">CEO, MGC Associates</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
