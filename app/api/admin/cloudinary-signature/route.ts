import { NextResponse } from "next/server";
import { getCloudinaryConfig, cloudinary } from "@/lib/cloudinary";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request({ timestamp }, apiSecret);

    return NextResponse.json({ cloudName, apiKey, timestamp, signature });
  } catch (error) {
    console.error("Cloudinary signature error:", error);
    return NextResponse.json({ error: "Cloudinary is not configured" }, { status: 500 });
  }
}
