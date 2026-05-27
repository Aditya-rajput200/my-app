import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const services = await db.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return Response.json(services);
  } catch (error) {
    console.error("[SERVICES GET]", error);
    return Response.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const service = await db.service.create({ data: body });
    return Response.json(service, { status: 201 });
  } catch (error) {
    console.error("[SERVICES POST]", error);
    return Response.json({ error: "Failed to create service" }, { status: 500 });
  }
}
