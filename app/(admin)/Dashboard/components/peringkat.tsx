import Link from "next/link";

interface Seller {
  name: string;
  handle: string;
  stall: string;
  transactions: string;
  score: string;
  icon: string;
  progressWidth: "w-[90%]" | "w-[75%]" | "w-[85%]";
}

const sellers: Seller[] = [
  { name: "Lumpur Kentang", handle: "@lumpurkentang", stall: "Blok A-04", transactions: "320", score: "90%", icon: "fa-bowl-food", progressWidth: "w-[90%]" },
  { name: "Klepon-Ku", handle: "@klepon", stall: "Blok B-12", transactions: "248", score: "75%", icon: "fa-cookie-bite", progressWidth: "w-[75%]" },
  { name: "Bakso Goreng Ayam Bangkit", handle: "@baksogoreng", stall: "Blok C-02", transactions: "290", score: "85%", icon: "fa-drumstick-bite", progressWidth: "w-[85%]" },
];

export default function Peringkat() {
  return (
    <section className="min-w-0 rounded-2xl border border-[rgba(194,220,128,0.65)] bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#e8f2cf] text-sm text-[#4f681b]">
            <i className="fa-solid fa-trophy" />
          </span>
          <div className="min-w-0">
            <h2 className="m-0 text-base font-bold leading-tight text-[#202820]">Peringkat Teratas Penjual</h2>
            <p className="mt-0.5 mb-0 text-xs leading-normal text-[#6c7569]">Evaluasi performa penjualan dan keaktifan lapak pasar</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#e8f2cf] px-3 py-1.5 text-xs font-semibold text-[#4b5e2c]">
          Minggu Ini <i className="fa-solid fa-chevron-down text-[10px]" />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {sellers.map((seller, index) => (
          <article
            className="relative flex items-center gap-3.5 rounded-xl border border-[#e5edd4] bg-[#f7faef] p-3.5 transition-colors hover:bg-[#edf5d7]"
            key={seller.name}
          >
            <span className="absolute -top-1.5 -left-1.5 grid h-5 w-5 place-items-center rounded-full bg-[#315d37] text-[11px] font-bold text-white shadow-sm">
              {index + 1}
            </span>
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[rgba(68,87,43,0.15)] bg-[linear-gradient(145deg,#8aa265,#d1b28b)] text-base text-white ${
                index === 1 ? "bg-[linear-gradient(145deg,#d8b482,#6f9567)]" : ""
              } ${index === 2 ? "bg-[linear-gradient(145deg,#d6a95e,#72947a)]" : ""}`}
            >
              <i className={`fa-solid ${seller.icon}`} />
            </span>

            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <strong className="block truncate text-sm font-semibold leading-snug text-[#242b22]">{seller.name}</strong>
                  <span className="block truncate text-xs text-[#73796b]">{seller.handle} • {seller.stall}</span>
                </div>
                <div className="flex shrink-0 items-center gap-3.5 text-right">
                  <span className="text-xs font-medium text-[#313a2b]">
                    {seller.transactions} <small className="text-xs text-[#73796b]">transaksi</small>
                  </span>
                  <span className="text-xs text-[#313a2b]">
                    Skor <strong className="text-sm font-bold text-[#385d28]">{seller.score}</strong>
                  </span>
                </div>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-[#e5e9dc]">
                <div className={`h-full rounded-full bg-[#ffbd1b] ${seller.progressWidth}`} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <Link
        className="mt-4 flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#ffb916] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#f0a900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#668c2e]"
        href="/penjual"
      >
        Lihat Semua Penjual <i className="fa-solid fa-arrow-right" />
      </Link>
    </section>
  );
}