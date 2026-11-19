import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { ContactMessageSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth(req);
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    const unreadCount = await prisma.contactMessage.count({
      where: { isRead: false },
    });

    return NextResponse.json({
      success: true,
      unreadCount,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contact messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ContactMessageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const newMessage = await prisma.contactMessage.create({
      data: parsed.data,
    });

    // Optional email dispatch: if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [process.env.CONTACT_EMAIL_RECEIVER || "soumalyokundu123@gmail.com"],
            subject: `[Portfolio Inquiry] ${parsed.data.subject}`,
            html: `
              <h2>New Project Inquiry from ${parsed.data.name}</h2>
              <p><strong>Email:</strong> ${parsed.data.email}</p>
              <p><strong>Project Type:</strong> ${parsed.data.projectType || "General"}</p>
              <p><strong>Budget:</strong> ${parsed.data.budget || "Not specified"}</p>
              <p><strong>Subject:</strong> ${parsed.data.subject}</p>
              <hr/>
              <p><strong>Message:</strong></p>
              <p>${parsed.data.message.replace(/\n/g, "<br/>")}</p>
            `,
          }),
        });
      } catch (emailErr) {
        console.warn("Email delivery notification failed, message safely saved in DB:", emailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received! Soumalyo will get back to you shortly.",
        data: newMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling contact submission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit message" },
      { status: 500 }
    );
  }
}
