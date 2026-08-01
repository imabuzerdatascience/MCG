import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { NewsItem } from "@/data/news";

export function NewsCard({ news }: { news: NewsItem }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-primary-blue bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
            {news.category}
          </span>
          <span className="flex items-center text-xs text-muted-gray">
            <Calendar className="w-3 h-3 mr-1" />
            {news.date}
          </span>
        </div>
        <h3 className="text-lg font-bold text-dark-navy mb-3 group-hover:text-primary-blue transition-colors">
          <Link href={`/news/${news.slug}`}>{news.headline}</Link>
        </h3>
        <p className="text-muted-gray text-sm mb-6 flex-1 line-clamp-3">
          {news.shortDescription}
        </p>
        <Link 
          href={`/news/${news.slug}`}
          className="inline-flex items-center text-sm font-semibold text-corporate-green hover:text-dark-green transition-colors mt-auto"
        >
          Read Full Story <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
