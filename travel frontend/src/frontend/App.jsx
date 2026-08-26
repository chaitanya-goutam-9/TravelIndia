import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import frontendRoutes from './routes.jsx';
import AdminApp from '../admin/AdminApp.jsx';

function NotFound() {
  return (
    <div className="p-20 text-center text-2xl font-bold">
      404 - Page Not Found
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Frontend Public Routes ── */}
        <Route path="/" element={<Layout />}>
          {frontendRoutes.map((route, i) =>
            route.index ? (
              <Route key={i} index element={route.element} />
            ) : (
              <Route key={i} path={route.path} element={route.element} />
            )
          )}
        </Route>

        {/* ── Admin Module (completely separate layout) ── */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* ── 404 ── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
