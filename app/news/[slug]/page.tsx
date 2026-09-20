import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/PageHero";
import { getNewsBySlug, getNewsItems } from "@/lib/news-data";
import { Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";

// ISR: known slugs are prerendered at build time; slugs that only exist in
// MongoDB are rendered on first request (dynamicParams defaults to true) and
// then cached. Both paths refresh every 5 minutes and immediately after admin
// mutations via revalidatePath in /api/admin/news.
// export const revalidate = 300;

export async function generateStaticParams() {
  const newsItems = await getNewsItems();
  return newsItems.map((news) => ({
    slug: news.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const news = await getNewsBySlug(resolvedParams.slug);
  if (!news) return { title: "News not found | MGC Associates" };
  return {
    title: `${news.title} | MGC Associates`,
    description: news.excerpt,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const news = await getNewsBySlug(resolvedParams.slug);

  if (!news) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={news.title}
        description={news.excerpt}
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/news"
            className="inline-flex items-center text-primary-blue hover:text-dark-navy font-semibold mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to News
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {news.imageUrl && (
              <img src={news.imageUrl} alt={news.title} className="h-64 w-full object-cover md:h-80" />
            )}
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center text-sm font-semibold text-primary-blue bg-blue-50 px-4 py-2 rounded-full uppercase tracking-wider">
                  <Tag className="w-4 h-4 mr-2" />
                  {news.category}
                </div>
                
                {news.isImportantNotice && (
                  <div className="bg-light-yellow text-charcoal text-xs font-bold px-3 py-1 rounded border border-yellow-300 uppercase">
                    Important Notice
                  </div>
                )}
              </div>

              <article className="prose prose-lg max-w-none prose-headings:text-dark-navy prose-a:text-primary-blue">
                <p className="text-xl text-charcoal leading-relaxed mb-6 font-medium">
                  {news.excerpt}
                </p>
                {news.body
                  .split(/\n{2,}/)
                  .filter((paragraph) => paragraph.trim().length > 0)
                  .map((paragraph, index) => (
                    <p key={index} className="text-muted-gray leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  ))}

                {news.tags && news.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8 not-prose">
                    {news.tags.map((tag) => (
                      <span key={tag} className="text-xs font-semibold text-deep-green bg-off-white border border-gray-200 px-3 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="bg-off-white p-6 rounded-lg border border-gray-100 mt-10 not-prose">
                  <h4 className="font-bold text-dark-navy mb-2">Need consultation on this topic?</h4>
                  <p className="text-sm text-muted-gray mb-4">Contact our specialized team today.</p>
                  <Link href="/contact" className="inline-block bg-corporate-green text-white px-6 py-2 rounded font-semibold text-sm hover:bg-dark-green transition-colors">
                    Contact Us
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
