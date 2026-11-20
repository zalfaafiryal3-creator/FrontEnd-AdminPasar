"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getManagedStores } from "../../../../lib/store-api";
import { getManagedPromotions } from "../../../../lib/promotion-api";
import {
  initialUserRecords,
  isActivePromoStatus,
  readAdminRecords,
} from "../../../../lib/admin-records";

function readUserCount(): number {
  return readAdminRecords("pasar-admin-users", initialUserRecords, "pasar-admin-deleted-users").length;
}

function readStoreCount(): number {
  if (typeof window === "undefined") return 16;
  try {
    const cached = localStorage.getItem("pasar-admin-stores-cache");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed.length;
    }
  } catch {}
  return 16;
}

export function StatCards() {
  const [storeCount, setStoreCount] = useState<number>(() => readStoreCount());
  const [promoStats, setPromoStats] = useState({ total: 0, active: 0 });
  const [userCount, setUserCount] = useState<number>(initialUserRecords.length);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    // 1. Sinkronisasi jumlah toko dari database / API kelola toko
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

    try {
      setUserCount(readUserCount());
    } catch (error) {
      setDataError(error instanceof Error ? error.message : "Ringkasan pengguna gagal dimuat.");
    }
  }, []);

  return (
    <>
    {dataError && <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800" role="alert">{dataError}</p>}
    <section className="mb-5 grid grid-cols-3 gap-3.5 max-[1100px]:grid-cols-2 max-[640px]:grid-cols-1" aria-label="Ringkasan pasar">
      {/* 1. TOTAL TOKO */}
      <Link
        className="relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-[rgba(194,220,128,0.65)] bg-white p-4 text-[#202820] no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md min-h-[96px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#668c2e]"
        href="/kelola-toko"
        aria-label="Buka halaman Kelola Toko"
      >
        <div className="z-[1] flex min-w-0 flex-1 flex-col items-start gap-1">
          <span className="text-[10px] font-bold tracking-wider text-[#596052] uppercase">TOTAL TOKO</span>
          <span className="flex items-baseline gap-1 text-2xl font-bold leading-tight text-[#202820]">{storeCount}</span>
          <span className="mt-1 block whitespace-nowrap text-xs text-[#477335]">
            <i className="fa-solid fa-store mr-1" />
            {storeCount} toko terdaftar <small className="ml-1 text-xs text-[#7a806f]">di Kelola Toko</small>
          </span>
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e6f0cc] text-lg text-[#4f681b]">
          <i className="fa-solid fa-store" />
        </div>
      </Link>

      {/* 2. KELOLA PROMO */}
      <Link
        className="relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-[rgba(194,220,128,0.65)] bg-white p-4 text-[#202820] no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md min-h-[96px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#668c2e]"
        href="/kelola-promo"
        aria-label="Buka halaman Kelola Promo"
      >
        <div className="z-[1] flex min-w-0 flex-1 flex-col items-start gap-1">
          <span className="text-[10px] font-bold tracking-wider text-[#596052] uppercase">KELOLA PROMO</span>
          <span className="flex items-baseline gap-1.5 text-2xl font-bold leading-tight text-[#202820]">
            {promoStats.total} <small className="text-xs font-normal text-[#545d4d]">Promo</small>
          </span>
          <span className="mt-1 block whitespace-nowrap text-xs text-[#6c705f]">
            <i className="fa-regular fa-clock mr-1" />{promoStats.active} promo aktif <small className="ml-1 text-xs text-[#7a806f]">di Kelola Promo</small>
          </span>
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#fff0cb] text-lg text-[#f59d00]">
          <i className="fa-solid fa-fire" />
        </div>
      </Link>

      {/* 3. TOTAL PENGGUNA */}
      <Link
        className="relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-[rgba(194,220,128,0.65)] bg-white p-4 text-[#202820] no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md min-h-[96px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#668c2e]"
        href="/pengguna"
        aria-label="Buka halaman Pengguna"
      >
        <div className="z-[1] flex min-w-0 flex-1 flex-col items-start gap-1">
          <span className="text-[10px] font-bold tracking-wider text-[#596052] uppercase">TOTAL PENGGUNA</span>
          <span className="flex items-baseline gap-1.5 text-2xl font-bold leading-tight text-[#202820]">
            {userCount} <small className="text-xs font-normal text-[#545d4d]">Pengguna</small>
          </span>
          <span className="mt-1 block whitespace-nowrap text-xs text-[#477335]">
            <i className="fa-solid fa-user-check mr-1" />
            {userCount} terdaftar <small className="ml-1 text-xs text-[#7a806f]">di halaman Pengguna</small>
          </span>
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e6f0cc] text-lg text-[#4f681b]">
          <i className="fa-solid fa-users" />
        </div>
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
    <section className="min-w-0 rounded-2xl border border-[rgba(194,220,128,0.65)] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h2 className="m-0 flex items-center gap-2 text-base font-bold text-[#202820]">
          <i className="fa-solid fa-shop text-sm text-[#47704a]" /> Kapasitas Kios &amp; Lapak
        </h2>
        <span className="rounded-full bg-[#d7ef87] px-2.5 py-1 text-xs font-semibold text-[#47651e]">
          {percentage}% Terisi
        </span>
      </div>

      <div className="mt-3.5 flex items-baseline gap-1.5 text-sm text-[#40483a]">
        <strong className="text-2xl font-bold leading-none text-[#252d22]">{storesCount}</strong>
        <span className="font-medium text-[#40483a]">/ {totalCapacity} kios terisi</span>
        <small className="ml-auto text-xs font-medium text-[#687060]">{Math.max(0, totalCapacity - storesCount)} lapak kosong</small>
      </div>

      <div className="mt-2.5 mb-3.5 h-2.5 overflow-hidden rounded-full bg-[#edf0e8]">
        <span className="block h-full rounded-full bg-[#4e7b37] transition-all duration-300" style={{ width: `${percentage}%` }} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1 rounded-xl border border-[#e5edd4] bg-[#f2f7e4] p-3">
          <span className="truncate text-xs text-[#697160]">Zona Kuliner</span>
          <strong className="text-sm font-bold text-[#38442f]">{Math.min(storesCount, 38)} / 38 Kios</strong>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border border-[#e5edd4] bg-[#f2f7e4] p-3">
          <span className="truncate text-xs text-[#697160]">Zona Bahan Pokok</span>
          <strong className="text-sm font-bold text-[#38442f]">{Math.max(0, storesCount - 38)} / 52 Kios</strong>
        </div>
      </div>
    </section>
  );
}
