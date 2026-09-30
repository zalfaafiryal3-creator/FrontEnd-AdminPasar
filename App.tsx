import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import KelolaToko from "./pages/KelolaToko/KelolaToko";
import Kategori from "./pages/Kategori/Kategori";
import KelolaPromo from "./pages/KelolaPromo/KelolaPromo";
import Pengguna from "./pages/Pengguna/Pengguna";
import Penjual from "./pages/Penjual/Penjual";
import Pengaturan from "./pages/Pengaturan/Pengaturan";
import AdminLayout from "./components/AdminLayout";
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