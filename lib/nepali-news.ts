export type NepaliNewsItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  imageUrl?: string;
  publishedAt?: string;
};

const feedUrl = "https://kathmandupost.com/rss";
const trustedHost = "kathmandupost.com";
const imageHost = "assets-cdn.kathmandupost.com";

function decodeXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function readTag(item: string, tag: string): string {
  const match = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
}

export function parseNepaliNewsFeed(xml: string): NepaliNewsItem[] {
  const items: NepaliNewsItem[] = [];

  for (const match of xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)) {
    const content = match[1];
    const title = readTag(content, "title");
    const summary = readTag(content, "description");
    const url = readTag(content, "link");
    const publishedAt = readTag(content, "pubDate");

    if (!title || !summary || !url) continue;
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.protocol !== "https:" || parsedUrl.hostname !== trustedHost) continue;
    } catch {
      continue;
    }

    items.push({
      id: url,
      title: title.slice(0, 240),
      summary: summary.slice(0, 500),
      url,
      ...(publishedAt ? { publishedAt } : {}),
    });
  }

  return items;
}

function parseArticleImage(html: string): string | undefined {
  const imageMeta = html.match(
    /<meta\b(?=[^>]*\bproperty=["']og:image["'])[^>]*>/i,
  )?.[0];
  const imageUrl = imageMeta?.match(/\bcontent=["']([^"']+)["']/i)?.[1];
  if (!imageUrl) return undefined;

  try {
    const parsedUrl = new URL(imageUrl);
    return parsedUrl.protocol === "https:" && parsedUrl.hostname === imageHost
      ? parsedUrl.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

export async function getNepaliNews(): Promise<NepaliNewsItem[]> {
  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: 300 },
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
    });
    if (!response.ok) {
      throw new Error(`Kathmandu Post RSS request failed with status ${response.status}`);
    }

    const items = parseNepaliNewsFeed(await response.text()).slice(0, 15);
    if (items.length === 0) throw new Error("Kathmandu Post RSS returned no valid news items");
    return Promise.all(
      items.map(async (item) => {
        try {
          const articleResponse = await fetch(item.url, {
            next: { revalidate: 3600 },
            headers: { Accept: "text/html" },
          });
          if (!articleResponse.ok) {
            throw new Error(`Article image request failed with status ${articleResponse.status}`);
          }
          const imageUrl = parseArticleImage(await articleResponse.text());
          return imageUrl ? { ...item, imageUrl } : item;
        } catch (error) {
          console.error(`News image could not be loaded for ${item.url}:`, error);
          return item;
        }
      }),
    );
  } catch (error) {
    console.error("Nepali news feed could not be loaded:", error);
    return [];
  }
}
