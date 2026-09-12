// Seed/fallback news content. When MongoDB is configured and the `news`
// collection has documents, lib/news-data.ts serves those instead; this file
// then only acts as the initial seed and offline fallback.
export type NewsItem = {
  id: string;
  slug: string;
  category: string;
  date: string; // ISO date string, e.g. "2024-04-15"
  title: string;
  /** Short summary (~1-2 sentences) used for preview cards; never the full body. */
  excerpt: string;
  /** Full article content. Paragraphs are separated by a blank line. */
  body: string;
  /** Featured flag: renders an "Important Notice" badge on the article page. */
  isImportantNotice: boolean;
  imageUrl?: string;
  tags?: string[];
};

export const newsData: NewsItem[] = [
  {
    id: "1",
    slug: "company-registration-renewal-services",
    category: "Corporate Updates",
    date: "2024-04-15",
    title: "Company Registration & Renewal Services Now Available",
    excerpt:
      "MGC Associates has expanded its services to include full support for new company registrations and annual renewals.",
    body: "MGC Associates is pleased to announce that company registration and annual renewal services are now fully available through our corporate practice.\n\nOur team handles the complete lifecycle: name reservation and approval, memorandum and articles of association, company registrar filing, PAN/VAT registration, and the annual renewal calendar that keeps every entity in good standing with the Office of the Company Registrar.\n\nWhether you are incorporating a private limited company for the first time or managing a portfolio of entities, our consultants provide a single point of contact for all statutory filings, so deadlines are never missed and compliance records stay current.",
    isImportantNotice: true,
    tags: ["Company Registration", "Renewal", "Compliance"],
  },
  {
    id: "2",
    slug: "tax-vat-filing-compliance",
    category: "Tax & Compliance",
    date: "2024-03-10",
    title: "Tax/VAT Filing and Compliance Consultation Open",
    excerpt:
      "Schedule a session with our financial experts to ensure your business is fully compliant with the latest tax and VAT regulations.",
    body: "Our tax and compliance desk is now accepting consultation bookings for the current fiscal year.\n\nSessions cover monthly VAT and income tax filing, TDS reconciliation, e-invoicing readiness, and a health check of your ledger against the latest Inland Revenue Department directives. Where gaps are identified, we prepare a remediation plan with clear responsibilities and timelines.\n\nClients who subscribe to our compliance calendar receive automatic reminders ahead of every statutory deadline, along with prepared filing working papers reviewed by a qualified CA before submission.",
    isImportantNotice: true,
    tags: ["Tax", "VAT", "IRD"],
  },
  {
    id: "3",
    slug: "startup-entrepreneurship-advisory",
    category: "Business Insights",
    date: "2024-03-05",
    title: "Startup & Entrepreneurship Advisory Program",
    excerpt:
      "A new initiative to guide emerging businesses from conceptualization to execution, focusing on sustainable growth.",
    body: "We have launched a dedicated advisory program for founders and early-stage businesses in Nepal.\n\nThe program pairs each founder with a multi-disciplinary team covering entity structuring, regulatory licensing, basic financial controls, and go-to-market compliance. It is designed to take a venture from concept note to a registered, bankable operation with clean books from day one.\n\nCohort members also receive quarterly reviews of their corporate governance practices, helping them prepare for institutional investment or bank financing when the time comes.",
    isImportantNotice: true,
    tags: ["Startups", "Advisory"],
  },
  {
    id: "4",
    slug: "import-export-exim-code",
    category: "Corporate Updates",
    date: "2024-02-28",
    title: "Import/Export and EXIM Code Registration Support",
    excerpt:
      "Simplify your cross-border trade operations. We now offer comprehensive support for EXIM Code registrations.",
    body: "Businesses engaged in cross-border trade can now rely on MGC Associates for end-to-end EXIM support.\n\nOur services include EXIM Code registration with the Department of Customs, customs agent coordination, HS classification guidance, and documentation review for both import and export consignments. We also advise on the licensing requirements that apply to restricted goods under prevailing Nepal customs rules.\n\nThe goal is simple: fewer clearance delays, accurate declarations, and a compliance trail that stands up to post-clearance audit.",
    isImportantNotice: true,
    tags: ["Import/Export", "Customs", "EXIM"],
  },
  {
    id: "5",
    slug: "corporate-legal-consultation",
    category: "Legal Updates",
    date: "2024-02-20",
    title: "Corporate Legal Consultation Available",
    excerpt:
      "Our team of specialized advocates is available for contract drafting, dispute resolution, and general legal advisory.",
    body: "Our legal practice is accepting new mandates for corporate advisory work.\n\nThe team drafts and reviews commercial contracts, employment agreements, shareholder arrangements, and vendor terms, and represents clients in negotiation and dispute resolution. For ongoing matters, retainer arrangements give your business on-call access to a specialized advocate.\n\nAll advisory work is coordinated with our accounting and compliance desks where relevant, so legal positions and financial reporting never pull in opposite directions.",
    isImportantNotice: true,
    tags: ["Legal", "Contracts"],
  },
  {
    id: "6",
    slug: "annual-tax-planning-seminar",
    category: "Training & Events",
    date: "2024-02-15",
    title: "Annual Corporate Tax Planning Seminar",
    excerpt:
      "Join our CA consultants for an in-depth seminar on effective corporate tax planning and risk management.",
    body: "Our annual corporate tax planning seminar brings together our CA consultants for a half-day session aimed at finance leads and business owners.\n\nThis year's agenda covers fiscal-year tax planning opportunities, recent IRD circulars and their practical impact, transfer pricing basics for related-party transactions, and common penalty triggers we see in audit practice.\n\nSeats are limited and offered to clients on a first-come basis. Contact our office to reserve a place for your finance team.",
    isImportantNotice: false,
    tags: ["Seminar", "Tax Planning"],
  },
  {
    id: "7",
    slug: "mcg-opens-new-representation-office",
    category: "News",
    date: "2024-05-02",
    title: "MGC Associates Opens New Representation Office in Bagmati Province",
    excerpt:
      "We have expanded our presence to better serve clients across the Bagmati region with local, on-the-ground support.",
    body: "MGC Associates has opened a new representation office in Bagmati Province to serve clients outside the capital more directly.\n\nThe office offers the same registration, tax, and compliance services as our Kathmandu head office, with staff who can attend local government offices in person. Clients in the region will no longer need to route routine filings through Kathmandu.\n\nExisting clients can continue to use their current contacts; new engagements from the region will be onboarded through the Bagmati office from this month onward.",
    isImportantNotice: false,
    tags: ["Company News", "Bagmati"],
  },
  {
    id: "8",
    slug: "tax-filing-deadline-reminder",
    category: "News",
    date: "2024-04-28",
    title: "Reminder: Annual Tax Filing Deadline Approaching",
    excerpt:
      "Ensure your annual tax and VAT filings are submitted before the upcoming deadline to avoid penalties and interest.",
    body: "A reminder to all clients that the annual income tax filing deadline is approaching.\n\nEntities that miss the deadline face interest on unpaid balances and penalties under the prevailing Tax Act, and late filing can also affect participation in future government tenders. Our team recommends reconciling TDS, VAT credits, and advance tax payments before preparing the final return.\n\nIf you would like MGC Associates to review or file your annual return, please share your records with our tax desk as early as possible so filings are not rushed at the deadline.",
    isImportantNotice: true,
    tags: ["Tax", "Deadline"],
  },
  {
    id: "9",
    slug: "free-compliance-workshop",
    category: "News",
    date: "2024-04-20",
    title: "Free Compliance Workshop for SMEs This Month",
    excerpt:
      "Join our consultants for a free workshop covering registration, tax and labour compliance basics for small businesses.",
    body: "This month MGC Associates is hosting a free compliance workshop for small and medium enterprises.\n\nThe session walks through the essentials: choosing the right entity and completing registration, the tax and VAT obligations that begin on day one, and labour compliance includingSSF and employee contracts. Real case examples from our consulting practice will be used throughout.\n\nThe workshop is free of charge, but seating is limited. Contact our office to register your interest and receive venue details.",
    isImportantNotice: false,
    tags: ["Workshop", "SME", "Compliance"],
  },
];
