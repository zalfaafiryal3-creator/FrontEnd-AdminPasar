export default function JumlahTotal() {
  return (
    <section className="min-w-0 bg-[#e8f3d3] px-4 py-3 text-[#20251f] sm:px-6">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-[#45513d]">
            Admin Panel <span aria-hidden="true">›</span> Kategori Promo
          </p>
          <h1 className="mt-0.5 text-xl font-bold leading-tight sm:text-2xl">
            Kelola Promo Pasar Oro-Oro Dowo
          </h1>
          <p className="mt-1 text-[10px] leading-relaxed text-[#56604f] sm:text-xs">
            Kelola daftar promo, penawaran diskon, dan masa berlaku promo toko pedagang secara real-time.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-lg bg-[#ffbf18] px-3 py-2 text-[10px] font-semibold text-[#342800] shadow-sm transition hover:bg-[#f3b20b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]"
        >
          <i className="fa-solid fa-circle-plus" aria-hidden="true" />
          Tambah Promo Baru
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        <article className="relative min-h-[124px] overflow-hidden rounded-xl bg-white px-4 py-3.5 shadow-sm sm:px-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-wide text-[#424a40]">
                Total Promo Berjalan
              </h2>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="text-4xl font-bold leading-none text-[#20251f]">4</span>
                <span className="text-sm text-[#425a40]">Promo</span>
              </p>
            </div>
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#e8f2d5] text-sm text-[#4b6515]">
              <i className="fa-regular fa-clock" aria-hidden="true" />
            </span>
          </div>
        </article>

        <article className="relative min-h-[124px] overflow-hidden rounded-xl bg-white px-4 py-3.5 shadow-sm sm:px-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-wide text-[#424a40]">
                Promo Segera Berakhir
              </h2>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="text-4xl font-bold leading-none text-[#20251f]">2</span>
                <span className="text-sm text-[#59615a]">Promo</span>
              </p>
            </div>
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#ffe6a6] text-sm text-[#b77900]">
              <i className="fa-solid fa-hourglass-half" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-7 flex items-center justify-between gap-2 text-[9px]">
            <span className="text-[#d12d2d]">
              <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" /> &lt; 48 jam tersisa
            </span>
            <span className="text-[#59615a]">Perlu evaluasi</span>
          </div>
        </article>
      </div>
    </section>
  );
}