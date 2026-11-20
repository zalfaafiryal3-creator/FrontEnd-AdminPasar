"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getManagedPromotions } from "../../../../lib/promotion-api";
import { isActivePromoStatus, type AdminPromoRecord } from "../../../../lib/admin-records";

export default function PromoAktif() {
  const [promos, setPromos] = useState<AdminPromoRecord[]>([]);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    let active = true;
    getManagedPromotions()
      .then((items) => {
        if (!active) return;
        setPromos(items.map((promo) => ({
          id: String(promo.id),
          store: promo.store,
          owner: promo.owner,
          category: promo.category,
          discount: promo.title,
          period: `${promo.periodDisplay} • ${promo.operatingHours}`,
          requirements: promo.terms,
          quota: promo.quota,
          status: promo.status,
          bannerImage: promo.bannerImage ?? undefined,
        })));
        setDataError("");
      })
      .catch((error: unknown) => {
        if (active) {
          setDataError(error instanceof Error ? error.message : "Daftar promo gagal dimuat.");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const activePromos = promos
    .filter((promo) => isActivePromoStatus(promo.status))
    .slice()
    .slice(0, 3);

  return (
    <section className="min-w-0 rounded-2xl border border-[rgba(194,220,128,0.65)] bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#fff0c9] text-sm text-[#bd7a00]">
            <i className="fa-solid fa-tags" />
          </span>
          <div className="min-w-0">
            <h2 className="m-0 text-base font-bold leading-tight text-[#202820]">Promo Terbaru &amp; Aktif</h2>
            <p className="mt-0.5 mb-0 text-xs leading-normal text-[#6c7569]">Promo berjalan dari halaman Kelola Promo</p>
          </div>
        </div>
        <Link
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#ffb916] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#f0a900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#668c2e]"
          href="/kelola-promo"
        >
          <i className="fa-solid fa-plus text-[11px]" /> Kelola Promo
        </Link>
      </div>

      {dataError && <p className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-800" role="alert">{dataError}</p>}
      <div className="mt-4 grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {activePromos.map((promo: AdminPromoRecord) => (
          <article className="flex min-h-[120px] flex-col justify-between rounded-xl border border-[#e5edd4] bg-[#f7faef] p-4 transition-colors hover:bg-[#edf5d7]" key={promo.id}>
            <div className="flex items-center justify-between gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${promo.status === "Hampir Habis" ? "bg-[#fff0c9] text-[#9c7100]" : "bg-[#dcedb8] text-[#45612e]"}`}>{promo.status}</span>
              <i className={`fa-solid ${promo.status === "Hampir Habis" ? "fa-hourglass-half text-[#e64539]" : "fa-tag text-[#6b7a55]"} text-xs`} />
            </div>
            <div className="mt-2.5">
              <h3 className="m-0 text-sm font-bold leading-snug text-[#273025]">{promo.store}</h3>
              <p className="mt-1 mb-0 text-xs leading-normal text-[#687060]">{promo.discount}{promo.requirements ? ` • ${promo.requirements}` : ""}</p>
            </div>
            <span className="mt-3 flex items-center gap-1.5 text-xs text-[#4b5545]">
              <i className="fa-regular fa-calendar text-[11px]" /> {promo.period}
            </span>
          </article>
        ))}
        {!activePromos.length && !dataError && <p className="rounded-lg bg-[#f7faef] p-4 text-center text-xs text-[#62695b] md:col-span-3">Tidak ada promo yang sedang berlangsung.</p>}
      </div>
    </section>
  );
}
