"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

/* ---------- class bersama ---------- */
const label =
  "grid min-w-0 gap-[7px] text-xs font-semibold leading-[1.4] text-[#594045]";

const inputWrap = "relative flex items-center";

const fieldIcon =
  "pointer-events-none absolute left-3 text-xs text-[#4b6515]";

const field =
  "h-10 w-full min-w-0 rounded-[9px] border border-[rgba(194,220,128,0.9)] bg-white pr-3 pl-9 font-[inherit] text-xs text-[#594045] " +
  "focus:border-[#4b6515] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[rgba(251,191,36,0.7)]";

export default function Pengaturan() {
  const [username, setUsername] = useState("Rani");
  const [email, setEmail] = useState("MaharaniP7@gmail.com");
  const [phone, setPhone] = useState("+62 812-3456-7890");
  const [role, setRole] = useState("Super Admin");
  const [photo, setPhoto] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState(false);
  const photoInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load browser-only profile data after mount to keep the server and initial client render consistent.
    setUsername(localStorage.getItem("pasar-admin-profile-username") || "Rani");
    setEmail(localStorage.getItem("pasar-admin-profile-email") || "MaharaniP7@gmail.com");
    setPhone(localStorage.getItem("pasar-admin-profile-phone") || "+62 812-3456-7890");
    setRole(localStorage.getItem("pasar-admin-profile-role") || "Super Admin");
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

    localStorage.setItem("pasar-admin-profile-username", username.trim());
    localStorage.setItem("pasar-admin-profile-email", email.trim());
    localStorage.setItem("pasar-admin-profile-phone", phone.trim());
    localStorage.setItem("pasar-admin-profile-role", role);
    setProfileError(false);
    setProfileMessage("Profil berhasil diperbarui.");
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
    setUsername(localStorage.getItem("pasar-admin-profile-username") || "Rani");
    setEmail(localStorage.getItem("pasar-admin-profile-email") || "MaharaniP7@gmail.com");
    setPhone(localStorage.getItem("pasar-admin-profile-phone") || "+62 812-3456-7890");
    setRole(localStorage.getItem("pasar-admin-profile-role") || "Super Admin");
    setProfileMessage("");
    setProfileError(false);
  }

  const navigation = [
    { label: "Dashboard", icon: "fa-table-cells-large", href: "/dashboard" },
    { label: "Kelola Toko", icon: "fa-store", href: "/kelola-toko" },
    { label: "Kategori", icon: "fa-layer-group", href: "/Kategori" },
    { label: "Kelola Promo", icon: "fa-tags", href: "/Kelola%20Promo" },
    { label: "Pengguna", icon: "fa-users", href: "/Pengguna" },
    { label: "Penjual", icon: "fa-shop", href: "/Penjual" },
    { label: "Pengaturan", icon: "fa-gear", href: "/Penggaturan", active: true },
  ];

  return (
    <main className="min-h-screen bg-[#f4f4f4] px-3 py-3 font-sans text-[#253025] sm:px-[18px] sm:py-4">
      <h1 className="mb-2.5 text-base font-normal text-[#b7b7b7] sm:text-lg">Admin Pengaturan</h1>
      <div className="mx-auto flex min-h-[calc(100vh-60px)] w-full max-w-[1440px] overflow-hidden border border-[#d6e4bd] bg-[#e8f3d3]">
        <aside className="flex w-[116px] shrink-0 flex-col bg-[#d9eab4] px-2 py-3 sm:w-[20%] sm:max-w-[250px] sm:min-w-[135px] sm:px-2.5 sm:py-4">
          <Link href="/dashboard" className="mb-3 flex items-center gap-1.5 px-1.5 sm:gap-2">
            <i className="fa-solid fa-landmark text-lg text-[#587a25] sm:text-2xl" aria-hidden="true" />
            <span className="min-w-0">
              <strong className="block text-[8px] leading-tight text-[#304622] sm:text-[10px]">Pasar Oro-Oro Dowo</strong>
              <small className="block text-[6px] font-semibold tracking-wide text-[#526a37] sm:text-[7px]">ADMIN PANEL</small>
            </span>
          </Link>

          <nav aria-label="Navigasi admin" className="grid gap-1">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={`flex min-h-7 items-center gap-1.5 rounded-md px-2 text-[8px] transition sm:gap-2 sm:px-2.5 sm:text-[9px] ${
                  item.active
                    ? "bg-[#ffbf18] font-semibold text-white"
                    : "text-[#394b32] hover:bg-white/50"
                }`}
              >
                <i className={`fa-solid ${item.icon} w-3 text-center`} aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto rounded-lg bg-[#c2dc80] p-2 text-[7px] text-[#3b5426] sm:p-2.5">
            <strong className="block text-[8px]">Status Pasar</strong>
            <span><i className="fa-solid fa-circle text-[5px] text-[#4b8c3b]" aria-hidden="true" /> Operasional Aktif</span>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-9 shrink-0 items-center justify-end gap-3 border-b border-[#dce8c9] bg-[#edf5df] px-3 sm:h-11 sm:px-5">
            <button type="button" className="relative grid size-7 place-items-center text-[#394b32]" aria-label="Notifikasi">
              <i className="fa-regular fa-bell text-xs" aria-hidden="true" />
              <span className="absolute right-1 top-1 size-1.5 rounded-full bg-[#dc3838]" />
            </button>
            <div className="flex items-center gap-1.5 rounded-full border border-[#dce5cf] bg-white px-2 py-1">
              <span className="text-right">
                <strong className="block text-[7px] leading-tight">{username || "Rani"}</strong>
                <small className="block text-[6px] leading-tight text-[#667061]">{role}</small>
              </span>
              <span className="grid size-5 place-items-center rounded-full bg-[#587a25] text-[8px] font-bold text-white">
                {(username || "R").slice(0, 1).toUpperCase()}
              </span>
            </div>
          </header>

          <div className="min-h-0 flex-1 bg-[#e8f3d3] px-3 py-3 text-[#594045] sm:px-4 sm:py-4 lg:px-5">
            <div className="mb-1 text-[8px] font-medium tracking-wide text-[#56604f]">
              ADMIN PANEL &nbsp;›&nbsp; PENGATURAN
            </div>

            <div className="mb-3">
              <h2 className="m-0 text-base font-bold leading-[1.3] text-[#252a25] sm:text-lg">
                Pengaturan Profil Admin
              </h2>
              <p className="m-0 mt-0.5 text-[9px] leading-normal text-[#687263] sm:text-[10px]">
                Kelola informasi data pribadi dan peran admin pasar.
              </p>
            </div>

            <section className="mx-auto mt-3 w-full max-w-[900px] rounded-xl border border-[#e7ecdf] bg-white px-4 py-4 sm:px-5 sm:py-4">
          {/* Foto profil */}
          <div className="mb-3 border-b border-[#edf0e9] pb-3">
            <strong className="mb-2 block text-[9px] font-bold text-[#344033]">Foto Profil</strong>
            <div className="flex items-center gap-3">
              <div className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-[#e1ead9] bg-[#356b45] text-sm font-bold text-white">
                {photo ? (
                  <Image
                    className="size-full object-cover"
                    src={photo}
                    alt="Foto profil admin"
                    width={64}
                    height={64}
                    unoptimized
                  />
                ) : (
                  <span>{(username || "RA").slice(0, 2).toUpperCase()}</span>
                )}
                <span className="absolute bottom-0 right-0 grid size-3.5 place-items-center rounded-full bg-[#315f3d] text-[6px] text-white">
                  <i className="fa-solid fa-camera" aria-hidden="true" />
                </span>
              </div>
              <div className="flex flex-col items-start gap-1.5">
                <input
                  ref={photoInput}
                  className="hidden"
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handlePhotoChange}
                />
                <button
                  className="inline-flex min-h-7 cursor-pointer items-center gap-1.5 rounded-md border border-[#8cae4e] bg-[#eef5df] px-2.5 py-1 text-[8px] font-semibold text-[#344f32] transition hover:bg-[#dcebbf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fbbf24]"
                  type="button"
                  onClick={() => photoInput.current?.click()}
                >
                  <i className="fa-solid fa-upload" /> Ganti Foto
                </button>
                <small className="text-[7px] text-[#7b8177]">Format: JPG, PNG, JPEG (Maks. 2MB)</small>
              </div>
            </div>
          </div>

          <form onSubmit={handleProfileSave}>
            <div className="grid grid-cols-2 gap-x-3 gap-y-3 max-[560px]:grid-cols-1">
              <label className={label} htmlFor="admin-profile-username">
                <span className="text-[8px]">NAMA LENGKAP <b className="text-[#d63737]">*</b></span>
                <span className={inputWrap}>
                  <i className={`fa-regular fa-user ${fieldIcon}`} />
                  <input
                    className={`${field} h-8 rounded-md bg-[#eef5df] text-[9px]`}
                    id="admin-profile-username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                  />
                </span>
              </label>

              <label className={label} htmlFor="admin-profile-email">
                <span className="text-[8px]">EMAIL <b className="text-[#d63737]">*</b></span>
                <span className={inputWrap}>
                  <i className={`fa-regular fa-envelope ${fieldIcon}`} />
                  <input
                    className={`${field} h-8 rounded-md bg-[#eef5df] text-[9px]`}
                    id="admin-profile-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </span>
              </label>

              <label className={label} htmlFor="admin-profile-phone">
                <span className="text-[8px]">NOMOR TELEPON / WHATSAPP <b className="text-[#d63737]">*</b></span>
                <span className={inputWrap}>
                  <i className={`fa-solid fa-phone ${fieldIcon}`} />
                  <input
                    className={`${field} h-8 rounded-md bg-[#eef5df] text-[9px]`}
                    id="admin-profile-phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />
                </span>
              </label>

              <label className={label} htmlFor="admin-profile-role">
                <span className="text-[8px]">PERAN <b className="text-[#d63737]">*</b></span>
                <span className={inputWrap}>
                  <i className={`fa-solid fa-shield-halved ${fieldIcon}`} />
                  <select
                    className={`${field} h-8 cursor-pointer appearance-none rounded-md bg-[#eef5df] pr-8 text-[9px]`}
                    id="admin-profile-role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  >
                    <option>Super Admin</option>
                    <option>Admin Pasar</option>
                    <option>Operator</option>
                  </select>
                  <i className="fa-solid fa-chevron-down pointer-events-none absolute right-3 text-[10px] text-[#4b6515]" />
                </span>
              </label>
            </div>

            <p className="mt-3 mb-3 flex gap-1.5 rounded-md border border-[#93a96b] bg-[#eef5df] px-2.5 py-2 text-[8px] leading-normal text-[#4f5d47]" role="note">
              <i className="fa-solid fa-circle-info mt-0.5 text-[#4b6515]" />{" "}
              <span>
                <strong>ID Petugas: POD-ADM-2024-001</strong> — Setiap perubahan data administrator akan tercatat otomatis pada log aktivitas pengelolaan Pasar Oro-Oro Dowo Malang.
              </span>
            </p>

            {profileMessage && (
              <p
                className={`mt-2 text-[9px] leading-[1.45] ${profileError ? "text-[#8c302b]" : "text-[#4b6515]"}`}
                role={profileError ? "alert" : "status"}
              >
                {profileMessage}
              </p>
            )}

            <div className="mt-3 flex justify-end gap-2 border-t border-[#edf0e9] pt-3">
              <button
                className="min-h-7 cursor-pointer rounded-md border border-[#dce3d4] bg-white px-3 py-1.5 text-[8px] font-semibold text-[#39443a] transition hover:bg-[#f6f7f4]
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fbbf24]"
                type="button"
                onClick={resetProfile}
              >
                Batal
              </button>
              <button
                className="min-h-7 cursor-pointer rounded-md border-0 bg-[#ffbf18] px-3 py-1.5 text-[8px] font-semibold text-[#3b2e00] transition hover:bg-[#f3b20b]
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fbbf24]"
                type="submit"
              >
                <i className="fa-regular fa-floppy-disk" /> Simpan Perubahan
              </button>
            </div>
          </form>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}