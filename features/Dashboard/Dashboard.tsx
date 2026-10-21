import { useDemoAuth } from "../../auth/DemoAuthContext";
import AdminLayout from "../../components/AdminLayout";
import Peringkat from "./components/peringkat";
import PromoAktif from "./components/PromoAktif";
import { StatCards, CapacityPanel } from "./components/Ringkasanaktifitas";
import RiwayatAktivitas from "./components/RiwayatAktifitas";
import "./Dashboard.css";
import "./DashboardRefresh.css";

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

        {/* Ringkasan Aktivitas / Stat Cards */}
        <StatCards />

        <div className="main-grid-layout">
          <div className="grid-col-left">
            {/* Component Peringkat */}
            <Peringkat />

            {/* Component Promo Aktif */}
            <PromoAktif />
          </div>

          <div className="grid-col-right dashboard-right-column">
            {/* Component Riwayat Aktivitas */}
            <RiwayatAktivitas />

            {/* Component Capacity Panel (dari Ringkasanaktifitas) */}
            <CapacityPanel />
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}