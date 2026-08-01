import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/PageHero";
import { servicesData } from "@/data/services";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = servicesData.find(s => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHero 
        title={service.title}
        description={service.description}
      />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-bold text-dark-navy mb-6">Service Overview</h2>
            <p className="text-lg text-muted-gray mb-10 leading-relaxed">
              At MGC Associates, our {service.title.toLowerCase()} are designed to provide robust, reliable, and compliant solutions for your business. We leverage our multi-disciplinary expertise to ensure that every aspect of this service aligns with your broader organizational goals.
            </p>
            
            <h3 className="text-2xl font-bold text-dark-navy mb-6">Key Focus Areas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-off-white p-6 rounded-xl border border-gray-100">
                  <CheckCircle2 className="w-6 h-6 text-corporate-green shrink-0 mt-0.5" />
                  <span className="font-semibold text-charcoal">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-dark-navy rounded-2xl p-8 text-white shadow-xl sticky top-24">
              <h3 className="text-2xl font-bold mb-4">Need this service?</h3>
              <p className="text-blue-100 mb-8">
                Schedule a consultation with our specialized experts to discuss how we can assist your business.
              </p>
              <Link 
                href="/contact"
                className="block w-full bg-corporate-green hover:bg-dark-green text-white text-center py-4 rounded-md font-bold transition-colors shadow-lg"
              >
                Book a Consultation
              </Link>
              
              <hr className="border-gray-700 my-8" />
              
              <h4 className="font-semibold mb-4 text-gray-300">Other Services</h4>
              <ul className="space-y-3">
                {servicesData.filter(s => s.id !== service.id).slice(0, 4).map(otherService => (
                  <li key={otherService.id}>
                    <Link 
                      href={`/services/${otherService.slug}`}
                      className="text-sm text-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      {otherService.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
