import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { error: "Booking id is required" },
      { status: 400 },
    );
  }

  try {
    await prisma.booking.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/bookings/[id]]", err);
    return NextResponse.json(
      { error: "Booking not found" },
      { status: 404 },
    );
  }
}
