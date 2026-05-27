import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return Response.json(testimonials);
  } catch (error) {
    console.error("[TESTIMONIALS GET]", error);
    return Response.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const testimonial = await db.testimonial.create({ data: body });
    return Response.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("[TESTIMONIALS POST]", error);
    return Response.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
