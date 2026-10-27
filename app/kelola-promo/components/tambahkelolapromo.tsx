"use client";

import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../components/AdminLayout";

export type PromoData = {
  id?: string;
  title: string;
  store: string;
  owner?: string;
  category: string;
  description: string;
  bannerImage: string | null;
  status: "Sedang Berlangsung" | "Akan Datang" | "Setiap Akhir Pekan" | "Hari Pasaran Khusus";
  periodType: "range" | "days" | "specific";
  periodDisplay: string;
  operatingHours: string;
  terms: string;
  code?: string;
  quota?: string;
  discountType?: string;
};

type TambahKelolaPromoProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (data: PromoData) => void;
  isPageMode?: boolean;
};

const ZONA_CATEGORIES = [
  "Zona Makanan",
  "Zona Sayur & Buah",
  "Zona Kuliner Legend",
  "Zona Daging & Ikan",
  "Zona Sembako & Perabotan",
  "Zona Mainan & Pakaian",
];

const TIPE_DISKON_OPTIONS = [
  "Diskon Tunai",
  "Potongan Harga",
  "Promo Ganda",
  "Promo Mingguan",
  "Promo Hari Pasaran",
  "Voucher Belanja",
];

const STATUS_OPTIONS: Array<{
  value: PromoData["status"];
  label: string;
  badgeBg: string;
  badgeFg: string;
  icon: string;
}> = [
  {
    value: "Sedang Berlangsung",
    label: "Sedang Berlangsung",
    badgeBg: "bg-[#d6f06f]",
    badgeFg: "text-[#38511b]",
    icon: "fa-circle-play",
  },
  {
    value: "Akan Datang",
    label: "Akan Datang",
    badgeBg: "bg-[#e2e6e2]",
    badgeFg: "text-[#4c554e]",
    icon: "fa-clock",
  },
  {
    value: "Setiap Akhir Pekan",
    label: "Setiap Akhir Pekan",
    badgeBg: "bg-[#baf0bf]",
    badgeFg: "text-[#28733d]",
    icon: "fa-calendar-week",
  },
  {
    value: "Hari Pasaran Khusus",
    label: "Hari Pasaran Khusus",
    badgeBg: "bg-[#ffd9d5]",
    badgeFg: "text-[#cc5148]",
    icon: "fa-calendar-day",
  },
];

export default function TambahKelolaPromo({
  isOpen = true,
  onClose,
  onSave,
  isPageMode = false,
}: TambahKelolaPromoProps) {
  const router = useRouter();

  // 1. Informasi Utama Promo
  const [judulPromo, setJudulPromo] = useState("");
  const [namaToko, setNamaToko] = useState("");
  const [namaPemilik, setNamaPemilik] = useState("");
  const [zonaLokasi, setZonaLokasi] = useState(ZONA_CATEGORIES[0]);
  const [tipeDiskon, setTipeDiskon] = useState(TIPE_DISKON_OPTIONS[0]);
  const [deskripsi, setDeskripsi] = useState("");

  // 2. Media & Banner
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [statusPromo, setStatusPromo] = useState<PromoData["status"]>("Sedang Berlangsung");
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // 3. Periode & Jadwal Waktu
  const [periodType, setPeriodType] = useState<"range" | "days" | "specific">("range");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customDays, setCustomDays] = useState("");
  const [specificDate, setSpecificDate] = useState("");
  const [jamKhusus, setJamKhusus] = useState("");

  // 4. Syarat & Ketentuan / Catatan
  const [keteranganSyarat, setKeteranganSyarat] = useState("");
  const [kodePromo, setKodePromo] = useState("");
  const [kuotaPromo, setKuotaPromo] = useState("");

  // UI state
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper formatting period string
  const getPeriodString = () => {
    if (periodType === "range") {
      if (!startDate && !endDate) return "";
      if (!startDate || !endDate) return startDate || endDate;
      const s = new Date(startDate);
      const e = new Date(endDate);
      const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
      return `${s.toLocaleDateString("id-ID", opts)} - ${e.toLocaleDateString("id-ID", opts)}`;
    }
    if (periodType === "days") {
      return customDays || "";
    }
    return specificDate || "";
  };

  // Handle Banner Upload
  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("Ukuran banner promo maksimal 3MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setBannerPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const currentStatusObj =
    STATUS_OPTIONS.find((s) => s.value === statusPromo) || STATUS_OPTIONS[0];

  // Cancel Handler
  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      router.push("/kelola-promo");
    }
  };

  // Submit Handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!judulPromo.trim()) {
      setErrorMsg("Judul promo wajib diisi.");
      return;
    }
    if (!namaToko.trim()) {
      setErrorMsg("Nama toko penyelenggara wajib diisi.");
      return;
    }

    setIsSubmitting(true);

    const periodDisplay = getPeriodString();
    const cleanCode = (kodePromo || judulPromo.replace(/\s+/g, "")).toUpperCase().slice(0, 10);

    const promoPayload: PromoData = {
      id: `promo-${Date.now()}`,
      title: judulPromo.trim(),
      store: namaToko.trim(),
      owner: namaPemilik.trim() || "Pedagang Pasar",
      category: zonaLokasi,
      description: deskripsi.trim(),
      bannerImage: bannerPreview,
      status: statusPromo,
      periodType,
      periodDisplay,
      operatingHours: jamKhusus.trim() || "06.00 - 17.00 WIB",
      terms: keteranganSyarat.trim() || "Berlaku langsung di kios",
      code: cleanCode,
      quota: kuotaPromo ? `0 / ${kuotaPromo}` : "0 / 100",
      discountType: tipeDiskon,
    };

    // Save to localStorage directly for seamless persistence across pages
    try {
      const existing = JSON.parse(localStorage.getItem("pasar-admin-promos") || "[]");
      const record = {
        id: promoPayload.id,
        store: promoPayload.store,
        owner: promoPayload.owner,
        category: promoPayload.category.replace("Zona ", ""),
        discount: promoPayload.title,
        period: `${promoPayload.periodDisplay || "Periode Aktif"} • ${promoPayload.operatingHours}`,
        requirements: promoPayload.terms,
        quota: promoPayload.quota || "0 / 100",
        status: promoPayload.status,
        description: promoPayload.description,
        bannerImage: promoPayload.bannerImage,
        code: promoPayload.code,
        discountType: promoPayload.discountType,
      };
      localStorage.setItem("pasar-admin-promos", JSON.stringify([...existing, record]));
    } catch {
      // ignore storage error
    }

    // Call onSave callback if provided
    if (onSave) {
      onSave(promoPayload);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      if (onClose) {
        onClose();
      } else {
        router.push("/kelola-promo");
      }
    }, 250);
  };

  if (!isOpen && !isPageMode) return null;

  const content = (
    <div
      className={`relative flex w-full flex-col bg-white text-[#222a21] ${
        isPageMode
          ? "rounded-3xl border border-[#dce8c5] shadow-xl"
          : "max-h-[92vh] max-w-5xl rounded-3xl border border-[#dce8c5] shadow-2xl"
      } overflow-hidden`}
    >
      {/* ── HEADER MODAL / HALAMAN ─────────────────────────────────────── */}
      <div className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-[#edf1e7] bg-[#fbfcf7]/95 px-5 py-4 backdrop-blur-sm sm:px-7">
        <div className="flex items-center gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#fff0c9] text-[#bd7a00] shadow-xs">
            <i className="fa-solid fa-tags text-lg" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight text-[#222a21] sm:text-lg">
              Tambah Promo Baru
            </h2>
            <p className="text-[11px] text-[#66705e] sm:text-xs">
              Formulir promosi digital, diskon lapak pedagang &amp; pratinjau kartu seluler pelanggan
            </p>
          </div>
        </div>

        {!isPageMode && (
          <button
            type="button"
            onClick={handleCancel}
            className="grid size-8 place-items-center rounded-full text-[#66705e] transition hover:bg-[#edf5d7] hover:text-[#222a21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8cae4e]"
            aria-label="Tutup formulir promo"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        )}
      </div>

      {/* ── BODY FORMULIR DENGAN PRATINJAU SELULER ───────────────────── */}
      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          {errorMsg && (
            <div
              className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 shadow-xs"
              role="alert"
            >
              <i className="fa-solid fa-circle-exclamation text-sm shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
            {/* ══ KOLOM KIRI: FORMULIR INPUT 4 BAGIAN ══ */}
            <div className="space-y-5">
              {/* 1. INFORMASI UTAMA PROMO */}
              <section className="rounded-2xl border border-[#e5edd8] bg-[#fdfefc] p-4.5 sm:p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2.5 border-b border-[#edf2e4] pb-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#eef5df] text-[11px] font-bold text-[#496d2e]">
                    1
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#3c4a30] sm:text-sm">
                    Informasi Utama Promo
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Judul Promo */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="judul-promo">
                      Judul Promo <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fa-solid fa-tag pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                      <input
                        id="judul-promo"
                        type="text"
                        required
                        placeholder="Contoh: Diskon Tahu Bakso / Diskon Cake"
                        value={judulPromo}
                        onChange={(e) => setJudulPromo(e.target.value)}
                        className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white pl-9 pr-3 text-xs text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                      />
                    </div>
                  </div>

                  {/* Nama Toko Penyelenggara */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="toko-penyelenggara">
                      Nama Toko / Kios Penyelenggara <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fa-solid fa-store pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                      <input
                        id="toko-penyelenggara"
                        type="text"
                        required
                        placeholder="Contoh: Tahu Bakso Cuan / Warung Bu As"
                        value={namaToko}
                        onChange={(e) => setNamaToko(e.target.value)}
                        className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white pl-9 pr-3 text-xs text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                      />
                    </div>
                  </div>

                  {/* Nama Pemilik Lapak */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="pemilik-lapak">
                      Nama Pemilik Lapak
                    </label>
                    <div className="relative">
                      <i className="fa-regular fa-user pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                      <input
                        id="pemilik-lapak"
                        type="text"
                        placeholder="Contoh: Pak Haryono / Bu Ratna"
                        value={namaPemilik}
                        onChange={(e) => setNamaPemilik(e.target.value)}
                        className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white pl-9 pr-3 text-xs text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                      />
                    </div>
                  </div>

                  {/* Tipe Promo */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="tipe-diskon-promo">
                      Tipe Penawaran Promo
                    </label>
                    <div className="relative">
                      <i className="fa-solid fa-percent pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                      <select
                        id="tipe-diskon-promo"
                        value={tipeDiskon}
                        onChange={(e) => setTipeDiskon(e.target.value)}
                        className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-[#dce8c5] bg-white pl-9 pr-8 text-xs text-[#222a21] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                      >
                        {TIPE_DISKON_OPTIONS.map((tip) => (
                          <option key={tip} value={tip}>
                            {tip}
                          </option>
                        ))}
                      </select>
                      <i className="fa-solid fa-chevron-down pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-[#748564]" />
                    </div>
                  </div>

                  {/* Kategori / Zona Lokasi */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="zona-lokasi">
                      Kategori / Zona Lokasi <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fa-solid fa-location-dot pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                      <select
                        id="zona-lokasi"
                        value={zonaLokasi}
                        onChange={(e) => setZonaLokasi(e.target.value)}
                        className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-[#dce8c5] bg-white pl-9 pr-8 text-xs text-[#222a21] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                      >
                        {ZONA_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <i className="fa-solid fa-chevron-down pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-[#748564]" />
                    </div>
                  </div>

                  {/* Deskripsi Promo */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="deskripsi-promo">
                      Deskripsi Promo
                    </label>
                    <textarea
                      id="deskripsi-promo"
                      rows={3}
                      placeholder="Jelaskan isi promo, keunggulan menu, atau syarat spesial potongan harga..."
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                      className="w-full rounded-xl border border-[#dce8c5] bg-white p-3 text-xs leading-relaxed text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                    />
                  </div>
                </div>
              </section>

              {/* 2. MEDIA & BANNER */}
              <section className="rounded-2xl border border-[#e5edd8] bg-[#fdfefc] p-4.5 sm:p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2.5 border-b border-[#edf2e4] pb-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#eef5df] text-[11px] font-bold text-[#496d2e]">
                    2
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#3c4a30] sm:text-sm">
                    Media &amp; Banner Promo
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Upload Foto / Banner Promo */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="text-xs font-semibold text-[#3b4733]">
                        Upload Foto / Banner Promo
                      </label>
                      {bannerPreview && (
                        <button
                          type="button"
                          onClick={() => setBannerPreview(null)}
                          className="text-[11px] font-medium text-red-600 hover:underline"
                        >
                          Hapus Foto
                        </button>
                      )}
                    </div>

                    <input
                      ref={bannerInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={handleBannerChange}
                    />

                    <div
                      onClick={() => bannerInputRef.current?.click()}
                      className={`group relative flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-3 text-center transition ${
                        bannerPreview
                          ? "border-[#8cae4e] bg-[#f5f8ed] p-1"
                          : "border-[#c8d8ae] bg-[#fbfdf7] hover:border-[#8cae4e] hover:bg-[#f3f7e8]"
                      }`}
                    >
                      {bannerPreview ? (
                        <div className="relative h-32 w-full overflow-hidden rounded-xl">
                          <Image
                            src={bannerPreview}
                            alt="Pratinjau Banner Promo"
                            fill
                            unoptimized
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                            <span className="rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#222a21] shadow-md">
                              <i className="fa-solid fa-camera mr-1.5" /> Ganti Banner
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center p-2">
                          <div className="mb-2 grid size-11 place-items-center rounded-full bg-[#fff0c9] text-[#bd7a00] transition group-hover:scale-105">
                            <i className="fa-solid fa-bullhorn text-lg" />
                          </div>
                          <p className="text-xs font-semibold text-[#3b4733]">
                            Klik untuk upload banner promo
                          </p>
                          <p className="mt-0.5 text-[10px] text-[#748564]">
                            Format horizontal (16:9 atau lebar), JPG, PNG, WEBP maks 3MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status / Label Badge Promo & Kuota */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="status-badge-promo">
                        Status / Label Badge Promo
                      </label>
                      <div className="relative">
                        <select
                          id="status-badge-promo"
                          value={statusPromo}
                          onChange={(e) =>
                            setStatusPromo(e.target.value as PromoData["status"])
                          }
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
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="kuota-klaim">
                        Kuota Kupon / Klaim Promo
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-ticket pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                        <input
                          id="kuota-klaim"
                          type="number"
                          min="1"
                          placeholder="Contoh: 200"
                          value={kuotaPromo}
                          onChange={(e) => setKuotaPromo(e.target.value)}
                          className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white pl-9 pr-3 text-xs text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. PERIODE & JADWAL WAKTU */}
              <section className="rounded-2xl border border-[#e5edd8] bg-[#fdfefc] p-4.5 sm:p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2.5 border-b border-[#edf2e4] pb-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#eef5df] text-[11px] font-bold text-[#496d2e]">
                    3
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#3c4a30] sm:text-sm">
                    Periode &amp; Jadwal Waktu
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Tipe Periode Tabs */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]">
                      Tipe Periode Promo
                    </label>
                    <div className="grid grid-cols-3 gap-2 rounded-xl bg-[#eef5df] p-1 text-xs">
                      <button
                        type="button"
                        onClick={() => setPeriodType("range")}
                        className={`rounded-lg py-1.5 text-center font-semibold transition ${
                          periodType === "range"
                            ? "bg-white text-[#315e20] shadow-xs"
                            : "text-[#556947] hover:text-[#222a21]"
                        }`}
                      >
                        Rentang Tanggal
                      </button>
                      <button
                        type="button"
                        onClick={() => setPeriodType("days")}
                        className={`rounded-lg py-1.5 text-center font-semibold transition ${
                          periodType === "days"
                            ? "bg-white text-[#315e20] shadow-xs"
                            : "text-[#556947] hover:text-[#222a21]"
                        }`}
                      >
                        Hari Tertentu
                      </button>
                      <button
                        type="button"
                        onClick={() => setPeriodType("specific")}
                        className={`rounded-lg py-1.5 text-center font-semibold transition ${
                          periodType === "specific"
                            ? "bg-white text-[#315e20] shadow-xs"
                            : "text-[#556947] hover:text-[#222a21]"
                        }`}
                      >
                        Tanggal Spesifik
                      </button>
                    </div>
                  </div>

                  {/* Input berdasarkan Tipe Periode */}
                  {periodType === "range" && (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-[10px] font-semibold text-[#3b4733]" htmlFor="tgl-mulai">
                          Tanggal Mulai
                        </label>
                        <input
                          id="tgl-mulai"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white px-3 text-xs text-[#222a21] shadow-2xs focus:border-[#496d2e] focus:outline-none focus:ring-1 focus:ring-[#8cae4e]"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[10px] font-semibold text-[#3b4733]" htmlFor="tgl-selesai">
                          Tanggal Selesai
                        </label>
                        <input
                          id="tgl-selesai"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white px-3 text-xs text-[#222a21] shadow-2xs focus:border-[#496d2e] focus:outline-none focus:ring-1 focus:ring-[#8cae4e]"
                        />
                      </div>
                    </div>
                  )}

                  {periodType === "days" && (
                    <div>
                      <label className="mb-1 block text-[10px] font-semibold text-[#3b4733]" htmlFor="hari-khusus">
                        Pilihan Hari Khusus
                      </label>
                      <input
                        id="hari-khusus"
                        type="text"
                        placeholder="Contoh: Sabtu & Minggu atau Setiap Hari Jumat"
                        value={customDays}
                        onChange={(e) => setCustomDays(e.target.value)}
                        className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white px-3 text-xs text-[#222a21] shadow-2xs focus:border-[#496d2e] focus:outline-none focus:ring-1 focus:ring-[#8cae4e]"
                      />
                    </div>
                  )}

                  {periodType === "specific" && (
                    <div>
                      <label className="mb-1 block text-[10px] font-semibold text-[#3b4733]" htmlFor="tgl-spesifik">
                        Tanggal Spesifik / Hari Pasaran
                      </label>
                      <input
                        id="tgl-spesifik"
                        type="text"
                        placeholder="Contoh: Selasa, 24 Okt 2026 atau Hari Pasaran Legi"
                        value={specificDate}
                        onChange={(e) => setSpecificDate(e.target.value)}
                        className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white px-3 text-xs text-[#222a21] shadow-2xs focus:border-[#496d2e] focus:outline-none focus:ring-1 focus:ring-[#8cae4e]"
                      />
                    </div>
                  )}

                  {/* Jam Khusus / Jam Operasional Promo */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="jam-khusus-promo">
                      Jam Khusus / Jam Operasional Promo
                    </label>
                    <div className="relative">
                      <i className="fa-regular fa-clock pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                      <input
                        id="jam-khusus-promo"
                        type="text"
                        placeholder="Contoh: 06.00 - 09.00 WIB atau 07.00 - 15.00 WIB"
                        value={jamKhusus}
                        onChange={(e) => setJamKhusus(e.target.value)}
                        className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white pl-9 pr-3 text-xs text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. SYARAT & KETENTUAN / CATATAN */}
              <section className="rounded-2xl border border-[#e5edd8] bg-[#fdfefc] p-4.5 sm:p-5 shadow-xs">
                <div className="mb-4 flex items-center gap-2.5 border-b border-[#edf2e4] pb-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#eef5df] text-[11px] font-bold text-[#496d2e]">
                    4
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#3c4a30] sm:text-sm">
                    Syarat &amp; Ketentuan / Catatan
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="syarat-ketentuan">
                      Keterangan Tambahan / Ketentuan
                    </label>
                    <input
                      id="syarat-ketentuan"
                      type="text"
                      placeholder="Contoh: Berlaku otomatis tanpa syarat kupon atau Harga promo langsung di tempat"
                      value={keteranganSyarat}
                      onChange={(e) => setKeteranganSyarat(e.target.value)}
                      className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white px-3 text-xs text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="kode-promo-voucher">
                      Kode Promo / Kupon
                    </label>
                    <div className="relative">
                      <i className="fa-solid fa-barcode pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                      <input
                        id="kode-promo-voucher"
                        type="text"
                        placeholder="Contoh: TAHUBAKSO"
                        value={kodePromo}
                        onChange={(e) => setKodePromo(e.target.value.toUpperCase())}
                        className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white pl-9 pr-3 text-xs font-mono font-bold tracking-wider text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* ══ KOLOM KANAN: LIVE PRATINJAU KARTU SELULER ══ */}
            <aside className="space-y-3">
              <div className="sticky top-20 rounded-3xl border border-[#dce8c5] bg-[#f9faf4] p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between border-b border-[#e6eed6] pb-2.5">
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#354f2a]">
                    <i className="fa-solid fa-mobile-screen text-[#496d2e]" /> Pratinjau Seluler
                  </span>
                  <span className="rounded-full bg-[#eef5df] px-2 py-0.5 text-[9px] font-semibold text-[#496d2e]">
                    Live Preview
                  </span>
                </div>

                {/* Kartu Promo Seluler */}
                <div className="relative overflow-hidden rounded-2xl border border-[#e5edd4] bg-white shadow-md transition hover:shadow-lg">
                  {/* Banner Foto Promo */}
                  <div className="relative h-36 w-full bg-linear-to-tr from-[#3b5323] to-[#8cae4e]">
                    {bannerPreview ? (
                      <Image
                        src={bannerPreview}
                        alt="Preview Promo"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center p-3 text-white text-center">
                        <i className="fa-solid fa-store text-2xl opacity-80" />
                        <span className="mt-1 text-xs font-semibold">{namaToko || "Nama Kios / Toko"}</span>
                        <span className="text-[10px] opacity-80">{zonaLokasi}</span>
                      </div>
                    )}

                    {/* Badge Status di atas banner */}
                    <div className="absolute top-2.5 right-2.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-xs ${currentStatusObj.badgeBg} ${currentStatusObj.badgeFg}`}
                      >
                        <i className={`fa-solid ${currentStatusObj.icon} text-[8px]`} />
                        {statusPromo}
                      </span>
                    </div>

                    {/* Badge Kategori */}
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="rounded-md bg-black/60 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-xs">
                        {zonaLokasi}
                      </span>
                    </div>
                  </div>

                  {/* Body Kartu */}
                  <div className="p-3.5 space-y-2.5 text-[#222a21]">
                    <div>
                      <p className="text-[10px] font-semibold text-[#66705e] flex items-center gap-1">
                        <i className="fa-solid fa-shop text-[9px]" /> {namaToko || "Nama Kios"}
                        {namaPemilik && <span className="text-[9px] text-[#748564]">({namaPemilik})</span>}
                      </p>
                      <h4 className="text-sm font-bold leading-snug text-[#1f261d]">
                        {judulPromo || "Judul Penawaran Promo"}
                      </h4>
                    </div>

                    <p className="text-[11px] leading-relaxed text-[#596258] line-clamp-2">
                      {deskripsi || "Deskripsi rincian penawaran promo lapak..."}
                    </p>

                    {/* Waktu & Jam */}
                    <div className="rounded-xl bg-[#f7faef] border border-[#e8f1d8] p-2 space-y-1 text-[10px]">
                      <div className="flex items-center gap-1.5 text-[#3b4733] font-medium">
                        <i className="fa-regular fa-calendar-check text-[#496d2e]" />
                        <span>{getPeriodString() || "Periode promo"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#3b4733] font-medium">
                        <i className="fa-regular fa-clock text-[#496d2e]" />
                        <span>{jamKhusus || "Jam operasional promo"}</span>
                      </div>
                    </div>

                    {/* Syarat & Kuota */}
                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[#edf1e7]">
                      <span className="text-[#66705e] truncate max-w-[170px]" title={keteranganSyarat || "Syarat & Ketentuan"}>
                        <i className="fa-solid fa-circle-info mr-1 text-[#496d2e]" />
                        {keteranganSyarat || "Syarat & Ketentuan"}
                      </span>
                      {kodePromo ? (
                        <span className="rounded-md bg-[#222a21] px-2 py-0.5 text-[9px] font-mono font-bold text-white tracking-wider">
                          {kodePromo}
                        </span>
                      ) : (
                        <span className="text-[9px] text-[#9aa491]">Tanpa Kode</span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-center text-[10px] text-[#748564]">
                  Tampilan kartu otomatis menyesuaikan data yang Anda ketik.
                </p>
              </div>
            </aside>
          </div>
        </div>

        {/* ── FOOTER ACTIONS ───────────────────────────────────── */}
        <div className="sticky bottom-0 z-20 flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#edf1e7] bg-[#fbfcf7]/95 px-5 py-4 backdrop-blur-sm sm:px-7">
          <p className="text-[11px] text-[#748564]">
            Tanda <span className="font-bold text-red-500">*</span> wajib diisi untuk aktivasi promo pasar.
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="min-h-10 cursor-pointer rounded-xl border border-[#dce3d4] bg-white px-5 py-2 text-xs font-semibold text-[#4b5842] shadow-2xs transition hover:bg-[#f2f7e5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8cae4e]"
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
                  <i className="fa-solid fa-floppy-disk" /> Simpan Promo
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  // If page mode, wrap in AdminLayout and breadcrumbs
  if (isPageMode) {
    return (
      <AdminLayout activePage="promos" label="Tambah Promo Baru">
        <main className="min-h-full min-w-0 px-3 py-4 md:px-6 md:py-6">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-wider text-[#65714f]">
            <Link href="/dashboard" className="cursor-pointer hover:underline">
              ADMIN PANEL
            </Link>
            <span>&rsaquo;</span>
            <Link href="/kelola-promo" className="cursor-pointer hover:underline">
              KELOLA PROMO
            </Link>
            <span>&rsaquo;</span>
            <span className="text-[#2f3a1f]">TAMBAH PROMO BARU</span>
          </div>

          <div className="mx-auto max-w-6xl">{content}</div>
        </main>
      </AdminLayout>
    );
  }

  // Modal mode with dialog backdrop
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs bg-black/40 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCancel();
      }}
    >
      {content}
    </div>
  );
}
