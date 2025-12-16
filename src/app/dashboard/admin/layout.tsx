// app/dashboard/admin/layout.tsx
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  let user = null;
  try {
    user = token ? verifyToken(token) : null;
  } catch {
    notFound();
  }

  if (!user || user.role !== "admin") {
    notFound();
  }

  return children;
}
