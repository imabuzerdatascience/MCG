export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
};

export const servicesData: Service[] = [
  {
    id: "legal-services",
    slug: "legal-services",
    title: "Legal Services",
    description: "Comprehensive legal support for corporate entities, covering compliance, employment, contracts, and disputes.",
    iconName: "Scale",
    features: [
      "Regulatory compliance",
      "Employment & labor law",
      "Litigation & dispute resolution",
      "Contract drafting & review",
      "Corporate governance",
      "Intellectual property protection"
    ]
  },
  {
    id: "registration-renewal",
    slug: "registration-renewal",
    title: "Registration & Renewal",
    description: "End-to-end assistance in establishing and maintaining corporate, industrial, and non-profit entities.",
    iconName: "FileCheck",
    features: [
      "Company & Industry Registration",
      "Firm & PAN Registration",
      "Trademark & Copyright",
      "EXIM Code & ISO Certification",
      "NGO / INGO / NPO Registration",
      "Renewal Services"
    ]
  },
  {
    id: "accounting-services",
    slug: "accounting-services",
    title: "Accounting Services",
    description: "Accurate and reliable financial record-keeping to ensure transparency and operational efficiency.",
    iconName: "Calculator",
    features: [
      "Bookkeeping & Bank reconciliation",
      "Payroll management",
      "Tax/VAT filing",
      "Cost accounting",
      "Cash flow management",
      "ERP accounting integration"
    ]
  },
  {
    id: "financial-management",
    slug: "financial-management",
    title: "Financial Management",
    description: "Strategic financial advisory to optimize resources, manage risks, and maximize profitability.",
    iconName: "PieChart",
    features: [
      "Internal auditing",
      "Tax planning",
      "Financial analysis & reporting",
      "Forensic accounting",
      "Budgeting & Risk management",
      "CFO advisory"
    ]
  },
  {
    id: "investment-corporate-finance",
    slug: "investment-corporate-finance",
    title: "Investment & Corporate Finance",
    description: "Expert guidance on capital structuring, valuation, and fundraising strategies.",
    iconName: "TrendingUp",
    features: [
      "Capital raising (Debt / Equity)",
      "Valuation & Due diligence",
      "Private equity & Venture capital advisory",
      "IPO & fundraising strategy"
    ]
  },
  {
    id: "tax-planning",
    slug: "tax-planning-management",
    title: "Tax Planning & Management",
    description: "Proactive tax strategies to minimize liabilities while ensuring full regulatory compliance.",
    iconName: "Landmark",
    features: [
      "Corporate tax strategy",
      "VAT compliance",
      "Tax dispute resolution",
      "International tax advisory"
    ]
  },
  {
    id: "hr-outsourcing",
    slug: "hr-outsourcing-talent-management",
    title: "HR & Talent Management",
    description: "Streamlined human resources solutions to build, retain, and manage a high-performing workforce.",
    iconName: "Users",
    features: [
      "Recruitment & onboarding",
      "Performance management",
      "HR compliance & policies",
      "Payroll administration"
    ]
  },
  {
    id: "ict-services",
    slug: "ict-services",
    title: "ICT Services",
    description: "Technology solutions that drive digital transformation and improve business efficiency.",
    iconName: "MonitorSmartphone",
    features: [
      "IT infrastructure consulting",
      "Software development",
      "Data security & compliance",
      "Cloud migration strategy"
    ]
  }
];
