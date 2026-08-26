import { NavLink, useNavigate } from 'react-router-dom';
import { adminRoutes } from '../routes.jsx';
import { Plane, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const sidebarStyle = {
  width: '240px',
  minWidth: '240px',
  height: '100vh',
  background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 60%, #1e1b4b 100%)',
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid rgba(255,255,255,0.06)',
};

const logoWrapStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '22px 20px 18px',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
};

const logoIconStyle = {
  width: '38px',
  height: '38px',
  borderRadius: '10px',
  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
};

const sectionLabelStyle = {
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: 'rgba(255,255,255,0.3)',
  textTransform: 'uppercase',
  padding: '18px 20px 6px',
};

const footerStyle = {
  padding: '16px 20px',
  borderTop: '1px solid rgba(255,255,255,0.08)',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const avatarStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '13px',
  fontWeight: 700,
  color: '#fff',
};

export default function AdminSidebar() {
  const navItems = adminRoutes.filter((r) => r.showInNav);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <aside style={sidebarStyle}>
      {/* Logo */}
      <div style={logoWrapStyle}>
        <div style={logoIconStyle}>
          <Plane size={17} color="#fff" />
        </div>
        <div>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: '14px', margin: 0, lineHeight: 1.2 }}>
            TIT Travel
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', margin: 0 }}>
            Admin Panel
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 12px', overflowY: 'auto' }}>
        <p style={sectionLabelStyle}>Main Menu</p>
        {navItems.map((route, i) => {
          const Icon = route.icon;
          const to = route.index ? '/admin' : `/admin/${route.path}`;
          return (
            <NavLink
              key={i}
              to={to}
              end={!!route.index}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '11px',
                padding: '10px 12px',
                borderRadius: '10px',
                marginBottom: '2px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(99,102,241,0.9), rgba(139,92,246,0.7))'
                  : 'transparent',
                boxShadow: isActive ? '0 4px 12px rgba(99,102,241,0.3)' : 'none',
                transition: 'all 0.18s ease',
              })}
            >
              {Icon && <Icon size={17} />}
              <span>{route.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer user */}
      <div style={footerStyle}>
        <div style={avatarStyle}>A</div>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#fff', fontSize: '12px', fontWeight: 600, margin: 0, lineHeight: 1.3 }}>Admin</p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px', margin: 0 }}>Super Admin</p>
        </div>
        <button onClick={handleLogout} title="Logout" style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
          display: 'flex', alignItems: 'center', opacity: 0.5,
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.5}
        >
          <LogOut size={16} color="#fff" />
        </button>
      </div>
    </aside>
  );
}
