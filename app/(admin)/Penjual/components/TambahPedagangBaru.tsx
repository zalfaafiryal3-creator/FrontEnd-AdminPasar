"use client";

import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PedagangData = {
  id: string;
  name: string;
  phone: string;
  shop: string;
  block: string;
  status: "Aktif" | "Menunggu Verifikasi" | "Nonaktif";
  photoUrl: string | null;
  email?: string;
  type?: string;
};

type TambahPedagangBaruProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PedagangData) => void;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_OPTIONS: {
  value: PedagangData["status"];
  label: string;
  bg: string;
  fg: string;
  icon: string;
}[] = [
  {
    value: "Aktif",
    label: "Aktif",
    bg: "bg-[#d6f06f]",
    fg: "text-[#38511b]",
    icon: "fa-circle-check",
  },
  {
    value: "Menunggu Verifikasi",
    label: "Menunggu Verifikasi",
    bg: "bg-[#fff0c9]",
    fg: "text-[#7a5000]",
    icon: "fa-clock",
  },
  {
    value: "Nonaktif",
    label: "Nonaktif",
    bg: "bg-[#ffd9d5]",
    fg: "text-[#cc5148]",
    icon: "fa-ban",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readStores(): { id: string; store: string; zone: string }[] {
  try {
    const seed = [
      { id: "store-default-lumpur-kentang", store: "Kue Lumpur Kentang Bu Sri", zone: "Blok A-04" },
      { id: "store-default-klepon", store: "Klepon Ku", zone: "Blok A-12" },
      { id: "store-default-sayur", store: "Kios Sayur Segar Bu Sri", zone: "Blok B-08" },
      { id: "store-default-ayam", store: "Ayam Potong Pak Slamet", zone: "Blok C-02" },
      { id: "store-default-bakso", store: "Bakso Goreng Bangkit", zone: "Blok A-10" },
      { id: "store-default-jamu", store: "Jamu Tradisional Bu Darto", zone: "Blok B-15" },
    ];
    const saved: { id: string; store: string; zone: string }[] = JSON.parse(
      localStorage.getItem("pasar-admin-stores") || "[]"
    );
    const savedIds = new Set(saved.map((s) => s.id));
    return [...seed.filter((s) => !savedIds.has(s.id)), ...saved];
  } catch {
    return [];
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TambahPedagangBaru({
  isOpen,
  onClose,
  onSave,
}: TambahPedagangBaruProps) {
  // Form fields
  const [namaLengkap, setNamaLengkap] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [statusAkun, setStatusAkun] = useState<PedagangData["status"]>(
    "Menunggu Verifikasi"
  );
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // UI state
  const [stores, setStores] = useState<{ id: string; store: string; zone: string }[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Load stores from localStorage on mount / open
  useEffect(() => {
    if (isOpen) setStores(readStores());
  }, [isOpen]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Keyboard escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran foto profil maksimal 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setNamaLengkap("");
    setNoTelepon("");
    setSelectedStore("");
    setStatusAkun("Menunggu Verifikasi");
    setPhotoPreview(null);
    setErrorMsg("");
    onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!namaLengkap.trim()) {
      setErrorMsg("Nama lengkap pedagang wajib diisi.");
      return;
    }
    if (!noTelepon.trim()) {
      setErrorMsg("Nomor telepon/WhatsApp wajib diisi.");
      return;
    }

    setIsSubmitting(true);

    const storeObj = stores.find((s) => s.id === selectedStore);

    const payload: PedagangData = {
      id: `seller-${Date.now()}`,
      name: namaLengkap.trim(),
      phone: noTelepon.trim(),
      shop: storeObj?.store ?? "Kios Mandiri",
      block: storeObj?.zone ?? "–",
      status: statusAkun,
      photoUrl: photoPreview,
    };

    // Persist to localStorage
    try {
      const existing: PedagangData[] = JSON.parse(
        localStorage.getItem("pasar-admin-sellers") || "[]"
      );
      localStorage.setItem(
        "pasar-admin-sellers",
        JSON.stringify([...existing, payload])
      );
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onSave(payload);
      handleCancel();
    }, 280);
  };

  // ── Derived ───────────────────────────────────────────────────────────────

  const currentStatus =
    STATUS_OPTIONS.find((s) => s.value === statusAkun) ?? STATUS_OPTIONS[1];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/45 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-pedagang-title"
      onClick={(e) => {
        if (e.target === backdropRef.current) handleCancel();
      }}
    >
      <div className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-[#dce8c5] bg-white shadow-2xl max-h-[92vh]">

        {/* ── HEADER ───────────────────────────────────────────────────── */}
        <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-[#edf1e7] bg-[#fbfcf7]/95 px-5 py-4 backdrop-blur-sm sm:px-7">
          <div className="flex items-center gap-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#eef5df] text-[#496d2e] shadow-xs">
              <i className="fa-solid fa-user-plus text-lg" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="modal-pedagang-title"
                className="text-base font-bold tracking-tight text-[#222a21] sm:text-lg"
              >
                Tambah Pedagang Baru
              </h2>
              <p className="text-[11px] text-[#66705e] sm:text-xs">
                Daftarkan identitas dan kios pedagang ke sistem pasar
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCancel}
            className="grid size-8 place-items-center rounded-full text-[#66705e] transition hover:bg-[#edf5d7] hover:text-[#222a21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8cae4e]"
            aria-label="Tutup modal"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* ── BODY ─────────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">

            {/* Error */}
            {errorMsg && (
              <div
                className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 shadow-xs"
                role="alert"
              >
                <i className="fa-solid fa-circle-exclamation text-sm shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* ─ PHOTO + IDENTITY PREVIEW ─────────────────────────────── */}
            <div className="mb-5 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              {/* Avatar upload */}
              <div className="flex shrink-0 flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="group relative size-24 overflow-hidden rounded-full border-2 border-dashed border-[#c8d8ae] bg-[#f5f8ed] transition hover:border-[#8cae4e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8cae4e]"
                  aria-label="Upload foto profil"
                >
                  {photoPreview ? (
                    <Image
                      src={photoPreview}
                      alt="Foto profil pedagang"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : namaLengkap ? (
                    <span className="flex size-full items-center justify-center text-2xl font-bold text-[#496d2e]">
                      {getInitials(namaLengkap)}
                    </span>
                  ) : (
                    <span className="flex size-full flex-col items-center justify-center gap-0.5 text-[#8cae4e]">
                      <i className="fa-solid fa-camera text-xl" />
                      <span className="text-[9px] font-semibold">Foto</span>
                    </span>
                  )}
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 bg-black/40 opacity-0 transition group-hover:opacity-100">
                    <i className="fa-solid fa-camera text-lg text-white" />
                    <span className="text-[9px] font-semibold text-white">Ganti</span>
                  </span>
                </button>

                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handlePhotoChange}
                />

                {photoPreview && (
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="text-[11px] font-medium text-red-600 hover:underline"
                  >
                    Hapus Foto
                  </button>
                )}
                <p className="text-center text-[10px] text-[#8a9082]">
                  JPG/PNG maks&nbsp;2MB
                </p>
              </div>

              {/* Mini identity card live preview */}
              <div className="flex-1 rounded-2xl border border-[#e5edd8] bg-[#f9faf4] p-4 min-w-0">
                <p className="mb-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#496d2e]">
                  <i className="fa-solid fa-id-card" /> Pratinjau Kartu Pedagang
                </p>
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-[#eef5df] font-bold text-[#496d2e] text-sm">
                    {photoPreview ? (
                      <Image
                        src={photoPreview}
                        alt=""
                        width={40}
                        height={40}
                        unoptimized
                        className="size-10 rounded-full object-cover"
                      />
                    ) : (
                      <span>{getInitials(namaLengkap) || <i className="fa-solid fa-user text-xs" />}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-[#1f261d]">
                      {namaLengkap || "Nama Pedagang"}
                    </p>
                    <p className="truncate text-[10px] text-[#66705e]">
                      {stores.find((s) => s.id === selectedStore)?.store || "Pilih Toko / Kios"}
                    </p>
                    <p className="text-[10px] text-[#8a9082]">
                      {noTelepon || "No. Telepon"}
                    </p>
                  </div>
                  <span
                    className={`ml-auto shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${currentStatus.bg} ${currentStatus.fg}`}
                  >
                    <i className={`fa-solid ${currentStatus.icon} text-[8px]`} />
                    {statusAkun === "Menunggu Verifikasi" ? "Menunggu" : statusAkun}
                  </span>
                </div>
              </div>
            </div>

            {/* ─ FORM SECTIONS ────────────────────────────────────────── */}
            <div className="space-y-4">

              {/* Section 1: Identitas */}
              <section className="rounded-2xl border border-[#e5edd8] bg-[#fdfefc] p-4 shadow-xs sm:p-5">
                <div className="mb-4 flex items-center gap-2.5 border-b border-[#edf2e4] pb-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#eef5df] text-[11px] font-bold text-[#496d2e]">1</span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#3c4a30] sm:text-sm">
                    Identitas Pedagang
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Nama Lengkap */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="nama-pedagang">
                      Nama Lengkap Pedagang <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fa-regular fa-user pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                      <input
                        id="nama-pedagang"
                        type="text"
                        required
                        placeholder="Contoh: Budi Santoso / Sri Wahyuni"
                        value={namaLengkap}
                        onChange={(e) => setNamaLengkap(e.target.value)}
                        className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white pl-9 pr-3 text-xs text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                      />
                    </div>
                  </div>

                  {/* No Telepon */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="no-telepon-pedagang">
                      Nomor Telepon / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <i className="fa-solid fa-phone pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                      <input
                        id="no-telepon-pedagang"
                        type="tel"
                        required
                        placeholder="+62 812-5555-2012"
                        value={noTelepon}
                        onChange={(e) => setNoTelepon(e.target.value)}
                        className="h-10 w-full rounded-xl border border-[#dce8c5] bg-white pl-9 pr-3 text-xs text-[#222a21] placeholder:text-[#9aa491] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                      />
                    </div>
                  </div>

                  {/* Status Verifikasi */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="status-akun-pedagang">
                      Status Verifikasi / Akun
                    </label>
                    <div className="relative">
                      <i className="fa-solid fa-shield-halved pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                      <select
                        id="status-akun-pedagang"
                        value={statusAkun}
                        onChange={(e) => setStatusAkun(e.target.value as PedagangData["status"])}
                        className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-[#dce8c5] bg-white pl-9 pr-8 text-xs text-[#222a21] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <i className="fa-solid fa-chevron-down pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-[#748564]" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Toko / Kios */}
              <section className="rounded-2xl border border-[#e5edd8] bg-[#fdfefc] p-4 shadow-xs sm:p-5">
                <div className="mb-4 flex items-center gap-2.5 border-b border-[#edf2e4] pb-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#eef5df] text-[11px] font-bold text-[#496d2e]">2</span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#3c4a30] sm:text-sm">
                    Pilih Toko / Kios
                  </h3>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[#3b4733]" htmlFor="pilih-toko-pedagang">
                    Toko / Kios yang Dikelola
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-store pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#748564]" />
                    <select
                      id="pilih-toko-pedagang"
                      value={selectedStore}
                      onChange={(e) => setSelectedStore(e.target.value)}
                      className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-[#dce8c5] bg-white pl-9 pr-8 text-xs text-[#222a21] shadow-2xs transition focus:border-[#496d2e] focus:outline-none focus:ring-2 focus:ring-[#8cae4e]/40"
                    >
                      <option value="">— Pilih toko/kios (opsional) —</option>
                      {stores.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.store} · {s.zone}
                        </option>
                      ))}
                    </select>
                    <i className="fa-solid fa-chevron-down pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-[#748564]" />
                  </div>

                  {selectedStore && (() => {
                    const s = stores.find((st) => st.id === selectedStore);
                    return s ? (
                      <div className="mt-2 flex items-center gap-2 rounded-xl bg-[#eef5df] px-3 py-2">
                        <i className="fa-solid fa-location-dot text-xs text-[#496d2e]" />
                        <span className="text-xs font-semibold text-[#3b4733]">{s.store}</span>
                        <span className="ml-auto rounded-md bg-[#fff0c9] px-2 py-0.5 text-[10px] font-bold text-[#7a5000]">
                          {s.zone}
                        </span>
                      </div>
                    ) : null;
                  })()}
                </div>
              </section>

              {/* Section 3: Foto Profil */}
              <section className="rounded-2xl border border-[#e5edd8] bg-[#fdfefc] p-4 shadow-xs sm:p-5">
                <div className="mb-4 flex items-center gap-2.5 border-b border-[#edf2e4] pb-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#eef5df] text-[11px] font-bold text-[#496d2e]">3</span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#3c4a30] sm:text-sm">
                    Foto Profil / Identitas
                  </h3>
                </div>

                <div
                  onClick={() => photoInputRef.current?.click()}
                  className={`group relative flex min-h-[110px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-4 text-center transition ${
                    photoPreview
                      ? "border-[#8cae4e] bg-[#f5f8ed]"
                      : "border-[#c8d8ae] bg-[#fbfdf7] hover:border-[#8cae4e] hover:bg-[#f3f7e8]"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label="Klik untuk upload foto profil"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      photoInputRef.current?.click();
                    }
                  }}
                >
                  {photoPreview ? (
                    <div className="flex items-center gap-3">
                      <div className="relative size-16 overflow-hidden rounded-full border-2 border-[#8cae4e]">
                        <Image
                          src={photoPreview}
                          alt="Preview foto profil"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-[#3b4733]">Foto berhasil diunggah</p>
                        <p className="text-[11px] text-[#748564]">Klik untuk ganti foto</p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/30 opacity-0 transition group-hover:opacity-100">
                        <span className="rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#222a21] shadow-md">
                          <i className="fa-solid fa-camera mr-1.5" /> Ganti Foto
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid size-12 place-items-center rounded-full bg-[#eef5df] text-[#496d2e] transition group-hover:scale-105">
                        <i className="fa-solid fa-image text-xl" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#3b4733]">
                          Klik untuk upload foto profil pedagang
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#748564]">
                          Format JPG, PNG, atau WEBP — maks 2MB
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </section>

            </div>
          </div>

          {/* ── FOOTER ACTIONS ───────────────────────────────────────────── */}
          <div className="sticky bottom-0 z-10 flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#edf1e7] bg-[#fbfcf7]/95 px-5 py-4 backdrop-blur-sm sm:px-7">
            <p className="text-[11px] text-[#748564]">
              Tanda <span className="font-bold text-red-500">*</span> wajib diisi.
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
                className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#ffbf18] px-6 py-2 text-xs font-bold text-[#3b2e00] shadow-sm transition hover:bg-[#f3b20b] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d97706]"
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-floppy-disk" />
                    Simpan Pedagang
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
