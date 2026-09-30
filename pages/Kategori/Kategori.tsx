import { useRef, useState, type FormEvent } from "react";
import AdminLayout from "../../components/AdminLayout.tsx";
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
  { id: "menu-lumpur-kentang", category: "Makanan", item: "Lumpur Kentang", details: "Keju · Kelapa · Krisis", icon: "✣" },
  { id: "menu-bakso-goreng", category: "Makanan", item: "Bakso Goreng", details: "Keju · Kelapa · Krisis", icon: "✣" },
  { id: "menu-klepon", category: "Makanan", item: "Klepon", details: "Keju · Kelapa · Krisis", icon: "✣" },
  { id: "menu-wiwit-sayur-1", category: "Sayuran", item: "Wiwit Sayur", details: "Sawi · Kol · Kangkung · Bayam · Seledri", icon: "◉", leaf: true },
  { id: "menu-wiwit-sayur-2", category: "Sayuran", item: "Wiwit Sayur", details: "Sawi · Kol · Kangkung · Bayam · Seledri", icon: "◉", leaf: true },
  { id: "menu-wiwit-sayur-3", category: "Sayuran", item: "Wiwit Sayur", details: "Sawi · Kol · Kangkung · Bayam · Seledri", icon: "◉", leaf: true },
  { id: "menu-mbok-ami-1", category: "Daging & Ikan", item: "Mbok Ami", details: "Daging Sapi · Daging Kambing", icon: "≋", leaf: true },
  { id: "menu-mbok-ami-2", category: "Daging & Ikan", item: "Mbok Ami", details: "Daging Sapi · Daging Kambing", icon: "≋", leaf: true },
  { id: "menu-mbok-ami-3", category: "Daging & Ikan", item: "Mbok Ami", details: "Daging Sapi · Daging Kambing", icon: "≋", leaf: true },
  { id: "menu-pak-jun-1", category: "Mainan", item: "Pak jun", details: "Seruling · Terompet · Mobil-mobilan", icon: "◉", leaf: true },
  { id: "menu-pak-jun-2", category: "Mainan", item: "Pak jun", details: "Seruling · Terompet · Mobil-mobilan", icon: "◉", leaf: true },
  { id: "menu-pak-jun-3", category: "Mainan", item: "Pak jun", details: "Seruling · Terompet · Mobil-mobilan", icon: "◉", leaf: true },
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
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const dialogRef = useRef<HTMLDialogElement>(null);
  const groupedMenus = menus.reduce<Record<string, Menu[]>>((groups, menu) => {
    const matches = `${menu.item} ${menu.category} ${menu.details}`.toLocaleLowerCase("id").includes(search.trim().toLocaleLowerCase("id"));
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
          <div className="page-heading"><div><h1>Kategori Toko, Admin</h1><p>Berikut Kategori Toko pasar Oro-Oro Dowo.</p></div><button className="add-button" type="button" onClick={() => dialogRef.current?.showModal()}><i className="fa-solid fa-plus"/> Tambah Kategori Baru</button></div>
          <label className="filter-bar"><i className="fa-solid fa-magnifying-glass"/><input type="search" placeholder="Cari toko, atau nama pemilik..." aria-label="Cari kategori" value={search} onChange={(event) => setSearch(event.target.value)}/></label>
          <div className="category-grid">
            {Object.entries(groupedMenus).map(([category, entries]) => (
              <section className="category-group" key={category}>
                <h2 className="category-title">{category.toLocaleUpperCase("id")}</h2>
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
                </div>
              </section>
            ))}
            {!Object.keys(groupedMenus).length && <p className="category-empty">Kategori tidak ditemukan.</p>}
          </div>
          <div className="category-actions"><span className="selected-menu-count" aria-live="polite">{selectedIds.size ? `${selectedIds.size} dipilih` : ""}</span><button className="delete-menu-button" type="button" disabled={!selectedIds.size} onClick={deleteSelected}><i className="fa-solid fa-trash-can"/> Hapus Menu</button></div>
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
