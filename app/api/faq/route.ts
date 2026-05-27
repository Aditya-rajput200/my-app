import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const faqs = await db.fAQ.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return Response.json(faqs);
  } catch (error) {
    console.error("[FAQ GET]", error);
    return Response.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const faq = await db.fAQ.create({ data: body });
    return Response.json(faq, { status: 201 });
  } catch (error) {
    console.error("[FAQ POST]", error);
    return Response.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
