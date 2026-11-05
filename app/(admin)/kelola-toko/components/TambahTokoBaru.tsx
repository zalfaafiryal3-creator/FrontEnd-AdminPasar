"use client";

import { useEffect, useState, useRef, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";

export type MenuItem = {
  id: string;
  nama: string;
  harga: string;
  deskripsi: string;
  foto: string | null;
};

export type TokoData = {
  id?: string;
  store: string;
  owner: string;
  category: string;
  zone: string;
  status: "Buka" | "Tutup" | "Menunggu Verifikasi";
  operatingHours: string;
  establishedYear: string;
  phone: string;
  email?: string;
  description: string;
  bannerImage: string | null;
  logoImage: string | null;
  products: MenuItem[];
  // Compatibility fields with existing table
  handle?: string;
  rating?: string;
  transactions?: string;
};

type TambahTokoBaruProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (data: TokoData) => Promise<void>;
  categoryOptions: Array<{ id: number; name: string }>;
  initialData?: TokoData;
  isEditing?: boolean;
  canEditStatus?: boolean;
  allowPhotoUpload?: boolean;
  isPageMode?: boolean; // When rendered as a standalone page rather than popup modal
};

const STATUS_OPTIONS: Array<{ value: TokoData["status"]; label: string; tone: string; icon: string }> = [
  { value: "Buka", label: "Buka (Operasional Aktif)", tone: "text-[#2e7d32] bg-[#e8f5e9] border-[#a5d6a7]", icon: "fa-circle-check" },
  { value: "Tutup", label: "Tutup Sementara", tone: "text-[#c62828] bg-[#ffebee] border-[#ef9a9a]", icon: "fa-circle-xmark" },
  { value: "Menunggu Verifikasi", label: "Menunggu Verifikasi", tone: "text-[#d97706] bg-[#fef3c7] border-[#fde68a]", icon: "fa-clock" },
];

export default function TambahTokoBaru({
  isOpen = true,
  onClose = () => {},
  onSave = async () => {},
  categoryOptions,
  initialData,
  isEditing = false,
  canEditStatus = false,
  allowPhotoUpload = false,
  isPageMode = false,
}: TambahTokoBaruProps) {
  // 1. Informasi Utama
  const [namaToko, setNamaToko] = useState(initialData?.store ?? "");
  const [namaPemilik, setNamaPemilik] = useState(initialData?.owner ?? "");
  const [kategori, setKategori] = useState(initialData?.category ?? categoryOptions[0]?.name ?? "");
  const [nomorBlok, setNomorBlok] = useState(initialData?.zone ?? "");

  // 2. Status & Operasional
  const [statusKios, setStatusKios] = useState<TokoData["status"]>(initialData?.status ?? (canEditStatus ? "Buka" : "Menunggu Verifikasi"));
  const [jamBuka, setJamBuka] = useState(initialData?.operatingHours.split(" - ")[0] ?? "06:00");
  const [jamTutup, setJamTutup] = useState(initialData?.operatingHours.split(" - ")[1] ?? "17:00");
  const [tahunBerdiri, setTahunBerdiri] = useState(initialData?.establishedYear ?? "");

  // 3. Media & Visual
  const [bannerPreview, setBannerPreview] = useState<string | null>(initialData?.bannerImage ?? null);
  const [logoPreview, setLogoPreview] = useState<string | null>(initialData?.logoImage ?? null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // 4. Informasi Tambahan & Kontak
  const [telepon, setTelepon] = useState(initialData?.phone ?? "");
  const [email, setEmail] = useState(initialData?.email ?? "");
  const [deskripsi, setDeskripsi] = useState(initialData?.description ?? "");

  // 5. Katalog Produk / Menu Awal (Multi-item dinamis)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialData?.products ?? [{
    id: "item-1",
    nama: "",
    harga: "",
    deskripsi: "",
    foto: null,
  }]);

  // UI state
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!initialData && categoryOptions.length > 0 && !categoryOptions.some((category) => category.name === kategori)) {
      setKategori(categoryOptions[0].name);
    }
  }, [categoryOptions, initialData, kategori]);

  useEffect(() => {
    if (isOpen) return;
    setNamaToko("");
    setNamaPemilik("");
    setKategori(categoryOptions[0]?.name ?? "");
    setNomorBlok("");
    setStatusKios(canEditStatus ? "Buka" : "Menunggu Verifikasi");
    setJamBuka("06:00");
    setJamTutup("17:00");
    setTahunBerdiri("");
    setBannerPreview(null);
    setLogoPreview(null);
    setTelepon("");
    setEmail("");
    setDeskripsi("");
    setMenuItems([{ id: "item-1", nama: "", harga: "", deskripsi: "", foto: null }]);
    setErrorMsg("");
    setIsSubmitting(false);
  }, [canEditStatus, categoryOptions, isOpen, initialData]);

  // Handle Banner Upload
  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("Ukuran banner maksimal 3MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setBannerPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle Logo Upload
  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran logo maksimal 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Dynamic Menu Handlers
  const handleAddMenuItem = () => {
    setMenuItems((prev) => [
      ...prev,
      {
        id: `item-${Date.now()}`,
        nama: "",
        harga: "",
        deskripsi: "",
        foto: null,
      },
    ]);
  };

  const handleRemoveMenuItem = (id: string) => {
    if (menuItems.length <= 1) {
      alert("Setidaknya harus ada minimal 1 produk / menu awal.");
      return;
    }
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateMenuItem = (id: string, field: keyof MenuItem, value: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleMenuPhotoChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleUpdateMenuItem(id, "foto", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Format currency display helper
  const formatRupiah = (val: string) => {
    const clean = val.replace(/\D/g, "");
    if (!clean) return "";
    return new Intl.NumberFormat("id-ID").format(Number(clean));
  };

  // Submit Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!namaToko.trim()) {
      setErrorMsg("Nama toko wajib diisi.");
      return;
    }
    if (!namaPemilik.trim()) {
      setErrorMsg("Nama pemilik / penjual wajib diisi.");
      return;
    }
    if (!nomorBlok.trim()) {
      setErrorMsg("Nomor blok / lokasi kios wajib diisi.");
      return;
    }

    const generatedHandle = `@${namaToko
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 15) || "toko"}`;

    const newStoreData: TokoData = {
      id: `store-${Date.now()}`,
      store: namaToko.trim(),
      owner: namaPemilik.trim(),
      category: kategori,
      zone: nomorBlok.trim(),
      status: statusKios,
      operatingHours: `${jamBuka} - ${jamTutup}`,
      establishedYear: tahunBerdiri.trim(),
      phone: telepon.trim(),
      email: email.trim(),
      description: deskripsi.trim(),
      bannerImage: bannerPreview,
      logoImage: logoPreview,
      products: menuItems.filter((m) => m.nama.trim() !== ""),
      handle: generatedHandle,
      rating: "5.0",
      transactions: "0",
    };

    setIsSubmitting(true);
    try {
      await onSave(newStoreData);
      onClose();
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Toko gagal disimpan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen && !isPageMode) return null;

  const content = (
    <div
      className={`relative flex w-full flex-col bg-white text-[#222a21] ${
        isPageMode
          ? "rounded-2xl border border-[#dce8c5] shadow-lg"
          : "max-h-[92vh] max-w-4xl rounded-3xl border border-[#dce8c5] shadow-2xl"
      } overflow-hidden`}
    >
      {/* ── HEADER MODAL / HALAMAN ─────────────────────────────────────── */}
      <div className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-[#edf1e7] bg-[#fbfcf7]/95 px-5 py-4 backdrop-blur-sm sm:px-7">
        <div className="flex items-center gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#f2f7e5] text-[#496d2e] shadow-xs">
            <i className="fa-solid fa-store text-lg" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight text-[#222a21] sm:text-lg">
              {isEditing ? "Edit Toko" : "Tambah Toko Baru"}
            </h2>
            <p className="text-[11px] text-[#66705e] sm:text-xs">
              Formulir lengkap pendaftaran direktori kios &amp; katalog pedagang Pasar Oro-Oro Dowo
            </p>
          </div>
        </div>

        {!isPageMode && (
          <button
            type="button"
            onClick={() => !isSubmitting && onClose()}
            disabled={isSubmitting}
            className="grid size-8 place-items-center rounded-full text-[#66705e] transition hover:bg-[#edf5d7] hover:text-[#222a21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8cae4e] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Tutup formulir"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        )}
      </div>

      {/* ── BODY FORMULIR (SCROLLABLE) ────────────────────────── */}
      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          {errorMsg && (
            <div
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 shadow-xs"
              role="alert"
            >
              <i className="fa-solid fa-circle-exclamation text-sm shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {!allowPhotoUpload && (
            <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800" role="status">
              Fitur foto belum tersedia. Foto tidak akan dikirim atau disimpan.
            </p>
          )}

          {/* ═════════ 1. INFORMASI UTAMA TOKO ═════════ */}
          <section className="rounded-2xl border border-[#e5edd8] bg-[#fdfefc] p-4.5 sm:p-5 shadow-xs">
            <div className="mb-4 flex items-center gap-2.5 border-b border-[#edf2e4] pb-3">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#eef5df] text-[11px] font-bold text-[#496d2e]">
                1
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3c4a30] sm:text-sm">
                Informasi Utama Toko
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Nama Toko */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="nama-toko">
                  Nama Toko <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <i className="fa-solid fa-shop pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                  <input
                    id="nama-toko"
                    type="text"
                    required
                    placeholder="Contoh: Lumpur Kentang 27"
                    value={namaToko}
                    onChange={(e) => setNamaToko(e.target.value)}
                    className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white pl-9 pr-3 text-xs text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                  />
                </div>
              </div>

              {/* Nama Pemilik */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="nama-pemilik">
                  Nama Pemilik / Penjual <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <i className="fa-regular fa-user pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                  <input
                    id="nama-pemilik"
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso / Bu Sri"
                    value={namaPemilik}
                    onChange={(e) => setNamaPemilik(e.target.value)}
                    className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white pl-9 pr-3 text-xs text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                  />
                </div>
              </div>

              {/* Kategori Toko */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="kategori-toko">
                  Kategori Toko <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <i className="fa-solid fa-layer-group pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                  <select
                    id="kategori-toko"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-[#dce8c5] bg-white pl-9 pr-8 text-xs text-[#222a21] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                  >
                    {categoryOptions.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-[#748564]" />
                </div>
              </div>

              {/* Nomor Blok / Lokasi Kios */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="nomor-blok">
                  Nomor Blok / Lokasi Kios <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <i className="fa-solid fa-location-dot pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                  <input
                    id="nomor-blok"
                    type="text"
                    required
                    placeholder="Contoh: Blok A No. 12, Klojen, Kota Malang"
                    value={nomorBlok}
                    onChange={(e) => setNomorBlok(e.target.value)}
                    className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white pl-9 pr-3 text-xs text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ═════════ 2. STATUS & OPERASIONAL ═════════ */}
          <section className="rounded-2xl border border-[#e5edd8] bg-[#fdfefc] p-4.5 sm:p-5 shadow-xs">
            <div className="mb-4 flex items-center gap-2.5 border-b border-[#edf2e4] pb-3">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#eef5df] text-[11px] font-bold text-[#496d2e]">
                2
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3c4a30] sm:text-sm">
                Status &amp; Operasional Kios
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Status Kios */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="status-kios">
                  Status Kios
                </label>
                <div className="relative">
                  <select
                    id="status-kios"
                    value={statusKios}
                    onChange={(e) => setStatusKios(e.target.value as TokoData["status"])}
                    disabled={!canEditStatus}
                    className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-[#dce8c5] bg-white px-3 pr-8 text-xs font-medium text-[#222a21] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-[#748564]" />
                </div>
                {!canEditStatus && (
                  <small className="mt-1 block text-[10px] text-[#748564]">
                    Status hanya dapat diubah oleh admin.
                  </small>
                )}
              </div>

              {/* Jam Operasional */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]">
                  Jam Operasional (Buka - Tutup)
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="time"
                      value={jamBuka}
                      onChange={(e) => setJamBuka(e.target.value)}
                      className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white px-2.5 text-center text-xs text-[#222a21] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#748564]">-</span>
                  <div className="relative flex-1">
                    <input
                      type="time"
                      value={jamTutup}
                      onChange={(e) => setJamTutup(e.target.value)}
                      className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white px-2.5 text-center text-xs text-[#222a21] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                    />
                  </div>
                </div>
                <small className="mt-1 block text-[10px] text-[#748564]">
                  Format tersimpan: <strong>{jamBuka} - {jamTutup}</strong>
                </small>
              </div>

              {/* Tahun Berdiri */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="tahun-berdiri">
                  Tahun Berdiri / Sejak
                </label>
                <div className="relative">
                  <i className="fa-regular fa-calendar-days pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                  <input
                    id="tahun-berdiri"
                    type="number"
                    min="1945"
                    max="2030"
                    placeholder="Contoh: 2012"
                    value={tahunBerdiri}
                    onChange={(e) => setTahunBerdiri(e.target.value)}
                    className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white pl-9 pr-3 text-xs text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ═════════ 3. MEDIA & VISUAL ═════════ */}
          <section className="rounded-2xl border border-[#e5edd8] bg-[#fdfefc] p-4.5 sm:p-5 shadow-xs">
            <div className="mb-4 flex items-center gap-2.5 border-b border-[#edf2e4] pb-3">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#eef5df] text-[11px] font-bold text-[#496d2e]">
                3
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3c4a30] sm:text-sm">
                Media &amp; Visual Kios
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_260px]">
              {/* Upload Cover / Banner */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#3b4733]">
                    Foto Banner / Cover Kios
                  </label>
                  {bannerPreview && (
                    <button
                      type="button"
                      onClick={() => setBannerPreview(null)}
                      className="text-[11px] font-medium text-red-600 hover:underline"
                    >
                      Hapus Banner
                    </button>
                  )}
                </div>

                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  disabled={!allowPhotoUpload}
                  onChange={handleBannerChange}
                />

                <div
                  onClick={() => allowPhotoUpload && bannerInputRef.current?.click()}
                  className={`group relative flex min-h-[145px] ${allowPhotoUpload ? "cursor-pointer" : "cursor-not-allowed opacity-60"} flex-col items-center justify-center rounded-2xl border-2 border-dashed p-4 text-center transition ${
                    bannerPreview
                      ? "border-[#8cae4e] bg-[#f5f8ed] p-1.5"
                      : "border-[#c8d8ae] bg-[#fbfdf7] hover:border-[#8cae4e] hover:bg-[#f3f7e8]"
                  }`}
                >
                  {bannerPreview ? (
                    <div className="relative h-32 w-full overflow-hidden rounded-xl">
                      <Image
                        src={bannerPreview}
                        alt="Pratinjau Banner Toko"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                        <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#222a21] shadow-md">
                          <i className="fa-solid fa-camera mr-1.5" /> Ganti Banner
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="mb-2 grid size-11 place-items-center rounded-full bg-[#eef5df] text-[#496d2e] transition group-hover:scale-105">
                        <i className="fa-solid fa-image text-lg" />
                      </div>
                      <p className="text-xs font-semibold text-[#3b4733]">
                        {allowPhotoUpload ? "Klik untuk upload foto banner kios" : "Upload foto belum tersedia"}
                      </p>
                      <p className="mt-0.5 text-[10px] text-[#748564]">
                        Format: JPG, PNG, WEBP (Rasio ideal 16:9 atau lebar, maks. 3MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Foto Profil / Logo Kios */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#3b4733]">
                    Foto Profil / Logo Kios
                  </label>
                  {logoPreview && (
                    <button
                      type="button"
                      onClick={() => setLogoPreview(null)}
                      className="text-[11px] font-medium text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  )}
                </div>

                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  disabled={!allowPhotoUpload}
                  onChange={handleLogoChange}
                />

                <div
                  onClick={() => allowPhotoUpload && logoInputRef.current?.click()}
                  className={`group relative flex min-h-[145px] ${allowPhotoUpload ? "cursor-pointer" : "cursor-not-allowed opacity-60"} flex-col items-center justify-center rounded-2xl border-2 border-dashed p-3 text-center transition ${
                    logoPreview
                      ? "border-[#8cae4e] bg-[#f5f8ed] p-1.5"
                      : "border-[#c8d8ae] bg-[#fbfdf7] hover:border-[#8cae4e] hover:bg-[#f3f7e8]"
                  }`}
                >
                  {logoPreview ? (
                    <div className="relative size-28 overflow-hidden rounded-2xl border border-[#dce8c5] shadow-xs">
                      <Image
                        src={logoPreview}
                        alt="Pratinjau Logo Toko"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                        <i className="fa-solid fa-camera text-base text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="mb-2 grid size-11 place-items-center rounded-full bg-[#f8e49f] text-[#594045] transition group-hover:scale-105">
                        <i className="fa-solid fa-basket-shopping text-base" />
                      </div>
                      <p className="text-xs font-semibold text-[#3b4733]">{allowPhotoUpload ? "Upload Logo Kios" : "Upload foto belum tersedia"}</p>
                      <p className="mt-0.5 text-[10px] text-[#748564]">
                        Format: JPG, PNG (Rasio 1:1)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ═════════ 4. INFORMASI KONTAK & DESKRIPSI ═════════ */}
          <section className="rounded-2xl border border-[#e5edd8] bg-[#fdfefc] p-4.5 sm:p-5 shadow-xs">
            <div className="mb-4 flex items-center gap-2.5 border-b border-[#edf2e4] pb-3">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#eef5df] text-[11px] font-bold text-[#496d2e]">
                4
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3c4a30] sm:text-sm">
                Informasi Tambahan &amp; Kontak
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Nomor Telepon / WA */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="kontak-wa">
                  Nomor Telepon / WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <i className="fa-brands fa-whatsapp pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#25d366]" />
                  <input
                    id="kontak-wa"
                    type="tel"
                    required
                    placeholder="Contoh: +62 812-5555-2012"
                    value={telepon}
                    onChange={(e) => setTelepon(e.target.value)}
                    className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white pl-9 pr-3 text-xs text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                  />
                </div>
              </div>

              {/* Email (Opsional) */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="kontak-email">
                  Email Kios (Opsional)
                </label>
                <div className="relative">
                  <i className="fa-regular fa-envelope pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                  <input
                    id="kontak-email"
                    type="email"
                    placeholder="Contoh: toko@pasar-orodoro.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white pl-9 pr-3 text-xs text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                  />
                </div>
              </div>

              {/* Deskripsi / Tentang Kios (Full Width) */}
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="deskripsi-kios">
                  Deskripsi / Tentang Kios
                </label>
                <textarea
                  id="deskripsi-kios"
                  rows={3}
                  placeholder="Tuliskan cerita singkat profil lapak, keunggulan dagangan, atau keunikan rasa makanan..."
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="w-full rounded-xl border border-[#dce8c5] bg-white p-3 text-xs leading-relaxed text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                />
              </div>
            </div>
          </section>

          {/* ═════════ 5. KATALOG PRODUK / MENU AWAL ═════════ */}
          {!isEditing && <section className="rounded-2xl border border-[#e5edd8] bg-[#fdfefc] p-4.5 sm:p-5 shadow-xs">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#edf2e4] pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex size-6 items-center justify-center rounded-full bg-[#eef5df] text-[11px] font-bold text-[#496d2e]">
                  5
                </span>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#3c4a30] sm:text-sm">
                    Katalog Menu / Produk Awal
                  </h3>
                  <p className="text-[10px] text-[#748564]">
                    Daftarkan produk unggulan kios yang langsung ditampilkan ke pelanggan
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddMenuItem}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#93a96b] bg-[#eef5df] px-3 py-1.5 text-xs font-semibold text-[#315e20] shadow-2xs transition hover:bg-[#d9eaae] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8cae4e]"
              >
                <i className="fa-solid fa-plus text-[10px]" /> Tambah Menu / Produk
              </button>
            </div>

            <div className="space-y-3.5">
              {menuItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative rounded-2xl border border-[#dce8c5] bg-[#fbfdf7] p-3.5 sm:p-4 shadow-2xs transition hover:border-[#8cae4e]"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#edf5df] px-2.5 py-1 text-[11px] font-semibold text-[#496d2e]">
                      <i className="fa-solid fa-tag text-[9px]" /> Item Menu #{index + 1}
                    </span>

                    {menuItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMenuItem(item.id)}
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700"
                      >
                        <i className="fa-solid fa-trash-can text-[10px]" /> Hapus
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-[100px_1fr]">
                    {/* Foto Menu */}
                    <div>
                      <label className="mb-1 block text-[10px] font-semibold text-[#3b4733]">
                        Foto Menu
                      </label>
                      <label className="relative flex size-24 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#c2dc80] bg-white transition hover:border-[#8cae4e] hover:bg-[#f4f8ec]">
                        {item.foto ? (
                          <Image
                            src={item.foto}
                            alt={item.nama || "Foto menu"}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center text-center p-1">
                            <i className="fa-solid fa-cloud-arrow-up text-sm text-[#748564]" />
                            <span className="mt-1 text-[9px] font-medium text-[#748564]">
                              Upload
                            </span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={!allowPhotoUpload}
                          onChange={(e) => handleMenuPhotoChange(item.id, e)}
                        />
                      </label>
                    </div>

                    {/* Field Data Menu */}
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-[10px] font-semibold text-[#3b4733]">
                          Judul / Nama Menu <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Kismis / Keju / Lemper"
                          value={item.nama}
                          onChange={(e) => handleUpdateMenuItem(item.id, "nama", e.target.value)}
                          className="h-9 w-full rounded-xl border border-[#dce8c5] bg-white px-3 text-xs text-[#222a21] placeholder:text-[#9aa491] focus:border-[#496d2e] focus:outline-none focus:ring-1 focus:ring-[#8cae4e]"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-[10px] font-semibold text-[#3b4733]">
                          Harga Menu (Rp) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#748564]">
                            Rp
                          </span>
                          <input
                            type="text"
                            required
                            placeholder="7.000"
                            value={formatRupiah(item.harga)}
                            onChange={(e) =>
                              handleUpdateMenuItem(
                                item.id,
                                "harga",
                                e.target.value.replace(/\D/g, "")
                              )
                            }
                            className="h-9 w-full rounded-xl border border-[#dce8c5] bg-white pl-9 pr-3 text-xs font-semibold text-[#222a21] placeholder:text-[#9aa491] focus:border-[#496d2e] focus:outline-none focus:ring-1 focus:ring-[#8cae4e]"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-[10px] font-semibold text-[#3b4733]">
                          Deskripsi Menu
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: Topping kismis dengan rasa asam manis atau Rasanya Enak"
                          value={item.deskripsi}
                          onChange={(e) =>
                            handleUpdateMenuItem(item.id, "deskripsi", e.target.value)
                          }
                          className="h-9 w-full rounded-xl border border-[#dce8c5] bg-white px-3 text-xs text-[#222a21] placeholder:text-[#9aa491] focus:border-[#496d2e] focus:outline-none focus:ring-1 focus:ring-[#8cae4e]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>}
        </div>

        {/* ── FOOTER ACTIONS ───────────────────────────────────── */}
        <div className="sticky bottom-0 z-20 flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#edf1e7] bg-[#fbfcf7]/95 px-5 py-4 backdrop-blur-sm sm:px-7">
          <p className="text-[11px] text-[#748564]">
            Tanda <span className="font-bold text-red-500">*</span> wajib diisi untuk kelengkapan berkas digital kios.
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => !isSubmitting && onClose()}
              disabled={isSubmitting}
              className="min-h-10 cursor-pointer rounded-xl border border-[#dce3d4] bg-white px-5 py-2 text-xs font-semibold text-[#4b5842] shadow-2xs transition hover:bg-[#f2f7e5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8cae4e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#ffbf18] px-6 py-2 text-xs font-bold text-[#3b2e00] shadow-sm transition hover:bg-[#f3b20b] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706]"
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin" /> Menyimpan...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-floppy-disk" /> {isEditing ? "Simpan Perubahan" : "Simpan Toko"}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  if (isPageMode) {
    return content;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs bg-black/40 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      {content}
    </div>
  );
}
