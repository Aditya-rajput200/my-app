import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const projects = await db.portfolioProject.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });
    return Response.json(projects);
  } catch (error) {
    console.error("[PORTFOLIO GET]", error);
    return Response.json({ error: "Failed to fetch portfolio" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      title, filterKey, tag, client, metric, metric2, description,
      accent, size, visual, featured, published, order,
      thumbnail, videoUrl, services, results, reels,
    } = await request.json();

    const project = await db.portfolioProject.create({
      data: {
        title: title ?? "",
        filterKey: filterKey ?? "Branding",
        tag: tag ?? "",
        client: client ?? "",
        metric: metric ?? "",
        metric2: metric2 ?? "",
        description: description ?? "",
        accent: accent ?? "#7b2fff",
        size: size ?? "medium",
        visual: visual ?? "mesh",
        ...(featured !== undefined && { featured }),
        ...(published !== undefined && { published }),
        ...(order !== undefined && { order }),
        ...(thumbnail !== undefined && { thumbnail }),
        ...(videoUrl !== undefined && { videoUrl }),
        ...(services !== undefined && { services }),
        ...(results !== undefined && { results }),
        ...(reels !== undefined && { reels }),
      },
    });
    return Response.json(project, { status: 201 });
  } catch (error) {
    console.error("[PORTFOLIO POST]", error);
    return Response.json({ error: "Failed to create project" }, { status: 500 });
  }
}
