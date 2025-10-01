"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section id="contact" className="py-20 text-center bg-blue-600 text-white">
      <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
      <p className="mb-8 text-lg">
        Start managing your clinic with VitaMedicca now!
      </p>
      <Link href="/patients">
        <Button size="lg" variant="secondary">
          Start Now
        </Button>
      </Link>
    </section>
  );
}
