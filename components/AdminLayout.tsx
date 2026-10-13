import { useEffect, useState, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDemoAuth } from "../auth/DemoAuthContext";

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: "fa-house", path: "/dashboard" },
  { id: "stores", label: "Kelola Toko", icon: "fa-shopping-bag", path: "/kelola-toko" },
  { id: "categories", label: "Kategori", icon: "fa-tag", path: "/kategori" },
  { id: "promos", label: "Kelola Promo", icon: "fa-fire", path: "/kelola-promo" },
  { id: "users", label: "Pengguna", icon: "fa-user", path: "/pengguna" },
  { id: "sellers", label: "Penjual", icon: "fa-store", path: "/penjual" },
  { id: "settings", label: "Pengaturan", icon: "fa-gear", path: "/pengaturan" },
];

type AdminLayoutProps = {
  activePage?: string;
  label: string;
  children: ReactNode;
};

export default function AdminLayout({ activePage, label, children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const { currentUser, logout } = useDemoAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    document.title = `${label.replace(/^Admin /, "")} - Pasar Oro-Oro Dowo`;
  }, [label]);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className={`app-container${sidebarCollapsed ? " sidebar-collapsed" : ""}${activePage === "dashboard" ? " dashboard-layout" : ""}`}>
      <div className="page-label">{label}</div>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="logo-roof-icon">
            <img src="/assets/logo%20pasar%20oro%20oro.png" alt="Pasar Oro-Oro Dowo" />
          </div>
          <div className="brand-text">
            <span className="brand-name">Pasar Oro-Oro Dowo</span>
            <span className="brand-subtitle">Admin Panel</span>
          </div>
        </div>
        <nav className="sidebar-nav" aria-label="Navigasi utama">
          {navigation.map((item) => (
            <NavLink className={`nav-item${activePage === item.id ? " active" : ""}`} to={item.path} key={item.id} aria-current={activePage === item.id ? "page" : undefined}>
              <i className={`fa-solid ${item.icon}`} /><span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="market-status"><span><i className="fa-solid fa-gear" /></span><div><strong>Status Pasar</strong><small>Operasional Aktif</small></div></div>
      </aside>
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-toggle" type="button" aria-label="Toggle Menu" aria-expanded={!sidebarCollapsed} onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}><i className="fa-solid fa-bars" /></button>
            <label className="search-input-wrapper"><i className="fa-solid fa-magnifying-glass search-icon" /><input type="search" placeholder="Cari toko, produk, atau pedagang..." aria-label="Cari" /></label>
          </div>
          <div className="topbar-right">
            <div className="notification-box" aria-label="Notifikasi"><i className="fa-regular fa-bell" /><span className="dot-badge" /></div>
            <div className="admin-profile"><div className="profile-avatar"><i className="fa-solid fa-user" /></div><div className="profile-meta"><span className="admin-name">{currentUser?.username ?? "Admin"}</span><span className="admin-role">Super Admin</span></div></div>
            <button className="logout-button" type="button" onClick={handleLogout} aria-label="Keluar">
              <i className="fa-solid fa-right-from-bracket" aria-hidden="true" />
              <span>Keluar</span>
            </button>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}