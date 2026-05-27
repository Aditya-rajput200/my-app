import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    let stats = await db.siteStats.findFirst();
    if (!stats) stats = await db.siteStats.create({ data: {} });

    const [activeProjects, teamCount, leadCount] = await Promise.all([
      db.portfolioProject.count({ where: { published: true } }),
      db.teamMember.count({ where: { published: true } }),
      db.lead.count(),
    ]);

    return Response.json({
      ...stats,
      activeProjects,
      teamCount,
      leadCount,
    });
  } catch (error) {
    console.error("[STATS GET]", error);
    return Response.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const existing = await db.siteStats.findFirst();
    const stats = existing
      ? await db.siteStats.update({ where: { id: existing.id }, data: body })
      : await db.siteStats.create({ data: body });
    return Response.json(stats);
  } catch (error) {
    console.error("[STATS PUT]", error);
    return Response.json({ error: "Failed to update stats" }, { status: 500 });
  }
}
