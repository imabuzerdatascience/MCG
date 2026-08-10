import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/shared/PageHero";
import { NewsCard } from "@/components/shared/NewsCard";
import { newsData } from "@/data/news";

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <PageHero 
        title="News & Insights"
        description="Latest updates, corporate notices, and business insights from MGC Associates."
      />
      
      <section className="py-20 bg-off-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.map(news => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
