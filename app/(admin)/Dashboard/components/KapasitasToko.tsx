export default function KapasitasKios() {
  return (
    <section className="rounded-xl border border-[#e9e3e4] bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0ebec] pb-3">
        <h2 className="flex items-center gap-2 text-sm font-bold text-[#594045]">
          <i className="fa-solid fa-shop text-[#4b6515]" aria-hidden="true" /> Kapasitas Kios &amp; Lapak
        </h2>
        <span className="rounded-full bg-[#eef4de] px-3 py-1 text-xs font-bold text-[#4b6515]">86% Terisi</span>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 py-4">
        <strong className="text-3xl font-bold leading-none text-[#594045]">78</strong>
        <span className="text-sm text-[#74666a]">/ 90 kios terisi</span>
        <small className="ml-auto text-xs text-[#74666a]">12 lapak kosong</small>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#edf0e6]" role="progressbar" aria-label="Kapasitas kios terisi" aria-valuenow={86} aria-valuemin={0} aria-valuemax={100}>
        <span className="block h-full w-[86%] rounded-full bg-[#7a9b32]" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="flex justify-between gap-2 text-xs">
          <span className="text-[#74666a]">Zona Kuliner</span>
          <strong className="text-[#594045]">36 / 38 Kios</strong>
        </div>
        <div className="flex justify-between gap-2 text-xs">
          <span className="text-[#74666a]">Zona Bahan Pokok</span>
          <strong className="text-[#594045]">42 / 52 Kios</strong>
        </div>
      </div>
    </section>
  );
}