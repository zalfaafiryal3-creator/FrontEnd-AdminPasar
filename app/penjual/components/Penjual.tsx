import { useState } from "react";
import AdminLayout from "../../../components/AdminLayout";

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
      <main className="flex min-h-[calc(100vh-58px)] w-full min-w-0 flex-col px-6 pt-[17px] pb-[18px] text-[#594045] max-[980px]:px-[18px] max-[760px]:px-4 max-[760px]:pt-[17px] max-[760px]:pb-5 max-[560px]:px-3 max-[560px]:pt-4 max-[560px]:pb-5 max-[390px]:px-[10px]">
        <div className="mb-[7px] text-[9px] font-semibold tracking-[0.08em] text-[#74666a]">ADMIN PANEL &nbsp;›&nbsp; MANAJEMEN TOKO</div>
        <div className="mb-[17px] flex items-start justify-between gap-4 max-[760px]:flex-col max-[760px]:gap-3 max-[560px]:mb-[13px]">
          <div className="min-w-0">
            <h1 className="mb-1 text-[21px] font-bold leading-[1.3] text-[#594045] max-[760px]:text-[19px] max-[560px]:text-[17px] max-[390px]:text-base">Kelola Data Penjual &amp; Lapak</h1>
            <p className="m-0 text-xs leading-[1.5] text-[#594045] max-[760px]:text-[11px] max-[560px]:text-[10px]">Pencatatan dan pengelolaan informasi pedagang, lokasi lapak/kios aktif, serta informasi kontak pasar rakyat Oro-Oro Dowo Malang.</p>
          </div>
          <button className="inline-flex min-h-9 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[9px] border-0 bg-[#4b6515] px-4 py-2 text-[11px] font-semibold text-white [font-family:inherit] hover:bg-[#3e5510] focus-visible:outline-2 focus-visible:outline-[#fbbf24] focus-visible:outline-offset-2 max-[760px]:self-start" type="button"><i className="fa-solid fa-plus" /> Daftarkan Pedagang Baru</button>
        </div>

        <section className="mb-4 grid grid-cols-3 gap-3 max-[760px]:grid-cols-1 max-[760px]:gap-2" aria-label="Ringkasan penjual">
          <article className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[rgba(194,220,128,0.65)] bg-[#fbfcf7] p-4 shadow-[0_4px_12px_rgba(75,101,21,0.06)] max-[760px]:py-3">
            <div className="grid gap-1"><span className="text-[9px] font-semibold leading-[1.3] tracking-[0.03em] text-[#74666a]">TOTAL PEDAGANG TERDAFTAR</span><strong className="text-[22px] leading-none text-[#594045]">251</strong><small className="text-[10px] text-[#74666a]">251 Aktif • bulan ini</small></div><i className="fa-solid fa-users text-xl text-[#4b6515]" />
          </article>
          <article className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[rgba(194,220,128,0.65)] bg-[#fff9e9] p-4 shadow-[0_4px_12px_rgba(75,101,21,0.06)] max-[760px]:py-3">
            <div className="grid gap-1"><span className="text-[9px] font-semibold leading-[1.3] tracking-[0.03em] text-[#74666a]">KIOS / LAPAK AKTIF BERJUALAN</span><strong className="text-[22px] leading-none text-[#594045]">240 <small className="text-[11px] font-medium">Kios</small></strong><small className="text-[10px] text-[#74666a]">96% dari keseluruhan pasar</small></div><i className="fa-solid fa-shop text-xl text-[#d39811]" />
          </article>
          <article className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[rgba(194,220,128,0.65)] bg-[#fbfcf7] p-4 shadow-[0_4px_12px_rgba(75,101,21,0.06)] max-[760px]:py-3">
            <div className="grid gap-1"><span className="text-[9px] font-semibold leading-[1.3] tracking-[0.03em] text-[#74666a]">KIOS / LAPAK KOSONG</span><strong className="text-[22px] leading-none text-[#594045]">11 <small className="text-[11px] font-medium">Kios</small></strong><small className="text-[10px] text-[#74666a]">Pedagang baru dapat mendaftar</small></div><i className="fa-solid fa-store text-xl text-[#4b6515]" />
          </article>
        </section>

        <div className="mb-3 grid grid-cols-[minmax(180px,1fr)_repeat(3,minmax(130px,auto))_36px] gap-2 max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
          <label className="flex h-9 min-w-0 items-center gap-2 rounded-lg border border-[rgba(194,220,128,0.8)] bg-white px-3 text-xs text-[#74666a] focus-within:border-[#4b6515] focus-within:outline-2 focus-within:outline-[rgba(251,191,36,0.7)] focus-within:outline-offset-2"><i className="fa-solid fa-magnifying-glass" /><input className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-xs text-[#594045] outline-none placeholder:text-[#8d8184]" aria-label="Cari nama pedagang" placeholder="Cari nama pedagang, nama toko..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
          <select className="h-9 min-w-0 rounded-lg border border-[rgba(194,220,128,0.8)] bg-white px-2 text-[11px] text-[#594045] outline-none focus:border-[#4b6515] focus-visible:outline-2 focus-visible:outline-[#fbbf24]" aria-label="Zona" value={zoneFilter} onChange={(event) => setZoneFilter(event.target.value)}><option value="">Semua Zona / Kategori Usaha</option><option>Zona Kuliner</option><option>Zona Daging</option><option>Zona Bahan Pokok</option></select>
          <select className="h-9 min-w-0 rounded-lg border border-[rgba(194,220,128,0.8)] bg-white px-2 text-[11px] text-[#594045] outline-none focus:border-[#4b6515] focus-visible:outline-2 focus-visible:outline-[#fbbf24]" aria-label="Status lapak" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="">Semua Status Lapak</option><option>Lapak Buka</option><option>Tutup Sementara</option></select>
          <select className="h-9 min-w-0 rounded-lg border border-[rgba(194,220,128,0.8)] bg-white px-2 text-[11px] text-[#594045] outline-none focus:border-[#4b6515] focus-visible:outline-2 focus-visible:outline-[#fbbf24]" aria-label="Urutan"><option>Urutkan: Pengajuan Terbaru</option></select>
          <button className="grid size-9 cursor-pointer place-items-center rounded-lg border border-[rgba(194,220,128,0.8)] bg-white text-[#4b6515] hover:bg-[#edf5d7] focus-visible:outline-2 focus-visible:outline-[#fbbf24] max-[980px]:hidden" type="button" aria-label="Tampilan kartu"><i className="fa-solid fa-grip" /></button>
        </div>

        {visibleSellers.length > 0 ? (
          <div className="grid min-w-0 grid-cols-2 content-start gap-4 px-0 pt-0.5 pb-2 max-[980px]:gap-3 max-[560px]:grid-cols-1 max-[560px]:gap-[10px]">
            {visibleSellers.map((seller) => {
              const selected = selectedIds.includes(seller.id);

              return (
                <article
                  className={`min-h-[105px] min-w-0 cursor-pointer rounded-[17px] border bg-[#e3efc2] px-[14px] py-3 text-[#594045] shadow-[0_5px_14px_rgba(75,101,21,0.08)] focus-visible:outline-2 focus-visible:outline-[#4b6515] focus-visible:outline-offset-2 max-[980px]:px-3 max-[980px]:py-[11px] max-[560px]:min-h-0 max-[560px]:px-3 max-[560px]:py-[11px] max-[390px]:px-[10px] ${selected ? "border-[rgba(75,101,21,0.9)] shadow-[0_0_0_2px_rgba(251,191,36,0.35),0_5px_14px_rgba(75,101,21,0.08)]" : "border-[rgba(194,220,128,0.8)]"}`}
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
                  <div className="mb-[9px] flex min-w-0 flex-wrap items-center gap-2"><input className="size-3.5 accent-[#4b6515]" type="checkbox" aria-label={`Pilih ${seller.name}`} checked={selected} onChange={() => toggleSelection(seller.id)} onClick={(event) => event.stopPropagation()} /><span className="inline-flex min-h-[21px] items-center rounded-lg bg-[#4b6515] px-[9px] py-1 text-[9px] font-semibold leading-[1.2] text-white max-[390px]:text-[8px]">{seller.status}</span><small className="text-[9px] leading-[1.3] text-[#74666a] max-[390px]:text-[8px]">Terdaftar sejak Jan 2023</small><b className="ml-auto text-[9px] font-semibold text-[#74666a]">ID: PED-{seller.id.replace("seller-", "").padStart(3, "0")}</b></div>
                  <div className="mb-2 flex min-w-0 items-center gap-2.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#4b6515] text-[11px] font-bold text-white">{seller.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
                    <div className="min-w-0 flex-1"><h2 className="mb-[3px] mt-0 overflow-visible whitespace-normal text-xs font-bold leading-[1.4] text-[#594045] [overflow-wrap:anywhere] max-[390px]:text-[11px]">{seller.name}</h2><strong className="block overflow-visible whitespace-normal text-[10px] font-medium leading-[1.4] text-[#74666a] [overflow-wrap:anywhere]">{seller.shop}</strong></div>
                    <span className="shrink-0 rounded-md bg-white/70 px-2 py-1 text-[9px] font-semibold text-[#4b6515]">{seller.block}</span>
                  </div>
                  <p className="mb-[9px] mt-0 overflow-visible whitespace-normal text-[9px] leading-[1.45] text-[#594045] [overflow-wrap:anywhere] max-[980px]:text-[8px] max-[560px]:text-[9px]"><i className="fa-solid fa-phone text-[#4b6515]" /> {seller.phone} <span className="px-1 text-[#a49a9c]">•</span> <i className="fa-regular fa-envelope text-[#4b6515]" /> {seller.email}</p>
                  <button className="inline-flex min-h-[26px] cursor-pointer items-center gap-1.5 rounded-[7px] border-0 bg-[#594045] px-[10px] py-[5px] text-[9px] font-semibold leading-[1.3] text-white transition-[background-color,transform] duration-150 hover:-translate-y-px hover:bg-[#4b6515] focus-visible:outline-2 focus-visible:outline-[#4b6515] focus-visible:outline-offset-[3px]" type="button" onClick={(event) => event.stopPropagation()}><i className="fa-regular fa-address-card" /> Detail &amp; Edit Data Lapak</button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[120px] items-center justify-center rounded-2xl border border-dashed border-[rgba(75,101,21,0.35)] bg-[rgba(194,220,128,0.12)] p-5 text-[13px] font-semibold text-[#594045]">Data pedagang tidak ditemukan.</div>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-end gap-[10px] pt-3">
          <span className="text-[11px] font-semibold text-[#594045]" aria-live="polite">
            Terpilih: {selectedIds.length} Penjual
          </span>
          <button className="inline-flex min-w-32 min-h-[34px] cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border-0 bg-[#c2dc80] px-[18px] py-2 text-xs font-bold text-[#594045] shadow-[0_6px_16px_rgba(75,101,21,0.12)] transition-transform hover:enabled:-translate-y-px hover:enabled:bg-[#b7d56f] disabled:cursor-not-allowed disabled:bg-[#dfe9c2] disabled:text-[#594045] disabled:opacity-80 focus-visible:outline-2 focus-visible:outline-[#4b6515] focus-visible:outline-offset-[3px]" type="button" onClick={handleDeleteSellers} disabled={!selectedIds.length}>
            <i className="fa-solid fa-trash-can" aria-hidden="true" /> Hapus Terpilih
          </button>
          <button className="inline-flex min-h-[34px] cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-[#4b6515] bg-white px-3 py-2 text-[11px] font-semibold text-[#4b6515] [font-family:inherit] hover:bg-[#edf5d7] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-[#fbbf24] focus-visible:outline-offset-2" type="button" onClick={handleToggleSellerStatus} disabled={!selectedIds.length}><i className="fa-regular fa-circle-pause" /> Nonaktifkan Sementara</button>
        </div>
      </main>
    </AdminLayout>
  );
}
