import { useAuth } from "../../../lib/user-auth";
import AdminLayout from "../../../components/AdminLayout";
import Peringkat from "./peringkat";
import PromoAktif from "./PromoAktif";
import { StatCards, CapacityPanel } from "./Ringkasanaktifitas";
import RiwayatAktivitas from "./RiwayatAktifitas";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const dateLabel = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());

  return (
    <AdminLayout activePage="dashboard" label="Admin Dashboard">
      <main className="flex min-h-[calc(100vh-58px)] w-full min-w-0 flex-col px-6 pt-[17px] pb-8 text-[#594045] max-[980px]:px-[18px] max-[760px]:px-4 max-[760px]:pt-[17px] max-[760px]:pb-6 max-[560px]:px-3 max-[560px]:pt-4 max-[560px]:pb-5 max-[390px]:px-[10px]">
        <div className="mb-[7px] text-[9px] font-semibold tracking-[0.08em] text-[#74666a]">
          ADMIN PANEL &nbsp;›&nbsp; DASHBOARD
        </div>

        <section className="mb-5 flex flex-wrap items-start justify-between gap-4 max-[760px]:flex-col max-[760px]:gap-3 max-[560px]:mb-4">
          <div className="min-w-0">
            <h1 className="mb-1 text-[21px] font-bold leading-[1.3] text-[#594045] max-[760px]:text-[19px] max-[560px]:text-[17px] max-[390px]:text-base">
              Selamat Datang, {currentUser?.username ?? "Admin"} 👋
            </h1>
            <p className="m-0 text-xs leading-[1.5] text-[#74666a] max-[760px]:text-[11px] max-[560px]:text-[10px]">
              Berikut ringkasan aktivitas pasar Oro-Oro Dowo hari ini.
            </p>
          </div>
          <div className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#ffbd1b] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm max-[760px]:self-start">
            <i className="fa-regular fa-calendar" aria-hidden="true" />
            <span>{dateLabel}</span>
            <span className="opacity-70">•</span>
            <span>Pasar Aktif</span>
          </div>
        </section>

        <StatCards />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(330px,1.3fr)] xl:grid-cols-[minmax(0,1.8fr)_minmax(380px,1.2fr)] gap-5 items-start">
          <div className="flex flex-col gap-5 min-w-0">
            <Peringkat />
            <PromoAktif />
          </div>

          <div className="flex flex-col gap-5 min-w-0">
            <RiwayatAktivitas />
            <CapacityPanel />
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}