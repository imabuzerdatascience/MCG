import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white pt-16 pb-8 border-t-[6px] border-primary-yellow">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img src="/logo.jpeg" alt="MGC Associates" className="w-12 h-12 object-contain rounded" />
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg leading-tight">MGC ASSOCIATES</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Pvt. Ltd.</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              A Group of Specialized Corporate Professionals for Complete Business Solutions.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About MGC</Link></li>
              <li><Link href="/leadership" className="text-gray-400 hover:text-white transition-colors text-sm">Leadership Team</Link></li>
              <li><Link href="/associates" className="text-gray-400 hover:text-white transition-colors text-sm">Our Associates</Link></li>
              <li><Link href="/clients" className="text-gray-400 hover:text-white transition-colors text-sm">Clients & Trust</Link></li>
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services/legal-services" className="text-gray-400 hover:text-white transition-colors text-sm">Legal Services</Link></li>
              <li><Link href="/services/registration-renewal" className="text-gray-400 hover:text-white transition-colors text-sm">Registration & Renewal</Link></li>
              <li><Link href="/services/accounting-services" className="text-gray-400 hover:text-white transition-colors text-sm">Accounting Services</Link></li>
              <li><Link href="/services/tax-planning-management" className="text-gray-400 hover:text-white transition-colors text-sm">Tax Planning</Link></li>
              <li><Link href="/services" className="text-primary-yellow font-medium hover:text-white transition-colors text-sm">View All Services →</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-corporate-green shrink-0 mt-0.5" />
                <span>
                  <strong>Contact Office:</strong><br />
                  Kathmandu Metropolitan Ward No. 15, Chamati, Bagmati Province, Nepal
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Phone className="w-5 h-5 text-corporate-green shrink-0" />
                <span>+977-9815239074 / 014-977786</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-corporate-green shrink-0" />
                <a href="mailto:info.mgcbusiness@gmail.com" className="hover:text-white transition-colors">info.mgcbusiness@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs mb-4 md:mb-0">
            &copy; {currentYear} MGC Associates Pvt. Ltd. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
