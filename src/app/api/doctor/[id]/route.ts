import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET doctor by ID
export async function GET(
  _req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const doctor = await prisma.doctor.findUnique({
      where: { id: Number(id) },
      include: { appointments: true }, // optional
    });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json(doctor, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching doctor" },
      { status: 500 }
    );
  }
}

// PUT update doctor
export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const body = await req.json();
    const { name, specialization, email, phone } = body;

    const updatedDoctor = await prisma.doctor.update({
      where: { id: Number(id) },
      data: { name, specialization, email, phone },
    });

    return NextResponse.json(updatedDoctor, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating doctor" },
      { status: 500 }
    );
  }
}

// DELETE doctor
export async function DELETE(
  _req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    await prisma.doctor.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Doctor deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting doctor" },
      { status: 500 }
    );
  }
}
