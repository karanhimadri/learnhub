// app/dashboard/layout.tsx (SERVER)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/login");

  const user = verifyToken(token);
  if (!user) redirect("/login");

  return (
    <div className="bg-gray-50">
      <div className="mx-auto flex min-h-[calc(100vh-4rem-4rem)] max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <Sidebar />
        <section className="flex-1">
          <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
