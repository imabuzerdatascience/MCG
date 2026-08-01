import { Eye, Target } from "lucide-react";

export function VisionMission() {
  return (
    <section className="py-20 bg-dark-navy text-white relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0">
        <div className="absolute right-0 bottom-0 w-1/3 h-full bg-primary-blue/20 skew-x-12 transform origin-bottom-right"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Vision */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-yellow/60 hover:bg-white/10 md:p-10">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-yellow text-charcoal shadow-lg shadow-black/10">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
            <p className="text-lg font-light leading-relaxed text-yellow-50">
              "To become a trusted partner for businesses by delivering transformative corporate solutions that drive sustainable growth, operational excellence, innovation and long-term value."
            </p>
          </div>
          
          {/* Mission */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-yellow/60 hover:bg-white/10 md:p-10">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-corporate-green shadow-lg shadow-black/10">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-lg font-light leading-relaxed text-yellow-50">
              To provide reliable corporate solutions focused on compliance, operational excellence, and risk reduction. We aim to empower ethical business practices and strategic support to ensure sustainable growth for our clients.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
