import Link from "next/link";
import KapasitasKios from "./components/KapasitasToko";
import LogoutButton from "./components/LogoutButton";
import PromoAktif from "./components/PromoAktif";
import { StatCards } from "./components/RingkasanAktifitas";
import RiwayatAktivitas from "./components/RiwayatAktifitas";

const navigation = [
  { label: "Dashboard", href: "/Dashboard", icon: "fa-table-cells-large", active: true },
  { label: "Kelola Toko", href: "/Kelola%20Toko", icon: "fa-store" },
  { label: "Kategori", href: "/Kategori", icon: "fa-layer-group" },
  { label: "Kelola Promo", href: "/Kelola%20Promo", icon: "fa-tags" },
  { label: "Pengguna", href: "/Pengguna", icon: "fa-users" },
  { label: "Penjual", href: "/Penjual", icon: "fa-shop" },
  { label: "Pengaturan", href: "/Penggaturan", icon: "fa-gear" },
];

const sellers = [
  { name: "Lumpur Kentang", location: "Kue Lumpur Kentang • Blok A-04", orders: "320 transaksi", sales: "90%", icon: "fa-bowl-food", color: "bg-[#f5e6bc]" },
  { name: "Klepon Ku", location: "Klepon Ku • Blok A-12", orders: "248 transaksi", sales: "75%", icon: "fa-cookie-bite", color: "bg-[#dcebc4]" },
  { name: "Bakso Goreng Ayam Bangkit", location: "Bakso Goreng • Blok A-10", orders: "290 transaksi", sales: "85%", icon: "fa-burger", color: "bg-[#f5e6bc]" },
];

function SellerRanking() {
  return (
    <section className="rounded-xl border border-[#e8e9df] bg-white p-3 shadow-sm sm:p-4">
      <header className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-[11px] font-bold text-[#594045] sm:text-xs">
          <i className="fa-solid fa-award text-[#4b6515]" aria-hidden="true" />
          Peringkat Teratas Penjual
        </h2>
        <select aria-label="Periode peringkat" defaultValue="Minggu ini" className="rounded-md border border-[#e1e7d6] bg-[#f7f9f2] px-2 py-1 text-[8px] text-[#4d5948]">
          <option>Minggu ini</option>
          <option>Bulan ini</option>
        </select>
      </header>
      <div className="divide-y divide-[#eef0e8]">
        {sellers.map((seller, index) => (
          <article key={seller.name} className="flex items-center gap-2 py-2">
            <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${seller.color} text-[#596641]`}>
              <i className={`fa-solid ${seller.icon} text-[10px]`} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <strong className="truncate text-[9px] font-semibold text-[#594045]">{index + 1}. {seller.name}</strong>
                <span className="shrink-0 text-[8px] text-[#66705f]">{seller.orders}</span>
              </div>
              <div className="mt-0.5 flex items-center justify-between gap-2">
                <small className="truncate text-[8px] text-[#7a8176]">{seller.location}</small>
                <strong className="text-[8px] text-[#4b6515]">{seller.sales}</strong>
              </div>
              <progress
                className="mt-1 block h-1 w-full appearance-none rounded-full bg-[#edf0e6] accent-[#8aa93d] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[#edf0e6] [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-[#8aa93d] [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-[#8aa93d]"
                max={100}
                value={Math.min(100, Math.max(0, Number.parseFloat(seller.sales) || 0))}
                aria-label={`Performa ${seller.name}`}
              />
            </div>
          </article>
        ))}
      </div>
      <Link href="/Penjual" className="mt-2 block rounded-md bg-[#ffbf18] py-1.5 text-center text-[8px] font-semibold text-[#493600] hover:bg-[#f3b20b]">
        Lihat Semua Penjual <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f3f3f3] p-2 text-[#594045] sm:p-4">
      <h1 className="mb-2 text-sm font-medium text-[#b1b1b1] sm:text-base">Admin Dashboard</h1>
      <div className="mx-auto flex min-h-[calc(100vh-58px)] w-full max-w-[1440px] overflow-hidden border border-[#dce8c9] bg-[#e8f3d3] shadow-sm">
        <aside className="hidden w-[150px] shrink-0 flex-col bg-[#d9eab4] p-2.5 md:flex lg:w-[175px]">
          <Link href="/Dashboard" className="mb-3 flex items-center gap-2 px-1">
            <i className="fa-solid fa-landmark text-xl text-[#587a25]" aria-hidden="true" />
            <span>
              <strong className="block text-[9px] leading-tight text-[#304622]">Pasar Oro-Oro Dowo</strong>
              <small className="block text-[7px] font-semibold tracking-wide text-[#526a37]">ADMIN PANEL</small>
            </span>
          </Link>
          <nav className="grid gap-1" aria-label="Navigasi admin">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={`flex min-h-7 items-center gap-2 rounded-md px-2 text-[9px] transition ${
                  item.active ? "bg-[#ffbf18] font-semibold text-white" : "text-[#394b32] hover:bg-white/50"
                }`}
              >
                <i className={`fa-solid ${item.icon} w-3 text-center`} aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto rounded-lg bg-[#c2dc80] p-2 text-[7px] text-[#3b5426]">
            <strong className="block text-[8px]">Status Pasar</strong>
            <span><i className="fa-solid fa-circle text-[5px] text-[#4b8c3b]" aria-hidden="true" /> Operasional Aktif</span>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex min-h-10 items-center justify-between gap-2 border-b border-[#dce8c9] bg-[#edf5df] px-3 sm:px-4">
            <label className="hidden min-w-0 max-w-[250px] flex-1 items-center gap-2 rounded-full border border-[#e1e8d5] bg-white px-3 py-1.5 sm:flex">
              <i className="fa-solid fa-magnifying-glass text-[9px] text-[#74806c]" aria-hidden="true" />
              <input className="w-full min-w-0 bg-transparent text-[8px] outline-none" placeholder="Cari toko, produk, atau pengguna..." aria-label="Cari di dashboard" />
            </label>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden text-[8px] text-[#66705f] sm:inline">
                Hari ini <span aria-hidden="true">•</span> Pasar Aktif
              </span>
              <span className="grid size-6 place-items-center rounded-full bg-white text-[9px] text-[#4b6515]">
                <i className="fa-regular fa-bell" aria-hidden="true" />
              </span>
              <span className="rounded-full border border-[#dce5cf] bg-white px-2 py-1 text-right">
                <strong className="block text-[7px] leading-tight">Admin</strong>
                <small className="block text-[6px] leading-tight text-[#667061]">Super Admin</small>
              </span>
              <LogoutButton />
            </div>
          </header>

          <div className="min-w-0 flex-1 px-3 py-3 sm:px-4 sm:py-4 lg:px-5">
            <div className="mb-3 flex items-start justify-between gap-2 md:hidden">
              <nav className="flex flex-wrap gap-1" aria-label="Navigasi admin">
                {navigation.map((item) => (
                  <Link key={item.label} href={item.href} className={`rounded px-2 py-1 text-[8px] ${item.active ? "bg-[#ffbf18] font-semibold" : "bg-white/70"}`}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <section className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold leading-tight text-[#594045] sm:text-base">Selamat Datang, Admin 👋</h2>
                <p className="mt-0.5 text-[9px] text-[#74666a] sm:text-[10px]">Berikut ringkasan aktivitas pasar Oro-Oro Dowo hari ini.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff1c7] px-2 py-1 text-[7px] font-semibold text-[#765a17] sm:hidden">
                <i className="fa-regular fa-calendar" aria-hidden="true" /> Hari ini · Pasar Aktif
              </span>
            </section>

            <div className="[&>section]:mb-3 [&>section]:gap-2 [&>section>a]:rounded-lg [&>section>a]:p-2.5 [&>section>div]:rounded-lg [&>section>div]:p-2.5">
              <StatCards />
            </div>

            <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1.45fr)_minmax(220px,0.85fr)]">
              <SellerRanking />
              <RiwayatAktivitas />
            </div>

            <div className="mt-3 grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1.45fr)_minmax(220px,0.85fr)]">
              <PromoAktif />
              <KapasitasKios />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
