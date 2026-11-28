"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getUsers } from "../../../../lib/admin-api";
import { getManagedStores } from "../../../../lib/store-api";
import { getManagedPromotions } from "../../../../lib/promotion-api";
import {
  initialUserRecords,
  isActivePromoStatus,
} from "../../../../lib/admin-records";

function readStoreCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const cached = localStorage.getItem("pasar-admin-stores-cache");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed.length;
    }
  } catch {}
  return 0;
}

export function StatCards() {
  const [storeCount, setStoreCount] = useState<number>(() => readStoreCount());
  const [promoStats, setPromoStats] = useState({ total: 0, active: 0 });
  const [userCount, setUserCount] = useState<number>(initialUserRecords.length);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    getManagedStores()
      .then((stores) => {
        if (Array.isArray(stores)) {
          setStoreCount(stores.length);
        }
      })
      .catch(() => {
        setStoreCount(readStoreCount());
      });

    getManagedPromotions()
      .then((promotions) => {
        setPromoStats({
          total: promotions.length,
          active: promotions.filter((promo) => isActivePromoStatus(promo.status)).length,
        });
      })
      .catch((error: unknown) => {
        setDataError(error instanceof Error ? error.message : "Ringkasan promo gagal dimuat.");
      });

    getUsers()
      .then((users) => {
        if (Array.isArray(users)) {
          setUserCount(users.length);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
    {dataError && <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800" role="alert">{dataError}</p>}
    <section className="mb-5 grid grid-cols-3 gap-4 max-[1100px]:grid-cols-2 max-[640px]:grid-cols-1" aria-label="Ringkasan pasar">
      {/* 1. TOTAL TOKO */}
      <Link
        className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-white p-4 text-[#181D1A] no-underline shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B6515]"
        href="/kelola-toko"
        aria-label="Buka halaman Kelola Toko"
      >
        <div className="z-[1] flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[10px] font-semibold tracking-[0.55px] text-[#414941] uppercase">TOTAL TOKO</span>
            <span className="text-2xl font-bold leading-tight text-[#181D1A]">{storeCount}</span>
          </div>
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#C2DC80]/40 text-base text-[#4B6515]">
            <i className="fa-solid fa-store" />
          </div>
        </div>
        <div className="z-[1] mt-4 flex items-center justify-between gap-2 pt-2 text-[11px]">
          <span className="font-semibold text-[#204E2B]">
            <i className="fa-solid fa-arrow-up mr-1 text-[10px]" />
            {storeCount} toko terdaftar
          </span>
          <span className="text-[#414941]">di Kelola Toko</span>
        </div>
        <span aria-hidden="true" className="pointer-events-none absolute -right-4 -bottom-4 h-14 w-14 rounded-full bg-[#C2DC80]/50 blur-lg" />
      </Link>

      {/* 2. KELOLA PROMO */}
      <Link
        className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-white p-4 text-[#181D1A] no-underline shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B6515]"
        href="/kelola-promo"
        aria-label="Buka halaman Kelola Promo"
      >
        <div className="z-[1] flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[10px] font-semibold tracking-[0.55px] text-[#414941] uppercase">KELOLA PROMO</span>
            <span className="flex items-baseline gap-1.5 text-2xl font-bold leading-tight text-[#181D1A]">
              {promoStats.total} <small className="text-xs font-semibold text-[#414941]">Promo</small>
            </span>
          </div>
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FBBF24]/40 text-base text-[#F59E0B]">
            <i className="fa-solid fa-fire" />
          </div>
        </div>
        <div className="z-[1] mt-4 flex items-center justify-between gap-2 pt-2 text-[11px]">
          <span className="font-semibold text-[#494438]">
            <i className="fa-regular fa-clock mr-1" />
            {promoStats.active} promo aktif
          </span>
          <span className="text-[#414941]">di Kelola Promo</span>
        </div>
        <span aria-hidden="true" className="pointer-events-none absolute -right-4 -bottom-4 h-14 w-14 rounded-full bg-[#FBBF24]/50 blur-lg" />
      </Link>

      {/* 3. TOTAL PENGGUNA */}
      <Link
        className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-white p-4 text-[#181D1A] no-underline shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B6515]"
        href="/pengguna"
        aria-label="Buka halaman Pengguna"
      >
        <div className="z-[1] flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[10px] font-semibold tracking-[0.55px] text-[#414941] uppercase">TOTAL PENGGUNA</span>
            <span className="flex items-baseline gap-1.5 text-2xl font-bold leading-tight text-[#181D1A]">
              {userCount} <small className="text-xs font-semibold text-[#414941]">Pengguna</small>
            </span>
          </div>
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#C2DC80]/40 text-base text-[#4B6515]">
            <i className="fa-solid fa-users" />
          </div>
        </div>
        <div className="z-[1] mt-4 flex items-center justify-between gap-2 pt-2 text-[11px]">
          <span className="font-semibold text-[#496800]">
            <i className="fa-solid fa-tower-broadcast mr-1 text-[10px]" />
            {userCount} terdaftar
          </span>
          <span className="text-[#414941]">di halaman Pengguna</span>
        </div>
        <span aria-hidden="true" className="pointer-events-none absolute -right-4 -bottom-4 h-14 w-14 rounded-full bg-[#C2DC80]/50 blur-lg" />
      </Link>
    </section>
    </>
  );
}

export function CapacityPanel() {
  const [storesCount, setStoresCount] = useState<number>(() => readStoreCount());

  useEffect(() => {
    getManagedStores()
      .then((stores) => {
        if (Array.isArray(stores)) setStoresCount(stores.length);
      })
      .catch(() => {});
  }, []);

  const totalCapacity = 90;
  const percentage = Math.min(100, Math.round((storesCount / totalCapacity) * 100));

  return (
    <section className="min-w-0 rounded-xl bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <h2 className="m-0 flex items-center gap-2 text-sm font-semibold text-[#181D1A]">
          <i className="fa-solid fa-shop text-sm text-[#204E2B]" /> Kapasitas Kios &amp; Lapak
        </h2>
        <span className="rounded-full bg-[#C8F17A] px-2.5 py-0.5 text-[11px] font-semibold text-[#496800]">
          {percentage}% Terisi
        </span>
      </div>

      <div className="mt-3 flex items-baseline gap-1.5 text-xs text-[#414941]">
        <strong className="text-2xl font-bold leading-none text-[#181D1A]">{storesCount}</strong>
        <span>/ {totalCapacity} kios terisi</span>
        <small className="ml-auto text-[11px] text-[#414941]">{Math.max(0, totalCapacity - storesCount)} lapak kosong</small>
      </div>

      <div className="mt-3 mb-3.5 h-2.5 overflow-hidden rounded-full bg-[#EBEFEA]">
        <span className="block h-full rounded-full bg-[#4B6515] transition-all duration-300" style={{ width: `${percentage}%` }} />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex flex-col gap-0.5 rounded-lg bg-[#C2DC80]/20 p-2.5">
          <span className="truncate text-[11px] font-semibold text-[#414941]">Zona Kuliner</span>
          <strong className="text-xs font-semibold text-[#181D1A]">{Math.min(storesCount, 38)} / 38 Kios</strong>
        </div>
        <div className="flex flex-col gap-0.5 rounded-lg bg-[#C2DC80]/20 p-2.5">
          <span className="truncate text-[11px] font-semibold text-[#414941]">Zona Bahan Pokok</span>
          <strong className="text-xs font-semibold text-[#181D1A]">{Math.max(0, storesCount - 38)} / 52 Kios</strong>
        </div>
      </div>
    </section>
  );
}
