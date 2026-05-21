import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const status = await prisma.shopStatus.findFirst();
    if (!status) {
      return NextResponse.json({ isOpen: true, lastUpdated: Date.now() });
    }
    return NextResponse.json({ isOpen: status.isOpen, lastUpdated: status.lastUpdated.getTime() });
  } catch (err) {
    console.error("[GET /api/shop-status]", err);
    return NextResponse.json({ error: "Failed to load shop status" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body.isOpen !== "boolean") {
      return NextResponse.json(
        { error: "Invalid shop status payload" },
        { status: 400 },
      );
    }

    const now = new Date();
    const upserted = await prisma.shopStatus.upsert({
      where: { id: 1 },
      update: { isOpen: body.isOpen, lastUpdated: now },
      create: { isOpen: body.isOpen, lastUpdated: now },
    });

    return NextResponse.json({ isOpen: upserted.isOpen, lastUpdated: upserted.lastUpdated.getTime() });
  } catch (err) {
    console.error("[PATCH /api/shop-status]", err);
    return NextResponse.json({ error: "Failed to update shop status" }, { status: 500 });
  }
}
