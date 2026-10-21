interface Activity {
  name: string;
  action: string;
  ip: string;
  time: string;
  status: string;
  icon: string;
  tone: "success" | "failed" | "updated";
}

const activityToneClasses = {
  success: {
    avatar: "bg-[#eef4de] text-[#4b6515]",
    badge: "bg-[#eef4de] text-[#4b6515]",
  },
  failed: {
    avatar: "bg-[#fde8e7] text-[#b42318]",
    badge: "bg-[#fde8e7] text-[#b42318]",
  },
  updated: {
    avatar: "bg-[#fff1cf] text-[#9a6700]",
    badge: "bg-[#fff1cf] text-[#9a6700]",
  },
} as const;

const activities: Activity[] = [
  { name: "Serli Maharani", action: "Berhasil login", ip: "182.1.22.90", time: "2 menit lalu", status: "Success", icon: "fa-user", tone: "success" },
  { name: "Putri", action: "Gagal login (Password salah)", ip: "182.1.22.90", time: "5 menit lalu", status: "Gagal", icon: "fa-circle-exclamation", tone: "failed" },
  { name: "Firyal Zalfa", action: "Berhasil login", ip: "182.1.22.90", time: "12 menit lalu", status: "Success", icon: "fa-user", tone: "success" },
  { name: "Mifta Annisa", action: "Memperbarui data promo toko", ip: "182.1.22.90", time: "25 menit lalu", status: "Update", icon: "fa-tag", tone: "updated" },
];

export default function RiwayatAktivitas() {
  return (
    <section className="rounded-xl border border-[#e9e3e4] bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-[#f0ebec] pb-3">
        <h2 className="flex items-center gap-2 text-sm font-bold text-[#594045]"><i className="fa-solid fa-clock-rotate-left text-[#4b6515]" aria-hidden="true" /> Riwayat Aktivitas</h2>
        <a href="#aktivitas" className="shrink-0 text-xs font-semibold text-[#4b6515] hover:underline">Lihat Semua</a>
      </div>
      <div className="divide-y divide-[#f0ebec]" id="aktivitas">
        {activities.map((activity) => (
          <article className="flex items-start gap-3 py-3 first:pt-1 last:pb-1" key={activity.name}>
            <span className={`grid size-9 shrink-0 place-items-center rounded-full ${activityToneClasses[activity.tone].avatar}`}><i className={`fa-solid ${activity.icon}`} aria-hidden="true" /></span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                <strong className="text-xs font-bold text-[#594045]">{activity.name}</strong>
                <span className="text-[10px] text-[#74666a]">{activity.time}</span>
              </div>
              <span className="mt-0.5 block text-xs text-[#74666a]">{activity.action}</span>
              <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] text-[#8a7d80]">IP: {activity.ip}</span>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${activityToneClasses[activity.tone].badge}`}>{activity.status}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}