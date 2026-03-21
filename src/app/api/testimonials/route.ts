import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  company: z.string().optional(),
  image: z.string().optional(),
  text: z.string().min(1),
  rating: z.number().min(1).max(5).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = testimonialSchema.parse(body);

    const testimonial = await prisma.testimonial.create({
      data,
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Testimonial error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");
    const featured = searchParams.get("featured");

    const where: any = {};
    if (published !== null) where.published = published === "true";
    if (featured !== null) where.featured = featured === "true";

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}
