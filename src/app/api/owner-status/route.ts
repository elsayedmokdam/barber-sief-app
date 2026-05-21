import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const owner = await prisma.ownerStatus.findFirst();
    return NextResponse.json({ isOwner: owner ? owner.isOwner : false });
  } catch (err) {
    console.error("[GET /api/owner-status]", err);
    return NextResponse.json({ error: "Failed to load owner status" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body.isOwner !== "boolean") {
      return NextResponse.json(
        { error: "Invalid owner payload" },
        { status: 400 },
      );
    }

    const upserted = await prisma.ownerStatus.upsert({
      where: { id: 1 },
      update: { isOwner: body.isOwner },
      create: { isOwner: body.isOwner },
    });

    return NextResponse.json({ isOwner: upserted.isOwner });
  } catch (err) {
    console.error("[PATCH /api/owner-status]", err);
    return NextResponse.json({ error: "Failed to update owner status" }, { status: 500 });
  }
}
