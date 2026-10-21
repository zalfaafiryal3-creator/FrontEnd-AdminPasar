import Link from "next/link";

export function StatCards() {
  return (
    <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan pasar">
      <Link className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[#e9e3e4] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" href="/Kelola%20Toko" aria-label="Buka halaman Total Toko">
        <div className="grid min-w-0 gap-1">
          <span className="text-[10px] font-bold tracking-[0.08em] text-[#74666a]">TOTAL TOKO</span>
          <span className="text-2xl font-bold leading-tight text-[#594045]">251</span>
          <span className="text-xs font-semibold text-[#4b6515]">↑ &nbsp;4 toko baru <small className="font-normal text-[#74666a]">bulan ini</small></span>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eef4de] text-lg text-[#4b6515]"><i className="fa-solid fa-store" aria-hidden="true" /></span>
      </Link>
      <Link className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[#e9e3e4] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" href="/Kelola%20Promo" aria-label="Buka halaman Kelola Promo">
        <div className="grid min-w-0 gap-1">
          <span className="text-[10px] font-bold tracking-[0.08em] text-[#74666a]">KELOLA PROMO</span>
          <span className="text-2xl font-bold leading-tight text-[#594045]">10 <small className="text-xs font-medium">Promo Aktif</small></span>
          <span className="text-xs font-semibold text-[#9a6700]"><i className="fa-regular fa-clock" aria-hidden="true" /> &nbsp;2 promo <small className="font-normal text-[#74666a]">berakhir hari ini</small></span>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#fff1cf] text-lg text-[#a66a00]"><i className="fa-solid fa-fire" aria-hidden="true" /></span>
      </Link>
      <Link className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[#e9e3e4] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" href="/Pengguna" aria-label="Buka halaman Total Pengguna">
        <div className="grid min-w-0 gap-1">
          <span className="text-[10px] font-bold tracking-[0.08em] text-[#74666a]">TOTAL PENGGUNA</span>
          <span className="text-2xl font-bold leading-tight text-[#594045]">120 <small className="text-xs font-medium">Pengguna</small></span>
          <span className="text-xs font-semibold text-[#4b6515]">↑ &nbsp;88 aktif <small className="font-normal text-[#74666a]">hari ini (73%)</small></span>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#eef4de] text-lg text-[#4b6515]"><i className="fa-solid fa-users" aria-hidden="true" /></span>
      </Link>
      <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[#e9e3e4] bg-white p-4 shadow-sm">
        <div className="grid min-w-0 gap-1">
          <span className="text-[10px] font-bold tracking-[0.08em] text-[#74666a]">TOTAL TRANSAKSI</span>
          <span className="text-xl font-bold leading-tight text-[#594045]">Rp 18.450.000</span>
          <span className="text-xs font-semibold text-[#4b6515]">↗ &nbsp;342 pesanan <small className="font-normal text-[#74666a]">+8.4% vs kemarin</small></span>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#fff1cf] text-lg text-[#a66a00]"><i className="fa-solid fa-wallet" aria-hidden="true" /></span>
      </div>
    </section>
  );
}