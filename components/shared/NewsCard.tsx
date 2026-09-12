import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { NewsItem } from "@/data/news";
import { formatNewsDate, truncateChars } from "@/lib/utils";

// Preview card only: it renders the short excerpt (hard-truncated), never the
// article body. The full content lives on /news/[slug].
export function NewsCard({ news }: { news: NewsItem }) {
  return (
    <article className="card-surface group flex h-full flex-col rounded-2xl">
      {news.imageUrl ? (
        <Link href={`/news/${news.slug}`} className="block h-44 overflow-hidden" tabIndex={-1} aria-hidden="true">
          <img
            src={news.imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      ) : (
        <div className="flex h-1.5 bg-gradient-to-r from-primary-yellow via-corporate-green to-deep-green opacity-80" />
      )}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between mb-4">
          <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-deep-green">
            {news.category}
          </span>
          <span className="flex items-center text-xs text-muted-gray">
            <Calendar className="w-3 h-3 mr-1" />
            {formatNewsDate(news.date)}
          </span>
        </div>
        <h3 className="mb-3 text-xl font-bold text-deep-green transition-colors group-hover:text-dark-green">
          <Link href={`/news/${news.slug}`}>{news.title}</Link>
        </h3>
        <p className="mb-7 flex-1 text-sm leading-relaxed text-muted-gray line-clamp-3">
          {truncateChars(news.excerpt, 150)}
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
