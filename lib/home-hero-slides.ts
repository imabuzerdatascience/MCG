export const HOME_HERO_SLIDES_KEY = "home-hero-slides";
export const MAX_HOME_HERO_SLIDES = 15;

export type HomeHeroSlide = {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
};

export const defaultHomeHeroSlides: HomeHeroSlide[] = [
  {
    id: "home-hero-1",
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=85",
    title: "Complete Business Solutions",
    subtitle: "One trusted partner for your business in Nepal.",
  },
  {
    id: "home-hero-2",
    imageUrl:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=85",
    title: "Expertise That Moves You Forward",
    subtitle: "Practical legal, financial, and management support for your next step.",
  },
  {
    id: "home-hero-3",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=85",
    title: "Build With Confidence",
    subtitle: "Reliable guidance to help your organization grow sustainably.",
  },
];

export function sanitizeHomeHeroSlides(
  payload: unknown,
): { ok: true; value: HomeHeroSlide[] } | { ok: false; error: string } {
  if (!Array.isArray(payload) || payload.length === 0) {
    return { ok: false, error: "Add at least one homepage slide" };
  }
  if (payload.length > MAX_HOME_HERO_SLIDES) {
    return { ok: false, error: `You can add up to ${MAX_HOME_HERO_SLIDES} slides` };
  }

  const slides: HomeHeroSlide[] = [];
  const ids = new Set<string>();
  for (const item of payload) {
    if (typeof item !== "object" || item === null) {
      return { ok: false, error: "Each slide must be an object" };
    }

    const raw = item as Record<string, unknown>;
    const id = typeof raw.id === "string" ? raw.id.trim() : "";
    const imageUrl = typeof raw.imageUrl === "string" ? raw.imageUrl.trim() : "";
    const title = typeof raw.title === "string" ? raw.title.trim() : "";
    const subtitle = typeof raw.subtitle === "string" ? raw.subtitle.trim() : "";

    if (!id || id.length > 80 || ids.has(id)) {
      return { ok: false, error: "Each slide must have a unique identifier" };
    }
    ids.add(id);
    if (
      !imageUrl ||
      imageUrl.length > 2048 ||
      (!imageUrl.startsWith("/") && !/^https?:\/\//i.test(imageUrl)) ||
      imageUrl.startsWith("//")
    ) {
      return { ok: false, error: "Each slide needs a valid image URL" };
    }
    if (!title || title.length > 200) {
      return { ok: false, error: "Each slide needs a title of 200 characters or fewer" };
    }
    if (!subtitle || subtitle.length > 500) {
      return { ok: false, error: "Each slide needs a subheading of 500 characters or fewer" };
    }

    slides.push({ id, imageUrl, title, subtitle });
  }

  return { ok: true, value: slides };
}

export function getHomeHeroSlidesOrDefaults(payload: unknown): HomeHeroSlide[] {
  if (!Array.isArray(payload) || payload.length === 0) return defaultHomeHeroSlides;
  const result = sanitizeHomeHeroSlides(payload);
  if (!result.ok) {
    console.error("Stored homepage slides are invalid:", result.error);
    return defaultHomeHeroSlides;
  }
  return result.value;
}
