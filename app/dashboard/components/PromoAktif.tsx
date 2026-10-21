import Link from "next/link";

export default function PromoAktif() {
  return (
    <section className="!min-w-0 !rounded-[9px] !border-0 !bg-white !px-3 !py-[11px] !shadow-[0_2px_6px_rgba(66,87,31,0.06)] min-[1200px]:!p-[15px]">
      <div className="!mb-2 !flex !min-w-0 !items-center !gap-2">
        <span className="!grid !h-5 !w-5 !basis-5 !place-items-center !rounded-[6px] !bg-[#fff0c9] !text-[8px] !text-[#bd7a00]"><i className="fa-solid fa-tags" /></span>
        <div className="!min-w-0">
          <h2 className="!m-0 !text-[9px] !font-bold !leading-[1.3] !text-[#202820]">Promo Terbaru &amp; Aktif</h2>
          <p className="!mt-[2px] !mb-0 !text-[6px] !leading-[1.3] !text-[#6c7569]">Insentif belanja aktif pedagang Pasar Oro-Oro Dowo</p>
        </div>
        <Link className="!ml-auto !inline-flex !shrink-0 !items-center !gap-1 !whitespace-nowrap !rounded-[6px] !bg-[#ffb916] !px-2 !py-[6px] !text-[6px] !font-semibold !text-white !no-underline hover:!bg-[#f0a900] focus-visible:!outline-2 focus-visible:!outline-solid focus-visible:!outline-offset-2 focus-visible:!outline-[#668c2e]" href="/kelola-promo"><i className="fa-solid fa-plus" /> Buat Promo Baru</Link>
      </div>
      <div className="!grid !grid-cols-3 !gap-[7px] max-[390px]:!grid-cols-1">
        <article className="!flex !min-h-[89px] !min-w-0 !flex-col !rounded-[7px] !bg-[#f2f7e4] !p-[7px] max-[390px]:!min-h-[76px]">
          <div className="!flex !items-center !justify-between !gap-[3px] !text-[7px] !text-[#6b7a55]"><span className="!rounded-full !bg-[#dcedb8] !px-[5px] !py-[2px] !text-[6px] !leading-[1.2] !text-[#45612e]">Aktif</span><i className="fa-solid fa-percent !shrink-0" /></div>
          <h3 className="!mt-[7px] !mb-[2px] !text-[7px] !font-bold !leading-[1.35] !text-[#273025]">Lumpur Kentang</h3>
          <p className="!mb-[5px] !mt-0 !text-[6px] !leading-[1.3] !text-[#687060]">Diskon 10% Min. Pembelian 10K</p>
          <span className="!mt-auto !flex !items-center !gap-1 !whitespace-nowrap !text-[6px] !text-[#4b5545]"><i className="fa-regular fa-calendar" /> 19 - 22 Sep 2024</span>
        </article>
        <article className="!flex !min-h-[89px] !min-w-0 !flex-col !rounded-[7px] !bg-[#f2f7e4] !p-[7px] max-[390px]:!min-h-[76px]">
          <div className="!flex !items-center !justify-between !gap-[3px] !text-[7px] !text-[#6b7a55]"><span className="!rounded-full !bg-[#dcedb8] !px-[5px] !py-[2px] !text-[6px] !leading-[1.2] !text-[#45612e]">Aktif</span><i className="fa-solid fa-tag !shrink-0" /></div>
          <h3 className="!mt-[7px] !mb-[2px] !text-[7px] !font-bold !leading-[1.35] !text-[#273025]">Bakso Goreng Ayam Bangkit</h3>
          <p className="!mb-[5px] !mt-0 !text-[6px] !leading-[1.3] !text-[#687060]">Diskon 15% Min. Pembelian 25K</p>
          <span className="!mt-auto !flex !items-center !gap-1 !whitespace-nowrap !text-[6px] !text-[#4b5545]"><i className="fa-regular fa-calendar" /> 19 - 25 Sep 2024</span>
        </article>
        <article className="!flex !min-h-[89px] !min-w-0 !flex-col !rounded-[7px] !bg-[#f2f7e4] !p-[7px] max-[390px]:!min-h-[76px]">
          <div className="!flex !items-center !justify-between !gap-[3px] !text-[7px] !text-[#6b7a55]"><span className="!rounded-full !bg-[#fff0c9] !px-[5px] !py-[2px] !text-[6px] !leading-[1.2] !text-[#9c7100]">Segera Berakhir</span><i className="fa-solid fa-hourglass-half !shrink-0 !text-[#e64539]" /></div>
          <h3 className="!mt-[7px] !mb-[2px] !text-[7px] !font-bold !leading-[1.35] !text-[#273025]">Kue Tradisional Bu Sri</h3>
          <p className="!mb-[5px] !mt-0 !text-[6px] !leading-[1.3] !text-[#687060]">Potongan Ongkir Rp 5.000</p>
          <span className="!mt-auto !flex !items-center !gap-1 !whitespace-nowrap !text-[6px] !text-[#4b5545]"><i className="fa-regular fa-calendar" /> 20 - 24 Sep 2024</span>
        </article>
      </div>
    </section>
  );
}