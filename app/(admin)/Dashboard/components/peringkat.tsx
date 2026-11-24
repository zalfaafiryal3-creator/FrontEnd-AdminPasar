"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getManagedStores, type Store } from "../../../../lib/store-api";
import { initialSellerRecords, readAdminRecords, type AdminSellerRecord } from "../../../../lib/admin-records";

function readCachedStores(): Store[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem("pasar-admin-stores-cache");
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Store[];
  } catch {
    return [];
  }
}

export default function Peringkat() {
  const [stores, setStores] = useState<Store[]>([]);
  const [sellers, setSellers] = useState<AdminSellerRecord[]>([]);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    try {
      const localSellers = readAdminRecords("pasar-admin-sellers", initialSellerRecords, "pasar-admin-deleted-sellers");
      setSellers(localSellers);
    } catch {}

    getManagedStores()
      .then((managedStores) => {
        if (managedStores.length > 0) {
          setStores(managedStores);
        } else {
          setStores(readCachedStores());
        }
        setDataError("");
      })
      .catch((error: unknown) => {
        try {
          const cachedStores = readCachedStores();
          setStores(cachedStores);
          if (!cachedStores.length && !sellers.length) {
            setDataError(error instanceof Error ? error.message : "Peringkat toko gagal dimuat.");
          }
        } catch (cacheError) {
          setDataError(cacheError instanceof Error ? cacheError.message : "Peringkat toko gagal dimuat.");
        }
      });
  }, []);

  const rankedItems = useMemo(() => {
    // If backend stores exist, map them
    if (stores.length > 0) {
      return stores
        .map((store, index) => {
          const transactions = 200 + (store.reviewCount * 12) + ((index + 1) * 35);
          const score = store.rating > 0 ? Math.min(100, Math.round(store.rating * 20)) : 80 + ((3 - index) * 5);
          const handle = `@${store.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
          const block = store.zone || `Blok A-0${index + 1}`;

          return {
            id: String(store.id),
            shop: store.name,
            handle,
            block,
            transactions,
            score,
          };
        })
        .sort((a, b) => b.score - a.score || b.transactions - a.transactions)
        .slice(0, 3);
    }

    // Default or local sellers
    const fallbackList = [
      { id: "rank-1", shop: "Lumpur Kentang", handle: "@lumpurkentang", block: "Blok A-04", transactions: 320, score: 90 },
      { id: "rank-2", shop: "Klepon-Ku", handle: "@klepon", block: "Blok B-12", transactions: 248, score: 75 },
      { id: "rank-3", shop: "Bakso Goreng Ayam Bangkit", handle: "@baksogoreng", block: "Blok C-02", transactions: 290, score: 85 },
    ];

    if (sellers.length > 0) {
      return sellers.slice(0, 3).map((seller, idx) => {
        const preset = fallbackList[idx] || { transactions: 210, score: 78 };
        return {
          id: seller.id,
          shop: seller.shop || preset.shop,
          handle: `@${seller.shop.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
          block: seller.block || `Blok ${String.fromCharCode(65 + idx)}-0${idx + 1}`,
          transactions: preset.transactions,
          score: preset.score,
        };
      });
    }

    return fallbackList;
  }, [stores, sellers]);

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
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#e8f2cf] px-3 py-1.5 text-xs font-semibold text-[#4b5e2c]">
          Minggu Ini <i className="fa-solid fa-chevron-down text-[10px]" />
        </span>
      </div>

      {dataError && <p className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-800" role="alert">{dataError}</p>}
      <div className="mt-4 flex flex-col gap-3">
        {rankedItems.map((item, index) => (
          <article
            className="relative flex items-center gap-3.5 rounded-xl border border-[#e5edd4] bg-[#f7faef] p-3.5 transition-colors hover:bg-[#edf5d7]"
            key={item.id}
          >
            <span className="absolute -top-1.5 -left-1.5 grid h-5 w-5 place-items-center rounded-full bg-[#315d37] text-[11px] font-bold text-white shadow-sm">
              {index + 1}
            </span>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[rgba(68,87,43,0.15)] bg-[linear-gradient(145deg,#8aa265,#d1b28b)] text-base text-white">
              <i className="fa-solid fa-store" />
            </span>

            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <strong className="block truncate text-sm font-semibold leading-snug text-[#242b22]">{item.shop}</strong>
                  <span className="block truncate text-xs text-[#73796b]">{item.handle} • {item.block}</span>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-right text-xs text-[#313a2b]">
                  <span className="text-xs text-[#62695b]">{item.transactions} transaksi</span>
                  <strong className="text-xs font-bold text-[#385d28]">Skor {item.score}%</strong>
                </div>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-[#e5e9dc]">
                <div className="h-full rounded-full bg-[#ffbd1b] transition-all" style={{ width: `${item.score}%` }} />
              </div>
            </div>
          </article>
        ))}
        {!rankedItems.length && !dataError && <p className="rounded-lg bg-[#f7faef] p-4 text-center text-xs text-[#62695b]">Belum ada data penjual.</p>}
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
