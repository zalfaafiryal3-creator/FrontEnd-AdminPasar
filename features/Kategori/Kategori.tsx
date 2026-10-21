import { useRef, useState, type FormEvent } from "react";
import AdminLayout from "../../components/AdminLayout";
import "./Kategori.css";

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
        <main className="page-view active management-view category-management">
          <div className="page-breadcrumb">ADMIN PANEL &nbsp;›&nbsp; KATEGORISASI</div>
          <div className="page-heading"><div><h1>Kelola Kategori Toko Pasar Oro-Oro Dowo</h1><p>Kelola klasifikasi struktur kategori, dan penataan lapak pedagang di kawasan Pasar Oro-Oro Dowo Malang demi penataan pasar tradisional bersih berstandar SNI.</p></div><button className="add-button" type="button" onClick={() => dialogRef.current?.showModal()}><i className="fa-solid fa-plus"/> Tambah Kategori Baru</button></div>
          <section className="management-summary category-summary" aria-label="Ringkasan kategori">
            <article className="summary-card"><div><span>TOTAL TOKO</span><strong>251</strong><small>251 Aktif • bulan ini</small></div><i className="fa-solid fa-store" /></article>
            <article className="summary-card amber"><div><span>TOTAL KATEGORI</span><strong>6 <small>kategori aktif</small></strong><small>Zonasi Standar Revitalisasi SNI</small></div><i className="fa-solid fa-shop" /></article>
            <article className="summary-card"><div><span>KATEGORI DOMINAN</span><strong className="summary-word">Makanan</strong><small>(46%) • 36 Toko &amp; Jajanan Tradisional</small></div><i className="fa-solid fa-utensils" /></article>
            <article className="summary-card amber"><div><span>OKUPANSI ZONASI</span><strong>92% <small>Lapak Terisi</small></strong><small className="occupancy-meter"><i /></small></div><i className="fa-solid fa-store" /></article>
          </section>
          <div className="management-toolbar category-toolbar">
            <label className="filter-bar"><i className="fa-solid fa-magnifying-glass"/><input type="search" placeholder="Cari kategori, nama toko, blok..." aria-label="Cari kategori" value={search} onChange={(event) => setSearch(event.target.value)}/></label>
            <label className="table-filter"><span className="sr-only">Filter kategori</span><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option>Semua Kategori</option>{[...new Set(menus.map((menu) => menu.category))].map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className="table-filter"><span className="sr-only">Urutkan kategori</span><select defaultValue="Urutkan: Toko Terbanyak"><option>Urutkan: Toko Terbanyak</option><option>Urutkan: A-Z</option></select></label>
            <button className="category-tool-button" type="button"><i className="fa-solid fa-table-cells" /> Kelola Kategori</button>
            <button className="category-tool-button" type="button"><i className="fa-solid fa-table" /> Tabel Detail</button>
          </div>
          <div className="category-grid">
            {Object.entries(groupedMenus).map(([category, entries]) => (
              <section className="category-group" key={category}>
                <h2 className="category-title"><span>{category}</span><small>{entries.length} Toko</small></h2>
                <div className="category-card">
                  {entries.map((menu) => (
                    <div className={`category-entry${selectedIds.has(menu.id) ? " selected-menu" : ""}`} data-menu-id={menu.id} key={menu.id} role="button" tabIndex={0} aria-selected={selectedIds.has(menu.id)} onClick={() => toggleSelection(menu.id)} onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        toggleSelection(menu.id);
                      }
                    }}>
                      <span className={`mini-entity-icon${menu.leaf ? " leaf" : ""}`}>{menu.icon}</span><span><strong>{menu.item}</strong><small>• {menu.details}</small></span>
                    </div>
                  ))}
                  <button className="category-add-item" type="button" onClick={() => dialogRef.current?.showModal()}><i className="fa-solid fa-plus" /> Tambah Toko</button>
                </div>
              </section>
            ))}
            {!Object.keys(groupedMenus).length && <p className="category-empty">Kategori tidak ditemukan.</p>}
          </div>
          <div className="category-actions"><span className="selected-menu-count" aria-live="polite">{selectedIds.size ? `${selectedIds.size} dipilih` : ""}</span><span className="category-standard"><i className="fa-solid fa-shield-halved" /> Standardisasi Tata Ruang Zonasi Pasar Oro-Oro Dowo</span><button className="category-save-button" type="button"><i className="fa-solid fa-download" /> Simpan Struktur Urutan</button><button className="delete-menu-button" type="button" disabled={!selectedIds.size} onClick={deleteSelected}><i className="fa-solid fa-trash-can"/> Hapus Toko</button></div>
        </main>
      <dialog className="create-dialog" ref={dialogRef}>
        <form className="create-form" onSubmit={addMenu}>
          <h2>Tambah Kategori Baru</h2>
          <div className="create-fields"><label>Nama Kategori<input name="category" required/></label><label>Nama Produk/Toko<input name="item" required/></label></div>
          <div className="create-actions"><button className="cancel-button" type="button" onClick={() => dialogRef.current?.close()}>Batal</button><button className="add-button" type="submit">Tambah Kategori</button></div>
        </form>
      </dialog>
    </AdminLayout>
  );
}
