import Link from "next/link";

interface Seller {
  name: string;
  handle: string;
  stall: string;
  transactions: string;
  score: string;
  icon: string;
}

const sellers: Seller[] = [
  { name: "Lumpur Kentang", handle: "@lumpurkentang", stall: "Blok A-04", transactions: "320", score: "90%", icon: "fa-bowl-food" },
  { name: "Klepon-Ku", handle: "@klepon", stall: "Blok B-12", transactions: "248", score: "75%", icon: "fa-cookie-bite" },
  { name: "Bakso Goreng Ayam Bangkit", handle: "@baksogoreng", stall: "Blok C-02", transactions: "290", score: "85%", icon: "fa-drumstick-bite" },
];

export default function Peringkat() {
  return (
    <section className="content-box ranking-box">
      <div className="section-heading">
        <span className="section-icon"><i className="fa-solid fa-trophy" /></span>
        <div>
          <h2 className="box-title">Peringkat Teratas Penjual</h2>
          <p>Evaluasi performa penjualan dan keaktifan lapak pasar</p>
        </div>
        <label className="period-select">Minggu Ini <i className="fa-solid fa-chevron-down" /></label>
      </div>
      <div className="ranking-items">
        {sellers.map((seller, index) => (
          <article className="rank-row" key={seller.name}>
            <span className="rank-number">{index + 1}</span>
            <span className={`seller-avatar seller-avatar-${index + 1}`}><i className={`fa-solid ${seller.icon}`} /></span>
            <div className="rank-info">
              <div className="rank-label-line">
                <div className="seller-name-group">
                  <span className="item-title">{seller.name}</span>
                  <span className="seller-meta">{seller.handle} • {seller.stall}</span>
                </div>
                <span className="seller-transactions">{seller.transactions} <small>transaksi</small></span>
                <span className="seller-score">Skor Kinerja <strong>{seller.score}</strong></span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: seller.score }} />
              </div>
            </div>
          </article>
        ))}
      </div>
      <Link className="dashboard-action" href="/penjual">Lihat Semua Penjual <i className="fa-solid fa-arrow-right" /></Link>
    </section>
  );
}