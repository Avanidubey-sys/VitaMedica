"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        VitaMedicca
      </Link>

      {/* Links */}
      <div className="hidden md:flex gap-6 text-gray-700 font-medium">
        <Link href="#about">About</Link>
        <Link href="#services">Services</Link>
        <Link href="#contact">Contact</Link>
      </div>

      {/* Auth Section */}
      <div className="flex items-center gap-4">
        {/* When signed out → show Sign In + Get Started */}
        <SignedOut>
          <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
            <Button variant="outline">Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
            <Button>Get Started</Button>
          </SignUpButton>
        </SignedOut>

        {/* When signed in → show User profile button */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}
