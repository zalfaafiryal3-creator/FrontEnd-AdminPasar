import AdminLayout from "../../components/AdminLayout.tsx";
import "./Pengaturan.css";

export default function Pengaturan() {
  return (
    <AdminLayout activePage="settings" label="Admin Pengaturan">
      <main className="page-view active management-view">
        <div className="page-heading settings-heading"><div><h1>Pengaturan Sistem &amp; Profil</h1><p>Konfigurasi informasi admin, Preferensi notifikasi, dan keamanan sistem.</p></div></div>
        <section className="profile-settings"><h2>Profil Admin</h2><div className="profile-fields"><label>Nama Lengkap<input type="text" defaultValue="Mifta Annisa" /></label><label>Email<input type="email" defaultValue="miftannisa@gmail.com" /></label></div></section>
      </main>
    </AdminLayout>
  );
}
