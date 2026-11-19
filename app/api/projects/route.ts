import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { ProjectSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const all = searchParams.get("all") === "true"; // For admin to see unpublished

    const where: any = {};

    if (!all) {
      where.published = true;
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (categorySlug && categorySlug !== "all") {
      where.category = {
        slug: categorySlug,
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { overview: { contains: search } },
        { technologies: { contains: search } },
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        category: true,
        media: {
          orderBy: { orderIndex: "asc" },
        },
      },
      orderBy: [
        { featured: "desc" },
        { orderIndex: "asc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = ProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Ensure slug is unique
    const existingSlug = await prisma.project.findUnique({
      where: { slug: parsed.data.slug },
    });

    if (existingSlug) {
      return NextResponse.json(
        { success: false, error: "A project with this slug already exists" },
        { status: 409 }
      );
    }

    const project = await prisma.project.create({
      data: parsed.data,
      include: {
        category: true,
        media: true,
      },
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}
