import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardRedirect() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  // pull role
  const role = user.publicMetadata?.role as string | undefined;

  if (role === "admin") redirect("/admin/dashboard");
  if (role === "doctor") redirect("/doctor/dashboard");
  if (role === "patient") redirect("/patient/dashboard");

  // if no role set
  redirect("/select-role");
}
