import {
  Users, MapPin, CalendarCheck, TrendingUp,
  ArrowUpRight, Clock, Plane, Star,
} from 'lucide-react';

const stats = [
  {
    label: 'Total Bookings',
    value: '—',
    sub: 'Connect your API',
    icon: CalendarCheck,
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    glow: 'rgba(99,102,241,0.25)',
  },
  {
    label: 'Active Tours',
    value: '—',
    sub: 'Connect your API',
    icon: MapPin,
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    glow: 'rgba(16,185,129,0.25)',
  },
  {
    label: 'Total Users',
    value: '—',
    sub: 'Connect your API',
    icon: Users,
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    glow: 'rgba(245,158,11,0.25)',
  },
  {
    label: 'Revenue',
    value: '—',
    sub: 'Connect your API',
    icon: TrendingUp,
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    glow: 'rgba(236,72,153,0.25)',
  },
];

const recentActivity = [
  { text: 'Admin module initialized successfully', time: 'Just now', icon: Plane, color: '#6366f1', bg: '#ede9fe' },
  { text: 'Bookings page created', time: '2 min ago', icon: CalendarCheck, color: '#10b981', bg: '#d1fae5' },
  { text: 'Dashboard configured', time: '5 min ago', icon: Star, color: '#f59e0b', bg: '#fef3c7' },
];

const quickLinks = [
  { label: 'Add New Tour', color: '#6366f1', bg: '#ede9fe' },
  { label: 'View Bookings', color: '#10b981', bg: '#d1fae5' },
  { label: 'Manage Users', color: '#f59e0b', bg: '#fef3c7' },
  { label: 'Reports', color: '#ec4899', bg: '#fce7f3' },
];

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px' }}>

      {/* Page heading */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        borderRadius: '18px',
        padding: '28px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 8px 32px rgba(15,23,42,0.15)',
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', margin: 0 }}>
            Welcome back, Admin 👋
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
            Here's what's happening with TIT Travel today.
          </p>
        </div>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
        }}>
          <Plane size={24} color="#fff" />
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '22px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              border: '1px solid #f1f5f9',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {stat.label}
                </p>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: stat.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 14px ${stat.glow}`,
                }}>
                  <Icon size={18} color="#fff" />
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '32px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                {stat.value}
              </p>
              <p style={{ margin: 0, fontSize: '11px', color: '#cbd5e1' }}>
                {stat.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

        {/* Recent Activity */}
        <div style={{
          background: '#fff', borderRadius: '16px', padding: '22px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
        }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
            Recent Activity
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentActivity.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '10px',
                    background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={15} color={item.color} />
                  </div>
                  <span style={{ flex: 1, fontSize: '13px', color: '#334155' }}>{item.text}</span>
                  <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: '#fff', borderRadius: '16px', padding: '22px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
        }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
            Quick Actions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {quickLinks.map((q, i) => (
              <button key={i} style={{
                background: q.bg, border: 'none', borderRadius: '12px',
                padding: '14px 12px', cursor: 'pointer', textAlign: 'left',
                fontSize: '12px', fontWeight: 600, color: q.color,
                transition: 'opacity 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
