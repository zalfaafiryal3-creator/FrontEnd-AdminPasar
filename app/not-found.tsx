"use client";

import Link from "next/link";
import AdminLayout from "../components/AdminLayout";

export default function NotFound() {
  return (
    <AdminLayout label="Halaman tidak ditemukan">
      <main className="management-view not-found-page">
        <h1>Halaman tidak ditemukan</h1>
        <p>Alamat yang dibuka tidak tersedia.</p>
        <Link href="/dashboard">Kembali ke Dashboard</Link>
      </main>
    </AdminLayout>
  );
}
