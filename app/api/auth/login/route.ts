import { NextRequest, NextResponse } from "next/server";

async function signToken(secret: string): Promise<string> {
  const ts = Date.now().toString();
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(ts));
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${ts}.${hex}`;
}

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json()) as { email: string; password: string };

  const ENV_EMAIL = process.env.ADMIN_EMAIL;
  const ENV_PASS = process.env.ADMIN_PASSWORD;
  const SECRET = process.env.ADMIN_SECRET;

  if (!ENV_EMAIL || !ENV_PASS || !SECRET) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  if (email !== ENV_EMAIL || password !== ENV_PASS) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await signToken(SECRET);
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 86400, // 24 hours
  });
  return res;
}
