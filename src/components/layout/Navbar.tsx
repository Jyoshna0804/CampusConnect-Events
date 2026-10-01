import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Bell, 
  Menu, 
  X, 
  Calendar, 
  Award, 
  FileCheck2, 
  User as UserIcon, 
  LogOut, 
  Shield, 
  ChevronDown,
  Plus,
  LayoutDashboard,
  Users
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    currentRole, 
    logout, 
    unreadNotificationCount 
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isAdmin = currentRole === 'admin';

  // Strictly separated navigation links based on active profile
  const studentNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'My Registrations', path: '/my-registrations' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Notifications', path: '/notifications' },
  ];

  const adminNavLinks = [
    { name: 'Admin Dashboard', path: '/admin/dashboard' },
    { name: 'Events Catalog', path: '/events' },
    { name: 'Manage Events', path: '/admin/events' },
    { name: 'Review Registrations', path: '/admin/registrations' },
    { name: 'Reports', path: '/admin/reports' },
  ];

  const activeNavLinks = isAdmin ? adminNavLinks : studentNavLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 text-slate-900 group shrink-0">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200 ${
              isAdmin 
                ? 'bg-gradient-to-tr from-blue-900 via-blue-800 to-indigo-900' 
                : 'bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500'
            }`}>
              {isAdmin ? <Shield className="w-5 h-5 text-sky-200" /> : <GraduationCap className="w-6 h-6 text-white" />}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 bg-clip-text text-transparent">
                  CampusConnect
                </span>
                {isAdmin && (
                  <span className="px-1.5 py-0.2 rounded-md bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider">
                    Admin
                  </span>
                )}
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                {isAdmin ? 'Faculty Management Portal' : 'Events Portal'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {activeNavLinks.map(link => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors relative ${
                    active
                      ? 'text-blue-600 bg-blue-50/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.name}
                  {link.name === 'Notifications' && unreadNotificationCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-blue-600 text-white tabular-nums">
                      {unreadNotificationCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* If Admin: show "+ Post Event" button */}
            {isAdmin && (
              <Link
                to="/admin/events/new"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 shadow-xs transition-all active:scale-98"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post Event</span>
              </Link>
            )}

            {/* Notification Bell (Only for students) */}
            {!isAdmin && (
              <Link
                to="/notifications"
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse tabular-nums">
                    {unreadNotificationCount}
                  </span>
                )}
              </Link>
            )}

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-blue-500/20"
                />
                <div className="hidden md:block">
                  <p className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {isAdmin ? 'Dean of Student Affairs' : currentUser.studentId}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-md ${
                      isAdmin ? 'bg-blue-100 text-blue-900 font-semibold' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {isAdmin ? '🛡️ Faculty Admin' : `🎓 Roll: ${currentUser.studentId}`}
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      <span>{isAdmin ? 'My Admin Profile' : 'My Student Profile'}</span>
                    </Link>

                    {!isAdmin ? (
                      <>
                        <Link
                          to="/my-registrations"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>My Registrations</span>
                        </Link>
                        <Link
                          to="/certificates"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        >
                          <FileCheck2 className="w-4 h-4" />
                          <span>My Certificates</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                        <Link
                          to="/admin/events/new"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Post New Event</span>
                        </Link>
                        <Link
                          to="/admin/registrations"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                        >
                          <Users className="w-4 h-4" />
                          <span>Review Registrations</span>
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <img src={currentUser.avatar} alt="" className="w-9 h-9 rounded-lg object-cover ring-2 ring-blue-500/20" />
              <div>
                <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500">
                  {isAdmin ? 'Dean of Student Affairs' : currentUser.studentId}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            {activeNavLinks.map(link => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    active ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col gap-2">
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs"
            >
              <UserIcon className="w-4 h-4" />
              <span>{isAdmin ? 'Admin Profile' : 'Student Profile'}</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-rose-600 font-bold text-xs hover:bg-rose-50 border border-rose-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
