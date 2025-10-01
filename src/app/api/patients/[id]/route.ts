import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET a single patient by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json(patient, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching patient" },
      { status: 500 }
    );
  }
}
// UPDATE patient by ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, age, gender } = body;

    const updatedPatient = await prisma.patient.update({
      where: { id: parseInt(params.id) },
      data: { name, age, gender },
    });

    return NextResponse.json(updatedPatient, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating patient" },
      { status: 500 }
    );
  }
}
// DELETE /api/patients/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedPatient = await prisma.patient.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(deletedPatient);
  } catch (error) {
    return NextResponse.json(
      { error: "Patient not found" },
      { status: 404 }
    );
  }
}


