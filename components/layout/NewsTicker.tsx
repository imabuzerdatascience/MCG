import Link from "next/link";
import { Bell } from "lucide-react";
import { getLatestNews } from "@/lib/news-data";
import { formatNewsDate } from "@/lib/utils";

export async function NewsTicker() {
  const tickerItems = await getLatestNews(4);

  if (tickerItems.length === 0) return null;

  return (
    <div className="bg-light-yellow text-charcoal border-b border-yellow-300 py-2 relative overflow-hidden flex items-center">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center space-x-2 bg-light-yellow z-10 pr-4 font-bold text-sm shrink-0">
          <Bell className="w-4 h-4 text-deep-green" />
          <span className="text-deep-green uppercase tracking-wider text-xs">Latest News</span>
        </div>

        <div className="flex-1 overflow-hidden relative h-6">
          <div
            className="flex space-x-12 absolute whitespace-nowrap animate-[ticker_30s_linear_infinite] hover:[animation-play-state:paused]"
          >
            {/* Duplicate for infinite scroll effect */}
            {[...tickerItems, ...tickerItems].map((notice, idx) => (
              <Link
                key={`${notice.id}-${idx}`}
                href={`/news/${notice.slug}`}
                className="text-sm hover:text-deep-green transition-colors inline-block group"
              >
                <span className="font-semibold mr-2">{formatNewsDate(notice.date)}</span>
                <span className="group-hover:underline">{notice.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
