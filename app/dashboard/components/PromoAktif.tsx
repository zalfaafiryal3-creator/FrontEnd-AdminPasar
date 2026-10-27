import Link from "next/link";

export default function PromoAktif() {
  return (
    <section className="min-w-0 rounded-2xl border border-[rgba(194,220,128,0.65)] bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#fff0c9] text-sm text-[#bd7a00]">
            <i className="fa-solid fa-tags" />
          </span>
          <div className="min-w-0">
            <h2 className="m-0 text-base font-bold leading-tight text-[#202820]">Promo Terbaru &amp; Aktif</h2>
            <p className="mt-0.5 mb-0 text-xs leading-normal text-[#6c7569]">Insentif belanja aktif pedagang Pasar Oro-Oro Dowo</p>
          </div>
        </div>
        <Link
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#ffb916] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#f0a900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#668c2e]"
          href="/kelola-promo"
        >
          <i className="fa-solid fa-plus text-[11px]" /> Buat Promo Baru
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <article className="flex min-h-[120px] flex-col justify-between rounded-xl border border-[#e5edd4] bg-[#f7faef] p-4 transition-colors hover:bg-[#edf5d7]">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-[#dcedb8] px-2.5 py-1 text-xs font-semibold text-[#45612e]">Aktif</span>
            <i className="fa-solid fa-percent text-xs text-[#6b7a55]" />
          </div>
          <div className="mt-2.5">
            <h3 className="m-0 text-sm font-bold leading-snug text-[#273025]">Lumpur Kentang</h3>
            <p className="mt-1 mb-0 text-xs leading-normal text-[#687060]">Diskon 10% Min. Pembelian 10K</p>
          </div>
          <span className="mt-3 flex items-center gap-1.5 text-xs text-[#4b5545]">
            <i className="fa-regular fa-calendar text-[11px]" /> 19 - 22 Sep 2024
          </span>
        </article>

        <article className="flex min-h-[120px] flex-col justify-between rounded-xl border border-[#e5edd4] bg-[#f7faef] p-4 transition-colors hover:bg-[#edf5d7]">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-[#dcedb8] px-2.5 py-1 text-xs font-semibold text-[#45612e]">Aktif</span>
            <i className="fa-solid fa-tag text-xs text-[#6b7a55]" />
          </div>
          <div className="mt-2.5">
            <h3 className="m-0 text-sm font-bold leading-snug text-[#273025]">Bakso Goreng Ayam Bangkit</h3>
            <p className="mt-1 mb-0 text-xs leading-normal text-[#687060]">Diskon 15% Min. Pembelian 25K</p>
          </div>
          <span className="mt-3 flex items-center gap-1.5 text-xs text-[#4b5545]">
            <i className="fa-regular fa-calendar text-[11px]" /> 19 - 25 Sep 2024
          </span>
        </article>

        <article className="flex min-h-[120px] flex-col justify-between rounded-xl border border-[#e5edd4] bg-[#f7faef] p-4 transition-colors hover:bg-[#edf5d7]">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-[#fff0c9] px-2.5 py-1 text-xs font-semibold text-[#9c7100]">Segera Berakhir</span>
            <i className="fa-solid fa-hourglass-half text-xs text-[#e64539]" />
          </div>
          <div className="mt-2.5">
            <h3 className="m-0 text-sm font-bold leading-snug text-[#273025]">Kue Tradisional Bu Sri</h3>
            <p className="mt-1 mb-0 text-xs leading-normal text-[#687060]">Potongan Ongkir Rp 5.000</p>
          </div>
          <span className="mt-3 flex items-center gap-1.5 text-xs text-[#4b5545]">
            <i className="fa-regular fa-calendar text-[11px]" /> 20 - 24 Sep 2024
          </span>
        </article>
      </div>
    </section>
  );
}