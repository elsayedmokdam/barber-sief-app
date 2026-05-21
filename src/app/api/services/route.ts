import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({ orderBy: { nameAr: "asc" } });
    return NextResponse.json(services);
  } catch (err) {
    console.error("[GET /api/services]", err);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body ||
      typeof body.nameAr !== "string" ||
      typeof body.price !== "number" ||
      typeof body.durationMinutes !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid service payload" },
        { status: 400 },
      );
    }

    const newService = await prisma.service.create({
      data: {
        nameAr: body.nameAr,
        price: body.price,
        durationMinutes: body.durationMinutes,
      },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (err) {
    console.error("[POST /api/services]", err);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 },
    );
  }
}
