import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const members = await db.teamMember.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return Response.json(members);
  } catch (error) {
    console.error("[TEAM GET]", error);
    return Response.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const member = await db.teamMember.create({ data: body });
    return Response.json(member, { status: 201 });
  } catch (error) {
    console.error("[TEAM POST]", error);
    return Response.json({ error: "Failed to create team member" }, { status: 500 });
  }
}
