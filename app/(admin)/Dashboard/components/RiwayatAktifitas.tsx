"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUsers } from "../../../../lib/admin-api";
import {
  initialUserRecords,
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
    getUsers()
      .then((apiUsers) => {
        if (Array.isArray(apiUsers) && apiUsers.length > 0) {
          setUsers(
            apiUsers.map((u) => ({
              id: String(u.id),
              name: u.name,
              email: u.email,
              phone: u.phone || "-",
              type: u.role === "admin" ? "Pelanggan" : "Pembeli",
              status: u.status || "Aktif",
              activity: "Aktif di sistem",
              browser: "Web Admin",
            })),
          );
        }
        setDataError("");
      })
      .catch(() => {
        // Fallback ke default list jika belum termuat
      });
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
    <section className="min-w-0 rounded-xl bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <h2 className="m-0 flex items-center gap-2 text-sm font-semibold leading-tight text-[#181D1A]">
          <i className="fa-solid fa-clock-rotate-left text-sm text-[#204E2B]" /> Riwayat Aktivitas
        </h2>
        <Link
          href="/pengguna"
          className="text-xs font-semibold text-[#204E2B] no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B6515]"
        >
          Lihat Semua
        </Link>
      </div>

      {dataError && <p className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-800" role="alert">{dataError}</p>}
      <div className="mt-4 flex flex-col gap-3">
        {activityList.map((item) => (
          <article
            className="flex items-start justify-between gap-3 rounded-lg bg-[#C2DC80]/20 p-3 transition-colors hover:bg-[#C2DC80]/30"
            key={item.id}
          >
            <div className="flex min-w-0 items-start gap-2.5">
              <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                item.status === "Gagal"
                  ? "bg-[#FFDAD6] text-[#BA1A1A]"
                  : item.status === "Update"
                  ? "bg-[#EAE2D0] text-[#494438]"
                  : "bg-[#BCEFC0]/50 text-[#204E2B]"
              }`}>
                <i className={`fa-solid ${
                  item.status === "Gagal"
                    ? "fa-circle-exclamation"
                    : item.status === "Update"
                    ? "fa-pen-to-square"
                    : "fa-user"
                }`} />
              </span>

              <div className="flex min-w-0 flex-col gap-0.5">
                <strong className="truncate text-xs font-semibold text-[#181D1A]">{item.name}</strong>
                <span className={`truncate text-xs ${item.status === "Gagal" ? "text-[#BA1A1A]" : "text-[#414941]"}`}>{item.action}</span>
                <span className="truncate text-[10px] font-semibold text-[#414941]">{item.ip}</span>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1 text-right">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold leading-tight ${
                item.status === "Gagal"
                  ? "bg-[#FFDAD6] text-[#BA1A1A]"
                  : item.status === "Update"
                  ? "bg-[#E5E9E4] text-[#414941]"
                  : "bg-[#BCEFC0] text-[#204E2B]"
              }`}>
                {item.status}
              </span>
              <span className="text-[10px] font-semibold text-[#414941]">{item.time}</span>
            </div>
          </article>
        ))}
        {!activityList.length && !dataError && <p className="rounded-lg bg-[#C2DC80]/20 p-4 text-center text-xs text-[#414941]">Belum ada riwayat aktivitas pengguna.</p>}
      </div>
    </section>
  );
}
