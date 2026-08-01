import Link from "next/link";
import { ArrowRight, Scale, FileCheck, Calculator, PieChart, TrendingUp, Landmark, Users, MonitorSmartphone } from "lucide-react";
import type { Service } from "@/data/services";

const iconMap: Record<string, any> = {
  Scale, FileCheck, Calculator, PieChart, TrendingUp, Landmark, Users, MonitorSmartphone
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.iconName] || FileCheck;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
      <div className="w-12 h-12 bg-off-white rounded-lg flex items-center justify-center text-primary-blue mb-6 group-hover:bg-primary-blue group-hover:text-white transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-dark-navy mb-3 group-hover:text-primary-blue transition-colors">
        {service.title}
      </h3>
      <p className="text-muted-gray mb-6 text-sm leading-relaxed line-clamp-3">
        {service.description}
      </p>
      <Link 
        href={`/services/${service.slug}`}
        className="inline-flex items-center text-sm font-semibold text-corporate-green hover:text-dark-green transition-colors"
      >
        Learn more <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
