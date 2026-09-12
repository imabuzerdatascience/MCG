import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/shared/PageHero";
import { NewsCard } from "@/components/shared/NewsCard";
import { getNewsItems } from "@/lib/news-data";

// ISR: prerendered at build, refreshed at most 5 minutes later (and instantly
// after admin mutations via revalidatePath in /api/admin/news).
export const revalidate = 300;

export const metadata: Metadata = {
  title: "News & Insights | MGC Associates",
  description: "Latest updates, corporate notices, and business insights from MGC Associates.",
};

export default async function NewsPage() {
  const newsItems = await getNewsItems();

  return (
    <>
      <Navbar />
      <PageHero
        title="News & Insights"
        description="Latest updates, corporate notices, and business insights from MGC Associates."
      />

      <section className="py-20 bg-off-white">
        <div className="container mx-auto px-4">
          {newsItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-gray">No news has been published yet. Please check back soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
