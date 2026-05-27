import { db } from "@/lib/db";
import { NextRequest } from "next/server";

const DEFAULT_SETTINGS: Record<string, string> = {
  whatsappNumber: "919203626559",
  whatsappMessage: "Hi Kyron Productions, I'm interested in working with you.",
  email: "hello@kyronproductions.in",
  instagram: "@kyronproductions",
  youtube: "https://youtube.com/@kyronproductions",
  location: "Mumbai, India",
};

export async function GET() {
  try {
    const rows = await db.siteSettings.findMany();
    const settings: Record<string, string> = { ...DEFAULT_SETTINGS };
    for (const row of rows) settings[row.key] = row.value;
    return Response.json(settings);
  } catch (error) {
    console.error("[SETTINGS GET]", error);
    return Response.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: Record<string, string> = await request.json();
    const upserts = Object.entries(body).map(([key, value]) =>
      db.siteSettings.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    );
    await db.$transaction(upserts);
    return Response.json({ success: true });
  } catch (error) {
    console.error("[SETTINGS PUT]", error);
    return Response.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
