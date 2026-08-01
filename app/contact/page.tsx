import { PageHero } from "@/components/shared/PageHero";
import { MapPin, Phone, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
export default function ContactPage() {
  return (
    <>
      <PageHero 
        title="Contact Us"
        description="Get in touch with our multi-disciplinary team for any corporate, legal, or financial inquiries."
      />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-16">
          
          <div className="lg:w-1/3">
            <h3 className="text-2xl font-bold text-dark-navy mb-8">Reach Out to Us</h3>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-off-white rounded-lg flex items-center justify-center text-corporate-green mr-4 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-dark-navy mb-1">Contact Office</h4>
                  <p className="text-muted-gray text-sm">Kathmandu Metropolitan Ward No. 15,<br />Chamati, Bagmati Province, Nepal</p>
                  
                  <h4 className="font-bold text-dark-navy mt-4 mb-1">Registered Office</h4>
                  <p className="text-muted-gray text-sm">Dakshinkali Ward No. 1,<br />Kathmandu, Bagmati Province, Nepal</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-off-white rounded-lg flex items-center justify-center text-corporate-green mr-4 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-dark-navy mb-1">Phone</h4>
                  <p className="text-muted-gray text-sm">014-977786</p>
                  <p className="text-muted-gray text-sm">+977-9815239074</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-off-white rounded-lg flex items-center justify-center text-corporate-green mr-4 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-dark-navy mb-1">Email & Web</h4>
                  <p className="text-muted-gray text-sm">
                    <a href="mailto:info.mgcbusiness@gmail.com" className="hover:text-primary-blue">info.mgcbusiness@gmail.com</a>
                  </p>
                  <p className="text-muted-gray text-sm mt-1">
                    <a href="https://www.mgcassociates.com.np" target="_blank" rel="noreferrer" className="hover:text-primary-blue">www.mgcassociates.com.np</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <ContactForm />
          </div>
          
        </div>
      </section>
      
      {/* Google Maps Integration */}
      <section className="h-96 w-full relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113032.64621430931!2d85.25065426162235!3d27.708942728282362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1714032123456!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="MGC Associates Location in Kathmandu, Nepal"
        ></iframe>
      </section>
    </>
  );
}
