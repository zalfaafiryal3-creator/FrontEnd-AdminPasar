"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getManagedStores, type Store } from "../../../../lib/store-api";

function readCachedStores(): Store[] {
  const raw = window.localStorage.getItem("pasar-admin-stores-cache");
  if (!raw) return [];

  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error('Data "pasar-admin-stores-cache" tidak memiliki format daftar yang valid.');
  }
  return parsed as Store[];
}

export default function Peringkat() {
  const [stores, setStores] = useState<Store[]>([]);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    getManagedStores()
      .then((managedStores) => {
        setStores(managedStores);
        setDataError("");
      })
      .catch((error: unknown) => {
        try {
          const cachedStores = readCachedStores();
          setStores(cachedStores);
          if (!cachedStores.length) {
            setDataError(error instanceof Error ? error.message : "Peringkat toko gagal dimuat.");
          }
        } catch (cacheError) {
          setDataError(cacheError instanceof Error ? cacheError.message : "Peringkat toko gagal dimuat.");
        }
      });
  }, []);

  const rankedSellers = useMemo(() => stores
    .map((store, index) => ({
      seller: {
        id: String(store.id),
        name: store.owner || `Pedagang ${store.name}`,
        shop: store.name,
        block: store.zone || "Blok belum ditentukan",
      },
      rating: store.reviewCount > 0 ? store.rating : null,
      reviews: store.reviewCount,
      index,
    }))
    .sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1) || b.reviews - a.reviews || a.index - b.index)
    .slice(0, 3), [stores]);

  return (
    <section className="min-w-0 rounded-2xl border border-[rgba(194,220,128,0.65)] bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#e8f2cf] text-sm text-[#4f681b]">
            <i className="fa-solid fa-trophy" />
          </span>
          <div className="min-w-0">
            <h2 className="m-0 text-base font-bold leading-tight text-[#202820]">Peringkat Teratas Penjual</h2>
            <p className="mt-0.5 mb-0 text-xs leading-normal text-[#6c7569]">Diurutkan menurut rating ulasan pada data toko backend</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#e8f2cf] px-3 py-1.5 text-xs font-semibold text-[#4b5e2c]">
          Rating Toko <i className="fa-solid fa-star text-[10px]" />
        </span>
      </div>

      {dataError && <p className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-800" role="alert">{dataError}</p>}
      <div className="mt-4 flex flex-col gap-3">
        {rankedSellers.map(({ seller, rating, reviews }, index) => (
          <article
            className="relative flex items-center gap-3.5 rounded-xl border border-[#e5edd4] bg-[#f7faef] p-3.5 transition-colors hover:bg-[#edf5d7]"
            key={seller.id}
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
                  <strong className="block truncate text-sm font-semibold leading-snug text-[#242b22]">{seller.shop}</strong>
                  <span className="block truncate text-xs text-[#73796b]">{seller.name} • {seller.block}</span>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 text-right text-xs text-[#313a2b]">
                  <i className="fa-solid fa-star text-[#e2a50b]" />
                  <strong className="text-sm font-bold text-[#385d28]">{rating === null ? "Belum dinilai" : `${rating.toFixed(1)} / 5`}</strong>
                  {rating !== null && <small className="text-[#73796b]">({reviews})</small>}
                </div>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-[#e5e9dc]">
                <div className="h-full rounded-full bg-[#ffbd1b] transition-all" style={{ width: `${rating === null ? 0 : Math.min(100, Math.max(0, rating * 20))}%` }} />
              </div>
            </div>
          </article>
        ))}
        {!rankedSellers.length && !dataError && <p className="rounded-lg bg-[#f7faef] p-4 text-center text-xs text-[#62695b]">Belum ada data penjual.</p>}
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
