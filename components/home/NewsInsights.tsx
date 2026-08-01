import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { newsData } from "@/data/news";
import { NewsCard } from "@/components/shared/NewsCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function NewsInsights() {
  const featuredNews = newsData.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="md:w-2/3">
            <SectionHeader 
              title="News, Notices & Business Insights" 
              subtitle="Stay updated with the latest corporate regulations, company news, and business insights."
            />
          </div>
          <div className="md:w-1/3 text-left md:text-right mb-12 md:mb-12">
            <Link 
              href="/news"
              className="inline-flex items-center text-primary-blue font-semibold hover:text-dark-navy transition-colors group"
            >
              View All News <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredNews.map(news => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>
    </section>
  );
}
