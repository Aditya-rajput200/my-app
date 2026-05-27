import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const member = await db.teamMember.update({ where: { id }, data: body });
    return Response.json(member);
  } catch (error) {
    console.error("[TEAM/:id PUT]", error);
    return Response.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.teamMember.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error("[TEAM/:id DELETE]", error);
    return Response.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}
