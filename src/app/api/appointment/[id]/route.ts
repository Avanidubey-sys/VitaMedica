import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single appointment
export async function GET(
  _: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const appointment = await prisma.appointment.findUnique({
    where: { id: Number(id) },
    include: { patient: true, doctor: true },
  });

  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  return NextResponse.json(appointment, { status: 200 });
}

// UPDATE appointment
export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const data = await req.json();

  const updatedAppointment = await prisma.appointment.update({
    where: { id: Number(id) },
    data,
    include: { patient: true, doctor: true },
  });

  return NextResponse.json(updatedAppointment, { status: 200 });
}

// DELETE appointment
export async function DELETE(
  _: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  await prisma.appointment.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Appointment deleted successfully" }, { status: 200 });
}
