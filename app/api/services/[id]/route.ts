import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const service = await db.service.update({ where: { id }, data: body });
    return Response.json(service);
  } catch (error) {
    console.error("[SERVICES/:id PUT]", error);
    return Response.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.service.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error("[SERVICES/:id DELETE]", error);
    return Response.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
