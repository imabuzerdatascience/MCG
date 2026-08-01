import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <div className="aspect-video bg-dark-navy relative flex items-center justify-center">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
               <div className="text-white text-center p-8 z-10">
                 <h3 className="text-3xl font-bold mb-4">Empowering Businesses</h3>
                 <p className="text-blue-100">Through integrated corporate solutions.</p>
               </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-corporate-green rounded-tl-3xl rounded-br-2xl -z-10 hidden md:block"></div>
          </div>
        </div>
        
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-navy mb-6">
            Expertise That Moves Businesses Forward
          </h2>
          <p className="text-lg text-muted-gray mb-6 leading-relaxed">
            MGC Associates Pvt. Ltd. is a premier business service provider established by specialized corporate professionals. We collaborate with lawyers, advocates, chartered accountants, economists, financial analysts, and technical specialists to offer comprehensive support.
          </p>
          <p className="text-lg text-muted-gray mb-8 leading-relaxed">
            Our goal is simple: to provide customized, reliable business solutions through one integrated platform.
          </p>
          
          <ul className="space-y-3 mb-10">
            {["Integrated Legal & Financial Support", "Strategic Business Planning", "Compliance & Risk Management"].map((item, idx) => (
              <li key={idx} className="flex items-center text-dark-navy font-medium">
                <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-corporate-green mr-3 shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                {item}
              </li>
            ))}
          </ul>
          
          <Link 
            href="/about" 
            className="inline-flex items-center text-primary-blue font-bold hover:text-dark-navy transition-colors text-lg group"
          >
            Learn More About MGC 
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
