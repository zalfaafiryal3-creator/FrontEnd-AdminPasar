"use client";

import { useRef, useState, type FormEvent } from "react";

type Menu = {
  id: string;
  category: string;
  item: string;
  details: string;
  icon: string;
  leaf?: boolean;
};

const defaultMenus: Menu[] = [
  { id: "menu-lumpur-kentang", category: "Makanan", item: "Lumpur Kentang", details: "Lumpur kentang khas Oro-Oro Dowo", icon: "✣" },
  { id: "menu-bakso-goreng", category: "Makanan", item: "Bakso Goreng", details: "Bakso goreng ayam Bangkit", icon: "✣" },
  { id: "menu-klepon", category: "Makanan", item: "Klepon", details: "Klepon gula merah dan kelapa", icon: "✣" },
  { id: "menu-mendoan", category: "Makanan", item: "Tempe Mendoan", details: "Gorengan • sambal kecap", icon: "✣" },
  { id: "menu-risol", category: "Makanan", item: "Risol Mayo", details: "Risol isi telur • mayones", icon: "✣" },
  { id: "menu-sayur-1", category: "Sayur & Buah", item: "Wiwit Sayur", details: "Sawi • kol • kangkung • bayam", icon: "◉", leaf: true },
  { id: "menu-sayur-2", category: "Sayur & Buah", item: "Buah Segar Bu Rina", details: "Jeruk • apel • pisang • mangga", icon: "◉", leaf: true },
  { id: "menu-sayur-3", category: "Sayur & Buah", item: "Sayur Organik", details: "Sayuran segar pilihan", icon: "◉", leaf: true },
  { id: "menu-sayur-4", category: "Sayur & Buah", item: "Toko Buah Berkah", details: "Buah lokal • buah musiman", icon: "◉", leaf: true },
  { id: "menu-sayur-5", category: "Sayur & Buah", item: "Kangkung Pak Tono", details: "Sayur segar • panen pagi", icon: "◉", leaf: true },
  { id: "menu-kuliner-1", category: "Kuliner Legend", item: "Soto Ayam Cak Man", details: "Soto ayam kampung • sejak 1980", icon: "✣" },
  { id: "menu-kuliner-2", category: "Kuliner Legend", item: "Rawon Nguling", details: "Rawon daging sapi khas Malang", icon: "✣" },
  { id: "menu-kuliner-3", category: "Kuliner Legend", item: "Jamu Bu Darto", details: "Jamu tradisional • racikan asli", icon: "✣" },
  { id: "menu-kuliner-4", category: "Kuliner Legend", item: "Lumpia Pasar", details: "Camilan tradisional • gurih", icon: "✣" },
  { id: "menu-kuliner-5", category: "Kuliner Legend", item: "Rawon Pak Joyo", details: "Menu legendaris khas Malang", icon: "✣" },
  { id: "menu-daging-1", category: "Daging & Ikan", item: "Mbok Ami", details: "Daging sapi • daging kambing", icon: "≋", leaf: true },
  { id: "menu-daging-2", category: "Daging & Ikan", item: "Pak Slamet", details: "Ayam potong • telur ayam", icon: "≋", leaf: true },
  { id: "menu-daging-3", category: "Daging & Ikan", item: "Ikan Segar Pak Jo", details: "Ikan laut • ikan air tawar", icon: "≋", leaf: true },
  { id: "menu-daging-4", category: "Daging & Ikan", item: "Daging Berkah", details: "Daging sapi segar harian", icon: "≋", leaf: true },
  { id: "menu-daging-5", category: "Daging & Ikan", item: "Bandeng Bu Siti", details: "Ikan bandeng • ikan laut", icon: "≋", leaf: true },
  { id: "menu-sembako-1", category: "Sembako & Perabot", item: "Toko Barokah", details: "Beras • minyak • gula pasir", icon: "◈" },
  { id: "menu-sembako-2", category: "Sembako & Perabot", item: "Sembako Bu Ani", details: "Bumbu dapur • kebutuhan pokok", icon: "◈" },
  { id: "menu-sembako-3", category: "Sembako & Perabot", item: "Perabot Makmur", details: "Alat dapur • perlengkapan rumah", icon: "◈" },
  { id: "menu-sembako-4", category: "Sembako & Perabot", item: "Warung Bu As", details: "Sembako • kebutuhan harian", icon: "◈" },
  { id: "menu-sembako-5", category: "Sembako & Perabot", item: "Toko Beras Sumber Rejeki", details: "Beras pilihan • ecer dan grosir", icon: "◈" },
  { id: "menu-mainan-1", category: "Mainan & Baju", item: "Pak Jun", details: "Seruling • terompet • mobil-mobilan", icon: "◉", leaf: true },
  { id: "menu-mainan-2", category: "Mainan & Baju", item: "Baju Anak Ceria", details: "Pakaian anak • berbagai ukuran", icon: "◉", leaf: true },
  { id: "menu-mainan-3", category: "Mainan & Baju", item: "Mainan Pelangi", details: "Mainan edukasi dan boneka", icon: "◉", leaf: true },
  { id: "menu-mainan-4", category: "Mainan & Baju", item: "Toko Busana Rina", details: "Baju • aksesori • perlengkapan", icon: "◉", leaf: true },
  { id: "menu-mainan-5", category: "Mainan & Baju", item: "Mainan Anak Cerdas", details: "Permainan edukasi dan boneka", icon: "◉", leaf: true },
];

type Summary = {
  label: string;
  value: string;
  unit?: string;
  note?: string;
  icon: string;
  amber?: boolean;
  meter?: number;
};

const summaries: Summary[] = [
  { label: "TOTAL TOKO", value: "251", note: "251 Aktif • bulan ini", icon: "fa-store" },
  { label: "TOTAL KATEGORI", value: "6", unit: "kategori aktif", note: "Zonasi Standar Revitalisasi SNI", icon: "fa-shop", amber: true },
  { label: "KATEGORI DOMINAN", value: "Makanan", note: "(46%) • 36 Toko & Jajanan Tradisional", icon: "fa-utensils" },
  { label: "OKUPANSI ZONASI", value: "92%", unit: "Lapak Terisi", icon: "fa-store", amber: true, meter: 92 },
];

/* ---------- class bersama ---------- */
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#4b6515]";

const addButton =
  `inline-flex min-h-9 cursor-pointer items-center justify-center gap-[7px] rounded-[9px] bg-[#c2dc80] px-[13px] py-2 text-xs font-semibold text-[#594045] ` +
  `shadow-[0_3px_7px_rgba(75,101,21,0.12)] transition duration-150 ` +
  `hover:-translate-y-px hover:bg-[#b5d36b] hover:shadow-[0_5px_10px_rgba(75,101,21,0.16)] ${focusRing}`;

const toolbarControl =
  "h-9 rounded-[9px] border border-[rgba(194,220,128,0.75)] bg-white px-2.5 text-[10px] text-[#594045] " +
  "focus:border-[#4b6515] focus:outline focus:outline-2 focus:outline-[rgba(194,220,128,0.45)]";

const toolButton =
  "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[9px] bg-[#edf5d7] px-3 text-[10px] font-semibold text-[#4b6515] " +
  "transition duration-150 hover:bg-[#e3efc2]";

const dialogInput =
  "mt-1 w-full rounded-lg border border-[rgba(194,220,128,0.75)] px-2.5 py-2 text-xs text-[#594045] " +
  "focus:border-[#4b6515] focus:outline focus:outline-2 focus:outline-[rgba(194,220,128,0.45)]";

/* ---------- penyimpanan ---------- */
function readStorage<T = Menu>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function loadMenus(): Menu[] {
  const deletedIds = new Set(readStorage<string>("pasar-admin-deleted-menus"));
  const defaults = defaultMenus.filter((menu) => !deletedIds.has(menu.id));
  const saved = readStorage<{ id?: string; category: string; item: string }>("pasar-admin-categories")
    .map((menu) => ({ ...menu, id: menu.id || crypto.randomUUID(), details: menu.category, icon: "✣" }))
    .filter((menu) => !deletedIds.has(menu.id));

  return [...defaults, ...saved];
}

export default function Kategori() {
  const [menus, setMenus] = useState(loadMenus);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua Kategori");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const dialogRef = useRef<HTMLDialogElement>(null);
  const groupedMenus = menus.reduce<Record<string, Menu[]>>((groups, menu) => {
    const matches = (categoryFilter === "Semua Kategori" || categoryFilter === menu.category)
      && `${menu.item} ${menu.category} ${menu.details}`.toLocaleLowerCase("id").includes(search.trim().toLocaleLowerCase("id"));
    if (!matches) return groups;
    (groups[menu.category] ||= []).push(menu);
    return groups;
  }, {});

  function addMenu(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const menu = {
      id: crypto.randomUUID(),
      category: String(formData.get("category") || "").trim(),
      item: String(formData.get("item") || "").trim(),
      details: String(formData.get("category") || "").trim(),
      icon: "✣",
    };
    const savedMenus = [...readStorage("pasar-admin-categories"), { id: menu.id, category: menu.category, item: menu.item }];
    localStorage.setItem("pasar-admin-categories", JSON.stringify(savedMenus));
    setMenus((current) => [...current, menu]);
    event.currentTarget.reset();
    dialogRef.current?.close();
  }

  function toggleSelection(id: string) {
    setSelectedIds((current) => {
      const updated = new Set(current);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  }

  function deleteSelected() {
    if (!selectedIds.size || !window.confirm(`Hapus ${selectedIds.size} menu yang dipilih?`)) return;

    const deletedIds = new Set(readStorage<string>("pasar-admin-deleted-menus"));
    selectedIds.forEach((id) => deletedIds.add(id));
    localStorage.setItem("pasar-admin-deleted-menus", JSON.stringify([...deletedIds]));
    localStorage.setItem("pasar-admin-categories", JSON.stringify(
      readStorage<{ id: string }>("pasar-admin-categories").filter((menu) => !selectedIds.has(menu.id)),
    ));
    setMenus((current) => current.filter((menu) => !selectedIds.has(menu.id)));
    setSelectedIds(new Set());
  }

  return (
    <>
      <main
        className="flex min-h-[calc(100vh-58px)] flex-col px-6 pt-[17px] pb-[18px] text-[#594045]
          max-[980px]:px-[18px]
          max-[760px]:px-4 max-[760px]:pb-5
          max-[560px]:px-3
          max-[390px]:px-2.5"
      >
        <div className="mb-1.5 text-[10px] font-medium tracking-wider text-[#74666a]">
          ADMIN PANEL &nbsp;›&nbsp; KATEGORISASI
        </div>

        {/* Heading */}
        <div className="mb-3.5 flex items-start justify-between gap-4 max-[560px]:flex-wrap max-[560px]:gap-2">
          <div className="max-[560px]:flex-[1_1_100%]">
            <h1 className="mb-1 text-[21px] leading-[1.3] text-[#594045] max-[760px]:text-[19px] max-[390px]:text-[17px]">
              Kelola Kategori Toko Pasar Oro-Oro Dowo
            </h1>
            <p className="text-[13px] leading-normal text-[#594045] max-[760px]:text-xs max-[390px]:text-[11px]">
              Kelola klasifikasi struktur kategori, dan penataan lapak pedagang di kawasan Pasar Oro-Oro Dowo Malang demi penataan pasar tradisional bersih berstandar SNI.
            </p>
          </div>
          <button
            className={`${addButton} max-[560px]:ml-auto max-[560px]:min-h-8 max-[560px]:px-2.5 max-[560px]:py-[7px] max-[560px]:text-[10px]`}
            type="button"
            onClick={() => dialogRef.current?.showModal()}
          >
            <i className="fa-solid fa-plus" /> Tambah Kategori Baru
          </button>
        </div>

        {/* Ringkasan */}
        <section
          className="mb-3 grid grid-cols-4 gap-3 max-[980px]:grid-cols-2 max-[560px]:grid-cols-1"
          aria-label="Ringkasan kategori"
        >
          {summaries.map((s) => (
            <article
              key={s.label}
              className={`flex items-center justify-between gap-3 rounded-[13px] border px-4 py-3 shadow-[0_3px_8px_rgba(75,101,21,0.05)]
                ${s.amber
                  ? "border-[rgba(251,191,36,0.3)] bg-[#ffe5a0]"
                  : "border-[rgba(194,220,128,0.65)] bg-[#edf5d7]"}`}
            >
              <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <span className="text-[10px] font-semibold tracking-wide text-[#594045]">{s.label}</span>
                <strong className="text-lg font-bold text-[#594045]">
                  {s.value}
                  {s.unit && <small className="ml-1 text-[10px] font-normal text-[#74666a]">{s.unit}</small>}
                </strong>
                {s.meter !== undefined ? (
                  <span className="block h-1.5 overflow-hidden rounded-full bg-white/70">
                    <i className="block h-full rounded-full bg-[#4b6515]" style={{ width: `${s.meter}%` }} />
                  </span>
                ) : (
                  <small className="text-[9px] text-[#74666a]">{s.note}</small>
                )}
              </div>
              <i
                className={`fa-solid ${s.icon} grid size-9 shrink-0 place-items-center rounded-full text-sm text-[#4b6515]
                  ${s.amber ? "bg-[#fbbf24]" : "bg-[#c2dc80]"}`}
              />
            </article>
          ))}
        </section>

        {/* Toolbar */}
        <div className="mb-3 flex flex-wrap items-center gap-2.5 max-[560px]:mb-2">
          <label
            className="mb-0 flex min-h-[60px] w-full min-w-0 items-center rounded-[18px] border border-[rgba(251,191,36,0.18)] bg-[#ffe4a1] px-4 py-2.5
              text-[#4b6515] shadow-[0_3px_8px_rgba(75,101,21,0.04)]
              focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[rgba(75,101,21,0.45)]
              max-[560px]:min-h-[52px] max-[560px]:rounded-[14px] max-[560px]:px-[11px] max-[560px]:py-2"
          >
            <i className="fa-solid fa-magnifying-glass grid size-9 shrink-0 place-items-center rounded-l-full bg-white text-xs text-[#4b6515] max-[560px]:h-[34px] max-[560px]:w-8" />
            <input
              className="m-0 h-9 w-full min-w-0 max-w-[340px] flex-[0_1_340px] rounded-r-full bg-white pr-3 text-[10px] text-[#594045] outline-0 placeholder:text-[#9c9695]
                max-[560px]:h-[34px] max-[560px]:max-w-full max-[560px]:flex-1"
              type="search"
              placeholder="Cari kategori, nama toko, blok..."
              aria-label="Cari kategori"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label>
            <span className="sr-only">Filter kategori</span>
            <select className={toolbarControl} value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option>Semua Kategori</option>
              {[...new Set(menus.map((menu) => menu.category))].map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Urutkan kategori</span>
            <select className={toolbarControl} defaultValue="Urutkan: Toko Terbanyak">
              <option>Urutkan: Toko Terbanyak</option>
              <option>Urutkan: A-Z</option>
            </select>
          </label>
          <button className={toolButton} type="button">
            <i className="fa-solid fa-table-cells" /> Kelola Kategori
          </button>
          <button className={toolButton} type="button">
            <i className="fa-solid fa-table" /> Tabel Detail
          </button>
        </div>

        {/* Grid kategori */}
        <div
          className="grid min-w-0 grid-cols-4 items-stretch gap-2.5 pt-3.5 pb-2
            min-[761px]:max-[980px]:gap-2
            max-[760px]:grid-cols-2 max-[760px]:gap-3
            max-[560px]:grid-cols-1 max-[560px]:gap-[11px] max-[560px]:pt-3"
        >
          {Object.entries(groupedMenus).map(([category, entries]) => (
            <section className="min-w-0" key={category}>
              <h2
                className="relative z-10 mx-auto -mb-[3px] grid min-h-[30px] w-[min(100%,184px)] place-items-center rounded-xl bg-[#594045] px-2 py-[5px]
                  text-center text-[11px] font-bold leading-[1.3] text-white max-[560px]:w-[min(100%,220px)]"
              >
                <span>{category}</span>
                <small className="text-[8px] font-normal opacity-80">{entries.length} Toko</small>
              </h2>

              <div
                className="min-h-[330px] min-w-0 rounded-[19px] border border-[rgba(194,220,128,0.82)] bg-[#e3efc2] px-3 pt-[42px] pb-4
                  shadow-[0_5px_14px_rgba(75,101,21,0.07)]
                  min-[761px]:max-[980px]:px-2
                  max-[760px]:min-h-[235px] max-[760px]:px-3 max-[760px]:pt-9 max-[760px]:pb-3.5
                  max-[560px]:min-h-0 max-[560px]:pt-[34px] max-[560px]:pb-2
                  max-[390px]:px-[9px]"
              >
                {entries.map((menu) => {
                  const selected = selectedIds.has(menu.id);
                  return (
                    <div
                      key={menu.id}
                      data-menu-id={menu.id}
                      role="button"
                      tabIndex={0}
                      aria-pressed={selected}
                      onClick={() => toggleSelection(menu.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          toggleSelection(menu.id);
                        }
                      }}
                      className={`mb-[13px] flex min-w-0 cursor-pointer items-center gap-2 rounded-[9px] p-1 text-[#594045] transition duration-150
                        min-[761px]:max-[980px]:gap-1.5 min-[761px]:max-[980px]:p-[3px]
                        max-[760px]:mb-2.5 max-[560px]:mb-2 ${focusRing}
                        ${selected
                          ? "bg-[rgba(251,191,36,0.23)] shadow-[inset_0_0_0_1px_rgba(75,101,21,0.2)]"
                          : "hover:bg-white/40"}`}
                    >
                      <span
                        className={`grid size-[31px] shrink-0 place-items-center rounded-[10px] text-sm text-[#4b6515] shadow-[0_2px_4px_rgba(75,101,21,0.13)]
                          min-[761px]:max-[980px]:size-7 min-[761px]:max-[980px]:text-xs
                          ${menu.leaf ? "bg-[#c2dc80]" : "bg-[#fbbf24]"}`}
                      >
                        {menu.icon}
                      </span>
                      <span className="min-w-0">
                        <strong className="mb-0.5 block text-[10px] font-bold leading-[1.35] text-[#594045] [overflow-wrap:anywhere] min-[761px]:max-[980px]:text-[9px]">
                          {menu.item}
                        </strong>
                        <small className="block text-[8px] leading-[1.4] text-[#74666a] [overflow-wrap:anywhere] min-[761px]:max-[980px]:text-[7px]">
                          • {menu.details}
                        </small>
                      </span>
                    </div>
                  );
                })}
                <button
                  className={`mt-1 inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-[9px] border border-dashed border-[rgba(75,101,21,0.35)] px-2 py-1.5 text-[9px] font-semibold text-[#4b6515] transition duration-150 hover:bg-white/40 ${focusRing}`}
                  type="button"
                  onClick={() => dialogRef.current?.showModal()}
                >
                  <i className="fa-solid fa-plus" /> Tambah Toko
                </button>
              </div>
            </section>
          ))}
          {!Object.keys(groupedMenus).length && (
            <p className="col-span-full p-[18px] text-center text-[11px] text-[#74666a]">Kategori tidak ditemukan.</p>
          )}
        </div>

        {/* Aksi bawah */}
        <div className="mt-auto flex flex-wrap items-center justify-end gap-3 pt-3 pb-0.5 max-[390px]:gap-2 max-[390px]:pt-2.5">
          <span className="text-[11px] text-[#74666a]" aria-live="polite">
            {selectedIds.size ? `${selectedIds.size} dipilih` : ""}
          </span>
          <span className="mr-auto text-[10px] text-[#74666a]">
            <i className="fa-solid fa-shield-halved" /> Standardisasi Tata Ruang Zonasi Pasar Oro-Oro Dowo
          </span>
          <button
            className={`inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-[7px] bg-[#edf5d7] px-3 py-[7px] text-xs font-semibold text-[#4b6515] transition duration-150 hover:bg-[#e3efc2] ${focusRing}`}
            type="button"
          >
            <i className="fa-solid fa-download" /> Simpan Struktur Urutan
          </button>
          <button
            className={`inline-flex min-h-9 min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-[7px] border-0 bg-[#c2dc80] px-3 py-[7px] text-xs font-semibold text-[#594045]
              shadow-[0_3px_7px_rgba(75,101,21,0.12)] transition duration-150
              enabled:hover:bg-[#b5d36b] enabled:hover:shadow-[0_5px_10px_rgba(75,101,21,0.16)]
              disabled:cursor-not-allowed disabled:bg-[#e7edda] disabled:text-[#74666a]
              max-[390px]:min-h-[34px] max-[390px]:min-w-[112px] max-[390px]:px-[9px] max-[390px]:py-1.5 max-[390px]:text-[11px] ${focusRing}`}
            type="button"
            disabled={!selectedIds.size}
            onClick={deleteSelected}
          >
            <i className="fa-solid fa-trash-can" /> Hapus Toko
          </button>
        </div>
      </main>

      {/* Dialog tambah kategori */}
      <dialog
        className="m-auto w-[min(92vw,380px)] rounded-xl border border-[rgba(194,220,128,0.7)] bg-white p-5 text-[#594045] shadow-[0_12px_28px_rgba(28,43,21,0.25)] backdrop:bg-black/40"
        ref={dialogRef}
      >
        <form className="grid gap-3.5" onSubmit={addMenu}>
          <h2 className="text-base font-semibold">Tambah Kategori Baru</h2>
          <div className="grid gap-3">
            <label className="block text-xs font-medium">
              Nama Kategori
              <input className={dialogInput} name="category" required />
            </label>
            <label className="block text-xs font-medium">
              Nama Produk/Toko
              <input className={dialogInput} name="item" required />
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="cursor-pointer rounded-[9px] bg-[#f2f1ec] px-[13px] py-2 text-xs font-semibold text-[#594045] transition duration-150 hover:bg-[#e8e7e0]"
              type="button"
              onClick={() => dialogRef.current?.close()}
            >
              Batal
            </button>
            <button className={addButton} type="submit">
              Tambah Kategori
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}