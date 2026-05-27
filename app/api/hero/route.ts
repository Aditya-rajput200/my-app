import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    let hero = await db.heroContent.findFirst();
    if (!hero) {
      hero = await db.heroContent.create({ data: {} });
    }
    return Response.json(hero);
  } catch (error) {
    console.error("[HERO GET]", error);
    return Response.json({ error: "Failed to fetch hero content" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const existing = await db.heroContent.findFirst();
    const hero = existing
      ? await db.heroContent.update({ where: { id: existing.id }, data: body })
      : await db.heroContent.create({ data: body });
    return Response.json(hero);
  } catch (error) {
    console.error("[HERO PUT]", error);
    return Response.json({ error: "Failed to update hero content" }, { status: 500 });
  }
}
