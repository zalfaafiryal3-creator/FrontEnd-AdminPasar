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
    <section className="activity-panel">
      <div className="activity-header">
        <h2><i className="fa-solid fa-clock-rotate-left" /> Riwayat Aktivitas</h2>
        <a href="#aktivitas" className="see-all-link">Lihat Semua</a>
      </div>
      <div className="activity-list" id="aktivitas">
        {activities.map((activity) => (
          <article className="activity-row" key={activity.name}>
            <span className={`user-avatar ${activity.tone}`}><i className={`fa-solid ${activity.icon}`} /></span>
            <div className="activity-details">
              <div className="activity-text">
                <strong>{activity.name}</strong>
                <span className="sub-act">{activity.action}</span>
              </div>
              <div className="activity-sub">IP: {activity.ip}</div>
            </div>
            <div className="activity-status">
              <span className={`status-badge ${activity.tone}`}>{activity.status}</span>
              <span className="activity-time">{activity.time}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}