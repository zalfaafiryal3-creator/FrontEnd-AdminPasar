import Link from "next/link";

export function StatCards() {
  return (
    <section className="stat-cards-container" aria-label="Ringkasan pasar">
      <Link className="stat-card" href="/kelola-toko" aria-label="Buka halaman Total Toko">
        <div className="stat-content">
          <span className="stat-label">TOTAL TOKO</span>
          <span className="stat-number">251</span>
          <span className="stat-trend">↑ &nbsp;4 toko baru <small>bulan ini</small></span>
        </div>
        <div className="stat-circle-icon"><i className="fa-solid fa-store" /></div>
      </Link>
      <Link className="stat-card" href="/kelola-promo" aria-label="Buka halaman Kelola Promo">
        <div className="stat-content">
          <span className="stat-label">KELOLA PROMO</span>
          <span className="stat-number">10 <small>Promo Aktif</small></span>
          <span className="stat-trend neutral"><i className="fa-regular fa-clock" /> &nbsp;2 promo <small>berakhir hari ini</small></span>
        </div>
        <div className="stat-circle-icon amber"><i className="fa-solid fa-fire" /></div>
      </Link>
      <Link className="stat-card" href="/pengguna" aria-label="Buka halaman Total Pengguna">
        <div className="stat-content">
          <span className="stat-label">TOTAL PENGGUNA</span>
          <span className="stat-number">120 <small>Pengguna</small></span>
          <span className="stat-trend">↑ &nbsp;88 aktif <small>hari ini (73%)</small></span>
        </div>
        <div className="stat-circle-icon"><i className="fa-solid fa-users" /></div>
      </Link>
      <div className="stat-card transaction-card">
        <div className="stat-content">
          <span className="stat-label">TOTAL TRANSAKSI</span>
          <span className="stat-number transaction-value">Rp 18.450.000</span>
          <span className="stat-trend">↗ &nbsp;342 pesanan <small>+8.4% vs kemarin</small></span>
        </div>
        <div className="stat-circle-icon amber"><i className="fa-solid fa-wallet" /></div>
      </div>
    </section>
  );
}

export function CapacityPanel() {
  return (
    <section className="capacity-panel">
      <div className="capacity-heading">
        <span><i className="fa-solid fa-shop" /> Kapasitas Kios &amp; Lapak</span>
        <span className="capacity-pill">86% Terisi</span>
      </div>
      <div className="capacity-total">
        <strong>78</strong>
        <span>/ 90 kios terisi</span>
        <small>12 lapak kosong</small>
      </div>
      <div className="capacity-track"><span /></div>
      <div className="capacity-zones">
        <div><span>Zona Kuliner</span><strong>36 / 38 Kios</strong></div>
        <div><span>Zona Bahan Pokok</span><strong>42 / 52 Kios</strong></div>
      </div>
    </section>
  );
}