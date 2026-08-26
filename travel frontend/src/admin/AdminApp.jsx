import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { adminRoutes } from './routes.jsx';

/**
 * AdminApp — /admin/* ke andar sab kuch yahan handle hota hai.
 * Login public hai, baaki sab ProtectedRoute se guard hai.
 * Naye pages ke liye sirf routes.jsx mein kaam karo.
 */
export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public — login page */}
        <Route path="login" element={<LoginPage />} />

        {/* Protected — AdminLayout + all admin pages */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            {adminRoutes.map((route, i) =>
              route.index ? (
                <Route key={i} index element={route.element} />
              ) : (
                <Route key={i} path={route.path} element={route.element} />
              )
            )}
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
