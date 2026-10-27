interface Activity {
  name: string;
  action: string;
  ip: string;
  time: string;
  status: string;
  icon: string;
  tone: string;
}

const activities: Activity[] = [
  { name: "Serli Maharani", action: "Berhasil login", ip: "182.1.22.90", time: "2 menit lalu", status: "Success", icon: "fa-user", tone: "success" },
  { name: "Putri", action: "Gagal login (Password salah)", ip: "182.1.22.90", time: "5 menit lalu", status: "Gagal", icon: "fa-circle-exclamation", tone: "failed" },
  { name: "Firyal Zalfa", action: "Berhasil login", ip: "182.1.22.90", time: "12 menit lalu", status: "Success", icon: "fa-user", tone: "success" },
  { name: "Mifta Annisa", action: "Memperbarui data promo toko", ip: "182.1.22.90", time: "25 menit lalu", status: "Update", icon: "fa-tag", tone: "updated" },
];

export default function RiwayatAktivitas() {
  return (
    <section className="min-w-0 rounded-2xl border border-[rgba(194,220,128,0.65)] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h2 className="m-0 flex items-center gap-2 text-base font-bold leading-tight text-[#202820]">
          <i className="fa-solid fa-clock-rotate-left text-sm text-[#3d6945]" /> Riwayat Aktivitas
        </h2>
        <a
          href="#aktivitas"
          className="text-xs font-semibold text-[#436b3e] no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#668c2e]"
        >
          Lihat Semua
        </a>
      </div>

      <div className="mt-4 flex flex-col gap-2.5" id="aktivitas">
        {activities.map((activity) => (
          <article
            className="flex items-center gap-3 rounded-xl border border-[#e5edd4] bg-[#f7faef] p-3 transition-colors hover:bg-[#edf5d7]"
            key={activity.name}
          >
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                activity.tone === "failed"
                  ? "bg-[#ffe1db] text-[#e34a43]"
                  : activity.tone === "updated"
                  ? "bg-[#ecebdd] text-[#7c7763]"
                  : "bg-[#d9efcf] text-[#4c784b]"
              }`}
            >
              <i className={`fa-solid ${activity.icon}`} />
            </span>

            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <strong className="text-xs font-bold text-[#30382b]">{activity.name}</strong>
              <span className="text-xs text-[#62695b]">{activity.action}</span>
              <span className="text-[11px] text-[#777d70]">IP: {activity.ip}</span>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold leading-none ${
                  activity.tone === "failed"
                    ? "bg-[#ffe1db] text-[#cb453b]"
                    : activity.tone === "updated"
                    ? "bg-[#e7e7df] text-[#676858]"
                    : "bg-[#d8efc9] text-[#39743c]"
                }`}
              >
                {activity.status}
              </span>
              <span className="whitespace-nowrap text-xs text-[#767d70]">{activity.time}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}