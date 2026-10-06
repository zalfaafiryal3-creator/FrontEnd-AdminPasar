import { useEffect, useState, type FormEvent } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useDemoAuth } from "../../auth/DemoAuthContext";
import "./Pengaturan.css";

export default function Pengaturan() {
  const { currentUser, updateProfile } = useDemoAuth();
  const [username, setUsername] = useState(currentUser?.username ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState(false);

  useEffect(() => {
    setUsername(currentUser?.username ?? "");
    setEmail(currentUser?.email ?? "");
  }, [currentUser]);

  function handleProfileSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!username.trim() || !email.trim()) {
      setProfileError(true);
      setProfileMessage("Nama pengguna dan email wajib diisi.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setProfileError(true);
      setProfileMessage("Format email tidak valid.");
      return;
    }

    const error = updateProfile({ username, email });
    setProfileError(Boolean(error));
    setProfileMessage(error ?? "Profil akun demo berhasil diperbarui.");
  }

  return (
    <AdminLayout activePage="settings" label="Admin Pengaturan">
      <main className="page-view active management-view">
        <div className="page-heading settings-heading"><div><h1>Pengaturan Sistem &amp; Profil</h1><p>Konfigurasi informasi admin, Preferensi notifikasi, dan keamanan sistem.</p></div></div>
        <section className="profile-settings">
          <h2>Profil Admin</h2>
          <p className="profile-unavailable" role="note">
            Mode demo: perubahan profil hanya tersimpan sementara di tab browser ini, bukan ke server.
          </p>
          <form onSubmit={handleProfileSave}>
            <div className="profile-fields">
              <label htmlFor="admin-profile-username">Nama Pengguna<input id="admin-profile-username" type="text" value={username} onChange={(event) => setUsername(event.target.value)} required /></label>
              <label htmlFor="admin-profile-email">Email<input id="admin-profile-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
            </div>
            {profileMessage && (
              <p className={`profile-message${profileError ? " error" : ""}`} role={profileError ? "alert" : "status"}>
                {profileMessage}
              </p>
            )}
            <div className="profile-actions">
              <button className="profile-save-button" type="submit">Simpan Perubahan</button>
            </div>
          </form>
        </section>
      </main>
    </AdminLayout>
  );
}
