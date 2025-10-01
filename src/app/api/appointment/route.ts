import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all appointments OR filter by patientId / doctorId
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const patientId = searchParams.get("patientId");
  const doctorId = searchParams.get("doctorId");

  const where: any = {};
  if (patientId) where.patientId = Number(patientId);
  if (doctorId) where.doctorId = Number(doctorId);

  const appointments = await prisma.appointment.findMany({
    where,
    include: {
      patient: {
        select: { id: true, name: true, gender: true },
      },
      doctor: {
        select: { id: true, name: true, specialization: true, email: true },
      },
    },
  });

  return NextResponse.json(appointments);
}

// POST create new appointment
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, patientId, doctorId } = body;

    const newAppointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        patientId: Number(patientId),
        doctorId: Number(doctorId),
      },
    });

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
