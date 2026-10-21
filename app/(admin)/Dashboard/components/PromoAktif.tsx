import Link from "next/link";

export default function PromoAktif() {
  return (
    <section className="rounded-xl border border-[#e9e3e4] bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#fff1cf] text-[#a66a00]"><i className="fa-solid fa-tags" aria-hidden="true" /></span>
        <div>
          <h2 className="text-base font-bold text-[#594045]">Promo Terbaru &amp; Aktif</h2>
          <p className="mt-0.5 text-xs text-[#74666a]">Insentif belanja aktif pedagang Pasar Oro-Oro Dowo</p>
        </div>
        <Link className="ml-auto inline-flex min-h-9 items-center gap-2 rounded-lg bg-[#4b6515] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#3d5410] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]" href="/kelola-promo"><i className="fa-solid fa-plus" aria-hidden="true" /> Buat Promo Baru</Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-lg border border-[#e9e3e4] bg-[#fffdf8] p-4">
          <div className="mb-3 flex items-center justify-between"><span className="rounded-full bg-[#eef4de] px-2.5 py-1 text-[10px] font-bold text-[#4b6515]">Aktif</span><i className="fa-solid fa-percent text-[#a66a00]" aria-hidden="true" /></div>
          <h3 className="text-sm font-bold text-[#594045]">Lumpur Kentang</h3>
          <p className="mt-1 text-xs text-[#74666a]">Diskon 10% Min. Pembelian 10K</p>
          <span className="mt-3 flex items-center gap-1.5 text-[11px] text-[#74666a]"><i className="fa-regular fa-calendar" aria-hidden="true" /> 19 - 22 Sep 2024</span>
        </article>
        <article className="rounded-lg border border-[#e9e3e4] bg-[#fffdf8] p-4">
          <div className="mb-3 flex items-center justify-between"><span className="rounded-full bg-[#eef4de] px-2.5 py-1 text-[10px] font-bold text-[#4b6515]">Aktif</span><i className="fa-solid fa-tag text-[#a66a00]" aria-hidden="true" /></div>
          <h3 className="text-sm font-bold text-[#594045]">Bakso Goreng Ayam Bangkit</h3>
          <p className="mt-1 text-xs text-[#74666a]">Diskon 15% Min. Pembelian 25K</p>
          <span className="mt-3 flex items-center gap-1.5 text-[11px] text-[#74666a]"><i className="fa-regular fa-calendar" aria-hidden="true" /> 19 - 25 Sep 2024</span>
        </article>
        <article className="rounded-lg border border-[#f0d9a6] bg-[#fffaf0] p-4 sm:col-span-2 xl:col-span-1">
          <div className="mb-3 flex items-center justify-between"><span className="rounded-full bg-[#fff1cf] px-2.5 py-1 text-[10px] font-bold text-[#9a6700]">Segera Berakhir</span><i className="fa-solid fa-hourglass-half text-[#a66a00]" aria-hidden="true" /></div>
          <h3 className="text-sm font-bold text-[#594045]">Kue Tradisional Bu Sri</h3>
          <p className="mt-1 text-xs text-[#74666a]">Potongan Ongkir Rp 5.000</p>
          <span className="mt-3 flex items-center gap-1.5 text-[11px] text-[#74666a]"><i className="fa-regular fa-calendar" aria-hidden="true" /> 20 - 24 Sep 2024</span>
        </article>
      </div>
    </section>
  );
}