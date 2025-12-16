// src/app/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default async function DashboardEntry() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    redirect("/login");
  }

  switch (decoded.role) {
    case "admin":
      redirect("/dashboard/admin");
    case "instructor":
      redirect("/dashboard/instructor");
    case "learner":
      redirect("/dashboard/learner");
    default:
      redirect("/login");
  }
}
