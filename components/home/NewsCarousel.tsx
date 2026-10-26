"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import type { NepaliNewsItem } from "@/lib/nepali-news";

export function NewsCarousel({ items }: { items: NepaliNewsItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (
      items.length < 2 ||
      paused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % items.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [items.length, paused]);

  const activeItem = items[activeIndex];
  const showControls = items.length > 1;

  return (
    <section
      className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden bg-deep-green text-white"
      aria-label="Latest news from Nepal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="relative flex h-[75svh] min-h-[34rem] max-h-[900px] items-center justify-center px-16 py-14 sm:h-[78svh] sm:min-h-[40rem] sm:px-24 sm:py-20 lg:px-32">
        {activeItem ? (
          <article key={activeItem.id} className="absolute inset-0 flex items-center justify-center">
            {activeItem.imageUrl && (
              <img
                src={activeItem.imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                fetchPriority="high"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />
            <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16 text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-yellow/40 bg-black/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-yellow">
                <Newspaper className="h-4 w-4" aria-hidden="true" />
                Latest news from Nepal
              </div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {activeItem.title}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
                {activeItem.summary}
              </p>
              <a
                href={activeItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-md bg-primary-yellow px-6 py-3 font-semibold text-charcoal transition hover:bg-light-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Read full story
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-4 text-xs font-medium uppercase tracking-widest text-white/50">
                Source: The Kathmandu Post
              </p>
            </div>
          </article>
        ) : (
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <Newspaper className="mx-auto h-10 w-10 text-primary-yellow" aria-hidden="true" />
            <h1 className="mt-5 text-3xl font-bold">Nepal news is temporarily unavailable</h1>
            <p className="mt-3 text-white/75">
              Please check back shortly for the latest headlines.
            </p>
          </div>
        )}

        {showControls && (
          <>
            <button
              type="button"
              aria-label="Show previous news story"
              title="Previous story"
              onClick={() =>
                setActiveIndex((index) => (index - 1 + items.length) % items.length)
              }
              className="absolute left-3 top-1/2 z-20 flex h-12 -translate-y-1/2 items-center justify-center gap-2 rounded-full bg-black/70 px-4 text-sm font-semibold text-white shadow-lg transition hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-8"
            >
              <ChevronLeft aria-hidden="true" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button
              type="button"
              aria-label="Show next news story"
              title="Next story"
              onClick={() => setActiveIndex((index) => (index + 1) % items.length)}
              className="absolute right-3 top-1/2 z-20 flex h-12 -translate-y-1/2 items-center justify-center gap-2 rounded-full bg-black/70 px-4 text-sm font-semibold text-white shadow-lg transition hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight aria-hidden="true" />
            </button>
            <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 shadow-lg">
              <div className="flex items-center gap-1.5" role="group" aria-label="Choose a news story">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show news story ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      index === activeIndex
                        ? "w-6 bg-primary-yellow"
                        : "w-2.5 bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
