import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoAuth, type UserRole } from "../auth/DemoAuthContext";

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: "fa-house", path: "/dashboard" },
  { id: "stores", label: "Kelola Toko", icon: "fa-shopping-bag", path: "/kelola-toko" },
  { id: "categories", label: "Kategori", icon: "fa-tag", path: "/kategori" },
  { id: "promos", label: "Kelola Promo", icon: "fa-fire", path: "/kelola-promo" },
  { id: "users", label: "Pengguna", icon: "fa-user", path: "/pengguna" },
  { id: "sellers", label: "Penjual", icon: "fa-store", path: "/Penjual" },
  { id: "settings", label: "Pengaturan", icon: "fa-gear", path: "/pengaturan" },
];

const sellerNavigationIds = new Set(["stores", "promos", "sellers"]);

type AdminLayoutProps = {
  activePage?: string;
  label: string;
  children: ReactNode;
};

export default function AdminLayout({ activePage, label, children }: AdminLayoutProps) {
  const router = useRouter();
  const { currentUser, logout } = useDemoAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    document.title = `${label.replace(/^Admin /, "")} - Pasar Oro-Oro Dowo`;
  }, [label]);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <div className={`app-container grid min-h-screen w-full grid-cols-1 text-[#222a21] md:grid-cols-[clamp(112px,20vw,232px)_minmax(0,1fr)] max-[760px]:grid-cols-1 ${activePage === "dashboard" ? "dashboard-layout bg-[#e9f2d2] md:grid-cols-[clamp(142px,20.5vw,238px)_minmax(0,1fr)]" : "bg-[#e9f2d2]"} ${sidebarCollapsed ? "md:grid-cols-[64px_minmax(0,1fr)]" : ""}`}>
      <aside className={`sidebar sticky top-0 row-span-1 flex h-screen min-w-0 flex-col border-r border-[#496d2e]/10 bg-[#dcebb8] px-2 py-3 max-[760px]:fixed max-[760px]:left-0 max-[760px]:top-0 max-[760px]:z-30 max-[760px]:h-dvh max-[760px]:w-[200px] max-[760px]:shadow-[12px_0_18px_rgba(43,39,42,0.08)] max-[760px]:transition-transform max-[760px]:duration-300 ${sidebarCollapsed ? "items-center max-[760px]:-translate-x-full" : ""}`}>
        <div className={`sidebar-brand flex min-h-9 items-center gap-1.5 pb-2.5 text-[#415b2c] ${sidebarCollapsed ? "flex-col" : ""}`}>
          <div className="logo-roof-icon h-[30px] w-9 shrink-0 overflow-hidden">
            <img className="h-full w-full object-contain object-center" src="/assets/logo%20pasar%20oro%20oro.png" alt="Pasar Oro-Oro Dowo" />
          </div>
          <div className={`brand-text flex min-w-0 flex-col text-[7px] leading-tight text-[#3a4d2b] ${sidebarCollapsed ? "hidden" : "items-start"}`}>
            <span className="brand-name max-w-[65px] font-bold">Pasar Oro-Oro Dowo</span>
            <span className="brand-subtitle mt-px text-[6px] text-[#59664d]">Admin Panel</span>
          </div>
        </div>
        <nav className="sidebar-nav mt-1 grid w-full gap-0.5" aria-label="Navigasi utama">
          {getNavigationForRole(currentUser?.role).map((item) => (
            <Link
              className={`nav-item flex min-h-[30px] items-center gap-2 rounded-md px-1.5 py-1 text-[9px] leading-tight font-medium text-[#4b5842] transition-colors hover:bg-[#c2dc80]/60 ${activePage === item.id ? "active bg-[#ffb817] text-white" : ""} ${sidebarCollapsed ? "justify-center px-0" : ""}`}
              href={item.path}
              key={item.id}
              aria-current={activePage === item.id ? "page" : undefined}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <i className={`fa-solid ${item.icon} w-3 shrink-0 text-center text-[10px]`} /><span className={sidebarCollapsed ? "hidden" : ""}>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className={`market-status mt-auto flex items-center gap-2 rounded-md bg-white/60 p-2 text-[8px] text-[#4b6734] ${sidebarCollapsed ? "hidden" : ""}`}>
          <span><i className="fa-solid fa-gear" /></span><div className="flex flex-col"><strong>Status Pasar</strong><small>Operasional Aktif</small></div>
        </div>
      </aside>
      <div className="main-content flex min-h-0 min-w-0 flex-col overflow-y-auto bg-[#e9f2d2]">
        <header className="topbar sticky top-0 z-10 flex h-10 shrink-0 items-center justify-between gap-2 border-b border-[#496d2e]/15 bg-[#f8faef] px-3.5 max-[760px]:px-4 max-[520px]:gap-2 max-[520px]:px-3.5">
          <div className="topbar-left flex min-w-0 flex-1 items-center gap-2.5">
            <button className={`menu-toggle grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/70 text-[#222a21] ${activePage === "dashboard" ? "hidden max-[760px]:grid" : activePage === "sellers" ? "max-[760px]:grid md:hidden" : ""}`} type="button" aria-label="Toggle Menu" aria-expanded={!sidebarCollapsed} onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}><i className="fa-solid fa-bars" /></button>
            <label className="search-input-wrapper flex h-[27px] w-full max-w-[270px] min-w-0 items-center gap-2 rounded-full bg-white px-2.5 text-[#65714f]"><i className="fa-solid fa-magnifying-glass search-icon text-[10px]" /><input className="w-full min-w-0 border-0 bg-transparent text-[9px] outline-none placeholder:text-[#8a9082]" type="search" placeholder="Cari toko, produk, atau pedagang..." aria-label="Cari" /></label>
          </div>
          <div className="topbar-right flex shrink-0 items-center gap-2 max-[520px]:gap-2">
            <div className="notification-box relative grid h-[26px] w-6 place-items-center text-xs text-[#38442b]" aria-label="Notifikasi"><i className="fa-regular fa-bell" /><span className="dot-badge absolute right-0.5 top-1 h-1.5 w-1.5 rounded-full bg-[#e54b3d]" /></div>
            <div className="admin-profile flex items-center gap-1.5 border-l border-[#496d2e]/15 pl-2 max-[520px]:hidden"><div className="profile-avatar order-2 grid h-[21px] w-[21px] place-items-center rounded-full bg-[#4f681b] text-[9px] text-white"><i className="fa-solid fa-user" /></div><div className="profile-meta flex min-w-0 flex-col items-end"><span className="admin-name text-[8px] font-semibold text-[#343d2b]">{currentUser?.username ?? "Admin"}</span><span className="admin-role text-[7px] text-[#6c7569]">Super Admin</span></div></div>
            <button className="logout-button inline-flex min-h-6 items-center justify-center gap-1.5 rounded-md border border-[#496d2e]/20 bg-white px-2 py-1 text-[8px] font-semibold text-[#496d2e] hover:bg-[#c8e587] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#496d2e] max-[520px]:w-8 max-[520px]:px-0" type="button" onClick={handleLogout} aria-label="Keluar">
              <i className="fa-solid fa-right-from-bracket" aria-hidden="true" />
              <span className="max-[520px]:hidden">Keluar</span>
            </button>
          </div>
        </header>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

function getNavigationForRole(role: UserRole | undefined) {
  return role === "seller"
    ? navigation.filter((item) => sellerNavigationIds.has(item.id))
    : navigation;
}