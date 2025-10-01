import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

// GET single appointment
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: Number(params.id) },
    include: { patient: true, doctor: true },
  });
  return NextResponse.json(appointment);
}

// UPDATE appointment
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const appointment = await prisma.appointment.update({
    where: { id: Number(params.id) },
    data,
    include: { patient: true, doctor: true },
  });
  return NextResponse.json(appointment);
}

// DELETE appointment
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.appointment.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: "Appointment deleted successfully" });
}
