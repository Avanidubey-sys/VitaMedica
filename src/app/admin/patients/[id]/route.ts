import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DELETE patient by ID
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params; // ✅ access params from context
  const patientId = parseInt(id, 10);

  try {
    await prisma.patient.delete({ where: { id: patientId } });
    return NextResponse.json({ message: "Patient deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting patient" }, { status: 500 });
  }
}
