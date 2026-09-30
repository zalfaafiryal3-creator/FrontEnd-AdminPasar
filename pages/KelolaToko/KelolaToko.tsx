import AdminLayout from "../../components/AdminLayout.tsx";
import ManagementTable, { type ManagementTableConfig } from "../../components/ManagementTable.tsx";
import "./KelolaToko.css";

const config: ManagementTableConfig = {
  className: "store-management",
  tableClass: "store-table",
  title: "Kelola Toko Marketplace",
  description: "Manajemen data pengelolaan toko di pasar oro-oro dowo",
  addLabel: "Tambah Toko Baru",
  searchPlaceholder: "Cari toko, atau nama pemilik...",
  searchLabel: "Cari toko",
  storageKey: "pasar-admin-stores",
  columns: ["INFORMASI TOKO", "PEMILIK", "KATEGORI", "RATING", "STATUS"],
  initialRecords: [{ id: "store-default-lumpur-kentang", store: "Lumpur Kentang", owner: "Budi Santoso", category: "Makanan", rating: "4.8", status: "Menunggu Verifikasi" }],
  fields: [
    { name: "store", label: "Nama Toko" },
    { name: "owner", label: "Nama Pemilik" },
    { name: "category", label: "Kategori", type: "select", options: ["Makanan", "Sayuran", "Daging & Ikan", "Mainan"] },
    { name: "rating", label: "Rating", type: "number", value: "4.8", min: "0", max: "5", step: "0.1" },
    { name: "status", label: "Status", type: "select", options: ["Menunggu Verifikasi", "Aktif"] },
  ],
  renderRecord: (record) => <>
    <td><div className="entity-cell"><span className="entity-icon"><i className="fa-solid fa-basket-shopping" /></span><span><strong>{record.store}</strong><small>@{record.store.toLowerCase().replace(/[^a-z0-9]+/g, "")}</small></span></div></td>
    <td>{record.owner}</td><td><span className="category-pill">{record.category}</span></td><td><span className="rating">★ {record.rating}</span></td>
    <td><span className={record.status === "Aktif" ? "active-pill" : "review-pill"}>{record.status}</span></td>
  </>,
};

export default function KelolaToko() {
  return <AdminLayout activePage="stores" label="Admin Kelola Toko"><ManagementTable config={config} /></AdminLayout>;
}
