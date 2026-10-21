"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Store = {
  id: string;
  name: string;
  handle: string;
  block: string;
  area: string;
  owner: string;
  phone: string;
  category: string;
  rating: string;
  sold: string;
  verified?: boolean;
  thumb: { icon: string; bg: string; fg: string };
};

const stores: Store[] = [
  { id: "s1", name: "Kue Lumpur Kentang Bu Sri", handle: "@lumpurkentang_asli", block: "Blok A-04", area: "Kios Barat", owner: "Budi Santoso", phone: "+62 812-3341-9011", category: "Makanan & Jajanan", rating: "4.8", sold: "1.240 terjual", verified: true, thumb: { icon: "fa-cookie-bite", bg: "bg-[#4a2e1b]", fg: "text-[#f3c969]" } },
  { id: "s2", name: "Klepon Ku", handle: "@keponmaknyus", block: "Blok A-12", area: "Sentra Jajanan", owner: "Siti Aminah", phone: "+62 821-4567-8890", category: "Makanan & Jajanan", rating: "4.9", sold: "3.890 terjual", thumb: { icon: "fa-bowl-food", bg: "bg-[#3b3a35]", fg: "text-[#9bd16b]" } },
  { id: "s3", name: "Kios Sayur Segar Bu Sri", handle: "@sayurbusri_orodoro", block: "Blok B-08", area: "Kios Sayuran", owner: "Sri Wahyuni", phone: "+62 857-1902-3344", category: "Sayur & Buah", rating: "4.7", sold: "890 pesanan", thumb: { icon: "fa-leaf", bg: "bg-[#e3f3c8]", fg: "text-[#4b9a22]" } },
  { id: "s4", name: "Ayam Potong Pak Slamet", handle: "@ayampakslamet", block: "Blok C-02", area: "Kios Daging & Ikan", owner: "Slamet Riyadi", phone: "+62 813-9871-2099", category: "Daging & Ikan", rating: "4.6", sold: "712 pesanan", thumb: { icon: "fa-drumstick-bite", bg: "bg-[#fde4e4]", fg: "text-[#d6453d]" } },
  { id: "s5", name: "Bakso Goreng Bangkit", handle: "@baksogoreng_oro", block: "Blok A-10", area: "Sentra Kuliner", owner: "Joko Prasetyo", phone: "+62 822-7711-4050", category: "Makanan & Jajanan", rating: "4.9", sold: "2.410 terjual", verified: true, thumb: { icon: "fa-utensils", bg: "bg-[#2f2a24]", fg: "text-[#f5a524]" } },
  { id: "s6", name: "Jamu Tradisional Bu Darto", handle: "@jamubudarto", block: "Blok B-15", area: "Kios Rempah", owner: "Darto Mulyono", phone: "+62 819-0331-5544", category: "Herbal & Minuman", rating: "4.8", sold: "640 botol", thumb: { icon: "fa-mortar-pestle", bg: "bg-[#efe6d4]", fg: "text-[#6b5a3a]" } },
];

const summaries = [
  { label: "TOTAL TOKO", value: "251", unit: "", icon: "fa-store", iconBg: "bg-[#ffe9b0]", iconFg: "text-[#c38a00]", footer: "dot" as const },
  { label: "MAKANAN & KULINER", value: "36", unit: "Unit Kios", icon: "fa-utensils", iconBg: "bg-[#ffe9b0]", iconFg: "text-[#c38a00]", bar: { pct: 46, color: "bg-[#fbbf24]" }, note: "46% dari keseluruhan pasar" },
  { label: "TOTAL PENGGUNA", value: "28", unit: "Unit Kios", icon: "fa-basket-shopping", iconBg: "bg-[#e3f3c8]", iconFg: "text-[#4b6515]", bar: { pct: 36, color: "bg-[#2f9e44]" }, note: "36% komoditas pangan basah" },
  { label: "TOTAL TRANSAKSI", value: "28", unit: "Unit Kios", icon: "fa-leaf", iconBg: "bg-[#ffe9b0]", iconFg: "text-[#c38a00]", bar: { pct: 36, color: "bg-[#fbbf24]" }, note: "36% transaksi bulan ini" },
];

const nav = [
  { label: "Dashboard", icon: "fa-table-cells-large", href: "/dashboard" },
  { label: "Kelola Toko", icon: "fa-store", href: "/kelola-toko", active: true },
  { label: "Kategori", icon: "fa-sitemap", href: "/kategori" },
  { label: "Kelola Promo", icon: "fa-tags", href: "/kelola-promo" },
  { label: "Pengguna", icon: "fa-user-group", href: "/pengguna" },
  { label: "Penjual", icon: "fa-shop", href: "/penjual" },
  { label: "Pengaturan", icon: "fa-gear", href: "/pengaturan" },
];

const select =
  "h-8 cursor-pointer rounded-lg border border-[#d4dcc0] bg-white px-2.5 text-[10px] font-medium text-[#3b3a35] focus:outline focus:outline-2 focus:outline-[#8cae4e]";

const cols = "grid grid-cols-[24px_minmax(0,2.4fr)_minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,1.2fr)_90px] items-center gap-3";

export default function KelolaToko() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState<string[]>(["s1"]);

  const visible = useMemo(
    () =>
      stores.filter(
        (s) =>
          `${s.name} ${s.owner} ${s.block}`.toLowerCase().includes(search.toLowerCase()) &&
          (!category || s.category === category),
      ),
    [search, category],
  );

  const toggle = (id: string) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <div className="grid min-h-screen grid-cols-[172px_minmax(0,1fr)] bg-[#e8f1cf] font-['Plus_Jakarta_Sans',sans-serif] text-[#2f3a1f] max-[760px]:grid-cols-[58px_minmax(0,1fr)]">
      {/* ================= SIDEBAR ================= */}
      <aside className="flex flex-col bg-[#eef5da] px-3 py-4 max-[760px]:px-1.5">
        <div className="mb-5 flex items-center gap-2 px-1 max-[760px]:justify-center">
          <svg viewBox="0 0 64 40" className="h-7 w-10 shrink-0 fill-[#4b6515]" aria-hidden="true">
            <path d="M32 2 2 20h60L32 2Zm-24 20v4h48v-4H8Zm4 6v10h6V28h-6Zm34 0v10h6V28h-6Zm-17 0v10h6V28h-6Z" />
          </svg>
          <div className="leading-tight max-[760px]:hidden">
            <p className="text-[11px] font-bold text-[#2f3a1f]">Pasar Oro-Oro Dowo</p>
            <p className="text-[7px] font-semibold tracking-wide text-[#6b7a45]">ADMIN PANEL</p>
          </div>
        </div>

        <nav className="grid gap-1.5">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[10px] font-semibold transition duration-150 max-[760px]:justify-center max-[760px]:px-1.5
                ${item.active ? "bg-[#fbbf24] text-[#3b2f00] shadow-[0_3px_8px_rgba(251,191,36,0.35)]" : "text-[#3b3a35] hover:bg-[#dfeab8]"}`}
            >
              <i className={`fa-solid ${item.icon} w-3.5 text-center text-[11px]`} />
              <span className="max-[760px]:hidden">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-2 rounded-xl bg-[#c9e08e] px-2.5 py-2.5 max-[760px]:hidden">
          <i className="fa-solid fa-circle-check text-sm text-[#2f6b1a]" />
          <div className="leading-tight">
            <p className="text-[9px] font-bold text-[#2f3a1f]">Status Pasar</p>
            <p className="text-[8px] text-[#4b5a2a]">Operasional Aktif</p>
          </div>
        </div>
      </aside>

      {/* ================= KONTEN ================= */}
      <div className="min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-end gap-4 px-6 pt-3">
          <button className="relative grid size-7 cursor-pointer place-items-center text-[#4b6515]" type="button" aria-label="Notifikasi">
            <i className="fa-regular fa-bell text-sm" />
            <span className="absolute top-0.5 right-0.5 size-1.5 rounded-full bg-[#e5484d]" />
          </button>
          <div className="flex items-center gap-2 rounded-full bg-white px-2.5 py-1 shadow-[0_2px_6px_rgba(75,101,21,0.08)]">
            <div className="text-right leading-tight">
              <p className="text-[9px] font-bold text-[#2f3a1f]">Rani</p>
              <p className="text-[7px] text-[#6b7a45]">Super Admin</p>
            </div>
            <span className="grid size-5 place-items-center rounded-full bg-[#2f6b1a] text-white">
              <i className="fa-solid fa-user text-[8px]" />
            </span>
          </div>
        </header>

        <main className="px-6 pt-1 pb-6 max-[560px]:px-3">
          <p className="text-[8px] font-semibold tracking-wider text-[#5b6a35]">ADMIN PANEL &nbsp;›&nbsp; KELOLA TOKO</p>

          <div className="mt-1 mb-4 flex items-start justify-between gap-4 max-[560px]:flex-wrap">
            <div>
              <h1 className="text-[22px] font-extrabold leading-tight text-[#1f2a10] max-[560px]:text-lg">
                Kelola Toko Pasar Oro-Oro Dowo
              </h1>
              <p className="mt-1 max-w-[420px] text-[10px] leading-snug text-[#3b3a35]">
                Manajemen operasional, sertifikasi digital, dan kurasi direktori pedagang Pasar Oro-Oro Dowo Malang.
              </p>
            </div>
            <button
              type="button"
              className="mt-3 inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-md bg-[#fbbf24] px-3 text-[9px] font-bold text-white shadow-[0_3px_8px_rgba(182,135,16,0.3)] transition duration-150 hover:-translate-y-px hover:bg-[#f4b313]"
            >
              <i className="fa-regular fa-circle-plus text-[11px]" /> Tambah Toko Baru
            </button>
          </div>

          {/* Kartu ringkasan */}
          <section className="mb-4 grid grid-cols-4 gap-3 max-[980px]:grid-cols-2 max-[560px]:grid-cols-1" aria-label="Ringkasan toko">
            {summaries.map((s) => (
              <article key={s.label} className="min-h-[92px] rounded-2xl bg-white px-4 py-3 shadow-[0_4px_12px_rgba(75,101,21,0.08)]">
                <div className="flex items-start justify-between">
                  <span className="text-[8px] font-bold tracking-wide text-[#3b3a35]">{s.label}</span>
                  <span className={`grid size-[22px] place-items-center rounded-md text-[10px] ${s.iconBg} ${s.iconFg}`}>
                    <i className={`fa-solid ${s.icon}`} />
                  </span>
                </div>
                <p className="mt-0.5 text-[22px] font-extrabold leading-none text-[#1f2a10]">
                  {s.value}
                  {s.unit && <span className="ml-1.5 text-[9px] font-medium text-[#5b6a35]">{s.unit}</span>}
                </p>
                {s.bar ? (
                  <>
                    <div className="mt-2.5 h-[5px] overflow-hidden rounded-full bg-[#ececec]">
                      <div className={`h-full rounded-full ${s.bar.color}`} style={{ width: `${s.bar.pct}%` }} />
                    </div>
                    <p className="mt-1 text-[8px] font-semibold text-[#3b3a35]">{s.note}</p>
                  </>
                ) : (
                  <div className="mt-3.5 flex items-center justify-between text-[8px] font-semibold text-[#3b3a35]">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-[#2f6b1a]" /> 251 Aktif
                    </span>
                    <span className="text-[#6b7a45]">bulan ini</span>
                  </div>
                )}
              </article>
            ))}
          </section>

          {/* Panel tabel */}
          <section className="overflow-hidden rounded-2xl bg-[#dce9b3]">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 px-4 py-3">
              <label className="flex h-8 w-[170px] items-center gap-2 rounded-full bg-white px-3 shadow-[0_1px_3px_rgba(75,101,21,0.1)] focus-within:outline focus-within:outline-2 focus-within:outline-[#8cae4e]">
                <i className="fa-solid fa-magnifying-glass text-[10px] text-[#3b3a35]" />
                <input
                  className="w-full min-w-0 bg-transparent text-[9px] text-[#3b3a35] outline-0 placeholder:text-[#6f6f6a]"
                  placeholder="Cari nama toko, pemilik..."
                  aria-label="Cari toko"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              <select className={select} aria-label="Kategori" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Semua Kategori</option>
                {[...new Set(stores.map((s) => s.category))].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select className={select} aria-label="Status" defaultValue="">
                <option value="">Semua Status</option>
                <option>Aktif / Terverifikasi</option>
                <option>Menunggu Verifikasi</option>
              </select>
              <select className={select} aria-label="Zona" defaultValue="">
                <option value="">Semua Zona (Blok)</option>
                <option>Blok A</option>
                <option>Blok B</option>
                <option>Blok C</option>
              </select>
              <button type="button" className={`${select} inline-flex items-center gap-1.5 hover:bg-[#f4f8e8]`}>
                <i className="fa-solid fa-sliders text-[10px]" /> Filter Tambahan
              </button>
            </div>

            {/* Header kolom */}
            <div className="overflow-x-auto">
              <div className="min-w-[860px]">
                <div className={`${cols} px-4 pb-2 text-[8px] font-bold tracking-wide text-[#3b3a35]`}>
                  <input
                    type="checkbox"
                    className="size-3 cursor-pointer accent-[#4b6515]"
                    aria-label="Pilih semua"
                    checked={visible.length > 0 && visible.every((s) => selected.includes(s.id))}
                    onChange={(e) => setSelected(e.target.checked ? visible.map((s) => s.id) : [])}
                  />
                  <span>INFORMASI TOKO</span>
                  <span>PEMILIK &amp; KONTAK</span>
                  <span>KATEGORI</span>
                  <span>RATING &amp; TRANSAKSI</span>
                  <span>STATUS TOKO</span>
                  <span className="text-center">AKSI</span>
                </div>

                {/* Baris */}
                <div className="grid gap-1.5 px-2 pb-2">
                  {visible.map((s) => (
                    <article key={s.id} className={`${cols} min-h-[56px] rounded-lg bg-white px-2 py-2 shadow-[0_1px_3px_rgba(75,101,21,0.08)]`}>
                      <input
                        type="checkbox"
                        className="size-3 cursor-pointer accent-[#4b6515]"
                        aria-label={`Pilih ${s.name}`}
                        checked={selected.includes(s.id)}
                        onChange={() => toggle(s.id)}
                      />

                      <div className="flex min-w-0 items-center gap-2.5">
                        {/* Ganti dengan <img src=... className="size-[26px] rounded-md object-cover" /> bila ada foto */}
                        <span className={`grid size-[26px] shrink-0 place-items-center rounded-md text-[11px] ${s.thumb.bg} ${s.thumb.fg}`}>
                          <i className={`fa-solid ${s.thumb.icon}`} />
                        </span>
                        <div className="min-w-0">
                          <p className="flex items-center gap-1 text-[10px] font-bold leading-tight text-[#1f2a10]">
                            <span className="truncate">{s.name}</span>
                            {s.verified && <i className="fa-regular fa-circle-check text-[9px] text-[#4b6515]" />}
                          </p>
                          <p className="mt-px text-[7px] text-[#5b6a35]">{s.handle}</p>
                          <p className="mt-0.5 flex items-center gap-1 text-[7px] text-[#3b3a35]">
                            <span className="rounded bg-[#e8ecd9] px-1 py-px font-semibold">{s.block}</span>
                            <span>• {s.area}</span>
                          </p>
                        </div>
                      </div>

                      <div className="min-w-0 text-[8px] leading-tight">
                        <p className="font-bold text-[#1f2a10]">{s.owner}</p>
                        <p className="mt-0.5 flex items-start gap-1 text-[#3b3a35]">
                          <i className="fa-solid fa-phone mt-0.5 text-[7px]" />
                          <span>{s.phone}</span>
                        </p>
                      </div>

                      <span className="w-fit rounded-full bg-[#d9eaae] px-2 py-[3px] text-[8px] font-semibold leading-tight text-[#315e20]">
                        {s.category}
                      </span>

                      <div className="text-[8px] leading-tight text-[#3b3a35]">
                        <p>
                          <i className="fa-solid fa-star text-[9px] text-[#fbbf24]" />{" "}
                          <b className="text-[10px] text-[#1f2a10]">{s.rating}</b> / 5.0
                        </p>
                        <p className="mt-0.5">{s.sold}</p>
                      </div>

                      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#dff5e1] px-2 py-1 text-[8px] font-semibold leading-tight text-[#1f7a35]">
                        <i className="fa-solid fa-circle-check text-[9px]" /> Aktif /<br className="hidden" /> Terverifikasi
                      </span>

                      <div className="flex items-center justify-center gap-3 text-[11px] text-[#2f3a1f]">
                        <button type="button" aria-label={`Lihat ${s.name}`} className="cursor-pointer hover:text-[#4b6515]"><i className="fa-regular fa-eye" /></button>
                        <button type="button" aria-label={`Edit ${s.name}`} className="cursor-pointer hover:text-[#4b6515]"><i className="fa-solid fa-pen text-[10px]" /></button>
                        <button type="button" aria-label={`Menu ${s.name}`} className="cursor-pointer hover:text-[#4b6515]"><i className="fa-solid fa-ellipsis-vertical" /></button>
                      </div>
                    </article>
                  ))}
                  {!visible.length && (
                    <p className="rounded-lg bg-white/70 p-4 text-center text-[10px] text-[#5b6a35]">Toko tidak ditemukan.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer aksi */}
            <div className="flex flex-wrap items-center gap-2 bg-[#cfe09f] px-4 py-2 text-[9px]">
              <span className="text-[#3b3a35]">Terpilih:</span>
              <span className="rounded bg-white px-1.5 py-0.5 font-semibold text-[#1f2a10]">{selected.length} Toko</span>
              <button
                type="button"
                disabled={!selected.length}
                className="inline-flex h-6 cursor-pointer items-center gap-1 rounded border border-[#f1c9c9] bg-white px-2.5 text-[9px] font-semibold text-[#d6453d] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <i className="fa-regular fa-trash-can" /> Hapus Terpilih
              </button>
              <button
                type="button"
                disabled={!selected.length}
                className="inline-flex h-6 cursor-pointer items-center gap-1 rounded border border-[#d4dcc0] bg-white px-2.5 text-[9px] font-semibold text-[#3b3a35] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <i className="fa-regular fa-circle-pause" /> Nonaktifkan Sementara
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}