import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail, projectInquiryEmail, confirmationEmail } from "@/lib/email";
import { z } from "zod";

const inquirySchema = z.object({
  businessName: z.string().min(1),
  industry: z.string().min(1),
  businessDescription: z.string().min(1),
  targetAudience: z.string().min(1),
  currentWebsite: z.string().optional(),
  selectedServices: z.array(z.string()),
  projectGoals: z.string().min(1),
  competitors: z.string().optional(),
  inspirationSites: z.string().optional(),
  uniqueFeatures: z.string().optional(),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  howDidYouHear: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = inquirySchema.parse(body);

    // Save to database
    const inquiry = await prisma.projectInquiry.create({
      data: {
        ...data,
        preferredDate: new Date(data.preferredDate),
      },
    });

    // Send notification email to admin
    const notificationEmail = process.env.NOTIFICATION_EMAIL || process.env.GMAIL_USER;
    if (notificationEmail) {
      await sendEmail({
        to: notificationEmail,
        subject: `🚀 New Project Inquiry: ${data.businessName}`,
        html: projectInquiryEmail({
          businessName: data.businessName,
          contactName: data.contactName,
          email: data.email,
          services: data.selectedServices,
          budget: data.budget,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
        }),
      });
    }

    // Send confirmation email to user
    await sendEmail({
      to: data.email,
      subject: "Thank you for your inquiry - OurBrio",
      html: confirmationEmail({
        name: data.contactName,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
      }),
    });

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 });
  } catch (error) {
    console.error("Inquiry error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const where = status ? { status: status as any } : {};

    const [inquiries, total] = await Promise.all([
      prisma.projectInquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.projectInquiry.count({ where }),
    ]);

    return NextResponse.json({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get inquiries error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}
