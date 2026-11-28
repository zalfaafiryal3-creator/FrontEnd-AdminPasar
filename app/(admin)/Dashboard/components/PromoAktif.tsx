"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getManagedPromotions } from "../../../../lib/promotion-api";
import {
  initialPromoRecords,
  isActivePromoStatus,
  readAdminRecords,
  type AdminPromoRecord,
} from "../../../../lib/admin-records";

export default function PromoAktif() {
  const [promos, setPromos] = useState<AdminPromoRecord[]>([]);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    let active = true;
    getManagedPromotions()
      .then((items) => {
        if (!active) return;
        if (items.length > 0) {
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
        } else {
          try {
            const localPromos = readAdminRecords("pasar-admin-promos", initialPromoRecords, "pasar-admin-deleted-promos");
            setPromos(localPromos);
          } catch {}
        }
        setDataError("");
      })
      .catch((error: unknown) => {
        if (active) {
          try {
            const localPromos = readAdminRecords("pasar-admin-promos", initialPromoRecords, "pasar-admin-deleted-promos");
            setPromos(localPromos);
          } catch {
            setDataError(error instanceof Error ? error.message : "Daftar promo gagal dimuat.");
          }
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
    <section className="min-w-0 rounded-xl bg-white p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#FBBF24]/50 text-sm text-[#F59E0B]">
            <i className="fa-solid fa-tags" />
          </span>
          <div className="min-w-0">
            <h2 className="m-0 text-sm font-semibold leading-tight text-[#181D1A]">Promo Terbaru &amp; Aktif</h2>
            <p className="mt-0.5 mb-0 text-xs leading-normal text-[#414941]">Promo berjalan dari halaman Kelola Promo</p>
          </div>
        </div>
        <Link
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#FBBF24] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#f59e0b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B6515]"
          href="/kelola-promo"
        >
          <i className="fa-solid fa-plus text-[11px]" /> Kelola Promo
        </Link>
      </div>

      {dataError && <p className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-800" role="alert">{dataError}</p>}
      <div className="mt-4 grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {activePromos.map((promo: AdminPromoRecord) => (
          <article className="flex min-h-[120px] flex-col justify-between rounded-xl bg-[#C2DC80]/20 p-4 transition-colors hover:bg-[#C2DC80]/30" key={promo.id}>
            <div className="flex items-center justify-between gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${promo.status === "Hampir Habis" ? "bg-[#FBBF24]/30 text-[#494438]" : "bg-[#C2DC80]/50 text-[#22502D]"}`}>{promo.status}</span>
              <i className={`fa-solid ${promo.status === "Hampir Habis" ? "fa-hourglass-half text-[#BA1A1A]" : "fa-tag text-[#727970]"} text-xs`} />
            </div>
            <div className="mt-2.5">
              <h3 className="m-0 text-sm font-semibold leading-snug text-[#181D1A]">{promo.store}</h3>
              <p className="mt-1 mb-0 text-xs leading-normal text-[#414941]">{promo.discount}{promo.requirements ? ` • ${promo.requirements}` : ""}</p>
            </div>
            <span className="mt-3 flex items-center gap-1.5 pt-2 text-[11px] font-semibold text-[#414941]">
              <i className="fa-regular fa-calendar text-[11px]" /> {promo.period}
            </span>
          </article>
        ))}
        {!activePromos.length && !dataError && <p className="rounded-lg bg-[#C2DC80]/20 p-4 text-center text-xs text-[#414941] md:col-span-3">Tidak ada promo yang sedang berlangsung.</p>}
      </div>
    </section>
  );
}
