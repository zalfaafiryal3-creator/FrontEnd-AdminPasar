"use client";

import Link from "next/link";
import AdminLayout from "../components/AdminLayout";

export default function NotFound() {
  return (
    <AdminLayout label="Halaman tidak ditemukan">
      <main className="min-h-full p-6">
        <h1 className="mb-2 text-lg font-bold text-[#222a21]">Halaman tidak ditemukan</h1>
        <p className="mb-3 text-sm text-[#66705e]">Alamat yang dibuka tidak tersedia.</p>
        <Link className="text-sm font-semibold text-[#496d2e] underline hover:text-[#354f20]" href="/dashboard">Kembali ke Dashboard</Link>
      </main>
    </AdminLayout>
  );
}
