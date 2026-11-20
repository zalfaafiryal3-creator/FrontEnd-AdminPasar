import AdminLayout from "../../../../components/AdminLayout";
import ManagementTable, { type ManagementTableConfig } from "../../../../components/ManagementTable";
import { initialUserRecords } from "../../../../lib/admin-records";

const config: ManagementTableConfig = {
  className: "user-management",
  tableClass: "user-table",
  title: "Kelola Pengguna Admin",
  description: "Manajemen data akun, audit riwayat aktivitas, dan status akun di Pasar Oro-Oro Dowo.",
  breadcrumb: "PENGGUNA",
  addLabel: "Tambah Pengguna Baru",
  searchPlaceholder: "Cari nama pengguna...",
  searchLabel: "Cari pengguna",
  storageKey: "pasar-admin-users",
  deletedStorageKey: "pasar-admin-deleted-users",
  selectable: true,
  deleteLabel: "Hapus Terpilih",
  summary: [
    { label: "TOTAL PENGGUNA TERDAFTAR", value: "5", detail: "Pengguna", icon: "fa-users", tone: "green" },
    { label: "AKTIF HARI INI", value: "3", detail: "Pengguna", icon: "fa-bolt", tone: "amber" },
  ],
  filters: [
    { label: "Semua Tipe Pengguna", field: "type", options: ["Pelanggan", "Pembeli"] },
    { label: "Semua Status", field: "status", options: ["Aktif", "Ditangguhkan"] },
  ],
  columns: ["PENGGUNA", "EMAIL & VERIFIKASI", "NO. WHATSAPP", "STATUS AKUN", "AKTIVITAS TERAKHIR"],
  initialRecords: initialUserRecords,
  fields: [
    { name: "name", label: "Nama Lengkap" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "No WhatsApp", type: "tel" },
  ],
  renderRecord: (record) => <>
    <td><div className="flex min-w-0 items-center gap-2"><span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-xl bg-[#f8e49f] text-[#4b6515]"><i className="fa-solid fa-user" /></span><span className="min-w-0"><strong className="block break-words text-[11px] leading-snug text-[#594045]">{record.name}</strong><small className="mt-0.5 block break-words text-[9px] leading-snug text-[#74666a]">@{record.name.toLowerCase().replace(/\s+/g, ".")} • ID: USR-00821</small></span></div></td>
    <td><div className="flex min-w-0 flex-col gap-1 break-words text-[10px] text-[#594045]"><strong>{record.email}</strong><span className="text-[#315e20]"><i className="fa-solid fa-circle-check" /> Terverifikasi OTP</span></div></td>
    <td><span className="break-words">{record.phone}</span><small className="ml-2 text-green-700"><i className="fa-brands fa-whatsapp" /></small></td>
    <td><span className="inline-flex max-w-full items-center gap-1 rounded-lg bg-[#d9eaae] px-2.5 py-1 text-[9px] font-bold text-[#315e20]"><i className="fa-solid fa-circle" /> {record.status || "Aktif"}</span></td>
    <td><div className="flex min-w-0 flex-col gap-1 break-words"><strong className="text-[10px] text-[#594045]">{record.activity}</strong><span className="text-[9px] leading-snug text-[#74666a]">{record.browser}</span></div></td>
  </>,
};

export default function Pengguna() {
  return <AdminLayout activePage="users" label="Admin Pengguna"><ManagementTable config={config} /></AdminLayout>;
}
