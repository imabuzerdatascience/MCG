import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "mgc_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

// Temporary development credential. Replace with a secure auth system before production.
export const ADMIN_EMAIL = "admin@mgc.local";
export const ADMIN_PASSWORD = "MGCAdmin@2026";

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") return "mgc-local-development-session-secret-change-me";
  throw new Error("Missing ADMIN_SESSION_SECRET environment variable");
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

export function createAdminSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `admin:${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidAdminSession(value?: string) {
  if (!value) return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;

  const [role, expiresAt] = payload.split(":");
  if (role !== "admin" || !expiresAt || Number(expiresAt) < Math.floor(Date.now() / 1000)) {
    return false;
  }

  const expected = sign(payload);
  if (signature.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}
