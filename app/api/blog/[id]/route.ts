import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { BlogPostSchema } from "@/lib/validations";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [{ slug: id }, { id: id }],
      },
      include: {
        category: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Related posts in same category
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        published: true,
        categoryId: post.categoryId,
        id: { not: post.id },
      },
      take: 2,
      select: {
        title: true,
        slug: true,
        coverImage: true,
        createdAt: true,
        readingTime: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...post,
        relatedPosts,
      },
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog post" },
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
    const parsed = BlogPostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    if (parsed.data.slug !== existing.slug) {
      const duplicateSlug = await prisma.blogPost.findUnique({
        where: { slug: parsed.data.slug },
      });
      if (duplicateSlug) {
        return NextResponse.json(
          { success: false, error: "Slug is already used by another post" },
          { status: 409 }
        );
      }
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: parsed.data,
      include: { category: true },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update blog post" },
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
    await prisma.blogPost.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
