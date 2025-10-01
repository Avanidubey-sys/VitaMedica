"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center px-6 py-24 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Welcome to <span className="text-blue-600">VitaMedicca</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
        Manage patients, doctors, and appointments seamlessly in one place.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/patients">
          <Button size="lg">Get Started</Button>
        </Link>
        <Link href="#about">
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </Link>
      </div>
    </section>
  );
}
