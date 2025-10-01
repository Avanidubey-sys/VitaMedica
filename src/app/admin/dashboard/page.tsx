"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Stethoscope } from "lucide-react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

const AdminDashboard = () => {
  const links = [
    {
      title: "Appointments",
      href: "/admin/appointment",
      icon: Calendar,
      desc: "View and manage all appointments",
    },
    {
      title: "Patients",
      href: "/admin/patients",
      icon: Users,
      desc: "Track patient records and details",
    },
    {
      title: "Doctors",
      href: "/admin/doctors",
      icon: Stethoscope,
      desc: "Manage doctor profiles and schedules",
    },
  ];

  return (
    <>
      {/* If signed out → redirect to sign-in */}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      {/* If signed in → show dashboard */}
      <SignedIn>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
          <h1 className="text-4xl font-extrabold mb-12 text-indigo-900 tracking-tight">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <Card
                    className="rounded-2xl border border-gray-200 bg-white 
                               transition-all duration-300 cursor-pointer 
                               hover:scale-105 hover:shadow-2xl hover:shadow-black/30"
                  >
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-2xl font-semibold text-gray-800">
                        {link.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">{link.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default AdminDashboard;
