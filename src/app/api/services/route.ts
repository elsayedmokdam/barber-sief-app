import { NextResponse } from "next/server";
import { addService, getServices } from "@/lib/server-store";

export async function GET() {
  return NextResponse.json(await getServices());
}

export async function POST(request: Request) {
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

  const newService = await addService({
    nameAr: body.nameAr,
    price: body.price,
    durationMinutes: body.durationMinutes,
  });

  return NextResponse.json(newService, { status: 201 });
}
