import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const caseStudySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  results: z.array(z.string()),
  image: z.string().url(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  client: z.string().optional(),
  testimonial: z.string().optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = caseStudySchema.parse(body);

    const caseStudy = await prisma.caseStudy.create({
      data: {
        ...data,
        images: data.images || [],
        tags: data.tags || [],
      },
    });

    return NextResponse.json(caseStudy, { status: 201 });
  } catch (error) {
    console.error("Case study error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create case study" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");

    const where: any = {};
    if (published !== null) where.published = published === "true";
    if (featured !== null) where.featured = featured === "true";
    if (category) where.category = category;

    const caseStudies = await prisma.caseStudy.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(caseStudies);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch case studies" }, { status: 500 });
  }
}
