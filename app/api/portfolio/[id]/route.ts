import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await db.portfolioProject.findUnique({ where: { id } });
    if (!project) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json(project);
  } catch (error) {
    console.error("[PORTFOLIO/:id GET]", error);
    return Response.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const {
      title, filterKey, tag, client, metric, metric2, description,
      accent, size, visual, featured, published, order,
      thumbnail, videoUrl, services, results, reels,
    } = await request.json();

    const project = await db.portfolioProject.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(filterKey !== undefined && { filterKey }),
        ...(tag !== undefined && { tag }),
        ...(client !== undefined && { client }),
        ...(metric !== undefined && { metric }),
        ...(metric2 !== undefined && { metric2 }),
        ...(description !== undefined && { description }),
        ...(accent !== undefined && { accent }),
        ...(size !== undefined && { size }),
        ...(visual !== undefined && { visual }),
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
    return Response.json(project);
  } catch (error) {
    console.error("[PORTFOLIO/:id PUT]", error);
    return Response.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.portfolioProject.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (error) {
    console.error("[PORTFOLIO/:id DELETE]", error);
    return Response.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
