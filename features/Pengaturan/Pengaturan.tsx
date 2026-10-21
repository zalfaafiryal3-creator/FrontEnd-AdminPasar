import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useDemoAuth } from "../../auth/DemoAuthContext";
import "./Pengaturan.css";

export default function Pengaturan() {
  const { currentUser, updateProfile } = useDemoAuth();
  const [username, setUsername] = useState(currentUser?.username ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [phone, setPhone] = useState("+62 812-3456-7890");
  const [role, setRole] = useState("Super Admin");
  const [photo, setPhoto] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState(false);
  const photoInput = useRef<HTMLInputElement>(null);

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

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setProfileError(true);
      setProfileMessage("Pilih file gambar untuk foto profil.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setProfileError(true);
      setProfileMessage("Ukuran foto maksimal 2MB.");
      return;
    }
    setPhoto(URL.createObjectURL(file));
  }

  function resetProfile() {
    setUsername(currentUser?.username ?? "");
    setEmail(currentUser?.email ?? "");
    setPhone("+62 812-3456-7890");
    setRole("Super Admin");
    setProfileMessage("");
    setProfileError(false);
  }

  return (
    <AdminLayout activePage="settings" label="Admin Pengaturan">
      <main className="page-view active management-view">
        <div className="page-breadcrumb">ADMIN PANEL &nbsp;›&nbsp; PENGATURAN</div>
        <div className="page-heading settings-heading"><div><h1>Pengaturan Profil Admin</h1><p>Kelola informasi data pribadi dan peran admin pasar.</p></div></div>
        <section className="profile-settings">
          <div className="profile-photo-section">
            <strong>Foto Profil</strong>
            <div className="profile-photo-row">
              <div className="profile-photo-avatar">{photo ? <img src={photo} alt="Foto profil admin" /> : <span>{(username || "RA").slice(0, 2).toUpperCase()}</span>}</div>
              <div className="profile-photo-controls">
                <input ref={photoInput} className="profile-photo-input" type="file" accept="image/png,image/jpeg" onChange={handlePhotoChange} />
                <button className="profile-photo-button" type="button" onClick={() => photoInput.current?.click()}><i className="fa-solid fa-upload" /> Ganti Foto</button>
                <small>Format: JPG, PNG, JPEG (Maks. 2MB)</small>
              </div>
            </div>
          </div>
          <form onSubmit={handleProfileSave}>
            <div className="profile-fields">
              <label htmlFor="admin-profile-username">NAMA LENGKAP <b>*</b><span className="profile-input-wrap"><i className="fa-regular fa-user" /><input id="admin-profile-username" type="text" value={username} onChange={(event) => setUsername(event.target.value)} required /></span></label>
              <label htmlFor="admin-profile-email">EMAIL <b>*</b><span className="profile-input-wrap"><i className="fa-regular fa-envelope" /><input id="admin-profile-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></span></label>
              <label htmlFor="admin-profile-phone">NOMOR TELEPON / WHATSAPP <b>*</b><span className="profile-input-wrap"><i className="fa-solid fa-phone" /><input id="admin-profile-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required /></span></label>
              <label htmlFor="admin-profile-role">PERAN <b>*</b><span className="profile-input-wrap"><i className="fa-solid fa-shield-halved" /><select id="admin-profile-role" value={role} onChange={(event) => setRole(event.target.value)}><option>Super Admin</option><option>Admin Pasar</option><option>Operator</option></select><i className="fa-solid fa-chevron-down role-chevron" /></span></label>
            </div>
            <p className="profile-unavailable" role="note"><i className="fa-solid fa-circle-info" /> <span><strong>ID Petugas: POD-ADM-2024-001</strong> — Setiap perubahan data administrator akan tercatat otomatis pada log aktivitas pengelolaan Pasar Oro-Oro Dowo Malang.</span></p>
            {profileMessage && (
              <p className={`profile-message${profileError ? " error" : ""}`} role={profileError ? "alert" : "status"}>
                {profileMessage}
              </p>
            )}
            <div className="profile-actions">
              <button className="profile-cancel-button" type="button" onClick={resetProfile}>Batal</button>
              <button className="profile-save-button" type="submit"><i className="fa-regular fa-floppy-disk" /> Simpan Perubahan</button>
            </div>
          </form>
        </section>
      </main>
    </AdminLayout>
  );
}
