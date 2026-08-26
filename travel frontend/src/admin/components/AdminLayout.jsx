import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar.jsx';
import AdminTopbar from './AdminTopbar.jsx';

/**
 * AdminLayout — Admin ka apna layout.
 * Frontend ka Navbar/Footer yahan nahi aata.
 * Sidebar fixed left, Topbar fixed top, baaki sab scroll karta hai.
 */
export default function AdminLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#f4f6fb' }}>

      {/* ── Fixed Sidebar ── */}
      <AdminSidebar />

      {/* ── Right side: Topbar + Scrollable content ── */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        <AdminTopbar />

        {/* Page content — yahan sirf ye scroll karta hai */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <Outlet />
        </main>
      </div>

    </div>
  );
}
