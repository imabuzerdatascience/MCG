export type NewsItem = {
  id: string;
  slug: string;
  category: string;
  headline: string;
  shortDescription: string;
  isImportantNotice: boolean;
  imageUrl?: string;
};

export const newsData: NewsItem[] = [
  {
    id: "1",
    slug: "company-registration-renewal-services",
    category: "Corporate Updates",
    
    headline: "Company Registration & Renewal Services Now Available",
    shortDescription: "MGC Associates has expanded its services to include full support for new company registrations and annual renewals.",
    isImportantNotice: true,
  },
  {
    id: "2",
    slug: "tax-vat-filing-compliance",
    category: "Tax & Compliance",
    // date: "2024-03-10",
    headline: "Tax/VAT Filing and Compliance Consultation Open",
    shortDescription: "Schedule a session with our financial experts to ensure your business is fully compliant with the latest tax and VAT regulations.",
    isImportantNotice: true,
  },
  {
    id: "3",
    slug: "startup-entrepreneurship-advisory",
    category: "Business Insights",
    // date: "2024-03-05",
    headline: "Startup & Entrepreneurship Advisory Program",
    shortDescription: "A new initiative to guide emerging businesses from conceptualization to execution, focusing on sustainable growth.",
    isImportantNotice: true,
  },
  {
    id: "4",
    slug: "import-export-exim-code",
    category: "Corporate Updates",
    // date: "2024-02-28",
    headline: "Import/Export and EXIM Code Registration Support",
    shortDescription: "Simplify your cross-border trade operations. We now offer comprehensive support for EXIM Code registrations.",
    isImportantNotice: true,
  },
  {
    id: "5",
    slug: "corporate-legal-consultation",
    category: "Legal Updates",
    // date: "2024-02-20",
    headline: "Corporate Legal Consultation Available",
    shortDescription: "Our team of specialized advocates is available for contract drafting, dispute resolution, and general legal advisory.",
    isImportantNotice: true,
  },
  {
    id: "6",
    slug: "annual-tax-planning-seminar",
    category: "Training & Events",
    // date: "2024-02-15",
    headline: "Annual Corporate Tax Planning Seminar",
    shortDescription: "Join our CA consultants for an in-depth seminar on effective corporate tax planning and risk management.",
    isImportantNotice: false,
  }
];
