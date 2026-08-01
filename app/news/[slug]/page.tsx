import { notFound } from "next/navigation";
import { PageHero } from "@/components/shared/PageHero";
import { newsData } from "@/data/news";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return newsData.map((news) => ({
    slug: news.slug,
  }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const news = newsData.find(n => n.slug === resolvedParams.slug);

  if (!news) {
    notFound();
  }

  return (
    <>
      <PageHero 
        title={news.headline}
        description={news.shortDescription}
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
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center text-sm font-semibold text-primary-blue bg-blue-50 px-4 py-2 rounded-full uppercase tracking-wider">
                  <Tag className="w-4 h-4 mr-2" />
                  {news.category}
                </div>
                <div className="flex items-center text-muted-gray font-medium">
                  <Calendar className="w-5 h-5 mr-2" />
                  Published on: {news.date}
                </div>
                {news.isImportantNotice && (
                  <div className="bg-light-yellow text-charcoal text-xs font-bold px-3 py-1 rounded border border-yellow-300 uppercase">
                    Important Notice
                  </div>
                )}
              </div>
              
              <div className="prose prose-lg max-w-none prose-headings:text-dark-navy prose-a:text-primary-blue">
                <p className="text-xl text-charcoal leading-relaxed mb-6 font-medium">
                  {news.shortDescription}
                </p>
                <p className="text-muted-gray leading-relaxed mb-6">
                  At MGC Associates, we are committed to keeping our clients informed about the latest regulatory changes, corporate requirements, and service expansions. This update forms part of our ongoing effort to provide seamless and comprehensive business solutions.
                </p>
                <p className="text-muted-gray leading-relaxed mb-6">
                  For more detailed information or to discuss how this might impact your specific business operations, please do not hesitate to contact our consulting team. Our multi-disciplinary experts are always ready to assist you in navigating these updates effectively.
                </p>
                
                <div className="bg-off-white p-6 rounded-lg border border-gray-100 mt-10">
                  <h4 className="font-bold text-dark-navy mb-2">Need consultation on this topic?</h4>
                  <p className="text-sm text-muted-gray mb-4">Contact our specialized team today.</p>
                  <Link href="/contact" className="inline-block bg-corporate-green text-white px-6 py-2 rounded font-semibold text-sm hover:bg-dark-green transition-colors">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
