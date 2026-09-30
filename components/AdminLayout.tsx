import { useEffect, useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    document.title = `${label.replace(/^Admin /, "")} - Pasar Oro-Oro Dowo`;
  }, [label]);

  return (
    <div className={`app-container${sidebarCollapsed ? " sidebar-collapsed" : ""}`}>
      <div className="page-label">{label}</div>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="logo-roof-icon">
            <svg viewBox="0 0 100 60" width="48" height="32" fill="#bc3b5c" aria-hidden="true">
              <path d="M50 2 L10 20 L15 20 L15 25 L5 30 L95 30 L85 25 L85 20 L90 20 Z" />
              <rect x="20" y="32" width="60" height="4" />
              <rect x="10" y="38" width="80" height="5" />
              <rect x="5" y="45" width="90" height="6" />
            </svg>
          </div>
          <div className="brand-text"><span>Pasar</span><span>Oro-Oro Dowo</span><span className="brand-subtitle">Admin Panel</span></div>
        </div>
        <nav className="sidebar-nav" aria-label="Navigasi utama">
          {navigation.map((item) => (
            <NavLink className={`nav-item${activePage === item.id ? " active" : ""}`} to={item.path} key={item.id} aria-current={activePage === item.id ? "page" : undefined}>
              <i className={`fa-solid ${item.icon}`} /><span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-toggle" type="button" aria-label="Toggle Menu" aria-expanded={!sidebarCollapsed} onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}><i className="fa-solid fa-bars" /></button>
            <label className="search-input-wrapper"><i className="fa-solid fa-magnifying-glass search-icon" /><input type="search" placeholder="Cari toko, produk, atau pedagang..." aria-label="Cari" /></label>
          </div>
          <div className="topbar-right">
            <div className="notification-box" aria-label="Notifikasi"><i className="fa-regular fa-bell" /><span className="dot-badge" /></div>
            <div className="admin-profile"><div className="profile-avatar"><i className="fa-solid fa-user" /></div><div className="profile-meta"><span className="admin-name">Admin</span><span className="admin-role">Super Admin</span></div></div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}