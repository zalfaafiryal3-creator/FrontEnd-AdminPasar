import AdminLayout from "../../../components/AdminLayout";
import ManagementTable, { type ManagementTableConfig } from "../../../components/ManagementTable";

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
    <td><div className="flex min-w-0 items-center gap-2"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f8e49f] text-[#4b6515]"><i className="fa-solid fa-store" /></span><span className="min-w-0"><strong className="block text-[11px] leading-snug text-[#594045]">{record.store}</strong><small className="mt-0.5 block break-words text-[9px] leading-snug text-[#74666a]">Camplung • Blok A-04 • @{record.store.toLowerCase().replace(/[^a-z0-9]+/g, "")}</small></span></div></td>
    <td><div className="flex min-w-0 flex-col gap-1 break-words text-[#594045]"><strong>{record.owner}</strong><span className="text-[9px] text-[#74666a]">Zona Makanan</span></div></td>
    <td><span className="inline-flex max-w-full rounded-lg bg-[#d9eaae] px-2.5 py-1 text-[9px] font-semibold text-[#315e20]">{record.category}</span></td>
    <td><span className="inline-flex max-w-full rounded-lg bg-[#594045] px-2.5 py-1.5 text-[9px] font-semibold text-white">{record.discount}</span><small className="mt-1 block text-[8px] text-[#74666a]">KODE: {record.id.slice(-5).toUpperCase()}</small></td>
    <td><span className="break-words text-[9px] font-semibold leading-relaxed text-[#4b6515]">{record.period}<br />{record.requirements}</span></td>
    <td><div className="flex min-w-0 flex-col gap-1.5"><strong className="text-[10px] text-[#594045]">{quota}</strong><progress className="h-1.5 w-full appearance-none overflow-hidden rounded-full bg-[#e7edda] accent-[#8db84f] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[#e7edda] [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-[#8db84f] [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-[#8db84f]" max={100} value={Number.isFinite(quotaPercent) ? Math.max(0, quotaPercent) : 0} aria-label={`Kuota diklaim: ${quota}`} /></div></td>
    <td><span className={`inline-flex max-w-full rounded-lg px-2 py-1 text-[9px] font-semibold leading-snug ${record.status === "Akan Datang" || record.status === "Ditangguhkan" ? "bg-[#f8e49f] text-[#594045]" : record.status === "Hampir Habis" ? "bg-amber-100 text-amber-800" : "bg-[#d9eaae] text-[#315e20]"}`}>{record.status || "Sedang Berlangsung"}</span></td>
  </>;
  },
};

export default function KelolaPromo() {
  return <AdminLayout activePage="promos" label="Admin Kelola Promo"><ManagementTable config={config} /></AdminLayout>;
}
