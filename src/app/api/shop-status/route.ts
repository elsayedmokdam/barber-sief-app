import { NextResponse } from "next/server";
import { getShopStatus, setShopStatus } from "@/lib/server-store";

export async function GET() {
  return NextResponse.json(await getShopStatus());
}

export async function PATCH(request: Request) {
  const body = await request.json();

  if (!body || typeof body.isOpen !== "boolean") {
    return NextResponse.json(
      { error: "Invalid shop status payload" },
      { status: 400 },
    );
  }

  const updatedStatus = await setShopStatus({
    isOpen: body.isOpen,
    lastUpdated: Date.now(),
  });

  return NextResponse.json(updatedStatus);
}
