"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HomeHeroSlide } from "@/lib/home-hero-slides";

export function HomeHeroCarousel({ slides }: { slides: HomeHeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (
      slides.length < 2 ||
      paused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [slides.length, paused]);

  if (slides.length === 0) return null;

  return (
    <section
      className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden bg-deep-green text-white"
      aria-label="Featured homepage slides"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="relative flex h-[75svh] min-h-[34rem] max-h-[900px] items-center justify-center px-16 py-14 sm:h-[78svh] sm:min-h-[40rem] sm:px-24 sm:py-20 lg:px-32">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <article
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 motion-reduce:transition-none ${
                isActive ? "z-10 opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <img
                src={slide.imageUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
                loading={isActive ? "eager" : "lazy"}
                fetchPriority={isActive ? "high" : "auto"}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />
              <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16 text-center">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
                  {slide.subtitle}
                </p>
              </div>
            </article>
          );
        })}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Show previous slide"
              title="Previous slide"
              onClick={() =>
                setActiveIndex((index) => (index - 1 + slides.length) % slides.length)
              }
              className="absolute left-3 top-1/2 z-20 flex h-12 -translate-y-1/2 items-center justify-center gap-2 rounded-full bg-black/70 px-4 text-sm font-semibold text-white shadow-lg transition hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-8"
            >
              <ChevronLeft aria-hidden="true" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button
              type="button"
              aria-label="Show next slide"
              title="Next slide"
              onClick={() => setActiveIndex((index) => (index + 1) % slides.length)}
              className="absolute right-3 top-1/2 z-20 flex h-12 -translate-y-1/2 items-center justify-center gap-2 rounded-full bg-black/70 px-4 text-sm font-semibold text-white shadow-lg transition hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight aria-hidden="true" />
            </button>
            <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 shadow-lg">
              <div className="flex items-center gap-1.5" role="group" aria-label="Choose a slide">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Show slide ${index + 1}`}
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
