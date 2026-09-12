import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  createNewsItem,
  deleteNewsItem,
  getNewsItems,
  updateNewsItem,
} from "@/lib/news-data";

// News pages and the home section read news through lib/news-data with ISR;
// after an admin mutation we mark the affected public routes stale so the
// change is visible on the next visit instead of waiting for the ISR window.
function revalidateNewsRoutes() {
  revalidatePath("/", "layout"); // Refreshes the site chrome (news ticker) everywhere.
  revalidatePath("/news");
  revalidatePath("/news/[slug]", "page");
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await getNewsItems();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json().catch(() => undefined);
  const result = await createNewsItem(payload);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  revalidateNewsRoutes();
  return NextResponse.json({ success: true, item: result.item }, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json().catch(() => undefined)) as
    | { id?: unknown; item?: unknown }
    | undefined;
  const id = typeof payload?.id === "string" ? payload.id : undefined;
  if (!id || payload?.item === undefined) {
    return NextResponse.json({ error: "News item id and fields are required" }, { status: 400 });
  }

  const result = await updateNewsItem(id, payload.item);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  revalidateNewsRoutes();
  return NextResponse.json({ success: true, item: result.item });
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "News item id is required" }, { status: 400 });
  }

  const result = await deleteNewsItem(id);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  revalidateNewsRoutes();
  return NextResponse.json({ success: true });
}
