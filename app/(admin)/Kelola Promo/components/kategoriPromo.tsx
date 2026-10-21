"use client";

import { useMemo, useState } from "react";

type PromoStatus = "Sedang Berlangsung" | "Akan Datang" | "Setiap Akhir Pekan" | "Hari Pasaran";

type Promo = {
  id: string;
  store: string;
  subtitle: string;
  location: string;
  owner: string;
  phone: string;
  category: string;
  offer: string;
  code: string;
  terms: string;
  day: string;
  period: string;
  quota: number;
  total: number;
  status: PromoStatus;
  icon: string;
  iconTone: string;
};

const initialPromos: Promo[] = [
  {
    id: "promo-tahu-bakso",
    store: "Tahu Bakso Cuan",
    subtitle: "Cemilan Penunda Lapar",
    location: "Kios Blok A-15",
    owner: "Pak Haryono",
    phone: "+62 812-4455-6671",
    category: "Makanan",
    offer: "Diskon Tahu Bakso",
    code: "TAHUBAKSO",
    terms: "Otomatis tanpa syarat",
    day: "1 Sep – 1 Okt 2026",
    period: "06.00 – 09.00 WIB",
    quota: 180,
    total: 200,
    status: "Sedang Berlangsung",
    icon: "fa-store",
    iconTone: "bg-[#e9e3d1] text-[#756c57]",
  },
  {
    id: "promo-bakery",
    store: "Bakery & Cake Corner",
    subtitle: "Special Promo Slice Cake",
    location: "Blok A-08",
    owner: "Bu Ratna",
    phone: "+62 821-3222-1100",
    category: "Makanan",
    offer: "Diskon Cake 30%",
    code: "CAKE30",
    terms: "Mulai 2x di tempat",
    day: "1 Okt – 31 Okt 2026",
    period: "15.00 – 17.00 WIB",
    quota: 0,
    total: 150,
    status: "Akan Datang",
    icon: "fa-basket-shopping",
    iconTone: "bg-[#eee7d6] text-[#756c57]",
  },
  {
    id: "promo-warung-bu-as",
    store: "Warung Bu As",
    subtitle: "Gado-Gado & Rujak Cingur",
    location: "Lantai 2 Pasar",
    owner: "Bu Asmiati",
    phone: "+62 857-9988-7711",
    category: "Makanan",
    offer: "Promo Gado-Gado",
    code: "GADOGADO",
    terms: "Harga promosi langsung",
    day: "Sabtu & Minggu (Okt 2026)",
    period: "08.00 – 16.00 WIB",
    quota: 95,
    total: 120,
    status: "Setiap Akhir Pekan",
    icon: "fa-utensils",
    iconTone: "bg-[#baf0bf] text-[#28733d]",
  },
  {
    id: "promo-mie-ayam",
    store: "Mie Ayam Oro-Oro Dowo",
    subtitle: "Hari Pasaran Khusus",
    location: "Blok A-02",
    owner: "Cak Man",
    phone: "+62 813-7764-5544",
    category: "Makanan",
    offer: "Promo Mie Ayam",
    code: "MIEAYAM",
    terms: "1 Hari saja langsung di kios",
    day: "Selasa, 24 Okt 2026",
    period: "06.00 – 16.00 WIB",
    quota: 112,
    total: 150,
    status: "Hari Pasaran",
    icon: "fa-bowl-food",
    iconTone: "bg-[#ffd9d5] text-[#cc5148]",
  },
];

const filters = [
  { label: "Semua Kategori", options: ["Makanan", "Sayuran", "Sembako"] },
  { label: "Semua Status", options: ["Sedang Berlangsung", "Akan Datang", "Setiap Akhir Pekan", "Hari Pasaran"] },
  { label: "Semua Tipe Promo", options: ["Diskon", "Promo Ganda", "Promo Mingguan"] },
];

const selectClass =
  "h-7 min-w-0 cursor-pointer rounded-md border border-[#9dbb5b] bg-[#e8f1d1] px-2 text-[9px] text-[#343a30] outline-none focus-visible:ring-2 focus-visible:ring-[#739334]";

const statusClass: Record<PromoStatus, string> = {
  "Sedang Berlangsung": "bg-[#d6f06f] text-[#38511b]",
  "Akan Datang": "bg-[#e2e6e2] text-[#4c554e]",
  "Setiap Akhir Pekan": "bg-[#d6f06f] text-[#38511b]",
  "Hari Pasaran": "bg-[#d5d9dd] text-[#50565a]",
};

function PromoRow({
  promo,
  selected,
  onToggle,
}: {
  promo: Promo;
  selected: boolean;
  onToggle: () => void;
}) {
  const percentage = Math.round((promo.quota / promo.total) * 100);

  return (
    <tr className="border-b border-[#e4e9de] align-middle last:border-0 hover:bg-[#fbfcf8]">
      <td className="w-8 px-2 py-2">
        <input
          aria-label={`Pilih promo ${promo.store}`}
          checked={selected}
          className="size-3 cursor-pointer accent-[#28663b]"
          onChange={onToggle}
          type="checkbox"
        />
      </td>
      <td className="min-w-[210px] px-2 py-2">
        <div className="flex items-center gap-2">
          <span className={`grid size-8 shrink-0 place-items-center rounded-lg text-[11px] ${promo.iconTone}`}>
            <i className={`fa-solid ${promo.icon}`} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <strong className="block text-[9px] font-bold text-[#252a25]">{promo.store}</strong>
            <p className="mt-0.5 text-[8px] leading-tight text-[#62675f]">
              {promo.subtitle} <span className="text-[#4b6515]">• {promo.location}</span>
            </p>
            <p className="mt-1 text-[8px] leading-tight text-[#315b35]">
              <i className="fa-solid fa-check text-[7px]" aria-hidden="true" /> Varian topping lezat
              <span className="text-[#6b7568]"> • GrabFood / ShopeeFood</span>
            </p>
          </div>
        </div>
      </td>
      <td className="min-w-[88px] px-2 py-2 text-[8px]">
        <strong className="block font-semibold text-[#252a25]">{promo.owner}</strong>
        <span className="mt-0.5 block text-[#62675f]">{promo.phone}</span>
      </td>
      <td className="px-2 py-2">
        <span className="rounded-md bg-[#d5e99f] px-2 py-1 text-[8px] text-[#38511b]">
          Zona {promo.category}
        </span>
      </td>
      <td className="min-w-[90px] px-2 py-2">
        <span className="inline-block max-w-[86px] rounded-md bg-[#ffbd22] px-2 py-1 text-[8px] font-semibold leading-tight text-white">
          {promo.offer}
        </span>
        <span className="mt-1 flex items-center gap-1 text-[7px] font-semibold text-[#343a30]">
          {promo.code}
          <i className="fa-regular fa-copy text-[#68716a]" aria-label="Kode promo" />
        </span>
        <small className="mt-0.5 block max-w-[88px] text-[7px] leading-tight text-[#656b62]">
          {promo.terms}
        </small>
      </td>
      <td className="min-w-[90px] px-2 py-2 text-[8px] text-[#3f493c]">
        <strong className="block font-semibold">{promo.day}</strong>
        <span className="mt-1 block text-[7px] text-[#697167]">
          <i className="fa-regular fa-clock" aria-hidden="true" /> {promo.period}
        </span>
      </td>
      <td className="min-w-[78px] px-2 py-2">
        <div className="flex items-center justify-between gap-1 text-[8px]">
          <span>{promo.quota}/{promo.total}</span>
          <span>{percentage}%</span>
        </div>
        <div
          className="mt-1 h-1 overflow-hidden rounded-full bg-[#edf0e9]"
          role="progressbar"
          aria-label={`Kuota promo ${promo.store}`}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span
            className="block h-full rounded-full bg-[#28663b]"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </td>
      <td className="min-w-[92px] px-2 py-2">
        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[8px] leading-tight ${statusClass[promo.status]}`}>
          <i className="fa-solid fa-circle text-[5px]" aria-hidden="true" />
          {promo.status}
        </span>
      </td>
    </tr>
  );
}

export default function KategoriPromo() {
  const [promos, setPromos] = useState(initialPromos);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([initialPromos[0].id]);
  const [view, setView] = useState<"table" | "calendar">("table");

  const visiblePromos = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("id");
    return promos.filter((promo) => {
      const matchesSearch = `${promo.store} ${promo.owner} ${promo.location} ${promo.category} ${promo.offer} ${promo.code}`
        .toLocaleLowerCase("id")
        .includes(query);
      const matchesCategory = !categoryFilter || promo.category === categoryFilter;
      const matchesStatus = !statusFilter || promo.status === statusFilter;
      const matchesType =
        !typeFilter ||
        (typeFilter === "Diskon" ? promo.offer.toLowerCase().includes("diskon") : true);
      return matchesSearch && matchesCategory && matchesStatus && matchesType;
    });
  }, [promos, search, categoryFilter, statusFilter, typeFilter]);

  const allVisibleSelected =
    visiblePromos.length > 0 && visiblePromos.every((promo) => selectedIds.includes(promo.id));

  function togglePromo(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id],
    );
  }

  function toggleAllVisible() {
    setSelectedIds((current) =>
      allVisibleSelected
        ? current.filter((id) => !visiblePromos.some((promo) => promo.id === id))
        : [...new Set([...current, ...visiblePromos.map((promo) => promo.id)])],
    );
  }

  function deleteSelected() {
    setPromos((current) => current.filter((promo) => !selectedIds.includes(promo.id)));
    setSelectedIds([]);
  }

  function deactivateSelected() {
    setPromos((current) =>
      current.map((promo) =>
        selectedIds.includes(promo.id) ? { ...promo, status: "Akan Datang" } : promo,
      ),
    );
    setSelectedIds([]);
  }

  return (
    <section className="min-w-0 bg-[#e8f3d3] p-3 text-[#252a25] sm:p-4">
      <div className="mb-4 rounded-xl bg-white p-3 shadow-sm sm:p-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex h-7 min-w-[220px] flex-1 items-center gap-2 rounded-md bg-[#e8f1d1] px-2.5">
            <i className="fa-solid fa-magnifying-glass text-[10px] text-[#475345]" aria-hidden="true" />
            <input
              className="w-full min-w-0 bg-transparent text-[9px] text-[#343a30] outline-none placeholder:text-[#667061]"
              placeholder="Cari Promo nama toko, blok kios, atau jenis komoditas..."
              aria-label="Cari promo"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <div className="ml-auto flex h-7 overflow-hidden rounded-md border border-[#d9e2ce] text-[9px]">
            <button
              type="button"
              onClick={() => setView("table")}
              className={`inline-flex items-center gap-1 px-2.5 ${view === "table" ? "bg-[#f4f7ee] font-semibold text-[#344f32]" : "text-[#596258]"}`}
              aria-pressed={view === "table"}
            >
              <i className="fa-solid fa-table-list" aria-hidden="true" /> Daftar Promo (Tabel)
            </button>
            <button
              type="button"
              onClick={() => setView("calendar")}
              className={`inline-flex items-center gap-1 border-l border-[#d9e2ce] px-2.5 ${view === "calendar" ? "bg-[#f4f7ee] font-semibold text-[#344f32]" : "text-[#596258]"}`}
              aria-pressed={view === "calendar"}
            >
              <i className="fa-regular fa-calendar" aria-hidden="true" /> Kalender Promo
            </button>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-[#edf0e9] pt-2">
          {filters.map((filter, index) => {
            const value = [categoryFilter, statusFilter, typeFilter][index];
            const setValue = [setCategoryFilter, setStatusFilter, setTypeFilter][index];
            return (
              <select
                key={filter.label}
                className={`${selectClass} flex-1 sm:flex-none`}
                aria-label={filter.label}
                value={value}
                onChange={(event) => setValue(event.target.value)}
              >
                <option value="">{filter.label}</option>
                {filter.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            );
          })}
          <button
            type="button"
            onClick={() => setAdvancedFiltersOpen((open) => !open)}
            aria-expanded={advancedFiltersOpen}
            className="inline-flex h-7 items-center gap-1 rounded-md border border-[#9dbb5b] bg-[#e8f1d1] px-2 text-[9px] text-[#343a30] hover:bg-[#deebc4]"
          >
            <i className="fa-solid fa-sliders" aria-hidden="true" /> Filter Lanjutan
          </button>
          <span className="ml-auto text-[8px] text-[#596258]">
            Menampilkan <strong>{visiblePromos.length}</strong> dari {promos.length} data promosi banner
          </span>
        </div>
        {advancedFiltersOpen && (
          <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-[#edf0e9] pt-2 text-[9px] text-[#596258]">
            <span className="font-semibold">Filter lanjutan:</span>
            <span>Gunakan kategori, status, tipe promo, dan pencarian di atas.</span>
            <button
              type="button"
              className="ml-auto text-[#456a35] underline"
              onClick={() => {
                setSearch("");
                setCategoryFilter("");
                setStatusFilter("");
                setTypeFilter("");
              }}
            >
              Hapus semua filter
            </button>
          </div>
        )}
      </div>

      {view === "table" ? (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full min-w-[850px] table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-8" />
              <col className="w-[31%]" />
              <col className="w-[11%]" />
              <col className="w-[9%]" />
              <col className="w-[13%]" />
              <col className="w-[12%]" />
              <col className="w-[10%]" />
              <col className="w-[12%]" />
            </colgroup>
            <thead className="bg-[#deebbd] text-[8px] font-semibold uppercase leading-tight text-[#3e493b]">
              <tr>
                <th className="px-2 py-2">
                  <input
                    aria-label="Pilih semua promo"
                    checked={allVisibleSelected}
                    className="size-3 cursor-pointer accent-[#28663b]"
                    onChange={toggleAllVisible}
                    type="checkbox"
                  />
                </th>
                <th className="px-2 py-2">Informasi Toko &amp; Promo</th>
                <th className="px-2 py-2">Pemilik Lapak</th>
                <th className="px-2 py-2">Kategori</th>
                <th className="px-2 py-2">Nilai Promo &amp; Kode</th>
                <th className="px-2 py-2">Periode &amp; Syarat</th>
                <th className="px-2 py-2">Kuota / Klaim</th>
                <th className="px-2 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {visiblePromos.length ? (
                visiblePromos.map((promo) => (
                  <PromoRow
                    key={promo.id}
                    promo={promo}
                    selected={selectedIds.includes(promo.id)}
                    onToggle={() => togglePromo(promo.id)}
                  />
                ))
              ) : (
                <tr>
                  <td className="px-4 py-8 text-center text-xs text-[#667061]" colSpan={8}>
                    Tidak ada promo yang cocok dengan pencarian atau filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-2 rounded-xl bg-white p-3 shadow-sm sm:grid-cols-2">
          {visiblePromos.length ? visiblePromos.map((promo) => (
            <article key={promo.id} className="rounded-lg border border-[#e4e9de] p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-xs font-bold">{promo.store}</h2>
                  <p className="mt-1 text-[10px] text-[#596258]">{promo.day} · {promo.period}</p>
                </div>
                <span className={`rounded-full px-2 py-1 text-[8px] ${statusClass[promo.status]}`}>{promo.status}</span>
              </div>
              <p className="mt-2 text-[10px] text-[#596258]">{promo.offer} · {promo.code}</p>
            </article>
          )) : (
            <p className="col-span-full p-6 text-center text-xs text-[#667061]">
              Tidak ada promo yang cocok dengan pencarian atau filter.
            </p>
          )}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2 rounded-b-xl bg-[#deebbd] px-3 py-2 text-[9px]">
        <span className="text-[#596258]">Terpilih:</span>
        <span className="rounded bg-[#cde69b] px-2 py-1 font-semibold text-[#3d5b2c]">
          {selectedIds.length} Promo
        </span>
        <button
          type="button"
          disabled={!selectedIds.length}
          onClick={deleteSelected}
          className="rounded bg-white px-2 py-1 text-[#c23c36] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <i className="fa-regular fa-trash-can" aria-hidden="true" /> Hapus Terpilih
        </button>
        <button
          type="button"
          disabled={!selectedIds.length}
          onClick={deactivateSelected}
          className="rounded bg-white px-2 py-1 text-[#39443a] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <i className="fa-regular fa-circle-pause" aria-hidden="true" /> Nonaktifkan Sementara
        </button>
      </div>
    </section>
  );
}