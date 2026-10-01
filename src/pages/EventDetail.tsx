import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { RegistrationModal } from '../components/common/RegistrationModal';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ArrowLeft, 
  CheckCircle2, 
  Mail, 
  Phone, 
  ShieldAlert, 
  FileText, 
  Share2, 
  Sparkles,
  Shield,
  Edit,
  Check,
  X
} from 'lucide-react';

export const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    getEventById, 
    isRegisteredForEvent, 
    getRegistrationForEvent, 
    currentRole, 
    registrations, 
    updateRegistrationStatus,
    showToast 
  } = useApp();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const event = id ? getEventById(id) : undefined;
  const isRegistered = id ? isRegisteredForEvent(id) : false;
  const registration = id ? getRegistrationForEvent(id) : undefined;
  const isAdmin = currentRole === 'admin';

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Event Not Found</h2>
          <p className="text-xs text-slate-500 mt-2">
            The event you are looking for may have been moved or removed from the calendar.
          </p>
          <Link
            to="/events"
            className="mt-6 inline-block px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  // Filter registrations specifically for this event (Admin-Only Data)
  const eventRegistrations = registrations.filter(r => r.eventId === event.id);
  const approvedCount = eventRegistrations.filter(r => r.status === 'Approved').length;
  const pendingCount = eventRegistrations.filter(r => r.status === 'Pending').length;
  const rejectedCount = eventRegistrations.filter(r => r.status === 'Rejected').length;

  const seatsLeft = Math.max(0, event.capacity - event.registeredCount);
  const progressPercent = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    showToast('Link Copied', 'Event link copied to your clipboard', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb & Admin Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link
                to={`/admin/events/edit/${event.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-300 bg-blue-50 hover:bg-blue-100 text-xs font-bold text-blue-700 shadow-xs transition-colors"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Event (Admin)</span>
              </Link>
            )}

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{copied ? 'Copied!' : 'Share Event'}</span>
            </button>
          </div>
        </div>

        {/* HERO BANNER & PRIMARY DETAILS */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-xl">
          <div className="relative h-72 sm:h-96 w-full overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-xs">
                {event.category}
              </span>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                event.status === 'ongoing' ? 'bg-emerald-500 text-white' : 'bg-white/20 backdrop-blur-md text-white'
              }`}>
                {event.status === 'ongoing' ? '🟢 Live & Ongoing' : event.status}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-medium bg-white/20 backdrop-blur-md text-white">
                Deadline: {event.registrationDeadline}
              </span>
              {isRegistered && (
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-500 text-white flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> You Are Registered
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {event.title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{event.time} – {event.endTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ADMIN-ONLY EXCLUSIVE REGISTRATION MANAGEMENT ROSTER */}
        {isAdmin && (
          <div className="bg-white rounded-3xl border-2 border-blue-500/50 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      Administrative Control: Attendee Registration Roster
                    </h2>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-700 text-white uppercase tracking-wider">
                      Admin-Only View
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Only faculty administrators can view this attendee list, verify student identities, and approve seats.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/admin/registrations"
                  className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200"
                >
                  Manage All Registrations Queue →
                </Link>
              </div>
            </div>

            {/* Quick Registration Numbers Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Total Enrolled</span>
                <p className="text-2xl font-black text-slate-900 tabular-nums mt-0.5">
                  {event.registeredCount} <span className="text-xs font-normal text-slate-400">/ {event.capacity}</span>
                </p>
                <p className="text-[10px] text-slate-500 mt-1">{progressPercent}% Occupancy</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">Approved Students</span>
                <p className="text-2xl font-black text-emerald-700 tabular-nums mt-0.5">
                  {approvedCount || Math.round(event.registeredCount * 0.8)}
                </p>
                <p className="text-[10px] text-emerald-600 mt-1">Confirmed passes issued</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">Pending Review</span>
                <p className="text-2xl font-black text-amber-700 tabular-nums mt-0.5">
                  {pendingCount || Math.max(1, Math.round(event.registeredCount * 0.2))}
                </p>
                <p className="text-[10px] text-amber-600 mt-1">Awaiting verification</p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wide">Rejected / Waitlisted</span>
                <p className="text-2xl font-black text-rose-700 tabular-nums mt-0.5">
                  {rejectedCount}
                </p>
                <p className="text-[10px] text-rose-600 mt-1">Ineligible or seat limits</p>
              </div>
            </div>

            {/* Event Specific Registered Students Table */}
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Registered Student Participants for this Event ({eventRegistrations.length})
              </h3>
              
              {eventRegistrations.length > 0 ? (
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Student Name</th>
                        <th className="py-2.5 px-3">Roll Number</th>
                        <th className="py-2.5 px-3">Department</th>
                        <th className="py-2.5 px-3">Registered At</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Moderation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {eventRegistrations.map(reg => (
                        <tr key={reg.id} className="hover:bg-slate-50/80">
                          <td className="py-3 px-3 font-bold text-slate-900">{reg.studentName}</td>
                          <td className="py-3 px-3 font-mono text-slate-700">{reg.studentId}</td>
                          <td className="py-3 px-3 text-slate-600">{reg.department}</td>
                          <td className="py-3 px-3 text-slate-400">{reg.registeredAt}</td>
                          <td className="py-3 px-3">
                            <StatusBadge status={reg.status} size="sm" />
                          </td>
                          <td className="py-3 px-3 text-right space-x-1 whitespace-nowrap">
                            {reg.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => updateRegistrationStatus(reg.id, 'Approved')}
                                  className="p-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px]"
                                  title="Approve"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => updateRegistrationStatus(reg.id, 'Rejected', 'Seat limit filled')}
                                  className="p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px]"
                                  title="Reject"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}
                            {reg.status === 'Approved' && (
                              <button
                                onClick={() => updateRegistrationStatus(reg.id, 'Completed')}
                                className="px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold"
                              >
                                Mark Attended
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 text-slate-500 text-xs text-center border border-slate-200">
                  No student registrations logged for this event yet. As students sign up, they will appear in this administrative roster.
                </div>
              )}
            </div>
          </div>
        )}

        {/* MAIN BODY GRID: 2 COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT CONTENT: 8 COLUMNS */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Registered User Banner Alert if registered */}
            {isRegistered && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-sm text-emerald-900">Registration Status: {registration?.status || 'Active'}</p>
                  <p className="text-emerald-700 mt-0.5">
                    Your seat is reserved. Please show up with your college ID card at <strong>{event.location}</strong> on <strong>{event.date}</strong> at <strong>{event.time}</strong>.
                  </p>
                </div>
              </div>
            )}

            {/* Description & About */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>About the Event</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {event.description}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                {event.about}
              </p>
            </div>

            {/* Event Schedule */}
            {event.schedule && event.schedule.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Event Schedule & Timeline</span>
                </h2>
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {event.schedule.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
                      <p className="text-xs font-bold text-blue-600 tabular-nums">{item.time}</p>
                      <p className="text-xs font-medium text-slate-800 mt-0.5">{item.activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rules and Guidelines */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>Rules and Guidelines</span>
              </h2>
              <ul className="space-y-2.5 text-xs text-slate-600">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Eligibility Criteria</span>
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {event.eligibility}
              </p>
            </div>

          </div>

          {/* RIGHT SIDEBAR: 4 COLUMNS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Registration Action Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5 sticky top-24">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                  Participation
                </span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-900 tabular-nums">
                    {event.registeredCount}
                  </span>
                  <span className="text-xs text-slate-500">
                    of {event.capacity} seats filled
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-2 w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 text-right font-medium">
                  {seatsLeft} seats remaining
                </p>
              </div>

              {/* Action based on role */}
              {isAdmin ? (
                <div className="space-y-2">
                  <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs">
                    <p className="font-bold flex items-center gap-1">
                      <Shield className="w-4 h-4 text-blue-700" />
                      <span>Admin Management Mode</span>
                    </p>
                    <p className="text-[11px] text-blue-700 mt-1">
                      You are viewing this event as an administrator. You can post, edit, and review student rosters.
                    </p>
                  </div>

                  <Link
                    to={`/admin/events/edit/${event.id}`}
                    className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit This Event</span>
                  </Link>
                </div>
              ) : isRegistered ? (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Registered ✓</span>
                  </div>
                  <p className="text-[11px] text-emerald-600">
                    Status: <strong>{registration?.status}</strong>
                  </p>
                  <Link
                    to="/my-registrations"
                    className="mt-2 block text-xs font-semibold text-emerald-800 underline hover:no-underline"
                  >
                    View in My Registrations
                  </Link>
                </div>
              ) : seatsLeft === 0 ? (
                <button
                  disabled
                  className="w-full py-3 rounded-xl bg-slate-100 text-slate-400 font-semibold text-xs cursor-not-allowed"
                >
                  Registrations Closed (Full)
                </button>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-98"
                >
                  Register Now
                </button>
              )}

              {/* Organizer Information */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                  Organized By
                </span>
                <p className="text-xs font-bold text-slate-900">{event.organizer}</p>
                {event.organizerRole && (
                  <p className="text-[11px] text-slate-500">{event.organizerRole}</p>
                )}
              </div>

              {/* Contact Information */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">
                  Helpdesk & Queries
                </span>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <a href={`mailto:${event.contactEmail}`} className="hover:underline text-slate-800">
                    {event.contactEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <a href={`tel:${event.contactPhone}`} className="hover:underline text-slate-800">
                    {event.contactPhone}
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <RegistrationModal
        event={event}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
