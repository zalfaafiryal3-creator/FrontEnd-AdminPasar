import AdminLayout from "../../components/AdminLayout.tsx";
import "./Penjual.css";

const sellers = ["Budi Santoso (Lumpur Kentang)", "Budi Santoso (Lumpur Kentang)", "Budi Santoso (Lumpur Kentang)", "Budi Santoso (Lumpur Kentang)"];

export default function Penjual() {
  return (
    <AdminLayout activePage="sellers" label="Admin Penjual">
      <main className="page-view active management-view">
        <div className="page-heading seller-heading"><div><h1>Kelola Penjual &amp; Verifikasi</h1><p>Pemeriksaan dokumen identitas penjual sebelum mendapatkan centang verifikasi toko.</p></div></div>
        <div className="verification-grid">
          {sellers.map((seller, index) => <article className="verification-card" key={`${seller}-${index}`}><div className="verification-meta"><span>Perlu Verifikasi</span><small>2 jam lalu</small></div><h2>{seller}</h2><p>EMAIL: budisantoso@gmail.com &nbsp; | &nbsp; NIK: 3201xxxxxxxxx420</p><button type="button">Tinjau Dokumen</button></article>)}
        </div>
      </main>
    </AdminLayout>
  );
}
