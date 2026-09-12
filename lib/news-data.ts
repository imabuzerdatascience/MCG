// Server-side news data layer.
//
// Strategy: MongoDB is the source of truth when it is configured AND the
// `news` collection contains documents. Otherwise the static seed in
// data/news.ts is served so nothing breaks without a database. The first
// admin write seeds the collection from the static data, after which all
// reads come from MongoDB (see docs/EDITABLE-CONTENT-PLAN.md).
//
// NOTE: this module imports the MongoDB driver and must only be used from
// server components and route handlers — never from client components.
import type { Collection, Db } from "mongodb";
import { getMongoDb } from "./mongodb";
import { slugify } from "./utils";
import { newsData, type NewsItem } from "@/data/news";

export const NEWS_COLLECTION = "news";

export type NewsWriteResult =
  | { ok: true; item: NewsItem }
  | { ok: false; status: number; error: string };

type NewsDraft = Omit<NewsItem, "id">;

type NewsPatch = Partial<NewsDraft>;

function getNewsCollection(database: Db) {
  return database.collection(NEWS_COLLECTION);
}

function sortByDateDesc(items: NewsItem[]): NewsItem[] {
  return [...items].sort(
    (a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id),
  );
}

function mapNewsDoc(doc: Record<string, unknown>): NewsItem {
  const item: NewsItem = {
    id: String(doc.id ?? ""),
    slug: String(doc.slug ?? ""),
    category: String(doc.category ?? "News"),
    date: String(doc.date ?? ""),
    // Tolerate the legacy field names in case a document was written by older code.
    title: String(doc.title ?? doc.headline ?? ""),
    excerpt: String(doc.excerpt ?? doc.shortDescription ?? ""),
    body: String(doc.body ?? ""),
    isImportantNotice: Boolean(doc.isImportantNotice),
  };
  if (typeof doc.imageUrl === "string" && doc.imageUrl) item.imageUrl = doc.imageUrl;
  if (Array.isArray(doc.tags)) item.tags = doc.tags.map(String);
  return item;
}

async function readNewsFromMongo(): Promise<NewsItem[] | null> {
  const database = await getMongoDb();
  const documents = await getNewsCollection(database).find({}).toArray();
  if (documents.length === 0) return null; // Nothing administered yet → seed.
  return documents.map((doc) => mapNewsDoc(doc as unknown as Record<string, unknown>));
}

/** Latest-first list of news items: MongoDB when populated, static seed otherwise. */
export async function getNewsItems(): Promise<NewsItem[]> {
  try {
    const items = await readNewsFromMongo();
    return sortByDateDesc(items ?? newsData);
  } catch (error) {
    // MongoDB not configured or unreachable — graceful degradation to the seed.
    if (!(error instanceof Error && /MONGODB_URI|not reachable/.test(error.message))) {
      console.error("News read from MongoDB failed, falling back to seed:", error);
    }
    return sortByDateDesc(newsData);
  }
}

export async function getLatestNews(limit = 3): Promise<NewsItem[]> {
  return (await getNewsItems()).slice(0, limit);
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const items = await getNewsItems();
  return items.find((item) => item.slug === slug) ?? null;
}

async function ensureNewsSeeded(collection: Collection) {
  const existing = await collection.countDocuments({}, { limit: 1 });
  if (existing > 0) return;
  const now = new Date();
  try {
    await collection.createIndex({ slug: 1 }, { unique: true });
    await collection.createIndex({ id: 1 }, { unique: true });
    await collection.insertMany(
      newsData.map((item) => ({ ...item, createdAt: now, updatedAt: now })),
    );
  } catch (error) {
    // A concurrent seed or pre-existing documents are not fatal — log and continue.
    console.error("News seeding skipped:", error);
  }
}

async function assertSlugAvailable(
  collection: Collection,
  slug: string,
  exceptId?: string,
): Promise<boolean> {
  const query: Record<string, unknown> = { slug };
  if (exceptId) query.id = { $ne: exceptId };
  return (await collection.countDocuments(query, { limit: 1 })) === 0;
}

/** Validates an admin payload. Returns a sanitized draft or an error message. */
export function sanitizeNewsInput(
  payload: unknown,
): { ok: true; value: NewsPatch } | { ok: false; error: string } {
  if (typeof payload !== "object" || payload === null) {
    return { ok: false, error: "Invalid news payload" };
  }
  const raw = payload as Record<string, unknown>;
  const draft: NewsPatch = {};

  if (raw.title !== undefined) {
    const title = String(raw.title).trim();
    if (!title) return { ok: false, error: "Title is required" };
    draft.title = title;
  }
  if (raw.slug !== undefined) {
    const slug = slugify(String(raw.slug));
    if (!slug) return { ok: false, error: "Slug must contain letters or numbers" };
    draft.slug = slug;
  }
  if (raw.excerpt !== undefined) {
    const excerpt = String(raw.excerpt).trim();
    if (!excerpt) return { ok: false, error: "Excerpt is required" };
    draft.excerpt = excerpt.slice(0, 400);
  }
  if (raw.body !== undefined) {
    const body = String(raw.body).trim();
    if (!body) return { ok: false, error: "Body is required" };
    draft.body = body;
  }
  if (raw.category !== undefined) draft.category = String(raw.category).trim() || "News";
  if (raw.date !== undefined) {
    const date = String(raw.date).trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { ok: false, error: "Date must be YYYY-MM-DD" };
    draft.date = date;
  }
  if (raw.isImportantNotice !== undefined) {
    draft.isImportantNotice = Boolean(raw.isImportantNotice);
  }
  if (raw.imageUrl !== undefined) {
    const imageUrl = String(raw.imageUrl).trim();
    if (imageUrl && !/^https?:\/\//.test(imageUrl)) {
      return { ok: false, error: "Image URL must start with http:// or https://" };
    }
    if (imageUrl) draft.imageUrl = imageUrl;
  }
  if (raw.tags !== undefined) {
    const tags = Array.isArray(raw.tags)
      ? raw.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : String(raw.tags)
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
    if (tags.length > 0) draft.tags = tags.slice(0, 10);
  }
  return { ok: true, value: draft };
}

function makeNewsItem(id: string, draft: NewsPatch): NewsItem {
  return {
    id,
    slug: draft.slug ?? slugify(draft.title ?? "news"),
    category: draft.category ?? "News",
    date: draft.date ?? new Date().toISOString().slice(0, 10),
    title: draft.title ?? "Untitled news item",
    excerpt: draft.excerpt ?? "",
    body: draft.body ?? "",
    isImportantNotice: draft.isImportantNotice ?? false,
    ...(draft.imageUrl ? { imageUrl: draft.imageUrl } : {}),
    ...(draft.tags && draft.tags.length > 0 ? { tags: draft.tags } : {}),
  };
}

/** Creates a news item. Seeds the collection from static data on first write. */
export async function createNewsItem(payload: unknown): Promise<NewsWriteResult> {
  const sanitized = sanitizeNewsInput(payload);
  if (!sanitized.ok) return { ok: false, status: 400, error: sanitized.error };
  const value = sanitized.value;
  if (!value.title || !value.excerpt || !value.body) {
    return { ok: false, status: 400, error: "Title, excerpt and body are required" };
  }

  try {
    const database = await getMongoDb();
    const collection = getNewsCollection(database);
    await ensureNewsSeeded(collection);

    const item = makeNewsItem(crypto.randomUUID(), value);
    if (!(await assertSlugAvailable(collection, item.slug))) {
      return { ok: false, status: 409, error: "A news item with this URL slug already exists" };
    }
    const now = new Date();
    await collection.insertOne({ ...item, createdAt: now, updatedAt: now });
    return { ok: true, item };
  } catch (cause) {
    console.error("News create error:", cause);
    return { ok: false, status: 503, error: "MongoDB is not configured or not reachable" };
  }
}

/** Updates a news item by application id. Seeds the collection on first write. */
export async function updateNewsItem(id: string, payload: unknown): Promise<NewsWriteResult> {
  const sanitized = sanitizeNewsInput(payload);
  if (!sanitized.ok) return { ok: false, status: 400, error: sanitized.error };
  const value = sanitized.value;

  try {
    const database = await getMongoDb();
    const collection = getNewsCollection(database);
    await ensureNewsSeeded(collection);

    if (value.slug && !(await assertSlugAvailable(collection, value.slug, id))) {
      return { ok: false, status: 409, error: "A news item with this URL slug already exists" };
    }
    const result = await collection.findOneAndUpdate(
      { id },
      { $set: { ...value, updatedAt: new Date() } },
      { returnDocument: "after", projection: { _id: 0 } },
    );
    if (!result) return { ok: false, status: 404, error: "News item not found" };
    return { ok: true, item: mapNewsDoc(result as unknown as Record<string, unknown>) };
  } catch (cause) {
    console.error("News update error:", cause);
    return { ok: false, status: 503, error: "MongoDB is not configured or not reachable" };
  }
}

/** Deletes a news item by application id. */
export async function deleteNewsItem(id: string): Promise<NewsWriteResult> {
  try {
    const database = await getMongoDb();
    const collection = getNewsCollection(database);
    const result = await collection.findOneAndDelete({ id }, { projection: { _id: 0 } });
    if (!result) return { ok: false, status: 404, error: "News item not found" };
    return { ok: true, item: mapNewsDoc(result as unknown as Record<string, unknown>) };
  } catch (cause) {
    console.error("News delete error:", cause);
    return { ok: false, status: 503, error: "MongoDB is not configured or not reachable" };
  }
}
