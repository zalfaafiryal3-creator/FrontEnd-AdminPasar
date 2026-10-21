import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import "./Penjual.css";

const sellerSeed = [
  { id: "seller-1", name: "Budi Santoso", shop: "Toko Tahu & Sayur Barokah", block: "Kios A-12", status: "Lapak Buka", phone: "+62 812-3456-7890", email: "budisantoso@gmail.com", type: "Zona Kuliner" },
  { id: "seller-2", name: "Joko Prasetyo", shop: "Los Daging Segar Pak Joko", block: "Lapak B-04", status: "Lapak Buka", phone: "+62 813-8900-7723", email: "jokoprasetyo@gmail.com", type: "Zona Daging" },
  { id: "seller-3", name: "Sri Wahyuni", shop: "Kue Tradisional & Jajanan Bu Sri", block: "Kios B-08", status: "Lapak Buka", phone: "+62 821-4567-9011", email: "sri.wahyuni@gmail.com", type: "Zona Kuliner" },
  { id: "seller-4", name: "Siti Aminah", shop: "Bumbu Dapur & Rempah Alam", block: "Los B-02", status: "Tutup Sementara", phone: "+62 857-9012-3456", email: "siti.aminah@gmail.com", type: "Zona Bahan Pokok" },
];

export default function Penjual() {
  const [sellers, setSellers] = useState(sellerSeed);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [zoneFilter, setZoneFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const visibleSellers = sellers.filter((seller) =>
    `${seller.name} ${seller.shop} ${seller.block}`.toLowerCase().includes(search.toLowerCase())
    && (!zoneFilter || seller.type === zoneFilter)
    && (!statusFilter || seller.status === statusFilter),
  );

  const toggleSelection = (id: string) => {
    setSelectedIds((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]);
  };

  const handleDeleteSellers = () => {
    if (!selectedIds.length) return;
    setSellers((current) => current.filter((seller) => !selectedIds.includes(seller.id)));
    setSelectedIds([]);
  };

  const handleToggleSellerStatus = () => {
    setSellers((current) => current.map((seller) => selectedIds.includes(seller.id)
      ? { ...seller, status: seller.status === "Lapak Buka" ? "Tutup Sementara" : "Lapak Buka" }
      : seller));
  };

  return (
    <AdminLayout activePage="sellers" label="Admin Penjual">
      <main className="page-view active management-view">
        <div className="page-breadcrumb">ADMIN PANEL &nbsp;›&nbsp; MANAJEMEN TOKO</div>
        <div className="page-heading seller-heading"><div><h1>Kelola Data Penjual &amp; Lapak</h1><p>Pencatatan dan pengelolaan informasi pedagang, lokasi lapak/kios aktif, serta informasi kontak pasar rakyat Oro-Oro Dowo Malang.</p></div><button className="add-button" type="button"><i className="fa-solid fa-plus" /> Daftarkan Pedagang Baru</button></div>

        <section className="management-summary seller-summary" aria-label="Ringkasan penjual">
          <article className="summary-card"><div><span>TOTAL PEDAGANG TERDAFTAR</span><strong>251</strong><small>251 Aktif • bulan ini</small></div><i className="fa-solid fa-users" /></article>
          <article className="summary-card amber"><div><span>KIOS / LAPAK AKTIF BERJUALAN</span><strong>240 <small>Kios</small></strong><small>96% dari keseluruhan pasar</small></div><i className="fa-solid fa-shop" /></article>
          <article className="summary-card"><div><span>KIOS / LAPAK KOSONG</span><strong>11 <small>Kios</small></strong><small>Pedagang baru dapat mendaftar</small></div><i className="fa-solid fa-store" /></article>
        </section>

        <div className="seller-toolbar">
          <label className="filter-bar"><i className="fa-solid fa-magnifying-glass" /><input aria-label="Cari nama pedagang" placeholder="Cari nama pedagang, nama toko..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
          <select aria-label="Zona" value={zoneFilter} onChange={(event) => setZoneFilter(event.target.value)}><option value="">Semua Zona / Kategori Usaha</option><option>Zona Kuliner</option><option>Zona Daging</option><option>Zona Bahan Pokok</option></select>
          <select aria-label="Status lapak" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="">Semua Status Lapak</option><option>Lapak Buka</option><option>Tutup Sementara</option></select>
          <select aria-label="Urutan"><option>Urutkan: Pengajuan Terbaru</option></select>
          <button type="button" aria-label="Tampilan kartu"><i className="fa-solid fa-grip" /></button>
        </div>

        {visibleSellers.length > 0 ? (
          <div className="verification-grid">
            {visibleSellers.map((seller) => {
              const selected = selectedIds.includes(seller.id);

              return (
                <article
                  className={`verification-card${selected ? " selected" : ""}`}
                  key={seller.id}
                  tabIndex={0}
                  aria-selected={selected}
                  onClick={() => toggleSelection(seller.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      toggleSelection(seller.id);
                    }
                  }}
                >
                  <div className="verification-meta"><input className="seller-select" type="checkbox" aria-label={`Pilih ${seller.name}`} checked={selected} onChange={() => toggleSelection(seller.id)} onClick={(event) => event.stopPropagation()} /><span>{seller.status}</span><small>Terdaftar sejak Jan 2023</small><b>ID: PED-{seller.id.replace("seller-", "").padStart(3, "0")}</b></div>
                  <div className="seller-card-identity"><span className="seller-card-avatar">{seller.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><div><h2>{seller.name}</h2><strong>{seller.shop}</strong></div><span className="seller-card-zone">{seller.block}</span></div>
                  <p><i className="fa-solid fa-phone" /> {seller.phone} <span>•</span> <i className="fa-regular fa-envelope" /> {seller.email}</p>
                  <button type="button" onClick={(event) => event.stopPropagation()}><i className="fa-regular fa-address-card" /> Detail &amp; Edit Data Lapak</button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="verification-empty">Data pedagang tidak ditemukan.</div>
        )}

        <div className="seller-actions">
          <span className="selected-seller-count" aria-live="polite">
            Terpilih: {selectedIds.length} Penjual
          </span>
          <button className="delete-sellers-button" type="button" onClick={handleDeleteSellers} disabled={!selectedIds.length}>
            <i className="fa-solid fa-trash-can" aria-hidden="true" /> Hapus Terpilih
          </button>
          <button className="suspend-sellers-button" type="button" onClick={handleToggleSellerStatus} disabled={!selectedIds.length}><i className="fa-regular fa-circle-pause" /> Nonaktifkan Sementara</button>
        </div>
      </main>
    </AdminLayout>
  );
}
