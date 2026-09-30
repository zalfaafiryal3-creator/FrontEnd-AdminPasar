import AdminLayout from "../../components/AdminLayout";
import ManagementTable, { type ManagementTableConfig } from "../../components/ManagementTable";
import "./KelolaPromo.css";

const config: ManagementTableConfig = {
  className: "promo-management",
  tableClass: "promo-table",
  title: "Kelola Promo, Admin",
  description: "Berikut ringkasan aktivitas pasar Oro-Oro Dowo hari ini.",
  addLabel: "Tambah Promo Baru",
  searchPlaceholder: "Cari toko, atau nama pemilik...",
  searchLabel: "Cari promo",
  storageKey: "pasar-admin-promos",
  deletedStorageKey: "pasar-admin-deleted-promos",
  selectable: true,
  columns: ["INFORMASI TOKO", "PEMILIK", "KATEGORI", "PROMO", "PERSYARATAN"],
  initialRecords: [{ id: "promo-default-lumpur-kentang-v2", store: "Lumpur Kentang", owner: "Budi Santoso", category: "Makanan", discount: "Diskon 10%", period: "19 September - 22 September 2027", requirements: "Minimal pembelian 10K" }],
  fields: [
    { name: "store", label: "Nama Toko" },
    { name: "owner", label: "Nama Pemilik" },
    { name: "category", label: "Kategori", type: "select", options: ["Makanan", "Sayuran", "Daging & Ikan", "Mainan"] },
    { name: "discount", label: "Promo", value: "Diskon 10%" },
    { name: "period", label: "Periode Promo", value: "19 September - 22 September 2027" },
    { name: "requirements", label: "Persyaratan", value: "Minimal pembelian 10K" },
  ],
  renderRecord: (record) => <>
    <td><div className="entity-cell"><span className="entity-icon"><i className="fa-solid fa-basket-shopping" /></span><span><strong>{record.store}</strong><small>@{record.store.toLowerCase().replace(/[^a-z0-9]+/g, "")}</small></span></div></td>
    <td>{record.owner}</td><td><span className="category-pill">{record.category}</span></td><td><span className="discount-pill">{record.discount}</span></td>
    <td><span className="promo-condition">{record.period}<br />{record.requirements}</span></td>
  </>,
};

export default function KelolaPromo() {
  return <AdminLayout activePage="promos" label="Admin Kelola Promo"><ManagementTable config={config} /></AdminLayout>;
}
