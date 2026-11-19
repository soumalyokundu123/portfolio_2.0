import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { ExperienceSchema } from "@/lib/validations";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ isCurrent: "desc" }, { orderIndex: "asc" }, { createdAt: "desc" }],
    });

    const education = await prisma.education.findMany({
      orderBy: { orderIndex: "asc" },
    });

    return NextResponse.json({
      success: true,
      experiences,
      education,
    });
  } catch (error) {
    console.error("Error fetching experience:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch experience" },
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
    const parsed = ExperienceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const experience = await prisma.experience.create({
      data: parsed.data,
    });

    return NextResponse.json({ success: true, data: experience }, { status: 201 });
  } catch (error) {
    console.error("Error creating experience:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create experience" },
      { status: 500 }
    );
  }
}
