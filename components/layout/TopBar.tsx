import { MapPin, Phone, Mail } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-dark-navy text-off-white text-xs py-2 hidden md:block">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <MapPin className="w-3 h-3 text-light-yellow" />
            <span>Kathmandu, Nepal</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-3 h-3 text-light-yellow" />
            <span>info.mgcbusiness@gmail.com</span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Phone className="w-3 h-3 text-light-yellow" />
            <span>+977-9815239074</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-3 h-3 text-light-yellow" />
            <span>014-977786</span>
          </div>
        </div>
      </div>
    </div>
  );
}
