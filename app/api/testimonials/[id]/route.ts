import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const testimonial = await db.testimonial.update({ where: { id }, data: body });
    return Response.json(testimonial);
  } catch (error) {
    console.error("[TESTIMONIALS/:id PUT]", error);
    return Response.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.testimonial.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error("[TESTIMONIALS/:id DELETE]", error);
    return Response.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
