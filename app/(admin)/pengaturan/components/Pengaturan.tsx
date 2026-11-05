import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import AdminLayout from "../../../../components/AdminLayout";
import { useAuth } from "../../../../lib/user-auth";

export default function Pengaturan() {
  const { currentUser, updateProfile } = useAuth();
  const [username, setUsername] = useState(currentUser?.username ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [phone, setPhone] = useState("+62 812-3456-7890");
  const [role, setRole] = useState(currentUser?.role === "seller" ? "Penjual" : "Admin");
  const [photo, setPhoto] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const photoInput = useRef<HTMLInputElement>(null);
  const roleMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUsername(currentUser?.username ?? "");
    setEmail(currentUser?.email ?? "");
    setRole(currentUser?.role === "seller" ? "Penjual" : "Admin");
  }, [currentUser]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (roleMenuRef.current && !roleMenuRef.current.contains(event.target as Node)) {
        setIsRoleMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

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
    setRole(currentUser?.role === "seller" ? "Penjual" : "Admin");
    setProfileMessage("");
    setProfileError(false);
  }

  return (
    <AdminLayout activePage="settings" label="Admin Pengaturan">
      <main className="min-h-[calc(100vh-58px)] w-full min-w-0 px-6 pt-[18px] pb-6 text-[#594045] max-[760px]:px-[18px] max-[760px]:pt-[17px] max-[760px]:pb-[22px] max-[560px]:px-3 max-[560px]:pt-4 max-[560px]:pb-5 max-[390px]:px-[10px]">
        <div className="mb-[7px] text-[9px] font-semibold tracking-[0.08em] text-[#74666a]">ADMIN PANEL &nbsp;›&nbsp; PENGATURAN</div>
        <div className="mb-[22px] flex items-start justify-between gap-4 max-[560px]:mb-[18px]">
          <div>
            <h1 className="mb-1 text-[21px] font-bold leading-[1.3] text-[#594045] max-[560px]:text-[18px]">Pengaturan Profil Admin</h1>
            <p className="m-0 text-xs leading-[1.5] text-[#74666a] max-[560px]:text-[11px]">Kelola informasi data pribadi dan peran admin pasar.</p>
          </div>
        </div>
        <section className="mx-auto mt-6 w-[min(640px,100%)] max-w-[640px] rounded-3xl border border-[rgba(194,220,128,0.64)] bg-[#fbfcf7] px-6 pt-5 pb-[22px] shadow-[0_8px_22px_rgba(75,101,21,0.08)] max-[760px]:px-5 max-[760px]:pt-[18px] max-[760px]:pb-5 max-[560px]:mt-[18px] max-[560px]:rounded-[18px] max-[560px]:p-4 max-[390px]:px-3 max-[390px]:pt-[14px] max-[390px]:pb-4">
          <div className="mb-5 border-b border-[rgba(194,220,128,0.5)] pb-4">
            <strong className="text-xs font-semibold text-[#594045]">Foto Profil</strong>
            <div className="mt-3 flex items-center gap-4">
              <div className="grid size-[68px] shrink-0 place-items-center overflow-hidden rounded-full border-2 border-[#c2dc80] bg-[#e3efc2] text-lg font-bold text-[#4b6515]">
                {photo ? <img className="size-full object-cover" src={photo} alt="Foto profil admin" /> : <span>{(username || "RA").slice(0, 2).toUpperCase()}</span>}
              </div>
              <div className="flex flex-col items-start gap-1.5">
                <input ref={photoInput} className="sr-only" type="file" accept="image/png,image/jpeg" onChange={handlePhotoChange} />
                <button className="inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-[#4b6515] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#4b6515] [font-family:inherit] hover:bg-[#edf5d7] focus-visible:outline-2 focus-visible:outline-[#fbbf24] focus-visible:outline-offset-2" type="button" onClick={() => photoInput.current?.click()}><i className="fa-solid fa-upload" /> Ganti Foto</button>
                <small className="text-[10px] leading-[1.4] text-[#74666a]">Format: JPG, PNG, JPEG (Maks. 2MB)</small>
              </div>
            </div>
          </div>
          <form onSubmit={handleProfileSave}>
            <div className="grid grid-cols-2 gap-5 max-[560px]:grid-cols-1 max-[560px]:gap-3">
              <label className="grid min-w-0 gap-[7px] text-xs font-semibold leading-[1.4] text-[#594045]" htmlFor="admin-profile-username">NAMA LENGKAP <b className="text-[#8c302b]">*</b><span className="flex h-10 min-w-0 items-center gap-2 rounded-[9px] border border-[rgba(194,220,128,0.9)] bg-white px-3 focus-within:border-[#4b6515] focus-within:outline-2 focus-within:outline-[rgba(251,191,36,0.7)] focus-within:outline-offset-2"><i className="fa-regular fa-user shrink-0 text-[#74666a]" /><input className="h-full w-full min-w-0 border-0 bg-transparent p-0 text-xs font-normal text-[#594045] outline-none" id="admin-profile-username" type="text" value={username} onChange={(event) => setUsername(event.target.value)} required /></span></label>
              <label className="grid min-w-0 gap-[7px] text-xs font-semibold leading-[1.4] text-[#594045]" htmlFor="admin-profile-email">EMAIL <b className="text-[#8c302b]">*</b><span className="flex h-10 min-w-0 items-center gap-2 rounded-[9px] border border-[rgba(194,220,128,0.9)] bg-white px-3 focus-within:border-[#4b6515] focus-within:outline-2 focus-within:outline-[rgba(251,191,36,0.7)] focus-within:outline-offset-2"><i className="fa-regular fa-envelope shrink-0 text-[#74666a]" /><input className="h-full w-full min-w-0 border-0 bg-transparent p-0 text-xs font-normal text-[#594045] outline-none" id="admin-profile-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></span></label>
              <label className="grid min-w-0 gap-[7px] text-xs font-semibold leading-[1.4] text-[#594045]" htmlFor="admin-profile-phone">NOMOR TELEPON / WHATSAPP <b className="text-[#8c302b]">*</b><span className="flex h-10 min-w-0 items-center gap-2 rounded-[9px] border border-[rgba(194,220,128,0.9)] bg-white px-3 focus-within:border-[#4b6515] focus-within:outline-2 focus-within:outline-[rgba(251,191,36,0.7)] focus-within:outline-offset-2"><i className="fa-solid fa-phone shrink-0 text-[#74666a]" /><input className="h-full w-full min-w-0 border-0 bg-transparent p-0 text-xs font-normal text-[#594045] outline-none" id="admin-profile-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required /></span></label>
              <label className="grid min-w-0 gap-[7px] text-xs font-semibold leading-[1.4] text-[#594045]" htmlFor="admin-profile-role">PERAN <b className="text-[#8c302b]">*</b><div ref={roleMenuRef} className="relative"><button className="relative flex h-10 w-full min-w-0 items-center gap-2 rounded-full border border-[#b7ce97] bg-[#f7faf0] px-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus:border-[#4b6515] focus:outline-2 focus:outline-[#dfecc4] focus:outline-offset-2" id="admin-profile-role" type="button" onClick={() => setIsRoleMenuOpen((current) => !current)} aria-expanded={isRoleMenuOpen} aria-haspopup="listbox"><i className="fa-solid fa-shield-halved shrink-0 text-[#4b6515]" /><span className="flex-1 text-xs font-normal text-[#594045]">{role}</span><span className="pointer-events-none grid h-6 w-6 place-items-center rounded-full bg-[#e9f0d5] text-[9px] text-[#4b6515] shadow-[inset_0_0_0_1px_rgba(75,101,21,0.1)]"><i className="fa-solid fa-chevron-down" /></span></button>{isRoleMenuOpen && (<div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 rounded-[20px] border border-[#bfd89a] bg-[#f7faf0] p-1.5 shadow-[0_8px_24px_rgba(75,101,21,0.12)]" role="listbox" aria-label="Pilih peran"><button type="button" className={`flex w-full items-center rounded-full px-3 py-2 text-left text-xs font-medium transition ${role === "Admin" ? "bg-[#4b6515] text-white" : "text-[#3f4a2c] hover:bg-[#edf5d7]"}`} onClick={() => { setRole("Admin"); setIsRoleMenuOpen(false); }} role="option" aria-selected={role === "Admin"}>Admin</button><button type="button" className={`mt-1 flex w-full items-center rounded-full px-3 py-2 text-left text-xs font-medium transition ${role === "Penjual" ? "bg-[#4b6515] text-white" : "text-[#3f4a2c] hover:bg-[#edf5d7]"}`} onClick={() => { setRole("Penjual"); setIsRoleMenuOpen(false); }} role="option" aria-selected={role === "Penjual"}>Penjual</button></div>)}</div></label>
            </div>
            <p className="mb-4 mt-4 flex items-start gap-2 text-[11px] leading-[1.5] text-[#74666a]" role="note"><i className="fa-solid fa-circle-info mt-px shrink-0 text-[#4b6515]" /> <span><strong>ID Petugas: POD-ADM-2024-001</strong> — Setiap perubahan data administrator akan tercatat otomatis pada log aktivitas pengelolaan Pasar Oro-Oro Dowo Malang.</span></p>
            {profileMessage && (
              <p className={`mb-0 mt-3 text-[11px] leading-[1.45] ${profileError ? "text-[#8c302b]" : "text-[#4b6515]"}`} role={profileError ? "alert" : "status"}>
                {profileMessage}
              </p>
            )}
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button className="min-h-9 cursor-pointer rounded-[9px] border border-[rgba(194,220,128,0.9)] bg-white px-[14px] py-2 text-[11px] font-semibold text-[#594045] [font-family:inherit] hover:bg-[#f3f7e8] focus-visible:outline-2 focus-visible:outline-[#fbbf24] focus-visible:outline-offset-2" type="button" onClick={resetProfile}>Batal</button>
              <button className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-[9px] border-0 bg-[#4b6515] px-[14px] py-2 text-[11px] font-semibold text-white [font-family:inherit] hover:bg-[#3e5510] focus-visible:outline-2 focus-visible:outline-[#fbbf24] focus-visible:outline-offset-2" type="submit"><i className="fa-regular fa-floppy-disk" /> Simpan Perubahan</button>
            </div>
          </form>
        </section>
      </main>
    </AdminLayout>
  );
}
