import { NextResponse } from "next/server";
import { deleteBooking } from "@/lib/server-store";

interface Params {
  params: Promise<{ id: string }>;
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;

  if (!(await deleteBooking(id))) {
    return NextResponse.json(
      { error: "Booking not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true });
}
