import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    const settings = await prisma.siteSettings.findFirst();
    const socialLinks = await prisma.socialLink.findMany({
      orderBy: { orderIndex: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: {
        profile,
        settings,
        socialLinks,
      },
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await requireAuth(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { profile: profileData, settings: settingsData, socialLinks: socialData } = body;

    let updatedProfile = null;
    if (profileData) {
      const existingProfile = await prisma.profile.findFirst();
      if (existingProfile) {
        updatedProfile = await prisma.profile.update({
          where: { id: existingProfile.id },
          data: profileData,
        });
      } else {
        updatedProfile = await prisma.profile.create({
          data: profileData,
        });
      }
    }

    let updatedSettings = null;
    if (settingsData) {
      const existingSettings = await prisma.siteSettings.findFirst();
      if (existingSettings) {
        updatedSettings = await prisma.siteSettings.update({
          where: { id: existingSettings.id },
          data: settingsData,
        });
      } else {
        updatedSettings = await prisma.siteSettings.create({
          data: settingsData,
        });
      }
    }

    if (Array.isArray(socialData)) {
      for (const item of socialData) {
        if (item.id) {
          await prisma.socialLink.update({
            where: { id: item.id },
            data: {
              platform: item.platform,
              url: item.url,
              iconName: item.iconName,
              orderIndex: item.orderIndex ?? 0,
            },
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Settings and profile updated successfully",
      data: {
        profile: updatedProfile,
        settings: updatedSettings,
      },
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
