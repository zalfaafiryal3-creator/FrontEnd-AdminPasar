import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <AdminLayout activePage="dashboard" label="Admin Dashboard">
      <main className="dashboard-body page-view active">
        <section className="welcome-section"><h1>Selamat Datang, Admin 👋</h1><p>Berikut ringkasan aktivitas pasar Oro-Oro Dowo hari ini.</p></section>
        <section className="stat-cards-container">
          <Link className="stat-card" to="/kelola-toko" aria-label="Buka halaman Total Toko"><div className="stat-content"><span className="stat-label">TOTAL TOKO</span><span className="stat-number">78</span></div><div className="stat-circle-icon"><i className="fa-solid fa-basket-shopping" /></div></Link>
          <Link className="stat-card" to="/kelola-promo" aria-label="Buka halaman Kelola Promo"><div className="stat-content"><span className="stat-label">KELOLA PROMO</span><span className="stat-number">10</span></div><div className="stat-circle-icon"><i className="fa-solid fa-fire" /></div></Link>
          <Link className="stat-card" to="/pengguna" aria-label="Buka halaman Total Pengguna"><div className="stat-content"><span className="stat-label">TOTAL PENGGUNA</span><span className="stat-number">120</span></div><div className="stat-circle-icon"><i className="fa-solid fa-user" /></div></Link>
        </section>
        <div className="main-grid-layout">
          <div className="grid-col-left">
            <section className="content-box"><h2 className="box-title">Peringkat Teratas Penjual</h2><div className="ranking-items">
              <div className="rank-row"><div className="rank-icon-bg pink"><i className="fa-solid fa-utensils" /></div><div className="rank-info"><div className="rank-label-line"><span className="item-title">Lumpur Kentang</span><span className="item-val">90%</span></div><div className="progress-track"><div className="progress-fill" style={{ width: "90%" }} /></div></div></div>
              <div className="rank-row"><div className="rank-icon-bg pink"><i className="fa-solid fa-utensils" /></div><div className="rank-info"><div className="rank-label-line"><span className="item-title">Klepon</span><span className="item-val">75%</span></div><div className="progress-track"><div className="progress-fill" style={{ width: "75%" }} /></div></div></div>
              <div className="rank-row"><div className="rank-icon-bg green"><i className="fa-solid fa-fish" /></div><div className="rank-info"><div className="rank-label-line"><span className="item-title">Bakso Goreng</span><span className="item-val">85%</span></div><div className="progress-track"><div className="progress-fill" style={{ width: "85%" }} /></div></div></div>
            </div></section>
            <section className="content-box"><h2 className="box-title">Promo Terbaru</h2><div className="promo-items">
              <div className="promo-row"><div className="promo-info-left"><div className="promo-icon-circle red"><i className="fa-solid fa-basket-shopping" /></div><div className="promo-titles"><h3>Lumpur Kentang</h3><span>@lumpurkentang</span></div></div><div className="promo-tag-btn"><span className="promo-date-str">19 September - 22 September 2027</span><span className="promo-sub-text">Membeli minimal pembelian 10K</span><span className="promo-sub-text">Diskon 10%</span></div></div>
              <div className="promo-row"><div className="promo-info-left"><div className="promo-icon-circle green"><i className="fa-solid fa-fish" /></div><div className="promo-titles"><h3>Bakso Goreng</h3><span>@baksogoreng</span></div></div><div className="promo-tag-btn"><span className="promo-date-str">19 September - 22 September 2027</span><span className="promo-sub-text">Membeli minimal pembelian 10K</span><span className="promo-sub-text">Diskon 10%</span></div></div>
            </div></section>
          </div>
          <section className="grid-col-right"><div className="activity-panel"><div className="activity-header"><h2>Riwayat Aktivitas Terbaru</h2><a href="#aktivitas" className="see-all-link">Lihat Semua</a></div><div className="activity-list" id="aktivitas">
            <div className="activity-row"><div className="user-avatar pink"><i className="fa-solid fa-user" /></div><div className="activity-details"><div className="activity-text"><strong>Mifta Annisa</strong> <span className="sub-act">berhasil login</span></div><div className="activity-sub">IP:182.1.22.90 &bull; 2 menit lalu</div></div><span className="status-badge success">Success</span></div>
            <div className="activity-row"><div className="user-avatar brown"><i className="fa-solid fa-user" /></div><div className="activity-details"><div className="activity-text"><strong>Serli Maharani</strong> <span className="sub-act">gagal login</span></div><div className="activity-sub">IP:182.1.22.90 &bull; 2 menit lalu</div></div><span className="status-badge failed">GAGAL</span></div>
            <div className="activity-row"><div className="user-avatar yellow"><i className="fa-solid fa-user" /></div><div className="activity-details"><div className="activity-text"><strong>Firyal Zalfa</strong> <span className="sub-act">berhasil login</span></div><div className="activity-sub">IP:182.1.22.90 &bull; 2 menit lalu</div></div><span className="status-badge success">Success</span></div>
            <div className="activity-row"><div className="user-avatar green"><i className="fa-solid fa-user" /></div><div className="activity-details"><div className="activity-text"><strong>Mifta Annisa</strong> <span className="sub-act">berhasil login</span></div><div className="activity-sub">IP:182.1.22.90 &bull; 2 menit lalu</div></div><span className="status-badge success">Success</span></div>
          </div></div></section>
        </div>
      </main>
    </AdminLayout>
  );
}

