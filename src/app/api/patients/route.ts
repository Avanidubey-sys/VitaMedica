import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all patients
export async function GET() {
  const patients = await prisma.patient.findMany();
  return NextResponse.json(patients);
}

// POST new patient
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, age, gender } = body;

    const newPatient = await prisma.patient.create({
      data: { name, age, gender },
    });

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
