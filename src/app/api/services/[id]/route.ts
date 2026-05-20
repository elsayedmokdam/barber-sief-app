import { NextResponse } from "next/server";
import { deleteService, updateService } from "@/lib/server-store";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const updatedService = await updateService(id, body);

  if (!updatedService) {
    return NextResponse.json(
      { error: "Service not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(updatedService);
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;

  if (!(await deleteService(id))) {
    return NextResponse.json(
      { error: "Service not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true });
}
