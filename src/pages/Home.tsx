import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/common/EventCard';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Award, 
  Users, 
  Compass, 
  CheckCircle, 
  TrendingUp,
  Shield,
  GraduationCap,
  Plus
} from 'lucide-react';

export const Home: React.FC = () => {
  const { events, categories, currentRole } = useApp();
  const isAdmin = currentRole === 'admin';
  const upcomingEvents = events.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-sky-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
        
        {/* Ambient background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-sky-200 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span>IARE Collegiate Events 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Discover. Register. Participate.{' '}
                <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-teal-300 bg-clip-text text-transparent">
                  Celebrate.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Welcome to <strong>CampusConnect</strong>, the autonomous collegiate platform for engineering hackathons, cultural festivals, sports tournaments, and technical symposiums.
              </p>

              {/* TWO SEPARATE PROFILE PORTAL ENTRANCES */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                
                {/* Profile Option 1: Student */}
                <div className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-blue-400/30 backdrop-blur-md transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/30 text-sky-300 flex items-center justify-center border border-blue-400/40">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-400/20 text-sky-200 border border-blue-300/30">
                      For Students
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-sky-200 transition-colors">
                    Student Portal
                  </h3>
                  <p className="text-xs text-sky-100/80 mt-1 line-clamp-2">
                    Browse ongoing and upcoming events, enroll for seat passes, and claim verified certificates.
                  </p>
                  <Link
                    to={isAdmin ? "/login" : "/dashboard"}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-sky-300 hover:text-white"
                  >
                    <span>{isAdmin ? 'Login as Student' : 'Enter Student Dashboard'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Profile Option 2: Admin */}
                <div className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-sky-400/30 backdrop-blur-md transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/30 text-sky-200 flex items-center justify-center border border-sky-400/40">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-400/20 text-sky-200 border border-sky-300/30">
                      Faculty / Admin
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-sky-200 transition-colors">
                    Admin Portal
                  </h3>
                  <p className="text-xs text-sky-100/80 mt-1 line-clamp-2">
                    Publish campus events, monitor registration numbers, view student rosters, and approve entries.
                  </p>
                  <Link
                    to={isAdmin ? "/admin/dashboard" : "/admin/login"}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white"
                  >
                    <span>{isAdmin ? 'Enter Admin Dashboard' : 'Login as Faculty Admin'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

              {/* Quick stats highlight */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/10 max-w-md">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">25+</p>
                  <p className="text-xs text-slate-400 font-medium">Campus Events</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-sky-300 tabular-nums">1,200+</p>
                  <p className="text-xs text-slate-400 font-medium">Active Students</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-blue-300 tabular-nums">100%</p>
                  <p className="text-xs text-slate-400 font-medium">Verified Certs</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-blue-400/30 ring-1 ring-white/10 group">
                <img
                  src="/src/assets/images/hero_campus_festival_1790830905441.jpg"
                  alt="Campus Festival Celebration"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating pill overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/90 text-white text-xs font-bold w-fit mb-2 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>Live Campus Events Ongoing</span>
                  </div>
                  <h4 className="text-lg font-bold text-white leading-snug">
                    Tarang Annual Cultural Fest & Hackathons 2026
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Auditorium & Innovation Labs · Open to all Departments
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED / UPCOMING EVENTS SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Campus Calendar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Featured Events
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select an event to view full details, rules, schedules, and register.
            </p>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
          >
            <span>View All Events</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* TWO SEPARATE PROFILES INFO BANNER */}
      <section className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Two Specialized Account Portals
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Each portal provides a dedicated workspace tailored to your campus role without overlapping tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Student Card */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Student Profile Portal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Log in as an undergraduate student to discover hackathons, technical symposia, and cultural events. Register, view live event passes, track registration approvals, and download authenticated credentials.
              </p>
              <ul className="text-xs text-slate-600 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Discover ongoing, upcoming, and completed events</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>One-click registration with roll number verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Instant verified PDF certificate downloads</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link
                  to="/login"
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <span>Student Portal Login</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Admin Card */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:shadow-md hover:border-sky-200 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Faculty & Admin Portal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Log in as faculty conveners or institute administrators to post new campus events, monitor seat capacities in real time, view confidential attendee rosters, and approve or reject student entries.
              </p>
              <ul className="text-xs text-slate-600 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Publish and schedule campus events with 1-click templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Private attendee roster with full student roll numbers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Moderate and approve student registrations in real-time</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link
                  to="/admin/login"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <span>Admin Portal Login</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
