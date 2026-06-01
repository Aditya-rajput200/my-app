import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return Response.json(leads);
  } catch (error) {
    console.error("[LEADS GET]", error);
    return Response.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, service, budget, message, source } = await request.json();
    const lead = await db.lead.create({
      data: {
        name: name ?? null,
        email: email ?? null,
        phone: phone ?? null,
        service: service ?? null,
        budget: budget ?? null,
        message: message ?? "",
        source: source ?? "contact",
      },
    });
    return Response.json(lead, { status: 201 });
  } catch (error) {
    console.error("[LEADS POST]", error);
    return Response.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
