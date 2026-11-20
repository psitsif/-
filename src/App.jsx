import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RouteSEO from './Components/RouteSEO';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import IncubationPage from './pages/IncubationPage';
import StartupsDirectoryPage from './pages/StartupsDirectoryPage';
import ProgramsPage from './pages/ProgramsPage';
import EventsPage from './pages/EventsPage';
import EcosystemPage from './pages/EcosystemPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import IICPage from './pages/IICPage';
import NotFound from './pages/NotFound';
import ScrollToTop from './Components/ScrollToTop';

// Admin pages are large — lazy-load them so they don't bloat the public bundle.
// They're only downloaded when a user actually navigates to /admin.
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));

const AdminFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-400 text-sm">Loading admin panel…</p>
    </div>
  </div>
);

const App = () => {
  return (
    <>
      <ScrollToTop />
       <RouteSEO />
      <Routes>
        {/* Public Institutional Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/incubation" element={<IncubationPage />} />
        <Route path="/startups" element={<StartupsDirectoryPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/ecosystem" element={<EcosystemPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/iic" element={<IICPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Administrative CMS Routes — loaded lazily */}
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<AdminFallback />}>
              <AdminLoginPage />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<AdminFallback />}>
              <AdminDashboardPage />
            </Suspense>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
