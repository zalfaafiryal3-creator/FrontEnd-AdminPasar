import AdminLayout from "../../../components/AdminLayout";
import ManagementTable, { type ManagementTableConfig } from "../../../components/ManagementTable";

const config: ManagementTableConfig = {
  className: "store-management",
  tableClass: "store-table",
  title: "Kelola Toko Pasar Oro-Oro Dowo",
  description: "Manajemen operasional, sertifikasi digital, dan kurasi direktori pedagang Pasar Oro-Oro Dowo Malang.",
  breadcrumb: "KELOLA TOKO",
  addLabel: "Tambah Toko Baru",
  searchPlaceholder: "Cari nama toko, pemilik, atau blok...",
  searchLabel: "Cari toko",
  storageKey: "pasar-admin-stores",
  summary: [
    { label: "TOTAL TOKO", value: "251", detail: "251 Aktif • bulan ini", icon: "fa-store", tone: "green" },
    { label: "MAKANAN & KULINER", value: "36", detail: "46% dari keseluruhan pasar", icon: "fa-utensils", tone: "amber" },
    { label: "TOTAL PENGGUNA", value: "28", detail: "36% komoditas pangan basah", icon: "fa-users", tone: "green" },
    { label: "TOTAL TRANSAKSI", value: "28", detail: "36% transaksi bulan ini", icon: "fa-wallet", tone: "amber" },
  ],
  filters: [
    { label: "Semua Kategori", field: "category", options: ["Makanan & Jajanan", "Sayuran", "Daging & Ikan", "Sembako & Perabot"] },
    { label: "Semua Status", field: "status", options: ["Aktif / Terverifikasi", "Menunggu Verifikasi"] },
    { label: "Semua Zona (Blok)", field: "zone", options: ["Blok A", "Blok B", "Blok C"] },
  ],
  columns: ["INFORMASI TOKO", "PEMILIK & KONTAK", "KATEGORI", "RATING & TRANSAKSI", "STATUS TOKO", "AKSI"],
  initialRecords: [
    { id: "store-default-lumpur-kentang", store: "Kue Lumpur Kentang Bu Sri", handle: "@lumpurkentang_sri", owner: "Budi Santoso", email: "budisantoso@gmail.com", phone: "+62 812-3456-7890", category: "Makanan & Jajanan", rating: "4.8", transactions: "1.240", zone: "Blok A-04", status: "Aktif / Terverifikasi" },
    { id: "store-default-klepon", store: "Klepon Ku", handle: "@kleponku_malang", owner: "Siti Aminah", email: "siti.aminah@gmail.com", phone: "+62 821-2345-6789", category: "Makanan & Jajanan", rating: "4.9", transactions: "3.890", zone: "Blok A-12", status: "Aktif / Terverifikasi" },
    { id: "store-default-sayur", store: "Kios Sayur Segar Bu Sri", handle: "@sayurbu_sri", owner: "Sri Wahyuni", email: "sri.wahyuni@gmail.com", phone: "+62 857-1234-9092", category: "Sayuran", rating: "4.7", transactions: "890", zone: "Blok B-08", status: "Aktif / Terverifikasi" },
    { id: "store-default-ayam", store: "Ayam Potong Pak Slamet", handle: "@ayampakslamet", owner: "Slamet Riyadi", email: "slamet.riyadi@gmail.com", phone: "+62 812-5555-2012", category: "Daging & Ikan", rating: "4.6", transactions: "712", zone: "Blok C-02", status: "Aktif / Terverifikasi" },
    { id: "store-default-bakso", store: "Bakso Goreng Bangkit", handle: "@baksogoreng_org", owner: "Joko Prasetyo", email: "joko.prasetyo@gmail.com", phone: "+62 822-7711-4050", category: "Makanan & Jajanan", rating: "4.9", transactions: "2.410", zone: "Blok A-10", status: "Aktif / Terverifikasi" },
    { id: "store-default-jamu", store: "Jamu Tradisional Bu Darto", handle: "@jamubudarto", owner: "Darto Widoyono", email: "darto.widoyono@gmail.com", phone: "+62 812-5555-5544", category: "Makanan & Jajanan", rating: "4.8", transactions: "640", zone: "Blok B-15", status: "Aktif / Terverifikasi" },
  ],
  fields: [
    { name: "store", label: "Nama Toko" },
    { name: "owner", label: "Nama Pemilik" },
    { name: "category", label: "Kategori", type: "select", options: ["Makanan & Jajanan", "Sayuran", "Daging & Ikan", "Sembako & Perabot"] },
    { name: "rating", label: "Rating", type: "number", value: "4.8", min: "0", max: "5", step: "0.1" },
    { name: "status", label: "Status", type: "select", options: ["Menunggu Verifikasi", "Aktif / Terverifikasi"] },
  ],
  renderRecord: (record) => <>
    <td><div className="flex min-w-0 items-center gap-2"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f8e49f] text-[#4b6515]"><i className="fa-solid fa-basket-shopping" /></span><span className="min-w-0"><strong className="block text-xs leading-snug text-[#594045]">{record.store}</strong><small className="mt-0.5 block break-words text-[10px] leading-snug text-[#74666a]">{record.handle} • {record.zone}</small></span></div></td>
    <td><div className="flex min-w-0 flex-col gap-1 break-words text-[10px] text-[#594045]"><strong className="text-[11px]">{record.owner}</strong><span>{record.phone}</span><span>{record.email}</span></div></td>
    <td><span className="inline-flex max-w-full rounded-lg bg-[#d9eaae] px-2.5 py-1 text-[10px] font-semibold text-[#315e20]">{record.category}</span></td>
    <td><span className="whitespace-nowrap text-[13px] font-bold text-amber-600">★ {record.rating}</span><small className="mt-1 block text-[9px] text-[#74666a]">{record.transactions} terjual</small></td>
    <td><span className={`inline-flex max-w-full items-center gap-1 rounded-lg px-2 py-1 text-[9px] font-semibold leading-snug ${ (record.status ?? "").startsWith("Aktif") ? "bg-[#d9eaae] text-[#315e20]" : "bg-amber-300 text-[#594045]"}`}><i className="fa-solid fa-circle-check" /> {record.status || "Aktif / Terverifikasi"}</span></td>
    <td><div className="flex items-center justify-end gap-1"><button className="grid h-8 w-8 place-items-center rounded-lg text-[#4b6515] hover:bg-[#edf5d7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]" type="button" aria-label={`Lihat ${record.store}`}><i className="fa-regular fa-eye" /></button><button className="grid h-8 w-8 place-items-center rounded-lg text-[#4b6515] hover:bg-[#edf5d7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]" type="button" aria-label={`Edit ${record.store}`}><i className="fa-solid fa-pen" /></button><button className="grid h-8 w-8 place-items-center rounded-lg text-[#4b6515] hover:bg-[#edf5d7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]" type="button" aria-label={`Menu ${record.store}`}><i className="fa-solid fa-ellipsis-vertical" /></button></div></td>
  </>,
};

export default function KelolaToko() {
  return <AdminLayout activePage="stores" label="Admin Kelola Toko"><ManagementTable config={config} /></AdminLayout>;
}
