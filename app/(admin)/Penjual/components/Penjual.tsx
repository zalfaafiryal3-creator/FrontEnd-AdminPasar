"use client";

import type { ReactNode } from "react";
import AdminLayout from "../../../../components/AdminLayout";

export default function Penjual({ children }: { children: ReactNode }) {
  return (
    <AdminLayout activePage="sellers" label="Admin Penjual">
      <main className="min-h-screen bg-[#e8f3d3]">{children}</main>
    </AdminLayout>
  );
}
