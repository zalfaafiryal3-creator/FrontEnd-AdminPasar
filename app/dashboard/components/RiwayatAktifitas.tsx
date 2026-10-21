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
    <section className="!h-auto !min-h-0 !min-w-0 !rounded-[9px] !border-0 !bg-white !px-[11px] !py-3 !shadow-[0_2px_6px_rgba(66,87,31,0.06)] min-[1200px]:!p-[15px] max-[430px]:!p-3">
      <div className="!mb-[9px] !flex !items-center !justify-between !gap-[5px]">
        <h2 className="!m-0 !flex !items-center !gap-[5px] !whitespace-nowrap !text-[8px] !font-bold !leading-[1.3] !text-[#202820]"><i className="fa-solid fa-clock-rotate-left !text-[8px] !text-[#3d6945]" /> Riwayat Aktivitas</h2>
        <a href="#aktivitas" className="!whitespace-nowrap !text-[6px] !font-semibold !text-[#436b3e] !no-underline focus-visible:!outline-2 focus-visible:!outline-solid focus-visible:!outline-offset-2 focus-visible:!outline-[#668c2e]">Lihat Semua</a>
      </div>
      <div className="!grid !gap-[6px]" id="aktivitas">
        {activities.map((activity) => (
          <article className="!grid !min-h-[43px] !grid-cols-[22px_minmax(0,1fr)_auto] !items-center !gap-[5px] !rounded-[6px] !bg-[#f2f7e4] !p-[5px] max-[430px]:!grid-cols-[25px_minmax(0,1fr)_auto] max-[430px]:!min-h-[48px]" key={activity.name}>
            <span className={`!grid !h-5 !w-5 !place-items-center !rounded-full !bg-[#d9efcf] !text-[7px] !text-[#4c784b] ${activity.tone === "failed" ? "!bg-[#ffe1db] !text-[#e34a43]" : ""} ${activity.tone === "updated" ? "!bg-[#ecebdd] !text-[#7c7763]" : ""} max-[430px]:!h-[23px] max-[430px]:!w-[23px]`}><i className={`fa-solid ${activity.icon}`} /></span>
            <div className="!min-w-0">
              <div className="!grid !gap-[2px] !text-[6px] !leading-[1.25] !text-[#30382b] max-[430px]:!text-[8px]">
                <strong>{activity.name}</strong>
                <span className="!text-[6px] !leading-[1.25] !text-[#62695b] max-[430px]:!text-[8px]">{activity.action}</span>
              </div>
              <div className="!mt-[2px] !text-[5px] !leading-[1.2] !text-[#777d70] max-[430px]:!text-[6px]">IP: {activity.ip}</div>
            </div>
            <div className="!grid !justify-items-end !gap-1">
              <span className={`!h-auto !min-w-0 !rounded-full !bg-[#d8efc9] !px-[5px] !py-[3px] !text-[5px] !leading-none !text-[#39743c] !normal-case ${activity.tone === "failed" ? "!bg-[#ffe1db] !text-[#cb453b]" : ""} ${activity.tone === "updated" ? "!bg-[#e7e7df] !text-[#676858]" : ""} max-[430px]:!text-[6px]`}>{activity.status}</span>
              <span className="!whitespace-nowrap !text-[5px] !text-[#767d70] max-[430px]:!text-[6px]">{activity.time}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}