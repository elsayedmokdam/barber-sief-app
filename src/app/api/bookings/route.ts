import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Service } from "@/types";

function isService(value: unknown): value is Service {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Service).id === "string" &&
    typeof (value as Service).nameAr === "string" &&
    typeof (value as Service).price === "number" &&
    typeof (value as Service).durationMinutes === "number"
  );
}

function parseServiceArray(value: unknown): Service[] {
  if (!Array.isArray(value) || value.length === 0 || !value.every(isService)) {
    throw new Error("Invalid service payload");
  }
  return value;
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });

    const mapped = bookings.map((b) => ({
      ...b,
      services: parseServiceArray(b.services as unknown),
    }));

    return NextResponse.json(mapped);
  } catch (err) {
    console.error("[GET /api/bookings]", err);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body ||
      typeof body.customerName !== "string" ||
      typeof body.phoneNumber !== "string" ||
      typeof body.date !== "string" ||
      typeof body.timeSlot !== "string" ||
      !Array.isArray(body.services) ||
      body.services.length === 0 ||
      !body.services.every(isService) ||
      typeof body.totalCost !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid booking payload" },
        { status: 400 },
      );
    }

    const newBooking = await prisma.booking.create({
      data: {
        customerName: body.customerName,
        phoneNumber: body.phoneNumber,
        date: body.date,
        timeSlot: body.timeSlot,
        services: body.services,
        additionalNotes: body.additionalNotes ?? null,
        totalCost: body.totalCost,
      },
    });

    return NextResponse.json(
      { ...newBooking, services: parseServiceArray(newBooking.services as unknown) },
      { status: 201 },
    );
  } catch (err) {
    console.error("[POST /api/bookings]", err);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}
