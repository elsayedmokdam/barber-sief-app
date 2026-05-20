import { NextResponse } from "next/server";
import { getIsOwner, setIsOwner } from "@/lib/server-store";

export async function GET() {
  return NextResponse.json({ isOwner: await getIsOwner() });
}

export async function PATCH(request: Request) {
  const body = await request.json();

  if (!body || typeof body.isOwner !== "boolean") {
    return NextResponse.json(
      { error: "Invalid owner payload" },
      { status: 400 },
    );
  }

  const updatedExist = await setIsOwner(body.isOwner);
  return NextResponse.json({ isOwner: updatedExist });
}
