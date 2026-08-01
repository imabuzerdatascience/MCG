import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 bg-dark-navy relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-primary-blue opacity-90 mix-blend-multiply"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-corporate-green/30 to-transparent skew-x-12 transform origin-top-right"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-corporate-green/20 to-transparent -skew-x-12 transform origin-bottom-left"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Need Expert Guidance for Your Business?
        </h2>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
          From company registration and legal compliance to finance, tax, HR and technology, our multidisciplinary team is ready to support your business.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link 
            href="/contact" 
            className="bg-corporate-green hover:bg-dark-green text-white px-8 py-4 rounded-md font-bold text-lg transition-colors shadow-lg w-full sm:w-auto"
          >
            Book a Consultation
          </Link>
          <Link 
            href="/contact" 
            className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-md font-bold text-lg transition-colors w-full sm:w-auto"
          >
            Contact Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
