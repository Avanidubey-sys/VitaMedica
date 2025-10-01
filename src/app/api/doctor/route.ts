import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all doctors
export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: { appointments: true }, // optional, shows appointments too
    });
    return NextResponse.json(doctors, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching doctors" },
      { status: 500 }
    );
  }
}

// POST new doctor
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, specialization, email, phone } = body;

    const newDoctor = await prisma.doctor.create({
      data: { name, specialization, email, phone },
    });

    return NextResponse.json(newDoctor, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error creating doctor" },
      { status: 500 }
    );
  }
}
