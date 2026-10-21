"use client";

import { useMemo, useState } from "react";

type Shop = {
  code: string;
  rating: string;
  desc: string;
  tags: string[];
  time: string;
  place: string;
};

type Category = {
  name: string;
  lines: [string, string?];
  count: number;
  icon: string;
  iconTone: "amber" | "dark" | "leaf";
  badge: "amber" | "green";
  shops: Shop[];
};

const categories: Category[] = [
  {
    name: "Makanan", lines: ["Makanan"], count: 16, icon: "fa-utensils", iconTone: "amber", badge: "amber",
    shops: [
      { code: "A-04", rating: "4.8", desc: "Lumpur kentang bakar arang lembut khas Oro-Oro Dowo", tags: ["Keju", "Kismis"], time: "06:00–15:00", place: "Los 12" },
      { code: "A-10", rating: "4.9", desc: "Bakso mekar renyah daging sapi & saus sambal khas", tags: ["Original", "Keju Melt"], time: "07:00–17:00", place: "Sentra A" },
      { code: "A-07", rating: "4.7", desc: "Jajanan pasar gula merah kental kelapa parut kukus", tags: ["Lupis Ketan", "Cenil Suji"], time: "05:30–12:00", place: "Los 06" },
    ],
  },
  {
    name: "Sayur & Buah", lines: ["Sayur", "& Buah"], count: 14, icon: "fa-leaf", iconTone: "leaf", badge: "green",
    shops: [
      { code: "B-08", rating: "4.8", desc: "Pasokan sayur hidroponik kebun Batu segar tiap subuh", tags: ["Sawi", "Bayam Batu"], time: "04:30–13:00", place: "Los 08" },
      { code: "B-02", rating: "4.9", desc: "Apel Manalagi Malang, jeruk keprok, & alpukat mentega", tags: ["Apel Malang", "Jeruk Manis"], time: "05:00–16:00", place: "Kios B-02" },
      { code: "B-03", rating: "4.7", desc: "Wortel, kentang Dieng, brokoli hijau, kubis renyah", tags: ["Wortel", "Brokoli"], time: "05:00–14:00", place: "Los 03" },
    ],
  },
  {
    name: "Kuliner Legend", lines: ["Kuliner", "Legend"], count: 12, icon: "fa-bowl-food", iconTone: "amber", badge: "amber",
    shops: [
      { code: "A-12", rating: "4.9", desc: "Legendaris pandan suji gula aren organik melimpah", tags: ["Klepon Suji", "Gula Aren"], time: "06:00–13:00", place: "Los Pasar" },
      { code: "A-15", rating: "4.9", desc: "Es buah campur & es durian murni resep turun-temurun", tags: ["Es Campur", "Es Durian"], time: "09:00–17:00", place: "Kios Depan" },
      { code: "A-01", rating: "4.8", desc: "Kuah kluwek pekat daging empuk sambal terasi uiek", tags: ["Rawon Empal", "Koyor"], time: "06:30–14:00", place: "Kios 01" },
    ],
  },
  {
    name: "Daging & Ikan", lines: ["Daging", "& Ikan"], count: 16, icon: "fa-fish", iconTone: "dark", badge: "green",
    shops: [
      { code: "C-01", rating: "4.9", desc: "Sapi lokal segar sertifikasi halal RPH Malang berpending", tags: ["Has Dalam", "Tetelan"], time: "05:00–12:30", place: "Kios Cold" },
      { code: "C-05", rating: "4.8", desc: "Tangkapan langsung pesisir Malang Selatan & budidaya", tags: ["Tuna", "Udang Windu"], time: "05:30–13:00", place: "Los Es" },
      { code: "C-02", rating: "4.6", desc: "Ayam broiler & kampung bersih potong higienis harian", tags: ["Broiler", "Fillet Dada"], time: "05:00–13:00", place: "Los Unggas" },
    ],
  },
  {
    name: "Sembako & Perabot", lines: ["Sembako", "& Perabot"], count: 18, icon: "fa-crown", iconTone: "amber", badge: "amber",
    shops: [
      { code: "D-02", rating: "4.8", desc: "Beras mentik wangi, minyak goreng, gula, & telur curah", tags: ["Mentik Wangi", "Minyak"], time: "06:00–18:00", place: "Kios D-02" },
      { code: "D-09", rating: "4.8", desc: "Cobek batu kali, wajan baja, kuali tanah, piranti enamel", tags: ["Cobek Batu", "Kuali Tanah"], time: "07:00–16:30", place: "Kios D-09" },
      { code: "B-15", rating: "4.9", desc: "Bumbu giling siap olah rawon, soto madura, rendang", tags: ["Bumbu Rawon", "Rempah Halus"], time: "05:00–15:00", place: "Los Bumbu" },
    ],
  },
  {
    name: "Mainan & Baju", lines: ["Mainan", "& Baju"], count: 12, icon: "fa-puzzle-piece", iconTone: "dark", badge: "amber",
    shops: [
      { code: "D-04", rating: "4.7", desc: "Mainan kayu edukatif, kit angklung, gangsing bambu", tags: ["Seruling", "Gangsing Kayu"], time: "08:00–17:00", place: "Kios D-04" },
      { code: "D-01", rating: "4.5", desc: "Pakaian santai keluarga, daster katun Malangan harian", tags: ["Daster Katun", "Kaos Polos"], time: "07:30–17:00", place: "Kios D-01" },
      { code: "D-06", rating: "4.8", desc: "Konveksi daster motif batik cap khas Malang adem", tags: ["Daster Cap", "Gamis Rumah"], time: "08:00–16:30", place: "Kios D-06" },
    ],
  },
];

const iconTone = {
  amber: "bg-[#fbbf24] text-white",
  dark: "bg-[#2f4a12] text-[#fbbf24]",
  leaf: "border border-[#2f6b1a] bg-[#eef6d6] text-[#2f6b1a]",
};

const badgeTone = {
  amber: "bg-[#fbbf24] text-white",
  green: "bg-[#cfe6a0] text-[#3b5a12]",
};

const selectCls =
  "h-10 min-w-[190px] cursor-pointer rounded-xl border border-[#dfe6cc] bg-white px-3.5 text-xs text-[#3b3a35] focus:outline focus:outline-2 focus:outline-[#8cae4e]";

export default function Kategori() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua Kategori (6)");
  const [sortOrder, setSortOrder] = useState<"count" | "name">("count");
  const [view, setView] = useState<"kolom" | "tabel">("kolom");

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return categories
      .filter((c) => filter.startsWith("Semua") || c.name === filter)
      .map((c) => ({
        ...c,
        shops: c.shops.filter((s) =>
          `${s.code} ${s.desc} ${s.tags.join(" ")} ${s.time} ${s.place} ${c.name}`
            .toLowerCase()
            .includes(q),
        ),
      }))
      .filter((c) => c.shops.length || !q)
      .sort((a, b) =>
        sortOrder === "count"
          ? b.count - a.count || a.name.localeCompare(b.name, "id")
          : a.name.localeCompare(b.name, "id"),
      );
  }, [search, filter, sortOrder]);

  return (
    <main className="min-h-[calc(100vh-58px)] bg-[#e1edbd] p-3 text-[#2f3a1f] max-[560px]:p-2">
        {/* Toolbar */}
        <div className="mb-3 flex flex-wrap items-center gap-3 rounded-2xl bg-white p-2.5">
          <label className="flex h-10 min-w-[220px] flex-[1_1_240px] items-center gap-3 rounded-xl bg-[#eef3df] px-4 focus-within:outline focus-within:outline-2 focus-within:outline-[#8cae4e]">
            <i className="fa-solid fa-magnifying-glass text-sm text-[#2f3a1f]" />
            <input
              className="w-full min-w-0 bg-transparent text-xs outline-0 placeholder:text-[#5f5f5a]"
              placeholder="Cari kategori, kode, produk, atau lokasi..."
              aria-label="Cari kategori"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <select className={selectCls} aria-label="Filter kategori" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="Semua Kategori (6)">Semua Kategori ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>

          <select
            className={selectCls}
            aria-label="Urutan kategori"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value === "name" ? "name" : "count")}
          >
            <option value="count">Urutan: Toko Terbanyak</option>
            <option value="name">Urutan: A-Z</option>
          </select>

          <div className="flex items-center gap-1 rounded-xl border border-[#dfe6cc] bg-[#eef3df] p-1">
            {([
              ["kolom", "fa-table-columns", "Kolom Kategori"],
              ["tabel", "fa-table-list", "Tabel Detail"],
            ] as const).map(([key, icon, text]) => (
              <button
                key={key}
                type="button"
                aria-pressed={view === key}
                onClick={() => setView(key)}
                className={`inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-[11px] font-semibold transition duration-150 ${
                  view === key
                    ? "border border-[#cfd8b4] bg-white text-[#2f3a1f]"
                    : "text-[#3b3a35] hover:bg-white/60"
                }`}
              >
                <i className={`fa-regular ${icon}`} /> {text}
              </button>
            ))}
          </div>
        </div>

        {view === "kolom" ? (
          <div className="overflow-x-auto pb-2">
            <div className="grid min-w-[900px] grid-cols-6 items-start gap-2.5">
              {visible.map((cat) => (
                <section key={cat.name} className="rounded-[18px] bg-[#d3e5a1] p-2 pb-2.5">
                  <header className="flex items-center gap-2 px-1 pt-1 pb-2.5">
                    <span className={`grid size-6 shrink-0 place-items-center rounded-md text-[11px] ${iconTone[cat.iconTone]}`}>
                      <i className={`fa-solid ${cat.icon}`} />
                    </span>
                    <div className="leading-tight">
                      <h2 className="text-xs font-extrabold text-[#1f2a10]">
                        {cat.lines[0]}
                        {cat.lines[1] && (
                          <>
                            <br />
                            {cat.lines[1]}
                          </>
                        )}
                      </h2>
                      <p className="mt-0.5 text-[9px] text-[#3b3a35]">{cat.count} Toko</p>
                    </div>
                  </header>

                  <div className="grid gap-2">
                    {cat.shops.map((s) => (
                      <article key={s.code} className="rounded-[10px] bg-white px-2 pt-2 pb-2.5">
                        <div className="flex items-center justify-between">
                          <span className={`rounded px-1.5 py-[3px] text-[10px] font-bold leading-none ${badgeTone[cat.badge]}`}>
                            {s.code}
                          </span>
                          <span className="text-[9px] font-bold text-[#e08a00]">
                            <i className="fa-solid fa-star text-[9px]" /> {s.rating}
                          </span>
                        </div>

                        <p className="mt-4 text-[9px] leading-[1.35] text-[#2f3a1f]">{s.desc}</p>

                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {s.tags.map((t) => (
                            <span key={t} className="rounded-full bg-[#fbbf24] px-1.5 py-[3px] text-[8px] font-semibold leading-none text-[#3b2f00]">
                              {t}
                            </span>
                          ))}
                        </div>

                        <p className="mt-2 flex items-start gap-1 text-[8px] leading-tight text-[#2f3a1f]">
                          <span className="mt-[3px] size-1 shrink-0 rounded-full bg-[#2f6b1a]" />
                          <span className="max-w-[48px]">{s.time}</span>
                          <span className="ml-auto max-w-[40px] text-right">{s.place}</span>
                        </p>
                      </article>
                    ))}
                    {!cat.shops.length && (
                      <p className="rounded-lg bg-white/70 p-3 text-center text-[9px] text-[#5b6a35]">Toko tidak ditemukan.</p>
                    )}
                  </div>

                  <button
                    type="button"
                    className="mt-2 w-full cursor-pointer rounded-lg bg-[#fbbf24] py-2 text-[10px] font-semibold text-white transition duration-150 hover:bg-[#f4b313]
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]"
                  >
                    + Tambah Toko
                  </button>
                </section>
              ))}
            </div>
            {!visible.length && <p className="p-6 text-center text-xs text-[#5b6a35]">Kategori tidak ditemukan.</p>}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left text-[10px]">
              <thead className="bg-[#c2dc80] text-[#2f3a1f]">
                <tr>
                  {["KODE", "KATEGORI", "DESKRIPSI", "JAM", "LOKASI", "RATING"].map((h) => (
                    <th key={h} className="px-3 py-2.5 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.some((category) => category.shops.length) ? (
                  visible.flatMap((c) =>
                    c.shops.map((s) => (
                      <tr key={s.code} className="border-t border-[#e8eed6]">
                        <td className="px-3 py-2 font-bold text-[#c38a00]">{s.code}</td>
                        <td className="px-3 py-2">{c.name}</td>
                        <td className="px-3 py-2">{s.desc}</td>
                        <td className="px-3 py-2">{s.time}</td>
                        <td className="px-3 py-2">{s.place}</td>
                        <td className="px-3 py-2">★ {s.rating}</td>
                      </tr>
                    )),
                  )
                ) : (
                  <tr className="border-t border-[#e8eed6]">
                    <td className="px-3 py-6 text-center text-xs text-[#5b6a35]" colSpan={6}>
                      Kategori atau toko tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer standardisasi */}
        <div className="mt-3 flex flex-wrap items-center gap-3 rounded-2xl bg-[#d3e5a1] px-4 py-3.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#2f4a12] text-base text-[#fbbf24]">
            <i className="fa-solid fa-shield-halved" />
          </span>
          <div className="min-w-0 flex-1 basis-[260px]">
            <h3 className="text-[13px] font-extrabold text-[#1f2a10]">
              Standardisasi Tata Ruang Zonasi Pasar Oro-Oro Dowo
            </h3>
            <p className="mt-0.5 max-w-[480px] text-[10px] leading-snug text-[#3b3a35]">
              Semua kategori tunduk pada Perda Kebersihan &amp; Zonasi Pemkot Malang. Terakhir disinkronkan hari ini pukul 08:30 WIB.
            </p>
          </div>
          <button
            type="button"
            className="min-h-11 w-[96px] cursor-pointer rounded-lg bg-[#fbbf24] px-3 py-1.5 text-[10px] font-semibold leading-tight text-white transition duration-150 hover:-translate-y-px hover:bg-[#f4b313]"
          >
            Simpan Struktur Urutan
          </button>
        </div>
    </main>
  );
}