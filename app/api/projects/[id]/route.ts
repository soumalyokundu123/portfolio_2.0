import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { ProjectSchema } from "@/lib/validations";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Try finding by slug first, then by id
    const project = await prisma.project.findFirst({
      where: {
        OR: [{ slug: id }, { id: id }],
      },
      include: {
        category: true,
        media: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    // Find next and previous project for seamless navigation
    const nextProject = await prisma.project.findFirst({
      where: {
        published: true,
        orderIndex: { gt: project.orderIndex },
      },
      orderBy: { orderIndex: "asc" },
      select: { title: true, slug: true, thumbnail: true },
    });

    const prevProject = await prisma.project.findFirst({
      where: {
        published: true,
        orderIndex: { lt: project.orderIndex },
      },
      orderBy: { orderIndex: "desc" },
      select: { title: true, slug: true, thumbnail: true },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...project,
        nextProject: nextProject || null,
        prevProject: prevProject || null,
      },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const parsed = ProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Check slug uniqueness if changed
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    if (parsed.data.slug !== existing.slug) {
      const duplicateSlug = await prisma.project.findUnique({
        where: { slug: parsed.data.slug },
      });
      if (duplicateSlug) {
        return NextResponse.json(
          { success: false, error: "Slug is already used by another project" },
          { status: 409 }
        );
      }
    }

    const updated = await prisma.project.update({
      where: { id },
      data: parsed.data,
      include: {
        category: true,
        media: true,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
