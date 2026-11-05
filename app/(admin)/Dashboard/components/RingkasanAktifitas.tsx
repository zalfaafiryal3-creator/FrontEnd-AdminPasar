import Link from "next/link";

export function StatCards() {
  return (
    <section className="mb-5 grid grid-cols-4 gap-3.5 max-[1100px]:grid-cols-2 max-[560px]:grid-cols-1" aria-label="Ringkasan pasar">
      <Link
        className="relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-[rgba(194,220,128,0.65)] bg-white p-4 text-[#202820] no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md min-h-[96px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#668c2e]"
        href="/kelola-toko"
        aria-label="Buka halaman Total Toko"
      >
        <div className="z-[1] flex min-w-0 flex-1 flex-col items-start gap-1">
          <span className="text-[10px] font-bold tracking-wider text-[#596052] uppercase">TOTAL TOKO</span>
          <span className="flex items-baseline gap-1 text-2xl font-bold leading-tight text-[#202820]">251</span>
          <span className="mt-1 block whitespace-nowrap text-xs text-[#477335]">
            ↑ 4 toko baru <small className="ml-1 text-xs text-[#7a806f]">bulan ini</small>
          </span>
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e6f0cc] text-lg text-[#4f681b]">
          <i className="fa-solid fa-store" />
        </div>
      </Link>

      <Link
        className="relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-[rgba(194,220,128,0.65)] bg-white p-4 text-[#202820] no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md min-h-[96px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#668c2e]"
        href="/kelola-promo"
        aria-label="Buka halaman Kelola Promo"
      >
        <div className="z-[1] flex min-w-0 flex-1 flex-col items-start gap-1">
          <span className="text-[10px] font-bold tracking-wider text-[#596052] uppercase">KELOLA PROMO</span>
          <span className="flex items-baseline gap-1.5 text-2xl font-bold leading-tight text-[#202820]">
            10 <small className="text-xs font-normal text-[#545d4d]">Promo Aktif</small>
          </span>
          <span className="mt-1 block whitespace-nowrap text-xs text-[#6c705f]">
            <i className="fa-regular fa-clock mr-1" />2 promo <small className="ml-1 text-xs text-[#7a806f]">berakhir hari ini</small>
          </span>
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#fff0cb] text-lg text-[#f59d00]">
          <i className="fa-solid fa-fire" />
        </div>
      </Link>

      <Link
        className="relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-[rgba(194,220,128,0.65)] bg-white p-4 text-[#202820] no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md min-h-[96px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#668c2e]"
        href="/pengguna"
        aria-label="Buka halaman Total Pengguna"
      >
        <div className="z-[1] flex min-w-0 flex-1 flex-col items-start gap-1">
          <span className="text-[10px] font-bold tracking-wider text-[#596052] uppercase">TOTAL PENGGUNA</span>
          <span className="flex items-baseline gap-1.5 text-2xl font-bold leading-tight text-[#202820]">
            120 <small className="text-xs font-normal text-[#545d4d]">Pengguna</small>
          </span>
          <span className="mt-1 block whitespace-nowrap text-xs text-[#477335]">
            ↑ 88 aktif <small className="ml-1 text-xs text-[#7a806f]">hari ini (73%)</small>
          </span>
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e6f0cc] text-lg text-[#4f681b]">
          <i className="fa-solid fa-users" />
        </div>
      </Link>

      <div className="relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-[rgba(194,220,128,0.65)] bg-white p-4 text-[#202820] shadow-sm min-h-[96px]">
        <div className="z-[1] flex min-w-0 flex-1 flex-col items-start gap-1">
          <span className="text-[10px] font-bold tracking-wider text-[#596052] uppercase">TOTAL TRANSAKSI</span>
          <span className="flex max-w-full items-baseline gap-1 text-2xl font-bold leading-tight text-[#202820] max-[1400px]:text-xl">
            Rp 18.450.000
          </span>
          <span className="mt-1 block whitespace-nowrap text-xs text-[#477335]">
            ↗ 342 pesanan <small className="ml-1 text-xs text-[#7a806f]">+8.4% vs kemarin</small>
          </span>
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#fff0cb] text-lg text-[#f59d00]">
          <i className="fa-solid fa-wallet" />
        </div>
      </div>
    </section>
  );
}

export function CapacityPanel() {
  return (
    <section className="min-w-0 rounded-2xl border border-[rgba(194,220,128,0.65)] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h2 className="m-0 flex items-center gap-2 text-base font-bold text-[#202820]">
          <i className="fa-solid fa-shop text-sm text-[#47704a]" /> Kapasitas Kios &amp; Lapak
        </h2>
        <span className="rounded-full bg-[#d7ef87] px-2.5 py-1 text-xs font-semibold text-[#47651e]">
          86% Terisi
        </span>
      </div>

      <div className="mt-3.5 flex items-baseline gap-1.5 text-sm text-[#40483a]">
        <strong className="text-2xl font-bold leading-none text-[#252d22]">78</strong>
        <span className="font-medium text-[#40483a]">/ 90 kios terisi</span>
        <small className="ml-auto text-xs font-medium text-[#687060]">12 lapak kosong</small>
      </div>

      <div className="mt-2.5 mb-3.5 h-2.5 overflow-hidden rounded-full bg-[#edf0e8]">
        <span className="block h-full w-[86%] rounded-full bg-[#4e7b37]" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1 rounded-xl border border-[#e5edd4] bg-[#f2f7e4] p-3">
          <span className="truncate text-xs text-[#697160]">Zona Kuliner</span>
          <strong className="text-sm font-bold text-[#38442f]">36 / 38 Kios</strong>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border border-[#e5edd4] bg-[#f2f7e4] p-3">
          <span className="truncate text-xs text-[#697160]">Zona Bahan Pokok</span>
          <strong className="text-sm font-bold text-[#38442f]">42 / 52 Kios</strong>
        </div>
      </div>
    </section>
  );
}