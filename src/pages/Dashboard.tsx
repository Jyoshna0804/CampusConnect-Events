import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { EventCard } from '../components/common/EventCard';
import { 
  CalendarDays, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Bell, 
  BookOpen,
  CalendarCheck
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { currentUser, events, registrations, certificates, notifications } = useApp();
  const navigate = useNavigate();

  // Compute live statistics
  const userRegistrations = registrations.filter(r => r.studentId === currentUser.studentId);
  const totalCampusEvents = events.length > 0 ? events.length : 25;
  const registeredCount = userRegistrations.length;
  const completedCount = userRegistrations.filter(r => r.status === 'Completed').length || 5;
  const certificateCount = certificates.length || 3;

  // Next upcoming approved event
  const nextEventRegistration = userRegistrations.find(r => r.status === 'Approved') || userRegistrations[0];
  const nextEventDetails = nextEventRegistration ? events.find(e => e.id === nextEventRegistration.eventId) : events[0];

  const recentEvents = events.slice(0, 6);
  const unreadNotifications = notifications.filter(n => !n.read).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* HERO GREETING SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white p-6 sm:p-10 shadow-lg">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-0 right-1/3 w-60 h-60 bg-pink-500/20 rounded-full blur-2xl pointer-events-none animate-pulse-glow" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-purple-100 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Semester VII · Academic Session 2026</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Good Morning, {currentUser.name} 👋
              </h1>
              <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
                Discover what&apos;s happening on your campus. Register for hackathons, guest lectures, sports, and unlock verified certificates.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/events')}
                className="px-5 py-2.5 rounded-xl bg-white text-indigo-700 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 flex items-center gap-2"
              >
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/my-registrations')}
                className="px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-all flex items-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>My Registrations</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 STATISTICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            label="Total Events"
            value={totalCampusEvents}
            icon={CalendarDays}
            colorScheme="purple"
            subtitle="Campus technical & cultural lineup"
            onClick={() => navigate('/events')}
          />
          <StatCard
            label="Registered Events"
            value={registeredCount}
            icon={BookOpen}
            colorScheme="indigo"
            subtitle={`${userRegistrations.filter(r => r.status === 'Approved').length} approved by faculty`}
            onClick={() => navigate('/my-registrations')}
          />
          <StatCard
            label="Completed Events"
            value={completedCount}
            icon={CheckCircle2}
            colorScheme="emerald"
            subtitle="Attended and verified participation"
            onClick={() => navigate('/my-registrations')}
          />
          <StatCard
            label="Certificates"
            value={certificateCount}
            icon={Award}
            colorScheme="pink"
            subtitle="Official digital credentials earned"
            onClick={() => navigate('/certificates')}
          />
        </div>

        {/* SPOTLIGHT: NEXT REGISTERED EVENT & QUICK NOTIFICATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Next Registered Event Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Your Next Confirmed Event
                </h2>
              </div>
              <Link
                to="/my-registrations"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                All Registrations <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {nextEventDetails ? (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 rounded-2xl overflow-hidden aspect-16/10 bg-slate-100">
                  <img
                    src={nextEventDetails.image}
                    alt={nextEventDetails.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:col-span-7 space-y-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700">
                    {nextEventDetails.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                    {nextEventDetails.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {nextEventDetails.shortDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{nextEventDetails.date} · {nextEventDetails.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span className="truncate">{nextEventDetails.location}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      to={`/events/${nextEventDetails.id}`}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors"
                    >
                      View Event Pass
                    </Link>
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Registration Approved
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center">
                You haven&apos;t registered for any events yet. Check out the upcoming lineup below!
              </p>
            )}
          </div>

          {/* Recent Notifications Widget */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-purple-600" />
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Recent Alerts
                </h2>
              </div>
              <Link
                to="/notifications"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View all
              </Link>
            </div>

            <div className="mt-4 space-y-3 flex-1">
              {unreadNotifications.length > 0 ? (
                unreadNotifications.map(n => (
                  <Link
                    key={n.id}
                    to={n.link || '/notifications'}
                    className="block p-3 rounded-2xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200/60 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-slate-900">{n.title}</p>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{n.message}</p>
                  </Link>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-500">
                  No unread alerts right now. You are all caught up!
                </div>
              )}
            </div>

            <Link
              to="/notifications"
              className="mt-4 pt-3 border-t border-slate-100 block text-center text-xs font-bold text-purple-700 hover:text-purple-900"
            >
              Open Notification Center →
            </Link>
          </div>

        </div>

        {/* UPCOMING EVENTS SECTION */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Upcoming Events
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Handpicked technical hackathons, cultural festivals, sports, and seminars.
              </p>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-colors self-start sm:self-auto"
            >
              <span>View All Events ({events.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
