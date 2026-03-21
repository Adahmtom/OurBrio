import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const blockedDateSchema = z.object({
  date: z.string().min(1),
  reason: z.string().optional(),
});

// Get blocked dates and available slots
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month"); // Format: YYYY-MM
    
    let dateFilter = {};
    if (month) {
      const [year, monthNum] = month.split("-").map(Number);
      const startDate = new Date(year, monthNum - 1, 1);
      const endDate = new Date(year, monthNum, 0);
      dateFilter = {
        date: {
          gte: startDate,
          lte: endDate,
        },
      };
    }

    const [blockedDates, availableSlots] = await Promise.all([
      prisma.blockedDate.findMany({
        where: dateFilter,
        orderBy: { date: "asc" },
      }),
      prisma.availableSlot.findMany({
        where: { isActive: true },
        orderBy: { dayOfWeek: "asc" },
      }),
    ]);

    return NextResponse.json({ blockedDates, availableSlots });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch calendar data" }, { status: 500 });
  }
}

// Add blocked date
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = blockedDateSchema.parse(body);

    const blockedDate = await prisma.blockedDate.create({
      data: {
        date: new Date(data.date),
        reason: data.reason,
      },
    });

    return NextResponse.json(blockedDate, { status: 201 });
  } catch (error) {
    console.error("Blocked date error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to block date" }, { status: 500 });
  }
}

// Delete blocked date
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const date = searchParams.get("date");

    if (id) {
      await prisma.blockedDate.delete({ where: { id } });
    } else if (date) {
      await prisma.blockedDate.delete({ where: { date: new Date(date) } });
    } else {
      return NextResponse.json({ error: "ID or date required" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to unblock date" }, { status: 500 });
  }
}
