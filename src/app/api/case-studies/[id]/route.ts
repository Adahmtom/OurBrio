import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id: params.id },
    });

    if (!caseStudy) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 });
    }

    return NextResponse.json(caseStudy);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch case study" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const caseStudy = await prisma.caseStudy.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(caseStudy);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update case study" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.caseStudy.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete case study" }, { status: 500 });
  }
}
