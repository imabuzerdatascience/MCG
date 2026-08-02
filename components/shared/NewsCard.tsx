import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { NewsItem } from "@/data/news";

export function NewsCard({ news }: { news: NewsItem }) {
  return (
    <article className="card-surface group flex h-full flex-col rounded-2xl">
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between mb-4">
          <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-deep-green">
            {news.category}
          </span>
          <span className="flex items-center text-xs text-muted-gray">
            <Calendar className="w-3 h-3 mr-1" />
            {news.date}
          </span>
        </div>
        <h3 className="mb-3 text-xl font-bold text-deep-green transition-colors group-hover:text-dark-green">
          <Link href={`/news/${news.slug}`}>{news.headline}</Link>
        </h3>
        <p className="mb-7 flex-1 text-sm leading-relaxed text-muted-gray line-clamp-3">
          {news.shortDescription}
        </p>
        <Link 
          href={`/news/${news.slug}`}
          className="mt-auto inline-flex items-center self-start text-sm font-semibold text-corporate-green transition-colors hover:text-dark-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-yellow"
        >
          Read Full Story <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
