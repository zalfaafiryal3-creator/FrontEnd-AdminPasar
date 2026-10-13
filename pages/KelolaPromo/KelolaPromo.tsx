import AdminLayout from "../../components/AdminLayout";
import ManagementTable, { type ManagementTableConfig } from "../../components/ManagementTable";
import "./KelolaPromo.css";

const config: ManagementTableConfig = {
  className: "promo-management",
  tableClass: "promo-table",
  title: "Kelola Promosi Pasar Oro-Oro Dowo",
  description: "Kelola daftar promo, penawaran, dan masa berlaku promo toko pedagang secara real-time.",
  breadcrumb: "KELOLA PROMO",
  addLabel: "Tambah Promo Baru",
  searchPlaceholder: "Cari promo nama toko, blok kios, atau jenis komoditas...",
  searchLabel: "Cari promo",
  storageKey: "pasar-admin-promos",
  deletedStorageKey: "pasar-admin-deleted-promos",
  selectable: true,
  deleteLabel: "Hapus Terpilih",
  summary: [
    { label: "TOTAL PROMO BERJALAN", value: "4", detail: "Promo", icon: "fa-clock", tone: "green" },
    { label: "PROMO SEGERA BERAKHIR", value: "2", detail: "Promo • ⚠ < 48 jam tersisa", icon: "fa-hourglass-half", tone: "amber" },
  ],
  filters: [
    { label: "Semua Kategori", field: "category", options: ["Makanan", "Sayuran", "Sembako"] },
    { label: "Semua Status", field: "status", options: ["Sedang Berlangsung", "Akan Datang", "Hampir Habis"] },
    { label: "Semua Tipe Promo", field: "discount", options: ["Diskon Tunai", "Promo Ganda", "Promo Mingguan"] },
  ],
  columns: ["INFORMASI TOKO & PROMO", "PEMILIK LAPAK", "KATEGORI", "NILAI PROMO & KODE", "PERIODE & SYARAT", "KUOTA / KLAIM", "STATUS"],
  initialRecords: [
    { id: "promo-default-lumpur-kentang-v2", store: "Tahu Bakso Cempur", owner: "Pak Haryono", category: "Makanan", discount: "Diskon Tunai 10%", period: "1 Sep - 30 Okt 2026", requirements: "Min. pembelian 10K", quota: "180 / 200", status: "Sedang Berlangsung" },
    { id: "promo-default-bakery", store: "Bakery & Cake Corner", owner: "Bu Ratna", category: "Makanan", discount: "Diskon Cuci 30%", period: "1 Okt - 31 Okt 2026", requirements: "Pembelian 2 item", quota: "0 / 150", status: "Akan Datang" },
    { id: "promo-default-warung", store: "Warung Bu As", owner: "Bu Asmawati", category: "Sembako", discount: "Promo Ganda", period: "1 Sep - 8 Minggu", requirements: "Pelanggan langganan", quota: "95 / 120", status: "Sedang Berlangsung" },
    { id: "promo-default-mie", store: "Mie Ayam Oro-Oro Dowo", owner: "Cak Man", category: "Makanan", discount: "Promo Mie Ayam", period: "Selasa, 24 Okt 2026", requirements: "Khusus hari Selasa", quota: "12 / 150", status: "Hampir Habis" },
  ],
  fields: [
    { name: "store", label: "Nama Toko" },
    { name: "owner", label: "Nama Pemilik" },
    { name: "category", label: "Kategori", type: "select", options: ["Makanan", "Sayuran", "Daging & Ikan", "Mainan"] },
    { name: "discount", label: "Promo", value: "Diskon 10%" },
    { name: "period", label: "Periode Promo", value: "19 September - 22 September 2027" },
    { name: "requirements", label: "Persyaratan", value: "Minimal pembelian 10K" },
  ],
  renderRecord: (record) => {
    const quota = record.quota || "0 / 100";
    const [claimed, total] = quota.split("/");
    const quotaPercent = Math.min(100, (Number.parseInt(claimed, 10) / Number.parseInt(total, 10)) * 100);

    return <>
    <td><div className="entity-cell"><span className="entity-icon"><i className="fa-solid fa-store" /></span><span><strong>{record.store}</strong><small>Camplung • Blok A-04 • @{record.store.toLowerCase().replace(/[^a-z0-9]+/g, "")}</small></span></div></td>
    <td><div className="owner-contact"><strong>{record.owner}</strong><span>Zona Makanan</span></div></td>
    <td><span className="category-pill">{record.category}</span></td>
    <td><span className="discount-pill">{record.discount}</span><small className="promo-code">KODE: {record.id.slice(-5).toUpperCase()}</small></td>
    <td><span className="promo-condition">{record.period}<br />{record.requirements}</span></td>
    <td><div className="quota-cell"><strong>{quota}</strong><span><i style={{ width: `${Number.isFinite(quotaPercent) ? quotaPercent : 0}%` }} /></span></div></td>
    <td><span className={`promo-state ${record.status === "Akan Datang" ? "upcoming" : record.status === "Hampir Habis" ? "ending" : record.status === "Ditangguhkan" ? "upcoming" : ""}`}>{record.status || "Sedang Berlangsung"}</span></td>
  </>;
  },
};

export default function KelolaPromo() {
  return <AdminLayout activePage="promos" label="Admin Kelola Promo"><ManagementTable config={config} /></AdminLayout>;
}
