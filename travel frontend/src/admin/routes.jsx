import { LayoutDashboard, CalendarCheck } from 'lucide-react';
import Dashboard from './pages/Dashboard.jsx';
import GuestPhoto from './pages/GuestPhotopage.jsx';

/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║              ADMIN ROUTES CONFIG                         ║
 * ║                                                          ║
 * ║  Naya page add karna ho toh SIRF yahan ek object add     ║
 * ║  karo — route + sidebar nav icon sab automatic hoga.     ║
 * ║                                                          ║
 * ║  Shape:                                                  ║
 * ║  {                                                       ║
 * ║    path: 'url-path',      // /admin/url-path             ║
 * ║    label: 'Nav Label',    // sidebar mein dikhega        ║
 * ║    icon: LucideIcon,      // lucide-react icon           ║
 * ║    element: <Component />,// page component              ║
 * ║    showInNav: true,       // sidebar mein show karo?     ║
 * ║    index: true,           // sirf /admin root ke liye    ║
 * ║  }                                                       ║
 * ╚══════════════════════════════════════════════════════════╝
 */
export const adminRoutes = [
  {
    index: true,
    label: 'Dashboard',
    icon: LayoutDashboard,
    element: <Dashboard />,
    showInNav: true,
  },
  {
    path: 'bookings',
    label: 'Bookings',
    icon: CalendarCheck,
    element: <GuestPhoto />,
    showInNav: true,
  },

  // ── Future pages example ──────────────────────────────────
  // {
  //   path: 'tours',
  //   label: 'Tours',
  //   icon: Map,
  //   element: <ToursPage />,
  //   showInNav: true,
  // },
];
