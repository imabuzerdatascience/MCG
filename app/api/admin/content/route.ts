import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getMongoDb } from "@/lib/mongodb";

// News is managed through /api/admin/news as a first-class content type,
// so it is intentionally not part of the key/value siteContent allowlist.
const allowedKeys = new Set(["top-contact", "footer", "leadership", "clients"]);

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = new URL(request.url).searchParams.get("key");
  if (!key || !allowedKeys.has(key)) {
    return NextResponse.json({ error: "Invalid content key" }, { status: 400 });
  }

  try {
    const database = await getMongoDb();
    const content = await database.collection("siteContent").findOne({ key });
    return NextResponse.json({ data: content?.data ?? null });
  } catch (error) {
    console.error("Content read error:", error);
    return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json().catch(() => undefined)) as
    | { key?: unknown; data?: unknown }
    | undefined;
  const key = typeof payload?.key === "string" ? payload.key : undefined;
  const data = payload?.data;
  if (!key || !allowedKeys.has(key) || data === undefined) {
    return NextResponse.json({ error: "Invalid content payload" }, { status: 400 });
  }
  try {
    const database = await getMongoDb();
    await database.collection("siteContent").updateOne(
      { key },
      { $set: { key, data, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true },
    );
    return NextResponse.json({ success: true, storage: "mongodb" });
  } catch (error) {
    console.error("Content save error:", error);
    return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 });
  }
}
