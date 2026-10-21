import Link from "next/link";

export function StatCards() {
  return (
    <section className="!mt-0 !mb-[14px] !grid !grid-cols-4 !gap-[10px] max-[760px]:!grid-cols-2" aria-label="Ringkasan pasar">
      <Link className="!relative !flex !items-start !justify-between !gap-[6px] !overflow-hidden !rounded-[9px] !border-0 !bg-white !px-[10px] !pt-[11px] !pb-2 !text-[#202820] !no-underline !shadow-[0_2px_5px_rgba(66,87,31,0.07)] !transition-[transform,box-shadow] !duration-[160ms] !ease-[ease] !min-h-[88px] hover:!-translate-y-0.5 hover:!shadow-[0_5px_12px_rgba(66,87,31,0.12)] focus-visible:!outline-2 focus-visible:!outline-solid focus-visible:!outline-offset-[3px] focus-visible:!outline-[#668c2e] min-[1200px]:!min-h-[104px] min-[1200px]:!p-[14px] max-[980px]:!pr-[7px] max-[980px]:!pl-2 max-[430px]:!min-h-[78px]" href="/kelola-toko" aria-label="Buka halaman Total Toko">
        <div className="!z-[1] !flex !min-w-0 !flex-1 !flex-col !items-start !gap-[3px]">
          <span className="!text-[7px] !font-semibold !leading-[1.3] !tracking-[0.01em] !text-[#596052]">TOTAL TOKO</span>
          <span className="!flex !items-baseline !gap-1 !text-[17px] !font-bold !leading-[1.15] !text-[#202820]">251</span>
          <span className="!mt-auto !block !whitespace-nowrap !text-[6px] !leading-[1.3] !text-[#477335]">↑ &nbsp;4 toko baru <small className="!ml-[3px] !text-[6px] !text-[#7a806f]">bulan ini</small></span>
        </div>
        <div className="!absolute !right-[9px] !top-[10px] !grid !h-6 !w-6 !basis-6 !place-items-center !rounded-[7px] !bg-[#e6f0cc] !text-[10px] !text-[#4f681b]"><i className="fa-solid fa-store" /></div>
      </Link>
      <Link className="!relative !flex !items-start !justify-between !gap-[6px] !overflow-hidden !rounded-[9px] !border-0 !bg-white !px-[10px] !pt-[11px] !pb-2 !text-[#202820] !no-underline !shadow-[0_2px_5px_rgba(66,87,31,0.07)] !transition-[transform,box-shadow] !duration-[160ms] !ease-[ease] !min-h-[88px] hover:!-translate-y-0.5 hover:!shadow-[0_5px_12px_rgba(66,87,31,0.12)] focus-visible:!outline-2 focus-visible:!outline-solid focus-visible:!outline-offset-[3px] focus-visible:!outline-[#668c2e] min-[1200px]:!min-h-[104px] min-[1200px]:!p-[14px] max-[980px]:!pr-[7px] max-[980px]:!pl-2 max-[430px]:!min-h-[78px]" href="/kelola-promo" aria-label="Buka halaman Kelola Promo">
        <div className="!z-[1] !flex !min-w-0 !flex-1 !flex-col !items-start !gap-[3px]">
          <span className="!text-[7px] !font-semibold !leading-[1.3] !tracking-[0.01em] !text-[#596052]">KELOLA PROMO</span>
          <span className="!flex !items-baseline !gap-1 !text-[17px] !font-bold !leading-[1.15] !text-[#202820]">10 <small className="!text-[7px] !font-medium !text-[#545d4d]">Promo Aktif</small></span>
          <span className="!mt-auto !block !whitespace-nowrap !text-[6px] !leading-[1.3] !text-[#6c705f]"><i className="fa-regular fa-clock" /> &nbsp;2 promo <small className="!ml-[3px] !text-[6px] !text-[#7a806f]">berakhir hari ini</small></span>
        </div>
        <div className="!absolute !right-[9px] !top-[10px] !grid !h-6 !w-6 !basis-6 !place-items-center !rounded-[7px] !bg-[#fff0cb] !text-[10px] !text-[#f59d00]"><i className="fa-solid fa-fire" /></div>
      </Link>
      <Link className="!relative !flex !items-start !justify-between !gap-[6px] !overflow-hidden !rounded-[9px] !border-0 !bg-white !px-[10px] !pt-[11px] !pb-2 !text-[#202820] !no-underline !shadow-[0_2px_5px_rgba(66,87,31,0.07)] !transition-[transform,box-shadow] !duration-[160ms] !ease-[ease] !min-h-[88px] hover:!-translate-y-0.5 hover:!shadow-[0_5px_12px_rgba(66,87,31,0.12)] focus-visible:!outline-2 focus-visible:!outline-solid focus-visible:!outline-offset-[3px] focus-visible:!outline-[#668c2e] min-[1200px]:!min-h-[104px] min-[1200px]:!p-[14px] max-[980px]:!pr-[7px] max-[980px]:!pl-2 max-[430px]:!min-h-[78px]" href="/pengguna" aria-label="Buka halaman Total Pengguna">
        <div className="!z-[1] !flex !min-w-0 !flex-1 !flex-col !items-start !gap-[3px]">
          <span className="!text-[7px] !font-semibold !leading-[1.3] !tracking-[0.01em] !text-[#596052]">TOTAL PENGGUNA</span>
          <span className="!flex !items-baseline !gap-1 !text-[17px] !font-bold !leading-[1.15] !text-[#202820]">120 <small className="!text-[7px] !font-medium !text-[#545d4d]">Pengguna</small></span>
          <span className="!mt-auto !block !whitespace-nowrap !text-[6px] !leading-[1.3] !text-[#477335]">↑ &nbsp;88 aktif <small className="!ml-[3px] !text-[6px] !text-[#7a806f]">hari ini (73%)</small></span>
        </div>
        <div className="!absolute !right-[9px] !top-[10px] !grid !h-6 !w-6 !basis-6 !place-items-center !rounded-[7px] !bg-[#e6f0cc] !text-[10px] !text-[#4f681b]"><i className="fa-solid fa-users" /></div>
      </Link>
      <div className="!relative !flex !items-start !justify-between !gap-[6px] !overflow-hidden !rounded-[9px] !border-0 !bg-white !px-[10px] !pt-[11px] !pb-2 !text-[#202820] !min-h-[88px] min-[1200px]:!min-h-[104px] min-[1200px]:!p-[14px] max-[980px]:!pr-[7px] max-[980px]:!pl-2 max-[430px]:!min-h-[78px]">
        <div className="!z-[1] !flex !min-w-0 !flex-1 !flex-col !items-start !gap-[3px]">
          <span className="!text-[7px] !font-semibold !leading-[1.3] !tracking-[0.01em] !text-[#596052]">TOTAL TRANSAKSI</span>
          <span className="!flex !max-w-full !items-baseline !gap-1 !wrap-anywhere !text-[clamp(11px,1.5vw,15px)] !font-bold !leading-[1.15] !text-[#202820]">Rp 18.450.000</span>
          <span className="!mt-auto !block !whitespace-nowrap !text-[6px] !leading-[1.3] !text-[#477335]">↗ &nbsp;342 pesanan <small className="!ml-[3px] !text-[6px] !text-[#7a806f]">+8.4% vs kemarin</small></span>
        </div>
        <div className="!absolute !right-[9px] !top-[10px] !grid !h-6 !w-6 !basis-6 !place-items-center !rounded-[7px] !bg-[#fff0cb] !text-[10px] !text-[#f59d00]"><i className="fa-solid fa-wallet" /></div>
      </div>
    </section>
  );
}

export function CapacityPanel() {
  return (
    <section className="!min-w-0 !rounded-[9px] !border-0 !bg-white !p-3 !shadow-[0_2px_6px_rgba(66,87,31,0.06)] min-[1200px]:!p-[15px]">
      <div className="!flex !items-center !justify-between !gap-[5px] !text-[8px] !font-bold !text-[#30392c]">
        <span className="!flex !items-center !gap-[5px]"><i className="fa-solid fa-shop !text-[#47704a]" /> Kapasitas Kios &amp; Lapak</span>
        <span className="!rounded-full !bg-[#d7ef87] !px-[7px] !py-1 !text-[6px] !font-semibold !text-[#47651e]">86% Terisi</span>
      </div>
      <div className="!mt-[9px] !flex !items-baseline !gap-1 !text-[7px] !text-[#40483a]">
        <strong className="!text-[18px] !leading-none !text-[#252d22]">78</strong>
        <span>/ 90 kios terisi</span>
        <small className="!ml-auto !text-[6px] !text-[#687060]">12 lapak kosong</small>
      </div>
      <div className="!mt-2 !mb-[10px] !h-[6px] !overflow-hidden !rounded-full !bg-[#edf0e8]">
        <span className="!block !h-full !w-[86%] !rounded-[inherit] !bg-[#4e7b37]" />
      </div>
      <div className="!grid !grid-cols-2 !gap-[6px]">
        <div className="!grid !min-w-0 !gap-[3px] !rounded-[5px] !bg-[#f2f7e4] !p-[6px]"><span className="!overflow-hidden !text-ellipsis !whitespace-nowrap !text-[6px] !text-[#697160]">Zona Kuliner</span><strong className="!text-[7px] !text-[#38442f]">36 / 38 Kios</strong></div>
        <div className="!grid !min-w-0 !gap-[3px] !rounded-[5px] !bg-[#f2f7e4] !p-[6px]"><span className="!overflow-hidden !text-ellipsis !whitespace-nowrap !text-[6px] !text-[#697160]">Zona Bahan Pokok</span><strong className="!text-[7px] !text-[#38442f]">42 / 52 Kios</strong></div>
      </div>
    </section>
  );
}