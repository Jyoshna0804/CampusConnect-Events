import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastContainer } from './components/common/Toast';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Student Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Events } from './pages/Events';
import { EventDetail } from './pages/EventDetail';
import { MyRegistrations } from './pages/MyRegistrations';
import { Certificates } from './pages/Certificates';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminEvents } from './pages/admin/AdminEvents';
import { AdminEventForm } from './pages/admin/AdminEventForm';
import { AdminRegistrations } from './pages/admin/AdminRegistrations';
import { AdminStudents } from './pages/admin/AdminStudents';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminCertificates } from './pages/admin/AdminCertificates';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminSettings } from './pages/admin/AdminSettings';

/**
 * Scroll to top on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * Main Layout wrapper conditionally showing student Navbar and Footer
 */
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAuthRoute = pathname === '/login' || pathname === '/register' || pathname === '/admin/login';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-500 selection:text-white">
      {!isAdminRoute && !isAuthRoute && <Navbar />}
      <div className="flex-1">{children}</div>
      {!isAdminRoute && !isAuthRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer />
        <LayoutWrapper>
          <Routes>
            {/* Student Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/my-registrations" element={<MyRegistrations />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />

            {/* Admin & Faculty Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/events/new" element={<AdminEventForm />} />
            <Route path="/admin/events/edit/:id" element={<AdminEventForm />} />
            <Route path="/admin/registrations" element={<AdminRegistrations />} />
            <Route path="/admin/students" element={<AdminStudents />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/certificates" element={<AdminCertificates />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/profile" element={<Profile />} />

            {/* Fallback Route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
    </AppProvider>
  );
}
