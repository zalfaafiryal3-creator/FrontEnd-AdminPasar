import AdminLayout from "../../components/AdminLayout";
import ManagementTable, { type ManagementTableConfig } from "../../components/ManagementTable";
import "./Pengguna.css";

const config: ManagementTableConfig = {
  className: "user-management",
  tableClass: "user-table",
  title: "Kelola Pengguna, Admin",
  description: "Manajemen data pelanggan, riwayat akun, dan status pembatasan akses.",
  addLabel: "Tambah Pengguna Baru",
  searchPlaceholder: "Cari toko, atau nama pemilik...",
  searchLabel: "Cari pengguna",
  storageKey: "pasar-admin-users",
  columns: ["PENGGUNA", "EMAIL", "NO WHATSAPP", "STATUS AKUN", "AKSI"],
  initialRecords: [{ id: "user-default-mifta-annisa", name: "Mifta Annisa", email: "miftannisa@gmail.com", phone: "+62 812-3456-7890", status: "Aktif" }],
  fields: [
    { name: "name", label: "Nama Lengkap" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "No WhatsApp", type: "tel" },
  ],
  renderRecord: (record) => <>
    <td><div className="entity-cell"><span className="user-icon"><i className="fa-solid fa-user" /></span><strong>{record.name}</strong></div></td>
    <td>{record.email}</td><td>{record.phone}</td><td><span className="active-pill">{record.status || "Aktif"}</span></td>
    <td><button className="text-action" type="button">Lihat Log Aktivitas</button></td>
  </>,
};

export default function Pengguna() {
  return <AdminLayout activePage="users" label="Admin Pengguna"><ManagementTable config={config} /></AdminLayout>;
}
