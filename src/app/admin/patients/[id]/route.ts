import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DELETE patient by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  await prisma.patient.delete({ where: { id } });
  return NextResponse.json({ message: "Patient deleted successfully" });
}
