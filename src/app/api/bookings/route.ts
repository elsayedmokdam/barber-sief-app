import { NextResponse } from "next/server";
import { addBooking, getBookings } from "@/lib/server-store";

export async function GET() {
  return NextResponse.json(await getBookings());
}

export async function POST(request: Request) {
  const body = await request.json();

  if (
    !body ||
    typeof body.customerName !== "string" ||
    typeof body.phoneNumber !== "string" ||
    typeof body.date !== "string" ||
    typeof body.timeSlot !== "string" ||
    !Array.isArray(body.services) ||
    typeof body.totalCost !== "number"
  ) {
    return NextResponse.json(
      { error: "Invalid booking payload" },
      { status: 400 },
    );
  }

  const newBooking = await addBooking({
    customerName: body.customerName,
    phoneNumber: body.phoneNumber,
    date: body.date,
    timeSlot: body.timeSlot,
    services: body.services,
    additionalNotes: body.additionalNotes || "",
    totalCost: body.totalCost,
  });

  return NextResponse.json(newBooking, { status: 201 });
}
