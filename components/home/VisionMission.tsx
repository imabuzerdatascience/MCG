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
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-10 hover:bg-white/10 transition-colors">
            <div className="w-16 h-16 bg-primary-blue rounded-xl flex items-center justify-center mb-8">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
            <p className="text-lg text-blue-50 leading-relaxed font-light">
              "To become a trusted partner for businesses by delivering transformative corporate solutions that drive sustainable growth, operational excellence, innovation and long-term value."
            </p>
          </div>
          
          {/* Mission */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-10 hover:bg-white/10 transition-colors">
            <div className="w-16 h-16 bg-corporate-green rounded-xl flex items-center justify-center mb-8">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-lg text-blue-50 leading-relaxed font-light">
              To provide reliable corporate solutions focused on compliance, operational excellence, and risk reduction. We aim to empower ethical business practices and strategic support to ensure sustainable growth for our clients.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
