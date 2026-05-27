import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const faq = await db.fAQ.update({ where: { id }, data: body });
    return Response.json(faq);
  } catch (error) {
    console.error("[FAQ/:id PUT]", error);
    return Response.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.fAQ.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error("[FAQ/:id DELETE]", error);
    return Response.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
