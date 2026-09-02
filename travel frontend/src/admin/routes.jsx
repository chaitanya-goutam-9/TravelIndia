import { LayoutDashboard, CalendarCheck, FolderOpen, MapPin, Map } from 'lucide-react';
import Dashboard from './pages/Dashboard.jsx';
import GuestPhoto from './pages/GuestPhotopage.jsx';
import VisaServices from "./pages/VisaServiceAdmin.jsx"
import CategoryAdmin from './pages/CategoryAdmin.jsx';
import DestinationAdmin from './pages/DestinationAdmin.jsx';
import TourPackageAdmin from './pages/TourPackageAdmin.jsx';

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
    path: 'Guest Photos',
    label: 'Guest Photos',
    icon: CalendarCheck,
    element: <GuestPhoto />,
    showInNav: true,
  },
   {
    path: 'VisaServices',
    label: 'VisaServices',
    icon: CalendarCheck,
    element: <VisaServices />,
    showInNav: true,
  },
  {
    path: 'categories',
    label: 'Categories',
    icon: FolderOpen,
    element: <CategoryAdmin />,
    showInNav: true,
  },
  {
    path: 'destinations',
    label: 'Destinations',
    icon: MapPin,
    element: <DestinationAdmin />,
    showInNav: true,
  },
  {
    path: 'tours',
    label: 'Tour Packages',
    icon: Map,
    element: <TourPackageAdmin />,
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
