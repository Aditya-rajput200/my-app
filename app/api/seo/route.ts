import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    let seo = await db.seoMeta.findFirst();
    if (!seo) seo = await db.seoMeta.create({ data: {} });
    return Response.json(seo);
  } catch (error) {
    console.error("[SEO GET]", error);
    return Response.json({ error: "Failed to fetch SEO meta" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const existing = await db.seoMeta.findFirst();
    const seo = existing
      ? await db.seoMeta.update({ where: { id: existing.id }, data: body })
      : await db.seoMeta.create({ data: body });
    return Response.json(seo);
  } catch (error) {
    console.error("[SEO PUT]", error);
    return Response.json({ error: "Failed to update SEO meta" }, { status: 500 });
  }
}
