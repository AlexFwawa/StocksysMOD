import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/imagenes/logo1.jpeg';
import SettingsModal from '../ui/SettingsModal';

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [informesOpen, setInformesOpen] = useState(false);
  const userName = localStorage.getItem('user') || 'Admin';

  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: (
        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
      ),
    },

    {
      path: '/ventas',
      label: 'Ventas',
      icon: (
        <svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" /></svg>
      ),
    },
  ];

  const handleLogout = () => {
    setMobileOpen(false);
    onLogout();
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Abrir menú"
      >
        <svg viewBox="0 0 24 24">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <img src={logo} alt="BFP Systems" className="sidebar-brand-logo" />
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name">BFP Systems</span>
            <span className="sidebar-brand-sub">Gestión de Stock</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <span className="sidebar-nav-label">Menú principal</span>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <div className="sidebar-nav-group">
            <button
              className="sidebar-nav-item"
              onClick={() =>
                setInformesOpen(!informesOpen)
              }>
              <span className="sidebar-nav-icon">
                <svg viewBox="0 0 24 24">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </span>
              Informes
            </button>

            {informesOpen && (

              <div
                style={{
                  paddingLeft: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem"
                }}
              >
                <Link
                  to="/informes"
                  className="sidebar-nav-item"
                >
                  Movimientos
                </Link>

                <Link
                  to="/auditoria"
                  className="sidebar-nav-item"
                >
                  Auditoría
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {/* Settings button */}
          <button className="sidebar-theme-toggle" onClick={() => setSettingsOpen(true)} aria-label="Ajustes">
            <svg viewBox="0 0 24 24"><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /><circle cx="12" cy="12" r="3" /></svg>
            Ajustes
          </button>

          {/* Manual */}
          <a
            href="http://localhost:8081"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-theme-toggle"
            aria-label="Manual"
            style={{
              textDecoration: "none"
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 0 4 24V4.5A2.5 2.5 0 0 1 6.5 2Z" />
            </svg>
            Manual
          </a>

          {/* User */}
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{userName}</div>
              <div className="sidebar-user-role">Administrador</div>
            </div>
            <button
              className="sidebar-logout-btn"
              onClick={handleLogout}
              title="Cerrar sesión"
              aria-label="Cerrar sesión"
            >
              <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
};

export default Sidebar;
