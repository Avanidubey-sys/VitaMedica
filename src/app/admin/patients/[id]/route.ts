import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET a single patient by ID
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: parseInt(context.params.id) },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE a patient by ID
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await prisma.patient.delete({
      where: { id: parseInt(context.params.id) },
    });

    return NextResponse.json({ message: "Patient deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

