import Link from "next/link";

export default function PromoAktif() {
  return (
    <section className="content-box promo-box">
      <div className="section-heading promo-heading">
        <span className="section-icon promo-section-icon"><i className="fa-solid fa-tags" /></span>
        <div>
          <h2 className="box-title">Promo Terbaru &amp; Aktif</h2>
          <p>Insentif belanja aktif pedagang Pasar Oro-Oro Dowo</p>
        </div>
        <Link className="new-promo-button" href="/kelola-promo"><i className="fa-solid fa-plus" /> Buat Promo Baru</Link>
      </div>
      <div className="promo-cards">
        <article className="promo-card">
          <div className="promo-card-top"><span className="promo-status">Aktif</span><i className="fa-solid fa-percent" /></div>
          <h3>Lumpur Kentang</h3>
          <p>Diskon 10% Min. Pembelian 10K</p>
          <span className="promo-card-date"><i className="fa-regular fa-calendar" /> 19 - 22 Sep 2024</span>
        </article>
        <article className="promo-card">
          <div className="promo-card-top"><span className="promo-status">Aktif</span><i className="fa-solid fa-tag" /></div>
          <h3>Bakso Goreng Ayam Bangkit</h3>
          <p>Diskon 15% Min. Pembelian 25K</p>
          <span className="promo-card-date"><i className="fa-regular fa-calendar" /> 19 - 25 Sep 2024</span>
        </article>
        <article className="promo-card promo-expiring">
          <div className="promo-card-top"><span className="promo-status">Segera Berakhir</span><i className="fa-solid fa-hourglass-half" /></div>
          <h3>Kue Tradisional Bu Sri</h3>
          <p>Potongan Ongkir Rp 5.000</p>
          <span className="promo-card-date"><i className="fa-regular fa-calendar" /> 20 - 24 Sep 2024</span>
        </article>
      </div>
    </section>
  );
}