import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const [
      totalInquiries,
      newInquiries,
      totalContacts,
      newContacts,
      totalCaseStudies,
      publishedCaseStudies,
      totalTestimonials,
      publishedTestimonials,
      recentInquiries,
      recentContacts,
    ] = await Promise.all([
      prisma.projectInquiry.count(),
      prisma.projectInquiry.count({ where: { status: "NEW" } }),
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({ where: { status: "NEW" } }),
      prisma.caseStudy.count(),
      prisma.caseStudy.count({ where: { published: true } }),
      prisma.testimonial.count(),
      prisma.testimonial.count({ where: { published: true } }),
      prisma.projectInquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          businessName: true,
          contactName: true,
          email: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.contactSubmission.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        inquiries: { total: totalInquiries, new: newInquiries },
        contacts: { total: totalContacts, new: newContacts },
        caseStudies: { total: totalCaseStudies, published: publishedCaseStudies },
        testimonials: { total: totalTestimonials, published: publishedTestimonials },
      },
      recent: {
        inquiries: recentInquiries,
        contacts: recentContacts,
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
