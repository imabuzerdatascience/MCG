import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getMongoDb } from "@/lib/mongodb";

const allowedKeys = new Set(["top-contact", "footer", "news", "latest-news", "leadership", "clients"]);

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { key, data } = await request.json();
  if (!allowedKeys.has(key) || data === undefined) {
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
