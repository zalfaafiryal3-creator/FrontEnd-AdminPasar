"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  initialUserRecords,
  readAdminRecords,
  type AdminUserRecord,
} from "../../../../lib/admin-records";

export default function RiwayatAktivitas() {
  const [users, setUsers] = useState(initialUserRecords);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    try {
      setUsers(readAdminRecords("pasar-admin-users", initialUserRecords, "pasar-admin-deleted-users"));
      setDataError("");
    } catch (error) {
      setDataError(error instanceof Error ? error.message : "Riwayat pengguna gagal dimuat.");
    }
  }, []);

  return (
    <section className="min-w-0 rounded-2xl border border-[rgba(194,220,128,0.65)] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h2 className="m-0 flex items-center gap-2 text-base font-bold leading-tight text-[#202820]">
          <i className="fa-solid fa-clock-rotate-left text-sm text-[#3d6945]" /> Riwayat Aktivitas
        </h2>
        <Link
          href="/pengguna"
          className="text-xs font-semibold text-[#436b3e] no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#668c2e]"
        >
          Lihat Semua
        </Link>
      </div>

      {dataError && <p className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-800" role="alert">{dataError}</p>}
      <div className="mt-4 flex flex-col gap-2.5">
        {users.slice(0, 4).map((user: AdminUserRecord) => (
          <article
            className="flex items-center gap-3 rounded-xl border border-[#e5edd4] bg-[#f7faef] p-3 transition-colors hover:bg-[#edf5d7]"
            key={user.id}
          >
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold ${user.status === "Ditangguhkan" ? "bg-[#fff0c9] text-[#9c7100]" : "bg-[#d9efcf] text-[#4c784b]"}`}>
              <i className={`fa-solid ${user.status === "Ditangguhkan" ? "fa-user-slash" : "fa-user"}`} />
            </span>

            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <strong className="text-xs font-bold text-[#30382b]">{user.name}</strong>
              <span className="text-xs text-[#62695b]">Aktivitas terakhir: {user.activity || "Belum ada aktivitas tercatat"}</span>
              <span className="text-[11px] text-[#777d70]">{user.browser || user.email}</span>
            </div>

            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold leading-none ${user.status === "Ditangguhkan" ? "bg-[#fff0c9] text-[#9c7100]" : "bg-[#d8efc9] text-[#39743c]"}`}>
              {user.status || "Aktif"}
            </span>
          </article>
        ))}
        {!users.length && !dataError && <p className="rounded-lg bg-[#f7faef] p-4 text-center text-xs text-[#62695b]">Belum ada data pengguna.</p>}
      </div>
    </section>
  );
}
