"use client";

import { useMemo, useState } from "react";

type SellerStatus = "Lapak Buka" | "Tutup Sementara";
type Seller = {
  id: string;
  name: string;
  shop: string;
  block: string;
  status: SellerStatus;
  phone: string;
  email: string;
  zone: string;
  registered: string;
  initials: string;
};

const initialSellers: Seller[] = [
  { id: "seller-1", name: "Budi Santoso", shop: "Toko Tahu & Sayur Barokah", block: "Kios Blok A-12", status: "Lapak Buka", phone: "+62 812-3456-7890", email: "budisantoso@gmail.com", zone: "Zona Sayur & Buah", registered: "Jan 2023", initials: "BS" },
  { id: "seller-2", name: "Joko Prasetyo", shop: "Los Daging Segar Pak Joko", block: "Lapak Blok B-04", status: "Lapak Buka", phone: "+62 813-8900-1123", email: "jokoprasetyo.dagang@gmail.com", zone: "Zona Daging & Ikan", registered: "Mar 2023", initials: "JP" },
  { id: "seller-3", name: "Sri Wahyuni", shop: "Kue Tradisional & Jajanan Bu Sri", block: "Kios Blok K-08", status: "Lapak Buka", phone: "+62 821-4567-8901", email: "sri.wahyuni.kue@gmail.com", zone: "Zona Kue Tradisional", registered: "Agu 2023", initials: "SW" },
  { id: "seller-4", name: "Siti Aminah", shop: "Bumbu Giling & Rempah Alami", block: "Lapak Blok R-02", status: "Tutup Sementara", phone: "+62 857-9012-3456", email: "sitianah.rempah@gmail.com", zone: "Zona Bumbu & Rempah", registered: "Nov 2023", initials: "SA" },
];

const controlClass =
  "h-8 min-w-0 rounded-md border border-[#d9e4c9] bg-[#f7f9f2] px-2.5 text-[9px] text-[#394339] outline-none focus-visible:ring-2 focus-visible:ring-[#8cae4e]";

export default function KategoriPenjual() {
  const [sellers, setSellers] = useState(initialSellers);
  const [search, setSearch] = useState("");
  const [zoneFilter, setZoneFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "name">("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedIds, setSelectedIds] = useState<string[]>([initialSellers[0].id]);

  const zones = [...new Set(initialSellers.map((seller) => seller.zone))];
  const visibleSellers = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("id");
    const filtered = sellers.filter((seller) =>
      `${seller.name} ${seller.shop} ${seller.block} ${seller.phone} ${seller.email} ${seller.zone}`
        .toLocaleLowerCase("id")
        .includes(query)
      && (!zoneFilter || seller.zone === zoneFilter)
      && (!statusFilter || seller.status === statusFilter),
    );
    if (sortOrder === "name") {
      return filtered.sort((a, b) => a.name.localeCompare(b.name, "id"));
    }
    return filtered;
  }, [sellers, search, zoneFilter, statusFilter, sortOrder]);

  const allSelected =
    visibleSellers.length > 0 && visibleSellers.every((seller) => selectedIds.includes(seller.id));

  function toggleSelection(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id],
    );
  }

  function toggleAllVisible() {
    setSelectedIds((current) =>
      allSelected
        ? current.filter((id) => !visibleSellers.some((seller) => seller.id === id))
        : [...new Set([...current, ...visibleSellers.map((seller) => seller.id)])],
    );
  }

  function deleteSelected() {
    setSellers((current) => current.filter((seller) => !selectedIds.includes(seller.id)));
    setSelectedIds([]);
  }

  function toggleSelectedStatus() {
    setSellers((current) =>
      current.map((seller) =>
        selectedIds.includes(seller.id)
          ? { ...seller, status: seller.status === "Lapak Buka" ? "Tutup Sementara" : "Lapak Buka" }
          : seller,
      ),
    );
    setSelectedIds([]);
  }

  function resetFilters() {
    setSearch("");
    setZoneFilter("");
    setStatusFilter("");
    setSortOrder("newest");
  }

  return (
    <section className="min-w-0 bg-[#e8f3d3] px-4 pb-4 text-[#303830] sm:px-6">
      <div className="mb-4 flex flex-wrap items-center gap-1.5 rounded-xl bg-white p-2.5 shadow-sm">
        <label className="relative min-w-[180px] flex-1">
          <i className="fa-solid fa-magnifying-glass absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] text-[#647060]" aria-hidden="true" />
          <input
            className={`${controlClass} w-full pl-7`}
            type="search"
            placeholder="Cari nama pedagang, nama toko, blok..."
            aria-label="Cari pedagang"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <select className={controlClass} aria-label="Filter zona atau kategori usaha" value={zoneFilter} onChange={(event) => setZoneFilter(event.target.value)}>
          <option value="">Semua Zona / Kategori Usaha</option>
          {zones.map((zone) => <option key={zone}>{zone}</option>)}
        </select>
        <select className={controlClass} aria-label="Filter status lapak" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="">Semua Status Lapak</option>
          <option>Lapak Buka</option>
          <option>Tutup Sementara</option>
        </select>
        <select className={controlClass} aria-label="Urutkan pedagang" value={sortOrder} onChange={(event) => setSortOrder(event.target.value === "name" ? "name" : "newest")}>
          <option value="newest">Urutkan: Pengajuan Terbaru</option>
          <option value="name">Urutkan: Nama A-Z</option>
        </select>
        <div className="flex h-8 shrink-0 items-center overflow-hidden rounded-md border border-[#d9e4c9] bg-[#f7f9f2]">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={`grid size-8 place-items-center text-[10px] ${view === "grid" ? "bg-[#e8f1d1] text-[#3d6332]" : "text-[#687168]"}`}
            aria-label="Tampilan kartu"
            aria-pressed={view === "grid"}
          >
            <i className="fa-solid fa-grip" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            className={`grid size-8 place-items-center border-l border-[#d9e4c9] text-[10px] ${view === "list" ? "bg-[#e8f1d1] text-[#3d6332]" : "text-[#687168]"}`}
            aria-label="Tampilan daftar"
            aria-pressed={view === "list"}
          >
            <i className="fa-solid fa-list" aria-hidden="true" />
          </button>
        </div>
        <button type="button" onClick={resetFilters} aria-label="Atur ulang filter" title="Atur ulang filter" className="grid size-8 shrink-0 place-items-center rounded-md border border-[#d9e4c9] text-[10px] text-[#4b6515] hover:bg-[#f4f7ee]">
          <i className="fa-solid fa-rotate-right" aria-hidden="true" />
        </button>
      </div>

      {view === "grid" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {visibleSellers.map((seller) => (
            <article key={seller.id} className="min-w-0 rounded-xl border border-[#dfe7d7] bg-white p-3 shadow-sm sm:p-3.5">
              <header className="flex flex-wrap items-center gap-1.5 border-b border-[#eef1ea] pb-2">
                <input
                  type="checkbox"
                  aria-label={`Pilih ${seller.name}`}
                  checked={selectedIds.includes(seller.id)}
                  onChange={() => toggleSelection(seller.id)}
                  className="size-3 cursor-pointer accent-[#ffbf18]"
                />
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[8px] font-semibold ${seller.status === "Lapak Buka" ? "bg-[#d7efae] text-[#3d5b2c]" : "bg-[#ffedbd] text-[#8a5a0b]"}`}>
                  <i className="fa-solid fa-circle text-[5px]" aria-hidden="true" /> {seller.status}
                </span>
                <span className="text-[8px] text-[#899084]">Terdaftar sejak {seller.registered}</span>
                <span className="ml-auto rounded bg-[#d7e9ad] px-2 py-1 font-mono text-[8px] font-semibold text-[#425b2c]">
                  ID: PED-{seller.id.slice(-3).padStart(3, "0")}
                </span>
              </header>

              <div className="flex items-center gap-2.5 py-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#d9e9b9] text-[9px] font-bold text-[#486238]">
                  {seller.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-[11px] font-bold text-[#29332b]">{seller.name}</h2>
                  <p className="mt-0.5 truncate text-[9px] text-[#d58e00]">{seller.shop}</p>
                </div>
                <div className="max-w-[42%] text-right">
                  <span className="inline-flex rounded-md bg-[#d8e9b4] px-2 py-1 text-[8px] font-semibold text-[#485f35]">
                    <i className="fa-solid fa-location-dot mr-1" aria-hidden="true" /> {seller.block}
                  </span>
                  <small className="mt-1 block truncate text-[7px] text-[#838a80]">{seller.zone}</small>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-[#f0f2ed] py-2 text-[8px]">
                <span className="flex min-w-0 items-center gap-1.5 truncate">
                  <i className="fa-brands fa-whatsapp text-[#30a765]" aria-hidden="true" /> {seller.phone}
                </span>
                <span className="flex min-w-0 items-center gap-1.5 truncate">
                  <i className="fa-regular fa-envelope text-[#788174]" aria-hidden="true" /> {seller.email}
                </span>
              </div>

              <button
                type="button"
                className="mt-1 inline-flex min-h-7 w-full items-center justify-center gap-1 rounded-md bg-[#ffbf18] px-2 text-[8px] font-semibold text-white transition hover:bg-[#f0b20d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]"
              >
                <i className="fa-regular fa-pen-to-square" aria-hidden="true" /> Detail &amp; Edit Data Lapak
              </button>
            </article>
          ))}
          {!visibleSellers.length && (
            <p className="col-span-full rounded-xl bg-white p-8 text-center text-xs text-[#687168]">
              Pedagang tidak ditemukan. Ubah pencarian atau filter.
            </p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full min-w-[720px] text-left text-[9px]">
            <thead className="bg-[#deebbd] text-[8px] uppercase text-[#3e493b]">
              <tr>
                <th className="px-3 py-2"><input type="checkbox" aria-label="Pilih semua pedagang" checked={allSelected} onChange={toggleAllVisible} /></th>
                <th className="px-3 py-2">Pedagang &amp; Toko</th>
                <th className="px-3 py-2">Zona / Lapak</th>
                <th className="px-3 py-2">Kontak</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Terdaftar</th>
              </tr>
            </thead>
            <tbody>
              {visibleSellers.map((seller) => (
                <tr key={seller.id} className="border-t border-[#e8eedc]">
                  <td className="px-3 py-2"><input type="checkbox" aria-label={`Pilih ${seller.name}`} checked={selectedIds.includes(seller.id)} onChange={() => toggleSelection(seller.id)} /></td>
                  <td className="px-3 py-2"><strong className="block">{seller.name}</strong><span className="text-[#747b70]">{seller.shop}</span></td>
                  <td className="px-3 py-2">{seller.block}<br /><span className="text-[#747b70]">{seller.zone}</span></td>
                  <td className="px-3 py-2">{seller.phone}<br />{seller.email}</td>
                  <td className="px-3 py-2">{seller.status}</td>
                  <td className="px-3 py-2">{seller.registered}</td>
                </tr>
              ))}
              {!visibleSellers.length && <tr><td className="px-3 py-8 text-center text-[#687168]" colSpan={6}>Pedagang tidak ditemukan.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <footer className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-[#d7e9ad] px-3 py-2 text-[8px]">
        <span className="text-[#56604f]">Terpilih:</span>
        <span className="rounded bg-[#c2dc80] px-2 py-1 font-semibold text-[#3d5b2c]">{selectedIds.length} Penjual</span>
        <button type="button" disabled={!selectedIds.length} onClick={deleteSelected} className="rounded bg-white px-2 py-1 text-[#c23c36] disabled:cursor-not-allowed disabled:opacity-50">
          <i className="fa-regular fa-trash-can" aria-hidden="true" /> Hapus Terpilih
        </button>
        <button type="button" disabled={!selectedIds.length} onClick={toggleSelectedStatus} className="rounded bg-white px-2 py-1 text-[#39443a] disabled:cursor-not-allowed disabled:opacity-50">
          <i className="fa-solid fa-ban" aria-hidden="true" /> Nonaktifkan Sementara
        </button>
      </footer>
    </section>
  );
}