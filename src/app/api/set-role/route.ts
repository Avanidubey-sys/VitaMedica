import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);  // no args for route handlers
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { role } = body as { role: string };

  // Update the user metadata
  const clerk = await clerkClient();        // call the function
await clerk.users.updateUser(userId, { publicMetadata: { role } });

  return NextResponse.json({ success: true });
}


