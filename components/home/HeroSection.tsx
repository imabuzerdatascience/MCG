import Link from "next/link";
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";
import { newsData } from "@/data/news";

export function HeroSection() {
  const latestNews = newsData.slice(0, 3);

  return (
    <section className="relative bg-off-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-blue/5 skew-x-12 transform origin-top-right"></div>
      
      <div className="container mx-auto px-4 pt-10 md:pt-16 pb-12 md:pb-16 relative z-10 flex flex-col lg:flex-row items-center">
        <div className="lg:w-3/5 pr-0 lg:pr-12 mb-12 lg:mb-0">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-primary-blue px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-100">
            <CheckCircle2 className="w-4 h-4 text-corporate-green" />
            <span>Your Trusted Corporate Business Partner</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-navy leading-tight mb-6">
            Complete Business Solutions. <br className="hidden md:block" />
            <span className="text-primary-blue">One Trusted Partner.</span>
          </h1>
          
          <p className="text-lg text-muted-gray mb-10 max-w-2xl leading-relaxed">
            MGC Associates Pvt. Ltd. brings legal, financial, compliance, management and technology expertise together under one platform, helping businesses operate confidently and grow sustainably.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Link 
              href="/services" 
              className="bg-primary-blue hover:bg-dark-navy text-white px-8 py-4 rounded-md font-semibold text-center transition-all duration-300 shadow-lg shadow-blue-900/20 flex items-center justify-center group"
            >
              Explore Our Services
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact" 
              className="bg-white hover:bg-gray-50 text-dark-navy border-2 border-dark-navy px-8 py-4 rounded-md font-semibold text-center transition-all duration-300 flex items-center justify-center"
            >
              Book a Consultation
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
            <div>
              <div className="text-2xl font-bold text-dark-navy mb-1">15+</div>
              <div className="text-xs text-muted-gray font-medium uppercase tracking-wider">Years Experience</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-dark-navy mb-1">20+</div>
              <div className="text-xs text-muted-gray font-medium uppercase tracking-wider">Service Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-dark-navy mb-1">Expert</div>
              <div className="text-xs text-muted-gray font-medium uppercase tracking-wider">Multi-Disciplinary</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-dark-navy mb-1">KTM</div>
              <div className="text-xs text-muted-gray font-medium uppercase tracking-wider">Kathmandu, Nepal</div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-2/5 relative mt-12 lg:mt-0 w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative z-10">
            <div className="bg-dark-navy text-white p-6 flex justify-between items-center">
              <h3 className="font-bold text-xl">Latest Update</h3>
              <Link href="/news" className="text-sm text-blue-200 hover:text-white transition-colors flex items-center">
                View All <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <div className="p-2">
              {latestNews.map((news) => (
                <Link key={news.id} href={`/news/${news.slug}`} className="block p-4 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-100 last:border-0 group">
                  <div className="flex items-center space-x-2 text-xs text-muted-gray mb-2">
                    <span className="font-semibold text-primary-blue bg-blue-50 px-2 py-0.5 rounded">{news.category}</span>
                  </div>
                  <h4 className="font-bold text-charcoal group-hover:text-primary-blue transition-colors line-clamp-2 mb-1">{news.headline}</h4>
                  <p className="text-sm text-muted-gray line-clamp-2">{news.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
          {/* Decorative background shape */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-corporate-green rounded-full opacity-20 blur-2xl -z-10 hidden md:block"></div>
        </div>
      </div>
    </section>
  );
}
