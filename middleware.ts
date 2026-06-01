import { NextRequest, NextResponse } from "next/server";

const COOKIE = "admin_session";

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

async function isValidToken(token: string, secret: string): Promise<boolean> {
  try {
    const dot = token.indexOf(".");
    if (dot === -1) return false;
    const ts = token.slice(0, dot);
    const sig = token.slice(dot + 1);

    const timestamp = parseInt(ts, 10);
    if (isNaN(timestamp)) return false;
    // Expire after 24 hours
    if (Date.now() - timestamp > 86_400_000) return false;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    return await crypto.subtle.verify(
      "HMAC",
      key,
      hexToBytes(sig),
      new TextEncoder().encode(ts),
    );
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Let the login page and its API through
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE)?.value ?? "";
  const secret = process.env.ADMIN_SECRET ?? "";

  if (secret && token && (await isValidToken(token, secret))) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
