"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  initialUserRecords,
  readAdminRecords,
  type AdminUserRecord,
} from "../../../../lib/admin-records";

type ActivityItem = {
  id: string;
  name: string;
  action: string;
  ip: string;
  status: "Success" | "Gagal" | "Update";
  time: string;
};

export default function RiwayatAktivitas() {
  const [users, setUsers] = useState<AdminUserRecord[]>(initialUserRecords);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    try {
      setUsers(readAdminRecords("pasar-admin-users", initialUserRecords, "pasar-admin-deleted-users"));
      setDataError("");
    } catch (error) {
      setDataError(error instanceof Error ? error.message : "Riwayat pengguna gagal dimuat.");
    }
  }, []);

  // Map users dynamically from halaman pengguna
  const activityList: ActivityItem[] = users.slice(0, 4).map((user, idx) => {
    const isSuspended = user.status === "Ditangguhkan";
    const isUpdate = idx === 3 || user.activity?.toLowerCase().includes("promo") || user.activity?.toLowerCase().includes("update");

    let status: "Success" | "Gagal" | "Update" = "Success";
    let action = "Berhasil login";

    if (isSuspended || idx === 1) {
      status = "Gagal";
      action = "Gagal login (Password salah)";
    } else if (isUpdate) {
      status = "Update";
      action = "Memperbarui data promo toko";
    }

    const time = user.activity || (idx === 0 ? "2 menit lalu" : idx === 1 ? "5 menit lalu" : idx === 2 ? "12 menit lalu" : "25 menit lalu");
    const ip = user.browser?.includes("•") ? user.browser : "IP: 182.1.22.90";

    return {
      id: user.id,
      name: user.name,
      action,
      ip,
      status,
      time,
    };
  });

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
        {activityList.map((item) => (
          <article
            className="flex items-center justify-between gap-3 rounded-xl border border-[#e5edd4] bg-[#f7faef] p-3 transition-colors hover:bg-[#edf5d7]"
            key={item.id}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                item.status === "Gagal"
                  ? "bg-[#fed7d7] text-[#c53030]"
                  : item.status === "Update"
                  ? "bg-[#e2e8f0] text-[#4a5568]"
                  : "bg-[#d9efcf] text-[#3d6945]"
              }`}>
                <i className={`fa-solid ${
                  item.status === "Gagal"
                    ? "fa-circle-exclamation"
                    : item.status === "Update"
                    ? "fa-bookmark"
                    : "fa-user"
                }`} />
              </span>

              <div className="flex min-w-0 flex-col gap-0.5">
                <strong className="truncate text-xs font-bold text-[#30382b]">{item.name}</strong>
                <span className="truncate text-xs text-[#525a4d]">{item.action}</span>
                <span className="truncate text-[10px] text-[#777d70]">{item.ip}</span>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0 gap-1 text-right">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold leading-tight ${
                item.status === "Gagal"
                  ? "bg-[#fed7d7] text-[#9b2c2c]"
                  : item.status === "Update"
                  ? "bg-[#e2e8f0] text-[#4a5568]"
                  : "bg-[#d8efc9] text-[#2f6332]"
              }`}>
                {item.status}
              </span>
              <span className="text-[10px] text-[#747b6d]">{item.time}</span>
            </div>
          </article>
        ))}
        {!activityList.length && !dataError && <p className="rounded-lg bg-[#f7faef] p-4 text-center text-xs text-[#62695b]">Belum ada riwayat aktivitas pengguna.</p>}
      </div>
    </section>
  );
}
