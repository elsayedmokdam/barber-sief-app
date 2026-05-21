import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await request.json();

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Service id is required" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (body.nameAr && typeof body.nameAr === "string") updates.nameAr = body.nameAr;
  if (body.price !== undefined && typeof body.price === "number") updates.price = body.price;
  if (body.durationMinutes !== undefined && typeof body.durationMinutes === "number") updates.durationMinutes = body.durationMinutes;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "No valid service fields provided" },
      { status: 400 },
    );
  }

  try {
    const updatedService = await prisma.service.update({
      where: { id },
      data: updates,
    });
    return NextResponse.json(updatedService);
  } catch (err) {
    console.error("[PATCH /api/services/[id]]", err);
    return NextResponse.json(
      { error: "Service not found" },
      { status: 404 },
    );
  }
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Service id is required" }, { status: 400 });
  }

  try {
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/services/[id]]", err);
    return NextResponse.json(
      { error: "Service not found" },
      { status: 404 },
    );
  }
}
