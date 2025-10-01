"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function SelectRolePage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const setRole = async (role: "admin" | "doctor" | "patient") => {
    if (!user) return;
    setLoading(true);

    await fetch("/api/set-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    // redirect to dashboard
    if (role === "admin") window.location.href = "/admin/dashboard";
    if (role === "doctor") window.location.href = "/doctor/dashboard";
    if (role === "patient") window.location.href = "/patient/dashboard";

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Select your role</h1>
      <button onClick={() => setRole("admin")} disabled={loading}>Admin</button>
      <button onClick={() => setRole("doctor")} disabled={loading}>Doctor</button>
      <button onClick={() => setRole("patient")} disabled={loading}>Patient</button>
    </div>
  );
}
