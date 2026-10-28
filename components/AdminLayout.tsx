import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoAuth, type UserRole } from "../auth/DemoAuthContext";
import { useAuth } from "../lib/user-auth";

const navigation = [
  { id: "dashboard",  label: "Dashboard",    icon: "fa-house",        path: "/dashboard" },
  { id: "stores",     label: "Kelola Toko",  icon: "fa-shopping-bag", path: "/kelola-toko" },
  { id: "categories", label: "Kategori",     icon: "fa-tag",          path: "/kategori" },
  { id: "promos",     label: "Kelola Promo", icon: "fa-fire",         path: "/kelola-promo" },
  { id: "users",      label: "Pengguna",     icon: "fa-user",         path: "/pengguna" },
  { id: "sellers",    label: "Penjual",      icon: "fa-store",        path: "/Penjual" },
  { id: "settings",   label: "Pengaturan",   icon: "fa-gear",         path: "/pengaturan" },
];

const sellerNavigationIds = new Set(["stores", "promos", "sellers"]);

type AdminLayoutProps = {
  activePage?: string;
  label: string;
  children: ReactNode;
};

export default function AdminLayout({ activePage, label, children }: AdminLayoutProps) {
  const router = useRouter();
    const { currentUser, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    document.title = `${label.replace(/^Admin /, "")} - Pasar Oro-Oro Dowo`;
  }, [label]);

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <div
      className={`app-container grid min-h-screen w-full grid-cols-1 text-[#222a21] bg-[#e9f2d2]
        ${sidebarCollapsed
          ? "md:grid-cols-[72px_minmax(0,1fr)]"
          : "md:grid-cols-[260px_minmax(0,1fr)]"
        } max-[760px]:grid-cols-1`}
    >
      {/* ── SIDEBAR ─────────────────────────────────────── */}
      <aside
        className={`sidebar sticky top-0 row-span-1 flex h-screen min-w-0 flex-col
          border-r border-[#496d2e]/10 bg-[#dcebb8]
          py-5
          max-[760px]:fixed max-[760px]:left-0 max-[760px]:top-0 max-[760px]:z-30
          max-[760px]:h-dvh max-[760px]:w-[260px]
          max-[760px]:shadow-[12px_0_24px_rgba(43,39,42,0.10)]
          max-[760px]:transition-transform max-[760px]:duration-300
          ${sidebarCollapsed ? "items-center px-2 max-[760px]:-translate-x-full" : "px-4"}`}
      >
        {/* Brand */}
        <div
          className={`sidebar-brand flex items-center gap-3 pb-6 border-b border-[#496d2e]/10
            ${sidebarCollapsed ? "flex-col gap-1 justify-center" : ""}`}
        >
          <div className="logo-roof-icon h-10 w-10 shrink-0 overflow-hidden">
            <img
              className="h-full w-full object-contain object-center"
              src="/assets/logo-pasar.png"
              alt="Pasar Oro-Oro Dowo"
            />
          </div>
          <div
            className={`brand-text flex min-w-0 flex-col leading-tight text-[#3a4d2b]
              ${sidebarCollapsed ? "hidden" : "items-start"}`}
          >
            <span className="brand-name text-sm font-bold">Pasar Oro-Oro Dowo</span>
            <span className="brand-subtitle mt-0.5 text-xs text-[#59664d]">Admin Panel</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav mt-4 grid w-full gap-1" aria-label="Navigasi utama">
          {getNavigationForRole(currentUser?.role).map((item) => (
            <Link
              key={item.id}
              href={item.path}
              aria-current={activePage === item.id ? "page" : undefined}
              title={sidebarCollapsed ? item.label : undefined}
              className={`nav-item flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2.5
                text-sm font-medium text-[#4b5842] transition-colors
                hover:bg-[#c2dc80]/60
                ${activePage === item.id ? "bg-[#ffb817] text-white shadow-sm" : ""}
                ${sidebarCollapsed ? "justify-center px-0" : ""}`}
            >
              <i className={`fa-solid ${item.icon} w-5 shrink-0 text-center text-base`} />
              <span className={sidebarCollapsed ? "hidden" : ""}>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Status Pasar */}
        <div
          className={`market-status mt-auto flex items-center gap-3 rounded-xl bg-white/60 p-3
            text-sm text-[#4b6734]
            ${sidebarCollapsed ? "hidden" : ""}`}
        >
          <span className="text-base"><i className="fa-solid fa-circle-check text-green-600" /></span>
          <div className="flex flex-col">
            <strong className="text-sm">Status Pasar</strong>
            <small className="text-xs text-[#6a7a5a]">Operasional Aktif</small>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────── */}
      <div className="main-content flex min-h-0 min-w-0 flex-col overflow-y-auto bg-[#e9f2d2]">
        {/* Topbar */}
        <header
          className="topbar sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between
            gap-4 border-b border-[#496d2e]/15 bg-[#f8faef] px-6
            max-[760px]:px-4 max-[520px]:gap-2 max-[520px]:px-3"
        >
          <div className="topbar-left flex min-w-0 flex-1 items-center gap-3">
            <button
              className="menu-toggle grid h-9 w-9 shrink-0 place-items-center rounded-xl
                bg-white/70 text-[#222a21] hover:bg-white transition-colors"
              type="button"
              aria-label="Toggle Menu"
              aria-expanded={!sidebarCollapsed}
              onClick={() => setSidebarCollapsed((c) => !c)}
            >
              <i className="fa-solid fa-bars text-base" />
            </button>

            <label
              className="search-input-wrapper flex h-10 w-full max-w-[340px] min-w-0
                items-center gap-2.5 rounded-full bg-white px-4 text-[#65714f]
                border border-[#496d2e]/10 focus-within:border-[#496d2e]/40
                focus-within:ring-2 focus-within:ring-[#dcebb8] transition-all"
            >
              <i className="fa-solid fa-magnifying-glass text-sm" />
              <input
                className="w-full min-w-0 border-0 bg-transparent text-sm outline-none
                  placeholder:text-[#8a9082]"
                type="search"
                placeholder="Cari toko, produk, atau pedagang..."
                aria-label="Cari"
              />
            </label>
          </div>

          <div className="topbar-right flex shrink-0 items-center gap-3 max-[520px]:gap-2">
            {/* Notifikasi */}
            <div
              className="notification-box relative grid h-9 w-9 place-items-center
                rounded-xl bg-white/70 text-[#38442b] hover:bg-white transition-colors cursor-pointer"
              aria-label="Notifikasi"
            >
              <i className="fa-regular fa-bell text-base" />
              <span className="dot-badge absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#e54b3d]" />
            </div>

            {/* Profile */}
            <div
              className="admin-profile flex items-center gap-2.5 border-l border-[#496d2e]/15
                pl-3 max-[520px]:hidden"
            >
              <div
                className="profile-avatar grid h-9 w-9 place-items-center rounded-full
                  bg-[#4f681b] text-sm text-white font-semibold"
              >
                {currentUser?.username?.charAt(0).toUpperCase() ?? "A"}
              </div>
              <div className="profile-meta flex min-w-0 flex-col">
                <span className="admin-name text-sm font-semibold text-[#343d2b] truncate max-w-[120px]">
                  {currentUser?.username ?? "Admin"}
                </span>
                <span className="admin-role text-xs text-[#6c7569]">Super Admin</span>
              </div>
            </div>

            {/* Logout */}
            <button
              className="logout-button inline-flex min-h-9 items-center justify-center gap-2
                rounded-xl border border-[#496d2e]/20 bg-white px-4 py-2
                text-sm font-semibold text-[#496d2e]
                hover:bg-[#c8e587] transition-colors
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#496d2e]
                max-[520px]:w-9 max-[520px]:px-0"
              type="button"
              onClick={handleLogout}
              aria-label="Keluar"
            >
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