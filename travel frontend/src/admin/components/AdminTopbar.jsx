import { useLocation } from 'react-router-dom';
import { adminRoutes } from '../routes.jsx';
import { Bell, Search } from 'lucide-react';

export default function AdminTopbar() {
  const { pathname } = useLocation();

  const current = adminRoutes.find((r) => {
    if (r.index) return pathname === '/admin' || pathname === '/admin/';
    return pathname.startsWith(`/admin/${r.path}`);
  });

  const pageLabel = current?.label ?? 'Admin';

  return (
    <header style={{
      height: '64px',
      background: '#fff',
      borderBottom: '1px solid #f1f5f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      gap: '16px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    }}>

      {/* Left — Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>Admin</span>
        <span style={{ color: '#cbd5e1', fontSize: '14px' }}>/</span>
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{pageLabel}</span>
      </div>

      {/* Center — Search bar */}
      <div style={{
        flex: 1,
        maxWidth: '360px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '7px 14px',
      }}>
        <Search size={14} color="#94a3b8" />
        <input
          type="text"
          placeholder="Quick search..."
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '13px',
            color: '#475569',
            width: '100%',
          }}
        />
      </div>

      {/* Right — actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Notification bell */}
        <button style={{
          position: 'relative',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          width: '38px',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <Bell size={16} color="#475569" />
          <span style={{
            position: 'absolute',
            top: '7px',
            right: '7px',
            width: '7px',
            height: '7px',
            background: '#ef4444',
            borderRadius: '50%',
            border: '1.5px solid #fff',
          }} />
        </button>

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '13px',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(99,102,241,0.35)',
          }}>A</div>
          <div>
            <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#0f172a', lineHeight: 1.2 }}>Admin</p>
            <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', lineHeight: 1.2 }}>admin@tit.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
