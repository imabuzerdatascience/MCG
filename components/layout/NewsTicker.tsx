"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { newsData } from "@/data/news";

export function NewsTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const importantNotices = newsData.filter(n => n.isImportantNotice);

  if (importantNotices.length === 0) return null;

  return (
    <div className="bg-light-yellow text-charcoal border-b border-yellow-300 py-2 relative overflow-hidden flex items-center">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center space-x-2 bg-light-yellow z-10 pr-4 font-bold text-sm shrink-0">
          <Bell className="w-4 h-4 text-primary-blue" />
          <span className="text-primary-blue uppercase tracking-wider text-xs">Latest Updates</span>
        </div>
        
        <div 
          className="flex-1 overflow-hidden relative h-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className={`flex space-x-12 absolute whitespace-nowrap animate-[ticker_30s_linear_infinite] ${isPaused ? '[animation-play-state:paused]' : ''}`}
          >
            {/* Duplicate for infinite scroll effect */}
            {[...importantNotices, ...importantNotices].map((notice, idx) => (
              <Link 
                key={`${notice.id}-${idx}`} 
                href={`/news/${notice.slug}`}
                className="text-sm hover:text-primary-blue transition-colors inline-block group"
              >
                <span className="font-semibold mr-2">{notice.date}</span>
                <span className="group-hover:underline">{notice.headline}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
