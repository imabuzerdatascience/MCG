import Link from "next/link";
import { ArrowRight, Scale, FileCheck, Calculator, PieChart, TrendingUp, Landmark, Users, MonitorSmartphone } from "lucide-react";
import type { Service } from "@/data/services";

const iconMap: Record<string, any> = {
  Scale, FileCheck, Calculator, PieChart, TrendingUp, Landmark, Users, MonitorSmartphone
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.iconName] || FileCheck;

  return (
    <div className="card-surface group flex h-full flex-col rounded-2xl p-7">
      <div className="card-icon mb-6 flex h-12 w-12 items-center justify-center rounded-xl">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="mb-3 text-xl font-bold text-deep-green transition-colors group-hover:text-dark-green">
        {service.title}
      </h3>
      <p className="mb-7 flex-1 text-sm leading-relaxed text-muted-gray line-clamp-3">
        {service.description}
      </p>
      <Link 
        href={`/services/${service.slug}`}
        className="inline-flex items-center self-start text-sm font-semibold text-corporate-green transition-colors hover:text-dark-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-yellow"
      >
        Learn more <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
