import Link from "next/link";

interface Seller {
  name: string;
  handle: string;
  stall: string;
  transactions: string;
  score: string;
  icon: string;
  progressWidth: "!w-[90%]" | "!w-[75%]" | "!w-[85%]";
}

const sellers: Seller[] = [
  { name: "Lumpur Kentang", handle: "@lumpurkentang", stall: "Blok A-04", transactions: "320", score: "90%", icon: "fa-bowl-food", progressWidth: "!w-[90%]" },
  { name: "Klepon-Ku", handle: "@klepon", stall: "Blok B-12", transactions: "248", score: "75%", icon: "fa-cookie-bite", progressWidth: "!w-[75%]" },
  { name: "Bakso Goreng Ayam Bangkit", handle: "@baksogoreng", stall: "Blok C-02", transactions: "290", score: "85%", icon: "fa-drumstick-bite", progressWidth: "!w-[85%]" },
];

export default function Peringkat() {
  return (
    <section className="!min-w-0 !rounded-[9px] !border-0 !bg-white !px-3 !py-[11px] !shadow-[0_2px_6px_rgba(66,87,31,0.06)] min-[1200px]:!p-[15px]">
      <div className="!mb-[9px] !flex !min-w-0 !items-center !gap-2">
        <span className="!grid !h-5 !w-5 !basis-5 !place-items-center !rounded-[6px] !bg-[#e8f2cf] !text-[8px] !text-[#4f681b]"><i className="fa-solid fa-trophy" /></span>
        <div className="!min-w-0">
          <h2 className="!m-0 !text-[9px] !font-bold !leading-[1.3] !text-[#202820]">Peringkat Teratas Penjual</h2>
          <p className="!mt-[2px] !mb-0 !text-[6px] !leading-[1.3] !text-[#6c7569]">Evaluasi performa penjualan dan keaktifan lapak pasar</p>
        </div>
        <label className="!ml-auto !inline-flex !items-center !gap-[5px] !whitespace-nowrap !rounded-[5px] !bg-[#e8f2cf] !px-[7px] !py-1 !text-[6px] !text-[#4b5e2c]">Minggu Ini <i className="fa-solid fa-chevron-down" /></label>
      </div>
      <div className="!mt-0 !grid !gap-[5px]">
        {sellers.map((seller, index) => (
          <article className="!relative !grid !min-h-[52px] !grid-cols-[25px_minmax(0,1fr)] !items-center !gap-[7px] !rounded-[7px] !bg-[#f2f7e4] !px-[7px] !py-[6px] min-[1200px]:!min-h-[60px]" key={seller.name}>
            <span className="!absolute !left-[6px] !top-[5px] !z-[1] !grid !h-[11px] !w-[11px] !place-items-center !rounded-full !bg-[#315d37] !text-[6px] !text-white">{index + 1}</span>
            <span className={`!my-auto !grid !h-[25px] !w-[25px] !place-items-center !self-center !rounded-full !border !border-[rgba(68,87,43,0.15)] !bg-[linear-gradient(145deg,#8aa265,#d1b28b)] !text-[10px] !text-white ${index === 1 ? "!bg-[linear-gradient(145deg,#d8b482,#6f9567)]" : ""} ${index === 2 ? "!bg-[linear-gradient(145deg,#d6a95e,#72947a)]" : ""}`}><i className={`fa-solid ${seller.icon}`} /></span>
            <div className="!my-auto !grid !min-w-0 !gap-[5px]">
              <div className="!flex !items-center !justify-between !gap-2">
                <div className="!grid !min-w-0 !flex-[1_1_auto] !gap-[2px]">
                  <span className="!min-w-0 !overflow-hidden !text-ellipsis !whitespace-nowrap !text-[7px] !font-semibold !leading-[1.25] !text-[#242b22]">{seller.name}</span>
                  <span className="!overflow-hidden !text-ellipsis !whitespace-nowrap !text-[6px] !leading-[1.2] !text-[#73796b]">{seller.handle} • {seller.stall}</span>
                </div>
                <span className="!grid !shrink-0 !justify-items-end !whitespace-nowrap !text-[7px] !leading-[1.15] !text-[#313a2b]">{seller.transactions} <small className="!text-[6px]">transaksi</small></span>
                <span className="!grid !shrink-0 !justify-items-end !whitespace-nowrap !text-[6px] !leading-[1.15] !text-[#313a2b]">Skor Kinerja <strong className="!text-[8px] !text-[#385d28]">{seller.score}</strong></span>
              </div>
              <div className="!h-1 !w-full !overflow-hidden !rounded-full !bg-[#e5e9dc]">
                <div className={`!h-full !rounded-[inherit] !bg-[#ffbd1b] ${seller.progressWidth}`} />
              </div>
            </div>
          </article>
        ))}
      </div>
      <Link className="!mt-2 !flex !min-h-5 !items-center !justify-center !gap-[5px] !rounded-[5px] !bg-[#ffb916] !text-[7px] !font-semibold !text-white !no-underline hover:!bg-[#f0a900] focus-visible:!outline-2 focus-visible:!outline-solid focus-visible:!outline-offset-2 focus-visible:!outline-[#668c2e]" href="/penjual">Lihat Semua Penjual <i className="fa-solid fa-arrow-right" /></Link>
    </section>
  );
}