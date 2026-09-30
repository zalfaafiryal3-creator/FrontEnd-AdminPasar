import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import KelolaToko from "./pages/KelolaToko/KelolaToko.tsx";
import Kategori from "./pages/Kategori/Kategori.tsx";
import KelolaPromo from "./pages/KelolaPromo/KelolaPromo.tsx";
import Pengguna from "./pages/Pengguna/Pengguna.tsx";
import Penjual from "./pages/Penjual/Penjual.tsx";
import Pengaturan from "./pages/Pengaturan/Pengaturan.tsx";
import AdminLayout from "./components/AdminLayout.tsx";
import "./App.css";

function NotFound() {
  return (
    <AdminLayout label="Halaman tidak ditemukan">
      <main className="management-view not-found-page">
        <h1>Halaman tidak ditemukan</h1>
        <p>Alamat yang dibuka tidak tersedia.</p>
        <Link to="/dashboard">Kembali ke Dashboard</Link>
      </main>
    </AdminLayout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/kelola-toko" element={<KelolaToko />} />
      <Route path="/kategori" element={<Kategori />} />
      <Route path="/kelola-promo" element={<KelolaPromo />} />
      <Route path="/pengguna" element={<Pengguna />} />
      <Route path="/penjual" element={<Penjual />} />
      <Route path="/pengaturan" element={<Pengaturan />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}