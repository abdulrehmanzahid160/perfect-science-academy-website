import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify, SignJWT } from "jose";

export const ADMIN_COOKIE_NAME = "psa_admin_session";
export const ADMIN_SESSION_SECONDS = 8 * 60 * 60;

function sessionKey() {
  const secret = process.env.PSA_SESSION_SECRET;
  return secret ? new TextEncoder().encode(secret) : null;
}

export function isAdminConfigured() {
  return Boolean(
    process.env.PSA_ADMIN_PASSWORD &&
    process.env.PSA_ADMIN_PASSWORD.length >= 12 &&
    process.env.PSA_SESSION_SECRET &&
    process.env.PSA_SESSION_SECRET.length >= 32,
  );
}

export function adminPasswordMatches(candidate: string) {
  const expected = process.env.PSA_ADMIN_PASSWORD;
  if (!expected || !isAdminConfigured()) return false;

  const candidateHash = createHash("sha256").update(candidate).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(candidateHash, expectedHash);
}

export async function createAdminToken() {
  const key = sessionKey();
  if (!key || !isAdminConfigured()) throw new Error("Admin authentication is not configured.");

  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("psa-admin")
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_SECONDS}s`)
    .sign(key);
}

export async function verifyAdminToken(token?: string) {
  const key = sessionKey();
  if (!token || !key || !isAdminConfigured()) return false;

  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"], subject: "psa-admin" });
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function hasAdminSession() {
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}

export async function requireAdminSession() {
  if (!(await hasAdminSession())) redirect("/admin/login");
  return { role: "admin" as const };
}
