import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const lead = await db.lead.update({ where: { id }, data: { read: true } });
    return Response.json(lead);
  } catch (error) {
    console.error("[LEADS/:id PATCH]", error);
    return Response.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.lead.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error("[LEADS/:id DELETE]", error);
    return Response.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
