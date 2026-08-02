import { Eye, Target } from "lucide-react";

export function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-deep-green py-20 text-charcoal">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:18px_18px]"></div>
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-yellow/30 blur-3xl"></div>
      <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-corporate-green/50 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary-yellow">Our purpose</p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">A clear direction for every partnership.</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          
          {/* Vision */}
          <div className="rounded-3xl border border-primary-yellow bg-light-yellow p-8 shadow-xl shadow-black/15 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-2xl hover:shadow-black/25 md:p-10">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-deep-green shadow-lg shadow-black/15">
              <Eye className="h-8 w-8 text-primary-yellow" />
            </div>
            <h3 className="mb-6 text-3xl font-bold text-deep-green">Our Vision</h3>
            <p className="text-lg font-normal leading-relaxed text-charcoal">
              "To become a trusted partner for businesses by delivering transformative corporate solutions that drive sustainable growth, operational excellence, innovation and long-term value."
            </p>
          </div>
          
          {/* Mission */}
          <div className="rounded-3xl border border-primary-yellow bg-light-yellow p-8 shadow-xl shadow-black/15 transition-all duration-300 hover:-translate-y-1 hover:border-white hover:shadow-2xl hover:shadow-black/25 md:p-10">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-deep-green shadow-lg shadow-black/15">
              <Target className="h-8 w-8 text-primary-yellow" />
            </div>
            <h3 className="mb-6 text-3xl font-bold text-deep-green">Our Mission</h3>
            <p className="text-lg font-normal leading-relaxed text-charcoal">
              To provide reliable corporate solutions focused on compliance, operational excellence, and risk reduction. We aim to empower ethical business practices and strategic support to ensure sustainable growth for our clients.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
