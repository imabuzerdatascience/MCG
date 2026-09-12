import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLatestNews } from "@/lib/news-data";
import { NewsCard } from "@/components/shared/NewsCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

export async function NewsInsights() {
  // Latest 3 items as previews (excerpt only); full bodies live on /news/[slug].
  const latestNews = await getLatestNews(3);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="md:w-2/3">
            <SectionHeader
              title="Latest News"
              subtitle="Stay updated with the latest corporate regulations, company news, and business insights."
            />
          </div>
          <div className="md:w-1/3 text-left md:text-right mb-12 md:mb-12">
            <Link
              href="/news"
              className="inline-flex items-center text-primary-blue font-semibold hover:text-dark-navy transition-colors group"
            >
              View All <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {latestNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <p className="text-muted-gray">No news has been published yet. Please check back soon.</p>
        )}
      </div>
    </section>
  );
}
