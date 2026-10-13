import { Link } from "react-router-dom";
import { useDemoAuth } from "../../auth/DemoAuthContext";
import AdminLayout from "../../components/AdminLayout";
import "./Dashboard.css";
import "./DashboardRefresh.css";

const sellers = [
  { name: "Lumpur Kentang", handle: "@lumpurkentang", stall: "Blok A-04", transactions: "320", score: "90%", icon: "fa-bowl-food" },
  { name: "Klepon-Ku", handle: "@klepon", stall: "Blok B-12", transactions: "248", score: "75%", icon: "fa-cookie-bite" },
  { name: "Bakso Goreng Ayam Bangkit", handle: "@baksogoreng", stall: "Blok C-02", transactions: "290", score: "85%", icon: "fa-drumstick-bite" },
];

const activities = [
  { name: "Serli Maharani", action: "Berhasil login", ip: "182.1.22.90", time: "2 menit lalu", status: "Success", icon: "fa-user", tone: "success" },
  { name: "Putri", action: "Gagal login (Password salah)", ip: "182.1.22.90", time: "5 menit lalu", status: "Gagal", icon: "fa-circle-exclamation", tone: "failed" },
  { name: "Firyal Zalfa", action: "Berhasil login", ip: "182.1.22.90", time: "12 menit lalu", status: "Success", icon: "fa-user", tone: "success" },
  { name: "Mifta Annisa", action: "Memperbarui data promo toko", ip: "182.1.22.90", time: "25 menit lalu", status: "Update", icon: "fa-tag", tone: "updated" },
];

export default function Dashboard() {
  const { currentUser } = useDemoAuth();
  const dateLabel = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());

  return (
    <AdminLayout activePage="dashboard" label="Admin Dashboard">
      <main className="dashboard-body page-view active">
        <section className="welcome-section">
          <div>
            <h1>Selamat Datang, {currentUser?.username ?? "Admin"} 👋</h1>
            <p>Berikut ringkasan aktivitas pasar Oro-Oro Dowo hari ini.</p>
          </div>
          <div className="dashboard-date">
            <i className="fa-regular fa-calendar" aria-hidden="true" />
            <span>{dateLabel}</span>
            <span className="date-divider">•</span>
            <span>Pasar Aktif</span>
          </div>
        </section>

        <section className="stat-cards-container" aria-label="Ringkasan pasar">
          <Link className="stat-card" to="/kelola-toko" aria-label="Buka halaman Total Toko">
            <div className="stat-content"><span className="stat-label">TOTAL TOKO</span><span className="stat-number">251</span><span className="stat-trend">↑ &nbsp;4 toko baru <small>bulan ini</small></span></div>
            <div className="stat-circle-icon"><i className="fa-solid fa-store" /></div>
          </Link>
          <Link className="stat-card" to="/kelola-promo" aria-label="Buka halaman Kelola Promo">
            <div className="stat-content"><span className="stat-label">KELOLA PROMO</span><span className="stat-number">10 <small>Promo Aktif</small></span><span className="stat-trend neutral"><i className="fa-regular fa-clock" /> &nbsp;2 promo <small>berakhir hari ini</small></span></div>
            <div className="stat-circle-icon amber"><i className="fa-solid fa-fire" /></div>
          </Link>
          <Link className="stat-card" to="/pengguna" aria-label="Buka halaman Total Pengguna">
            <div className="stat-content"><span className="stat-label">TOTAL PENGGUNA</span><span className="stat-number">120 <small>Pengguna</small></span><span className="stat-trend">↑ &nbsp;88 aktif <small>hari ini (73%)</small></span></div>
            <div className="stat-circle-icon"><i className="fa-solid fa-users" /></div>
          </Link>
          <div className="stat-card transaction-card">
            <div className="stat-content"><span className="stat-label">TOTAL TRANSAKSI</span><span className="stat-number transaction-value">Rp 18.450.000</span><span className="stat-trend">↗ &nbsp;342 pesanan <small>+8.4% vs kemarin</small></span></div>
            <div className="stat-circle-icon amber"><i className="fa-solid fa-wallet" /></div>
          </div>
        </section>

        <div className="main-grid-layout">
          <div className="grid-col-left">
            <section className="content-box ranking-box">
              <div className="section-heading">
                <span className="section-icon"><i className="fa-solid fa-trophy" /></span>
                <div><h2 className="box-title">Peringkat Teratas Penjual</h2><p>Evaluasi performa penjualan dan keaktifan lapak pasar</p></div>
                <label className="period-select">Minggu Ini <i className="fa-solid fa-chevron-down" /></label>
              </div>
              <div className="ranking-items">
                {sellers.map((seller, index) => (
                  <article className="rank-row" key={seller.name}>
                    <span className="rank-number">{index + 1}</span>
                    <span className={`seller-avatar seller-avatar-${index + 1}`}><i className={`fa-solid ${seller.icon}`} /></span>
                    <div className="rank-info">
                      <div className="rank-label-line">
                        <div className="seller-name-group"><span className="item-title">{seller.name}</span><span className="seller-meta">{seller.handle} • {seller.stall}</span></div>
                        <span className="seller-transactions">{seller.transactions} <small>transaksi</small></span>
                        <span className="seller-score">Skor Kinerja <strong>{seller.score}</strong></span>
                      </div>
                      <div className="progress-track"><div className="progress-fill" style={{ width: seller.score }} /></div>
                    </div>
                  </article>
                ))}
              </div>
              <Link className="dashboard-action" to="/penjual">Lihat Semua Penjual <i className="fa-solid fa-arrow-right" /></Link>
            </section>

            <section className="content-box promo-box">
              <div className="section-heading promo-heading">
                <span className="section-icon promo-section-icon"><i className="fa-solid fa-tags" /></span>
                <div><h2 className="box-title">Promo Terbaru &amp; Aktif</h2><p>Insentif belanja aktif pedagang Pasar Oro-Oro Dowo</p></div>
                <Link className="new-promo-button" to="/kelola-promo"><i className="fa-solid fa-plus" /> Buat Promo Baru</Link>
              </div>
              <div className="promo-cards">
                <article className="promo-card">
                  <div className="promo-card-top"><span className="promo-status">Aktif</span><i className="fa-solid fa-percent" /></div>
                  <h3>Lumpur Kentang</h3><p>Diskon 10% Min. Pembelian 10K</p>
                  <span className="promo-card-date"><i className="fa-regular fa-calendar" /> 19 - 22 Sep 2024</span>
                </article>
                <article className="promo-card">
                  <div className="promo-card-top"><span className="promo-status">Aktif</span><i className="fa-solid fa-tag" /></div>
                  <h3>Bakso Goreng Ayam Bangkit</h3><p>Diskon 15% Min. Pembelian 25K</p>
                  <span className="promo-card-date"><i className="fa-regular fa-calendar" /> 19 - 25 Sep 2024</span>
                </article>
                <article className="promo-card promo-expiring">
                  <div className="promo-card-top"><span className="promo-status">Segera Berakhir</span><i className="fa-solid fa-hourglass-half" /></div>
                  <h3>Kue Tradisional Bu Sri</h3><p>Potongan Ongkir Rp 5.000</p>
                  <span className="promo-card-date"><i className="fa-regular fa-calendar" /> 20 - 24 Sep 2024</span>
                </article>
              </div>
            </section>
          </div>

          <div className="grid-col-right dashboard-right-column">
            <section className="activity-panel">
              <div className="activity-header"><h2><i className="fa-solid fa-clock-rotate-left" /> Riwayat Aktivitas</h2><a href="#aktivitas" className="see-all-link">Lihat Semua</a></div>
              <div className="activity-list" id="aktivitas">
                {activities.map((activity) => (
                  <article className="activity-row" key={activity.name}>
                    <span className={`user-avatar ${activity.tone}`}><i className={`fa-solid ${activity.icon}`} /></span>
                    <div className="activity-details"><div className="activity-text"><strong>{activity.name}</strong><span className="sub-act">{activity.action}</span></div><div className="activity-sub">IP: {activity.ip}</div></div>
                    <div className="activity-status"><span className={`status-badge ${activity.tone}`}>{activity.status}</span><span className="activity-time">{activity.time}</span></div>
                  </article>
                ))}
              </div>
            </section>

            <section className="capacity-panel">
              <div className="capacity-heading"><span><i className="fa-solid fa-shop" /> Kapasitas Kios &amp; Lapak</span><span className="capacity-pill">86% Terisi</span></div>
              <div className="capacity-total"><strong>78</strong><span>/ 90 kios terisi</span><small>12 lapak kosong</small></div>
              <div className="capacity-track"><span /></div>
              <div className="capacity-zones">
                <div><span>Zona Kuliner</span><strong>36 / 38 Kios</strong></div>
                <div><span>Zona Bahan Pokok</span><strong>42 / 52 Kios</strong></div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}
