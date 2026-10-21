import { useRef, useState, type FormEvent } from "react";
import AdminLayout from "../../../components/AdminLayout";

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
    <AdminLayout activePage="categories" label="Admin Kategori">
        <main className="page-view active management-view category-management flex min-h-[calc(100vh-58px)] flex-col bg-white px-6 py-[17px] pb-[18px] text-[#594045] max-[760px]:px-4 max-[560px]:px-3 max-[390px]:px-2.5">
          <div className="mb-2 text-[9px] font-semibold tracking-[0.12em] text-[#74666a]">ADMIN PANEL &nbsp;›&nbsp; KATEGORISASI</div>
          <div className="mb-4 flex flex-wrap items-start justify-between gap-4 [&_h1]:mb-1 [&_h1]:text-[21px] [&_h1]:leading-[1.3] [&_h1]:text-[#594045] [&_p]:text-[13px] [&_p]:leading-relaxed [&_p]:text-[#594045] max-[760px]:[&_h1]:text-[19px] max-[760px]:[&_p]:text-xs max-[560px]:gap-2"><div><h1>Kelola Kategori Toko Pasar Oro-Oro Dowo</h1><p>Kelola klasifikasi struktur kategori, dan penataan lapak pedagang di kawasan Pasar Oro-Oro Dowo Malang demi penataan pasar tradisional bersih berstandar SNI.</p></div><button className="inline-flex min-h-9 items-center gap-[7px] rounded-[9px] bg-[#c2dc80] px-[13px] py-2 text-xs text-[#594045] shadow-[0_3px_7px_rgba(75,101,21,0.12)] transition-all hover:-translate-y-px hover:bg-[#b5d36b] hover:shadow-[0_5px_10px_rgba(75,101,21,0.16)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#4b6515] max-[560px]:ml-auto max-[560px]:min-h-8 max-[560px]:px-2.5 max-[560px]:py-[7px] max-[560px]:text-[10px]" type="button" onClick={() => dialogRef.current?.showModal()}><i className="fa-solid fa-plus"/> Tambah Kategori Baru</button></div>
          <section className="management-summary category-summary mb-4 grid grid-cols-4 gap-3 max-[980px]:grid-cols-2 max-[560px]:grid-cols-1" aria-label="Ringkasan kategori">
            <article className="summary-card flex min-w-0 items-center justify-between rounded-2xl border border-[#c2dc80]/60 bg-[#edf5d7] p-4 text-[#594045] shadow-sm"><div className="flex min-w-0 flex-col gap-1"><span className="text-[9px] font-bold tracking-wide text-[#4b6515]">TOTAL TOKO</span><strong className="text-xl">251</strong><small className="text-[10px] text-[#74666a]">251 Aktif • bulan ini</small></div><i className="fa-solid fa-store text-lg text-[#4b6515]" /></article>
            <article className="summary-card amber flex min-w-0 items-center justify-between rounded-2xl border border-[#fbbf24]/40 bg-[#fff0c2] p-4 text-[#594045] shadow-sm"><div className="flex min-w-0 flex-col gap-1"><span className="text-[9px] font-bold tracking-wide text-[#4b6515]">TOTAL KATEGORI</span><strong className="text-xl">6 <small className="text-[10px] font-normal">kategori aktif</small></strong><small className="text-[10px] text-[#74666a]">Zonasi Standar Revitalisasi SNI</small></div><i className="fa-solid fa-shop text-lg text-[#4b6515]" /></article>
            <article className="summary-card flex min-w-0 items-center justify-between rounded-2xl border border-[#c2dc80]/60 bg-[#edf5d7] p-4 text-[#594045] shadow-sm"><div className="flex min-w-0 flex-col gap-1"><span className="text-[9px] font-bold tracking-wide text-[#4b6515]">KATEGORI DOMINAN</span><strong className="summary-word text-xl">Makanan</strong><small className="text-[10px] text-[#74666a]">(46%) • 36 Toko &amp; Jajanan Tradisional</small></div><i className="fa-solid fa-utensils text-lg text-[#4b6515]" /></article>
            <article className="summary-card amber flex min-w-0 items-center justify-between rounded-2xl border border-[#fbbf24]/40 bg-[#fff0c2] p-4 text-[#594045] shadow-sm"><div className="flex min-w-0 flex-col gap-1"><span className="text-[9px] font-bold tracking-wide text-[#4b6515]">OKUPANSI ZONASI</span><strong className="text-xl">92% <small className="text-[10px] font-normal">Lapak Terisi</small></strong><small className="occupancy-meter h-1.5 w-full overflow-hidden rounded-full bg-white"><i className="block h-full w-[92%] rounded-full bg-[#4b6515]" /></small></div><i className="fa-solid fa-store text-lg text-[#4b6515]" /></article>
          </section>
          <div className="management-toolbar category-toolbar mb-3 flex flex-wrap items-center gap-2">
            <label className="inline-flex min-h-[60px] w-full min-w-0 flex-[1_1_300px] items-center gap-0 rounded-[18px] border border-[rgba(251,191,36,0.18)] bg-[#ffe4a1] px-4 py-[10px] text-[#4b6515] shadow-[0_3px_8px_rgba(75,101,21,0.04)] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[rgba(75,101,21,0.45)] max-[560px]:min-h-[52px] max-[560px]:rounded-[14px] max-[560px]:px-[11px] max-[560px]:py-2"><i className="fa-solid fa-magnifying-glass grid h-9 w-9 shrink-0 place-items-center rounded-l-full bg-white p-0 text-xs text-[#4b6515] max-[560px]:h-[34px] max-[560px]:w-8"/><input className="h-9 min-w-0 max-w-full flex-[0_1_340px] rounded-r-full bg-white px-3 py-0 text-[10px] text-[#594045] outline-none placeholder:text-[#9c9695] max-[560px]:h-[34px] max-[560px]:flex-1 max-[560px]:text-[10px]" type="search" placeholder="Cari kategori, nama toko, blok..." aria-label="Cari kategori" value={search} onChange={(event) => setSearch(event.target.value)}/></label>
            <label className="inline-flex items-center"><span className="sr-only">Filter kategori</span><select className="h-9 max-w-full rounded-lg border border-[#c2dc80]/70 bg-white px-3 py-2 text-[10px] text-[#594045] focus:outline-2 focus:outline-[#4b6515]" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option>Semua Kategori</option>{[...new Set(menus.map((menu) => menu.category))].map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className="inline-flex items-center"><span className="sr-only">Urutkan kategori</span><select className="h-9 max-w-full rounded-lg border border-[#c2dc80]/70 bg-white px-3 py-2 text-[10px] text-[#594045] focus:outline-2 focus:outline-[#4b6515]" defaultValue="Urutkan: Toko Terbanyak"><option>Urutkan: Toko Terbanyak</option><option>Urutkan: A-Z</option></select></label>
            <button className="category-tool-button inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#c2dc80]/70 bg-white px-3 text-[10px] font-semibold text-[#4b6515] hover:bg-[#edf5d7]" type="button"><i className="fa-solid fa-table-cells" /> Kelola Kategori</button>
            <button className="category-tool-button inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#c2dc80]/70 bg-white px-3 text-[10px] font-semibold text-[#4b6515] hover:bg-[#edf5d7]" type="button"><i className="fa-solid fa-table" /> Tabel Detail</button>
          </div>
          <div className="grid min-w-0 grid-cols-4 items-stretch gap-[10px] py-[14px] pb-2 max-[980px]:gap-2 max-[760px]:grid-cols-2 max-[760px]:gap-3">
            {Object.entries(groupedMenus).map(([category, entries]) => (
              <section className="min-w-0" key={category}>
                <h2 className="relative z-[1] mx-auto -mb-[3px] grid min-h-[30px] w-[min(100%,184px)] place-items-center rounded-xl bg-[#594045] px-2 py-[5px] text-center text-[11px] leading-[1.3] font-bold text-white"><span>{category}</span><small className="text-[9px] font-medium opacity-80">{entries.length} Toko</small></h2>
                <div className="min-h-[330px] min-w-0 rounded-[19px] border border-[rgba(194,220,128,0.82)] bg-[#e3efc2] px-3 pt-[42px] pb-4 shadow-[0_5px_14px_rgba(75,101,21,0.07)] max-[980px]:px-2 max-[760px]:min-h-[235px] max-[760px]:px-3 max-[760px]:pt-9 max-[760px]:pb-[14px]">
                  {entries.map((menu) => (
                    <div className={`mb-[13px] flex min-w-0 cursor-pointer items-center gap-2 rounded-[9px] p-1 text-[#594045] transition-colors duration-[140ms] hover:bg-[rgba(255,255,255,0.4)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#4b6515] max-[980px]:gap-[6px] max-[980px]:p-[3px] max-[760px]:mb-[10px] max-[760px]:gap-2 max-[760px]:p-1 ${selectedIds.has(menu.id) ? "bg-[rgba(251,191,36,0.23)] shadow-[inset_0_0_0_1px_rgba(75,101,21,0.2)]" : ""}`} data-menu-id={menu.id} key={menu.id} role="button" tabIndex={0} aria-selected={selectedIds.has(menu.id)} onClick={() => toggleSelection(menu.id)} onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        toggleSelection(menu.id);
                      }
                    }}>
                      <span className={`grid h-[31px] w-[31px] shrink-0 place-items-center rounded-[10px] bg-[#fbbf24] text-sm text-[#4b6515] shadow-[0_2px_4px_rgba(75,101,21,0.13)] max-[980px]:h-7 max-[980px]:w-7 max-[980px]:text-xs max-[760px]:h-[31px] max-[760px]:w-[31px] max-[760px]:text-sm ${menu.leaf ? "bg-[#c2dc80]" : ""}`}>{menu.icon}</span><span><strong className="mb-0.5 block break-words text-[10px] leading-[1.35] text-[#594045] max-[980px]:text-[9px] max-[760px]:text-[10px]">{menu.item}</strong><small className="block break-words text-[8px] leading-[1.4] text-[#74666a] max-[980px]:text-[7px] max-[760px]:text-[8px]">? {menu.details}</small></span>
                    </div>
                  ))}
                  <button className="category-add-item mt-1 inline-flex min-h-8 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#4b6515]/35 bg-white/50 text-[10px] font-semibold text-[#4b6515] hover:bg-white" type="button" onClick={() => dialogRef.current?.showModal()}><i className="fa-solid fa-plus" /> Tambah Toko</button>
                </div>
              </section>
            ))}
            {!Object.keys(groupedMenus).length && <p className="col-span-full p-[18px] text-center text-[11px] text-[#74666a]">Kategori tidak ditemukan.</p>}
          </div>
          <div className="mt-auto flex flex-wrap items-center justify-end gap-3 py-3 pb-0.5 max-[560px]:gap-2"><span className="text-[11px] text-[#74666a]" aria-live="polite">{selectedIds.size ? `${selectedIds.size} dipilih` : ""}</span><span className="category-standard hidden items-center gap-2 text-[9px] text-[#74666a] xl:inline-flex"><i className="fa-solid fa-shield-halved text-[#4b6515]" /> Standardisasi Tata Ruang Zonasi Pasar Oro-Oro Dowo</span><button className="category-save-button inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#c2dc80] bg-white px-3 text-[10px] font-semibold text-[#4b6515] hover:bg-[#edf5d7]" type="button"><i className="fa-solid fa-download" /> Simpan Struktur Urutan</button><button className="inline-flex min-h-9 min-w-[120px] items-center justify-center gap-2 rounded-md border-0 bg-[#c2dc80] px-3 py-[7px] text-xs font-semibold text-[#594045] shadow-[0_3px_7px_rgba(75,101,21,0.12)] transition-all hover:bg-[#b5d36b] hover:shadow-[0_5px_10px_rgba(75,101,21,0.16)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#4b6515] disabled:cursor-not-allowed disabled:bg-[#e7edda] disabled:text-[#74666a]" type="button" disabled={!selectedIds.size} onClick={deleteSelected}><i className="fa-solid fa-trash-can"/> Hapus Toko</button></div>
        </main>
      <dialog className="m-auto max-h-[90vh] max-w-[min(92vw,420px)] rounded-2xl border border-[rgba(194,220,128,0.7)] bg-white text-[#594045] shadow-2xl backdrop:bg-black/40" ref={dialogRef}>
        <form className="create-form w-[min(92vw,420px)] space-y-4 p-6" onSubmit={addMenu}>
          <h2 className="text-lg font-bold text-[#594045]">Tambah Kategori Baru</h2>
          <div className="create-fields grid gap-3 [&_input]:rounded-lg [&_input]:border [&_input]:border-[rgba(194,220,128,0.75)] [&_input]:p-2 [&_input]:text-[#594045] [&_input:focus]:border-[#4b6515] [&_input:focus]:outline-2 [&_input:focus]:outline-[rgba(194,220,128,0.45)]"><label className="grid gap-1 text-xs font-semibold">Nama Kategori<input className="rounded-lg border border-[rgba(194,220,128,0.75)] p-2 text-[#594045] focus:border-[#4b6515] focus:outline-2 focus:outline-[rgba(194,220,128,0.45)]" name="category" required/></label><label className="grid gap-1 text-xs font-semibold">Nama Produk/Toko<input className="rounded-lg border border-[rgba(194,220,128,0.75)] p-2 text-[#594045] focus:border-[#4b6515] focus:outline-2 focus:outline-[rgba(194,220,128,0.45)]" name="item" required/></label></div>
          <div className="create-actions flex justify-end gap-2"><button className="cancel-button rounded-lg bg-[#f2f1ec] px-4 py-2 text-xs text-[#594045] hover:bg-[#e7e5dc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]" type="button" onClick={() => dialogRef.current?.close()}>Batal</button><button className="add-button rounded-lg bg-[#c2dc80] px-4 py-2 text-xs font-semibold text-[#594045] hover:bg-[#b5d36b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]" type="submit">Tambah Kategori</button></div>
        </form>
      </dialog>
    </AdminLayout>
  );
}
