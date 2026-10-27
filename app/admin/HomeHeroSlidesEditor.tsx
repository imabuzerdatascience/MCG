"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import { ImageUploadField } from "./ImageUploadField";
import { MAX_HOME_HERO_SLIDES, type HomeHeroSlide } from "@/lib/home-hero-slides";
import type { NewsSaveResult } from "./VisualContentEditors";

type Props = {
  items: HomeHeroSlide[];
  setItems: React.Dispatch<React.SetStateAction<HomeHeroSlide[]>>;
  onSave: () => Promise<NewsSaveResult>;
};

function SlideTextField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const className =
    "mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10";
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      {multiline ? (
        <textarea
          className={`${className} min-h-28 resize-y`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          maxLength={500}
        />
      ) : (
        <input
          className={className}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          maxLength={200}
        />
      )}
    </label>
  );
}

export function HomeHeroSlidesEditor({ items, setItems, onSave }: Props) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(index: number, changes: Partial<HomeHeroSlide>) {
    setItems((current) =>
      current.map((slide, slideIndex) =>
        slideIndex === index ? { ...slide, ...changes } : slide,
      ),
    );
    setError("");
  }

  function move(index: number, direction: -1 | 1) {
    setItems((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const reordered = [...current];
      [reordered[index], reordered[nextIndex]] = [reordered[nextIndex], reordered[index]];
      return reordered;
    });
  }

  function addSlide() {
    if (items.length >= MAX_HOME_HERO_SLIDES) return;
    setItems((current) => [
      ...current,
      {
        id: `home-hero-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        imageUrl: "",
        title: "",
        subtitle: "",
      },
    ]);
  }

  async function save() {
    setSaving(true);
    setError("");
    const result = await onSave();
    setSaving(false);
    if (!result.ok) setError(result.error ?? "Could not save homepage slides");
  }

  return (
    <section>
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Homepage hero slides</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Edit the background image, headline, and subheading shown in the homepage carousel.
            Changes appear on the website after saving.
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-400">
            {items.length} / {MAX_HOME_HERO_SLIDES} slides
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => void save()}
            disabled={saving}
            className="rounded-lg bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save slides"}
          </button>
          <button
            type="button"
            onClick={addSlide}
            disabled={items.length >= MAX_HOME_HERO_SLIDES}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Add slide
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="space-y-5">
        {items.map((slide, index) => (
          <article key={slide.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="font-bold text-slate-900">Slide {index + 1}</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label={`Move slide ${index + 1} up`}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-amber-400 disabled:opacity-40"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                  aria-label={`Move slide ${index + 1} down`}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-amber-400 disabled:opacity-40"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (items.length <= 1) {
                      setError("Keep at least one homepage slide");
                      return;
                    }
                    setItems((current) => current.filter((entry) => entry.id !== slide.id));
                  }}
                  aria-label={`Remove slide ${index + 1}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
              <div className="space-y-4">
                <ImageUploadField
                  label="Background image"
                  value={slide.imageUrl}
                  onChangeAction={(imageUrl) => update(index, { imageUrl })}
                />
                <SlideTextField
                  label="Or paste an image URL"
                  value={slide.imageUrl}
                  onChange={(imageUrl) => update(index, { imageUrl })}
                />
                <p className="flex items-center gap-2 text-xs text-slate-500">
                  <ImageIcon className="h-4 w-4" aria-hidden="true" />
                  Use a wide landscape image for best results.
                </p>
              </div>
              <div className="space-y-5">
                <SlideTextField
                  label="Title"
                  value={slide.title}
                  onChange={(title) => update(index, { title })}
                />
                <SlideTextField
                  label="Subheading"
                  value={slide.subtitle}
                  onChange={(subtitle) => update(index, { subtitle })}
                  multiline
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
