"use client";

import { useState } from "react";
import TambahPedagangBaru from "../../../penjual/components/TambahPedagangBaru";
import type { PedagangData } from "../../../penjual/components/TambahPedagangBaru";

const summaries = [
  {
    label: "TOTAL PEDAGANG TERDAFTAR",
    value: "251",
    detail: "251 Aktif",
    icon: "fa-store",
    iconTone: "bg-[#e8f2d5] text-[#4b6515]",
    footer: true,
  },
  {
    label: "KIOS/LAPAK AKTIF BERJUALAN",
    value: "240",
    unit: "Kios",
    icon: "fa-shop",
    iconTone: "bg-[#ffe5a0] text-[#bd7800]",
  },
  {
    label: "KIOS / LAPAK KOSONG",
    value: "11",
    unit: "Kios",
    icon: "fa-store",
    iconTone: "bg-[#e8f2d5] text-[#4b6515]",
    footer: true,
  },
];

export default function KelolaTotalPenjual() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (_data: PedagangData) => {
    // Data already saved to localStorage inside TambahPedagangBaru
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="min-w-0 bg-[#e8f3d3] px-4 py-3 text-[#20251f] sm:px-6">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-[#45513d]">
            Admin Panel <span aria-hidden="true">›</span> Kategori Toko
          </p>
          <h1 className="mt-0.5 text-xl font-bold leading-tight sm:text-2xl">
            Kelola Data Penjual &amp; Lapak
          </h1>
          <p className="mt-1 max-w-[500px] text-[10px] leading-relaxed text-[#56604f] sm:text-xs">
            Pencatatan dan pengelolaan profil pedagang resmi, alokasi lapak/stan, serta informasi kontak pasar rakyat Oro-Oro Dowo Malang.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-lg bg-[#ffbf18] px-3 py-2 text-[10px] font-semibold text-white shadow-sm transition hover:bg-[#f3b20b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]"
        >
          <i className="fa-solid fa-circle-plus" aria-hidden="true" />
          Daftarkan Pedagang Baru
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        {summaries.map((summary) => (
          <article
            key={summary.label}
            className="relative flex min-h-[122px] flex-col overflow-hidden rounded-xl bg-white px-4 py-3.5 shadow-sm sm:px-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="max-w-[175px] text-[11px] font-semibold uppercase leading-[1.15] tracking-wide text-[#424a40]">
                  {summary.label}
                </h2>
                <p className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold leading-none text-[#20251f]">{summary.value}</span>
                  {summary.unit && <span className="text-[9px] text-[#59615a]">{summary.unit}</span>}
                </p>
              </div>
              <span className={`grid size-8 shrink-0 place-items-center rounded-lg text-[12px] ${summary.iconTone}`}>
                <i className={`fa-solid ${summary.icon}`} aria-hidden="true" />
              </span>
            </div>

            {summary.footer && (
              <div className="mt-auto flex items-center justify-between pt-3 text-[8px] text-[#586351]">
                {summary.detail && (
                  <span className="inline-flex items-center gap-1">
                    <i className="fa-solid fa-circle text-[5px] text-[#367446]" aria-hidden="true" />
                    {summary.detail}
                  </span>
                )}
                {summary.label === "TOTAL PEDAGANG TERDAFTAR" && (
                  <span className="ml-auto text-[#747b70]">bulan ini</span>
                )}
                {summary.label === "KIOS / LAPAK KOSONG" && (
                  <span className="ml-auto text-[#747b70]">Pedagang</span>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>

    <TambahPedagangBaru
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSave={handleSave}
    />
  </>
  );
}