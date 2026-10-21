import { useDemoAuth } from "../../../auth/DemoAuthContext";
import AdminLayout from "../../../components/AdminLayout";
import Peringkat from "./peringkat";
import PromoAktif from "./PromoAktif";
import { StatCards, CapacityPanel } from "./Ringkasanaktifitas";
import RiwayatAktivitas from "./RiwayatAktifitas";

export default function Dashboard() {
  const { currentUser } = useDemoAuth();
  const dateLabel = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());

  return (
    <AdminLayout activePage="dashboard" label="Admin Dashboard">
      <main className="!block !mx-0 !w-full !max-w-none !bg-transparent !px-[15px] !pt-[9px] !pb-[14px] min-[1200px]:!mx-auto min-[1200px]:!max-w-[1500px] min-[1200px]:!px-[22px] min-[1200px]:!pt-4 min-[1200px]:!pb-5 max-[980px]:!px-[11px] max-[760px]:!px-[14px] max-[760px]:!pt-3 max-[760px]:!pb-[18px] max-[390px]:!px-[10px]">
        <section className="!mb-[13px] !flex !items-end !justify-between !gap-3 max-[430px]:!flex-col max-[430px]:!items-start max-[430px]:!gap-[7px]">
          <div>
            <h1 className="!m-0 !text-[clamp(16px,2.15vw,21px)] !font-bold !leading-[1.25] !text-[#202820]">Selamat Datang, {currentUser?.username ?? "Admin"} 👋</h1>
            <p className="!mt-[3px] !text-[8px] !leading-[1.4] !text-[#6c7569]">Berikut ringkasan aktivitas pasar Oro-Oro Dowo hari ini.</p>
          </div>
          <div className="!mb-px !inline-flex !shrink-0 !items-center !gap-[5px] !whitespace-nowrap !rounded-full !bg-[#ffbd1b] !px-[9px] !py-[5px] !text-[7px] !text-white">
            <i className="fa-regular fa-calendar" aria-hidden="true" />
            <span>{dateLabel}</span>
            <span className="!opacity-70">•</span>
            <span>Pasar Aktif</span>
          </div>
        </section>

        <StatCards />

        <div className="!grid !grid-cols-[minmax(0,2.1fr)_minmax(150px,1fr)] !items-stretch !gap-3 !m-0 max-[980px]:!grid-cols-[minmax(0,1.8fr)_minmax(140px,1fr)] max-[980px]:!gap-[9px] max-[760px]:!grid-cols-[minmax(0,1.5fr)_minmax(135px,1fr)] max-[430px]:!grid-cols-[minmax(0,1fr)]">
          <div className="!grid !grid-rows-[auto_auto] !content-start !gap-[11px] !min-w-0 max-[430px]:!gap-[10px]">
            <Peringkat />
            <PromoAktif />
          </div>

          <div className="!grid !grid-rows-[auto_auto] !content-start !gap-[11px] !min-w-0 max-[430px]:!gap-[10px]">
            <RiwayatAktivitas />
            <CapacityPanel />
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}