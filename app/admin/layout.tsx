import React from "react";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If unauthenticated, let the login page render freely without redirection loop
  // The AdminSidebar will only render for protected sub-routes
  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col md:flex-row font-sans">
      <AdminSidebar session={session} />
      <main className="flex-1 overflow-y-auto p-6 md:p-10 min-h-screen">
        {children}
      </main>
    </div>
  );
}
