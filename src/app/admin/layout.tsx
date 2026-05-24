"use client";

import { Toaster } from "react-hot-toast";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-900">
      <AdminSidebar />
      <main className="lg:ml-[280px] min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid #27272a",
          },
        }}
      />
    </div>
  );
}
